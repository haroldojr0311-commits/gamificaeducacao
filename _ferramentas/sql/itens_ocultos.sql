-- Itens que o administrador tirou do site pela aba Administração ("Excluir do site"). Pode restaurar.
-- Leitura pública (o site esconde os itens); só o administrador altera, pela função ocultar_item.
create table if not exists public.itens_ocultos (id text primary key, quando timestamptz not null default now(), por uuid);
alter table public.itens_ocultos enable row level security;
create policy itens_ocultos_leitura on public.itens_ocultos for select to anon, authenticated using (true);
-- função public.ocultar_item(p_id text, p_ocultar boolean): security definer, exige perfis.papel = 'admin'.
