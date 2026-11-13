-- =====================================================================
-- Gamifica Live · Tarefas (link para os alunos jogarem sozinhos)
-- O aluno nunca recebe as respostas: a correção e os pontos são feitos aqui no banco.
-- Pontos de um acerto: round(P · (1 − t / (2 · T))) + bônus de sequência (100 por acerto seguido a partir do 2º, até 500)
--   P = pontos da questão, t = segundos que o aluno levou, T = tempo da questão em segundos.
-- =====================================================================

create table if not exists public.live_tarefas (
  id uuid primary key default gen_random_uuid(),
  professor_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  codigo text not null unique check (codigo ~ '^[A-Z0-9]{6}$'),
  titulo text not null check (char_length(titulo) between 1 and 120),
  perguntas jsonb not null check (jsonb_typeof(perguntas) = 'array' and jsonb_array_length(perguntas) between 1 and 100 and octet_length(perguntas::text) <= 4000000),
  prazo timestamptz,
  ativa boolean not null default true,
  mostrar_resposta boolean not null default true,
  criado_em timestamptz not null default now()
);
create index if not exists live_tarefas_professor_idx on public.live_tarefas (professor_id, criado_em desc);

create table if not exists public.live_tarefa_tentativas (
  id uuid primary key default gen_random_uuid(),
  tarefa_id uuid not null references public.live_tarefas(id) on delete cascade,
  nome text not null check (char_length(nome) between 2 and 60),
  turma text not null default '' check (char_length(turma) <= 40),
  respostas jsonb not null default '{}'::jsonb,
  pontos integer not null default 0,
  acertos integer not null default 0,
  seq integer not null default 0,
  concluida boolean not null default false,
  iniciada_em timestamptz not null default now(),
  concluida_em timestamptz
);
create index if not exists live_tarefa_tentativas_tarefa_idx on public.live_tarefa_tentativas (tarefa_id, iniciada_em desc);

alter table public.live_tarefas enable row level security;
alter table public.live_tarefa_tentativas enable row level security;

drop policy if exists "professor ve suas tarefas live" on public.live_tarefas;
drop policy if exists "professor cria suas tarefas live" on public.live_tarefas;
drop policy if exists "professor edita suas tarefas live" on public.live_tarefas;
drop policy if exists "professor apaga suas tarefas live" on public.live_tarefas;
drop policy if exists "professor ve tentativas das suas tarefas" on public.live_tarefa_tentativas;
drop policy if exists "professor apaga tentativas das suas tarefas" on public.live_tarefa_tentativas;

create policy "professor ve suas tarefas live" on public.live_tarefas for select to authenticated
  using (professor_id = (select auth.uid()));
create policy "professor cria suas tarefas live" on public.live_tarefas for insert to authenticated
  with check (professor_id = (select auth.uid()) and public.conta_ok((select auth.uid())));
create policy "professor edita suas tarefas live" on public.live_tarefas for update to authenticated
  using (professor_id = (select auth.uid()))
  with check (professor_id = (select auth.uid()) and public.conta_ok((select auth.uid())));
create policy "professor apaga suas tarefas live" on public.live_tarefas for delete to authenticated
  using (professor_id = (select auth.uid()));
create policy "professor ve tentativas das suas tarefas" on public.live_tarefa_tentativas for select to authenticated
  using (exists (select 1 from public.live_tarefas t where t.id = tarefa_id and t.professor_id = (select auth.uid())));
create policy "professor apaga tentativas das suas tarefas" on public.live_tarefa_tentativas for delete to authenticated
  using (exists (select 1 from public.live_tarefas t where t.id = tarefa_id and t.professor_id = (select auth.uid())));

revoke all on public.live_tarefas, public.live_tarefa_tentativas from anon;
grant select, insert, update, delete on public.live_tarefas to authenticated;
grant select, delete on public.live_tarefa_tentativas to authenticated;

-- Lê números como os alunos escrevem: 12 · −3 · 0,75 · 3/4
create or replace function public.live_num(p text) returns numeric
language plpgsql immutable set search_path = '' as $$
declare s text := regexp_replace(replace(replace(coalesce(p, ''), '−', '-'), '–', '-'), '\s+', '', 'g');
begin
  if s ~ '^-?\d{1,12}([.,]\d{1,12})?$' then return replace(s, ',', '.')::numeric; end if;
  if s ~ '^-?\d{1,12}/-?\d{1,12}$' and split_part(s, '/', 2)::numeric <> 0 then
    return split_part(s, '/', 1)::numeric / split_part(s, '/', 2)::numeric;
  end if;
  return null;
end $$;

-- Identificador secreto de cada etapa das questões de ordenar (o aluno não descobre a ordem certa)
create or replace function public.live_id_etapa(p_tarefa uuid, p_qi integer, p_k integer) returns text
language sql immutable set search_path = '' as $$
  select substr(md5(p_tarefa::text || ':' || p_qi || ':' || p_k), 1, 12);
