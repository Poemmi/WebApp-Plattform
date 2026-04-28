-- Run this in your Supabase SQL editor

create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  created_at timestamptz default now() not null
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Yu-Gi-Oh tables
create table ygo_decks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  created_at timestamptz default now() not null
);

alter table ygo_decks enable row level security;

create policy "Users can manage own decks"
  on ygo_decks for all
  using (auth.uid() = user_id);

create table ygo_deck_cards (
  id uuid default gen_random_uuid() primary key,
  deck_id uuid references ygo_decks(id) on delete cascade not null,
  card_id integer not null,
  quantity integer default 1 not null check (quantity between 1 and 3)
);

alter table ygo_deck_cards enable row level security;

create policy "Users can manage own deck cards"
  on ygo_deck_cards for all
  using (
    auth.uid() = (select user_id from ygo_decks where id = deck_id)
  );

create table ygo_favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  card_id integer not null,
  unique (user_id, card_id)
);

alter table ygo_favorites enable row level security;

create policy "Users can manage own favorites"
  on ygo_favorites for all
  using (auth.uid() = user_id);
