create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text unique,
  avatar_url text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);


create table jobs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  company text not null,
  location text,
  description text,
  requirements text[],
  type text,
  disability_support text[],
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table applications (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references jobs on delete cascade,
  user_id uuid references profiles on delete cascade,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(job_id, user_id)
);

create table success_stories (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  role text not null,
  company text not null,
  avatar_url text,
  story text not null,
  disability_type text,
  years_of_experience text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);