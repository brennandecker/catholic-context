-- Catholic Context reviewer platform (Supabase).
-- Apply in the project's SQL editor. Do not store government-ID data here.
-- Automation must never write review.status = theologically-reviewed.

create table if not exists public.cc_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  public_username text not null unique,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.cc_reviewers (
  user_id uuid primary key references public.cc_profiles (user_id) on delete cascade,
  role text not null check (role in ('community', 'theological', 'maintainer')),
  active boolean not null default true,
  appointed_by text not null default 'founder',
  appointed_at timestamptz not null default now(),
  notes text
);

create table if not exists public.cc_reviewer_invites (
  email text primary key,
  public_username text not null,
  display_name text,
  role text not null check (role in ('community', 'theological')),
  appointed_by text not null default 'founder',
  notes text,
  created_at timestamptz not null default now(),
  consumed_at timestamptz,
  consumed_user_id uuid
);

create table if not exists public.cc_proposals (
  id uuid primary key default gen_random_uuid(),
  context_id text not null,
  context_slug text not null,
  context_title text,
  proposer_user_id uuid not null references auth.users (id),
  proposer_public_username text not null,
  category text not null,
  problem text not null,
  proposed_change text not null,
  rationale text not null,
  supporting_sources text,
  material_change boolean not null default false,
  status text not null default 'draft',
  github_pr_number integer,
  github_pr_url text,
  github_error text,
  reviewer_user_id uuid,
  reviewer_public_username text,
  review_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cc_profiles enable row level security;
alter table public.cc_reviewers enable row level security;
alter table public.cc_reviewer_invites enable row level security;
alter table public.cc_proposals enable row level security;

create policy "profiles self read" on public.cc_profiles
  for select to authenticated using (user_id = auth.uid());

create policy "reviewers self read" on public.cc_reviewers
  for select to authenticated using (user_id = auth.uid());

create policy "appointed reviewers read proposals" on public.cc_proposals
  for select to authenticated
  using (exists (
    select 1 from public.cc_reviewers r
    where r.user_id = auth.uid() and r.active = true
  ));

create policy "appointed reviewers insert proposals" on public.cc_proposals
  for insert to authenticated
  with check (
    proposer_user_id = auth.uid()
    and exists (
      select 1 from public.cc_reviewers r
      where r.user_id = auth.uid() and r.active = true
    )
  );

create policy "appointed reviewers update proposals" on public.cc_proposals
  for update to authenticated
  using (exists (
    select 1 from public.cc_reviewers r
    where r.user_id = auth.uid() and r.active = true
  ));

create or replace function public.cc_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cc_proposals_touch on public.cc_proposals;
create trigger cc_proposals_touch
  before update on public.cc_proposals
  for each row execute function public.cc_touch_updated_at();
