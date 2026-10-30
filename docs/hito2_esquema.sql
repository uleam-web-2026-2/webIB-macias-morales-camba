-- Esquema del Hito 2 · Manabí Catering & Banquetes
-- Copia de lo que hay en Supabase.

-- ===== TABLAS =====

create table clientes (
  id bigint generated always as identity primary key,
  nombre text not null,
  correo text not null,
  telefono text not null
);

create table platos_menu (
  id bigint generated always as identity primary key,
  nombre text not null,
  categoria text not null check (categoria in ('entrada','plato_fuerte','bocadito')),
  precio_por_persona numeric(8,2) not null,
  stock_insumos int not null
);

create table eventos_pedido (
  id bigint generated always as identity primary key,
  cliente_id bigint not null references clientes(id),
  fecha_evento date not null,
  tipo_evento text not null check (tipo_evento in ('boda','quince_anos','corporativo')),
  numero_invitados int not null check (numero_invitados between 1 and 1000),
  lugar_entrega text not null,
  estado text not null default 'cotizacion_registrada'
    check (estado in ('cotizacion_registrada','insumos_comprados','en_cocina','en_servicio','finalizado')),
  total numeric(10,2) not null default 0,
  creado_en timestamptz not null default now()
);

create table evento_plato (
  evento_id bigint not null references eventos_pedido(id),
  plato_id bigint not null references platos_menu(id),
  primary key (evento_id, plato_id)
);

-- ===== SEGURIDAD (RLS) =====

alter table clientes enable row level security;
alter table platos_menu enable row level security;
alter table eventos_pedido enable row level security;
alter table evento_plato enable row level security;

-- Leer: cualquiera, con o sin sesión
create policy "Permitir lectura publica de clientes"
  on clientes for select to anon, authenticated using (true);
create policy "Permitir lectura publica de eventos"
  on eventos_pedido for select to anon, authenticated using (true);
create policy "Permitir lectura publica de platos"
  on platos_menu for select to anon, authenticated using (true);
create policy "Permitir lectura publica de evento_plato"
  on evento_plato for select to anon, authenticated using (true);

-- Crear eventos: solo quien inició sesión
create policy "Permitir crear eventos a usuarios autenticados"
  on eventos_pedido for insert to authenticated with check (true);