$$;

-- Abre a tarefa para o aluno: enunciados e alternativas, sem as respostas
create or replace function public.live_tarefa_abrir(p_codigo text) returns jsonb
language plpgsql volatile security definer set search_path = '' as $$
declare t public.live_tarefas; lista jsonb := '[]'::jsonb; q jsonb; i integer; item jsonb; opcoes jsonb;
begin
  select * into t from public.live_tarefas where codigo = upper(trim(p_codigo));
  if not found then return jsonb_build_object('erro', 'nao_encontrada'); end if;
  if not t.ativa then return jsonb_build_object('erro', 'fechada', 'titulo', t.titulo); end if;
  if t.prazo is not null and t.prazo < now() then return jsonb_build_object('erro', 'encerrada', 'prazo', t.prazo, 'titulo', t.titulo); end if;
  for q, i in select e.value, (e.ordinality - 1)::integer from jsonb_array_elements(t.perguntas) with ordinality e loop
    item := jsonb_build_object('tipo', q->>'tipo', 't', q->>'t', 'img', coalesce(q->>'img', ''),
      'tempo', coalesce((q->>'tempo')::integer, 20), 'pontos', coalesce((q->>'pontos')::integer, 1000));
    if q->>'tipo' in ('multipla', 'enquete') then
      select coalesce(jsonb_agg(jsonb_build_array(o.ordinality - 1, o.value) order by o.ordinality), '[]'::jsonb) into opcoes
        from jsonb_array_elements_text(q->'o') with ordinality o where trim(o.value) <> '';
      item := item || jsonb_build_object('o', opcoes);
    elsif q->>'tipo' = 'ordenar' then
      select coalesce(jsonb_agg(jsonb_build_object('id', public.live_id_etapa(t.id, i, (o.ordinality - 1)::integer), 'txt', o.value) order by md5(o.value || random()::text)), '[]'::jsonb) into opcoes
        from jsonb_array_elements_text(q->'o') with ordinality o where trim(o.value) <> '';
      item := item || jsonb_build_object('o', opcoes);
    end if;
    lista := lista || jsonb_build_array(item);
  end loop;
  return jsonb_build_object('titulo', t.titulo, 'prazo', t.prazo, 'total', jsonb_array_length(t.perguntas), 'mostrar_resposta', t.mostrar_resposta, 'perguntas', lista);
end $$;

