-- Run once in Supabase SQL Editor to create the AU content tables.
-- Content is managed through the Supabase dashboard.
-- Image paths refer to files inside the existing gallery-media bucket.

begin;

create table public.aus (
  id text primary key check (id ~ '^AU-[0-9]{3,}$'),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  legacy_id text unique,
  title text not null check (btrim(title) <> ''),
  title_vi text,
  subtitle text,
  subtitle_vi text,
  nav_label text not null check (btrim(nav_label) <> ''),
  nav_label_vi text,
  nav_image_path text,
  tags text[] not null default '{}',
  tags_vi text[],
  background_color text check (background_color ~ '^#[0-9A-Fa-f]{6}$'),
  text_color text check (text_color ~ '^#[0-9A-Fa-f]{6}$'),
  accent_color text check (accent_color ~ '^#[0-9A-Fa-f]{6}$'),
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

comment on column public.aus.id is
  'Stable AU code, for example AU-001. Existing shared links use this code.';
comment on column public.aus.legacy_id is
  'Optional former frontend ID, for example au1, so old links can still resolve.';
comment on column public.aus.nav_label is
  'Short label below the navigation circle, for example Contract.';
comment on column public.aus.nav_image_path is
  'Dedicated circle image path inside gallery-media, for example aus/AU-001/nav.webp.';
comment on column public.aus.background_color is
  'Optional six-digit hex color. NULL uses the default AU background.';
comment on column public.aus.text_color is
  'Optional six-digit hex color. NULL uses the default AU text color.';
comment on column public.aus.accent_color is
  'Optional six-digit hex color. NULL uses the default AU accent.';
comment on column public.aus.tags_vi is
  'Optional Vietnamese tags. NULL falls back to the English tags.';

create table public.au_context_sections (
  id uuid primary key default gen_random_uuid(),
  au_id text not null references public.aus(id) on update cascade on delete cascade,
  label text not null check (btrim(label) <> ''),
  label_vi text,
  body text not null check (btrim(body) <> ''),
  body_vi text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

comment on column public.au_context_sections.body is
  'Text for one context section. Separate paragraphs with a blank line.';
comment on column public.au_context_sections.sort_order is
  'Lower numbers appear first within the AU. Ties use created_at, then id.';

create table public.au_commissions (
  id uuid primary key default gen_random_uuid(),
  au_id text not null references public.aus(id) on update cascade on delete cascade,
  title text not null check (btrim(title) <> ''),
  title_vi text,
  caption text,
  caption_vi text,
  artist_credit text not null check (btrim(artist_credit) <> ''),
  image_path text not null check (btrim(image_path) <> ''),
  alt_text text,
  alt_text_vi text,
  commissioned_on date,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

comment on column public.au_commissions.image_path is
  'Artwork path inside gallery-media, for example aus/AU-001/jazz-club.webp.';
comment on column public.au_commissions.sort_order is
  'Lower numbers appear first within the AU. Ties use created_at, then id.';
comment on column public.au_commissions.is_published is
  'Artwork is visible only when both this commission and its parent AU are published.';

create index aus_display_order
  on public.aus (sort_order, created_at, id)
  where is_published;
create index au_context_sections_display_order
  on public.au_context_sections (au_id, sort_order, created_at, id);
create index au_commissions_display_order
  on public.au_commissions (au_id, sort_order, created_at, id)
  where is_published;

alter table public.aus enable row level security;
alter table public.au_context_sections enable row level security;
alter table public.au_commissions enable row level security;

revoke all on table public.aus, public.au_context_sections, public.au_commissions
  from anon, authenticated;
grant select on table public.aus, public.au_context_sections, public.au_commissions
  to anon, authenticated;

create policy "Read published AUs"
  on public.aus for select
  to anon, authenticated
  using (is_published);

create policy "Read context of published AUs"
  on public.au_context_sections for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.aus
      where aus.id = au_context_sections.au_id
        and aus.is_published
    )
  );

create policy "Read published commissions of published AUs"
  on public.au_commissions for select
  to anon, authenticated
  using (
    is_published
    and exists (
      select 1 from public.aus
      where aus.id = au_commissions.au_id
        and aus.is_published
    )
  );

commit;