-- Começa uma tentativa (nome e turma do aluno)
create or replace function public.live_tarefa_iniciar(p_codigo text, p_nome text, p_turma text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare t public.live_tarefas; nid uuid; nome text := left(regexp_replace(trim(coalesce(p_nome, '')), '\s+', ' ', 'g'), 60);
begin
  select * into t from public.live_tarefas where codigo = upper(trim(p_codigo));
  if not found then return jsonb_build_object('erro', 'nao_encontrada'); end if;
  if not t.ativa then return jsonb_build_object('erro', 'fechada'); end if;
  if t.prazo is not null and t.prazo < now() then return jsonb_build_object('erro', 'encerrada'); end if;
  if char_length(nome) < 2 then return jsonb_build_object('erro', 'nome'); end if;
  if (select count(*) from public.live_tarefa_tentativas x where x.tarefa_id = t.id and x.iniciada_em > now() - interval '1 minute') > 150 then
    return jsonb_build_object('erro', 'muitas');
  end if;
  insert into public.live_tarefa_tentativas (tarefa_id, nome, turma) values (t.id, nome, left(trim(coalesce(p_turma, '')), 40)) returning id into nid;
  return jsonb_build_object('tentativa', nid);
end $$;

-- Corrige uma resposta. p_resposta: índice da alternativa (múltipla, V/F, enquete), texto (numérica) ou lista de ids (ordenar)
create or replace function public.live_tarefa_responder(p_tentativa uuid, p_qi integer, p_resposta jsonb, p_ms integer) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare x public.live_tarefa_tentativas; t public.live_tarefas; q jsonb; tipo text; pp integer; tt integer; ms integer;
  ok integer; ganho integer := 0; novo_seq integer; certa text := ''; v numeric; c numeric; esperado jsonb; k integer;
begin
  select * into x from public.live_tarefa_tentativas where id = p_tentativa for update;
  if not found then return jsonb_build_object('erro', 'tentativa'); end if;
  if x.concluida then return jsonb_build_object('erro', 'concluida'); end if;
  select * into t from public.live_tarefas where id = x.tarefa_id;
  if not t.ativa or (t.prazo is not null and t.prazo < now() - interval '30 minutes') then return jsonb_build_object('erro', 'encerrada'); end if;
  if p_qi is null or p_qi < 0 or p_qi >= jsonb_array_length(t.perguntas) then return jsonb_build_object('erro', 'questao'); end if;
  if x.respostas ? p_qi::text then
    return (x.respostas->p_qi::text) || jsonb_build_object('total', x.pontos, 'repetida', true);
  end if;
  if p_resposta is not null and octet_length(p_resposta::text) > 2000 then return jsonb_build_object('erro', 'grande'); end if;
  q := t.perguntas->p_qi; tipo := q->>'tipo';
  pp := coalesce((q->>'pontos')::integer, 1000); tt := greatest(coalesce((q->>'tempo')::integer, 20), 1);
  ms := least(greatest(coalesce(p_ms, tt * 1000), 0), tt * 1000);
  if tipo = 'enquete' then
    ok := -1;
  elsif p_resposta is null or p_resposta = 'null'::jsonb then
    ok := 0;
  elsif tipo in ('multipla', 'vf') then
    ok := case when jsonb_typeof(p_resposta) = 'number' and (p_resposta #>> '{}')::numeric = coalesce((q->>'c')::numeric, -1) then 1 else 0 end;
  elsif tipo = 'numero' then
    v := public.live_num(p_resposta #>> '{}'); c := public.live_num(q->>'num');
    ok := case when v is not null and c is not null and abs(v - c) <= coalesce((q->>'tol')::numeric, 0) + 0.000000001 then 1 else 0 end;
  elsif tipo = 'ordenar' then
    select coalesce(jsonb_agg(public.live_id_etapa(t.id, p_qi, (o.ordinality - 1)::integer) order by o.ordinality), '[]'::jsonb) into esperado
      from jsonb_array_elements_text(q->'o') with ordinality o where trim(o.value) <> '';
    ok := case when p_resposta = esperado then 1 else 0 end;
  else
    ok := 0;
  end if;
  novo_seq := case when ok = 1 then x.seq + 1 when ok = 0 then 0 else x.seq end;
  if ok = 1 and pp > 0 then
    ganho := round(pp * (1 - (ms / 1000.0) / (2 * tt)))::integer + least(500, greatest(0, novo_seq - 1) * 100);
  end if;
  if tipo in ('multipla', 'vf') then
    k := coalesce((q->>'c')::integer, 0);
    certa := case when tipo = 'vf' then (case when k = 0 then 'Verdadeiro' else 'Falso' end) else coalesce(q->'o'->>k, '') end;
  elsif tipo = 'numero' then certa := coalesce(q->>'num', '');
  elsif tipo = 'ordenar' then
    select string_agg(o.value, '  →  ' order by o.ordinality) into certa from jsonb_array_elements_text(q->'o') with ordinality o where trim(o.value) <> '';
  end if;
  update public.live_tarefa_tentativas set
    respostas = respostas || jsonb_build_object(p_qi::text, jsonb_build_object('ok', ok, 'ms', ms, 'ganho', ganho, 'r', p_resposta)),
    pontos = pontos + ganho, acertos = acertos + (case when ok = 1 then 1 else 0 end), seq = novo_seq
  where id = x.id;
  return jsonb_build_object('ok', ok, 'ganho', ganho, 'total', x.pontos + ganho, 'seq', novo_seq,
    'certa', case when t.mostrar_resposta then certa else '' end,
    'e', case when t.mostrar_resposta then coalesce(q->>'e', '') else '' end);
end $$;

-- Termina a tentativa e devolve a posição do aluno entre os que já terminaram
create or replace function public.live_tarefa_concluir(p_tentativa uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare x public.live_tarefa_tentativas; posicao integer; total integer; nq integer;
begin
  update public.live_tarefa_tentativas set concluida = true, concluida_em = coalesce(concluida_em, now())
    where id = p_tentativa returning * into x;
  if not found then return jsonb_build_object('erro', 'tentativa'); end if;
  select count(*) + 1 into posicao from public.live_tarefa_tentativas y where y.tarefa_id = x.tarefa_id and y.concluida and y.pontos > x.pontos;
  select count(*) into total from public.live_tarefa_tentativas y where y.tarefa_id = x.tarefa_id and y.concluida;
  select jsonb_array_length(perguntas) into nq from public.live_tarefas where id = x.tarefa_id;
  return jsonb_build_object('pontos', x.pontos, 'acertos', x.acertos, 'perguntas', nq, 'posicao', posicao, 'participantes', total);
end $$;

revoke all on function public.live_num(text), public.live_id_etapa(uuid, integer, integer) from public;
revoke all on function public.live_tarefa_abrir(text), public.live_tarefa_iniciar(text, text, text),
  public.live_tarefa_responder(uuid, integer, jsonb, integer), public.live_tarefa_concluir(uuid) from public;
grant execute on function public.live_tarefa_abrir(text), public.live_tarefa_iniciar(text, text, text),
  public.live_tarefa_responder(uuid, integer, jsonb, integer), public.live_tarefa_concluir(uuid) to anon, authenticated;
