-- ============================================================
-- SCS Ayush Solution — Supabase Database Schema
-- Run this in Supabase SQL Editor to set up the entire schema
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ────────────────────────────────────────────
-- ENQUIRIES TABLE
-- ────────────────────────────────────────────
create table if not exists enquiries (
  id            uuid primary key default uuid_generate_v4(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  phone         text not null,
  service       text not null,
  hospital_size text,
  urgency       text,
  message       text,
  status        text not null default 'new'
                  check (status in ('new', 'contacted', 'in_progress', 'converted', 'closed')),
  notes         text,
  source        text default 'website',
  assigned_to   text
);

-- ────────────────────────────────────────────
-- BLOG POSTS TABLE
-- ────────────────────────────────────────────
create table if not exists blog_posts (
  id              uuid primary key default uuid_generate_v4(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  title           text not null,
  slug            text not null unique,
  excerpt         text not null,
  content         text not null,
  cover_image     text,
  author          text not null default 'SCS Ayush Solution',
  author_avatar   text,
  category        text not null,
  tags            text[] default '{}',
  published       boolean not null default false,
  featured        boolean not null default false,
  read_time       integer not null default 5,
  seo_title       text,
  seo_description text,
  views           integer not null default 0
);

-- ────────────────────────────────────────────
-- JOB LISTINGS TABLE
-- ────────────────────────────────────────────
create table if not exists job_listings (
  id               uuid primary key default uuid_generate_v4(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  title            text not null,
  department       text not null,
  location         text not null,
  type             text not null check (type in ('full-time', 'part-time', 'contract', 'internship')),
  experience       text not null,
  salary_range     text,
  description      text not null,
  requirements     text[] not null default '{}',
  responsibilities text[] not null default '{}',
  active           boolean not null default true,
  featured         boolean not null default false,
  deadline         date
);

-- ────────────────────────────────────────────
-- JOB APPLICATIONS TABLE
-- ────────────────────────────────────────────
create table if not exists job_applications (
  id           uuid primary key default uuid_generate_v4(),
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  phone        text not null,
  position     text not null,
  job_id       uuid references job_listings(id) on delete set null,
  experience   text not null,
  resume_url   text,
  cover_letter text,
  status       text not null default 'new'
                 check (status in ('new', 'reviewing', 'shortlisted', 'interviewed', 'hired', 'rejected')),
  notes        text
);

-- ────────────────────────────────────────────
-- TESTIMONIALS TABLE
-- ────────────────────────────────────────────
create table if not exists testimonials (
  id          uuid primary key default uuid_generate_v4(),
  created_at  timestamptz not null default now(),
  name        text not null,
  designation text not null,
  hospital    text not null,
  avatar      text,
  content     text not null,
  rating      integer not null default 5 check (rating between 1 and 5),
  service     text,
  published   boolean not null default false,
  featured    boolean not null default false,
  video_url   text
);

-- ────────────────────────────────────────────
-- NEWSLETTER SUBSCRIBERS TABLE
-- ────────────────────────────────────────────
create table if not exists newsletter_subscribers (
  id         uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  email      text not null unique,
  name       text,
  active     boolean not null default true,
  source     text default 'website'
);

-- ────────────────────────────────────────────
-- CONTACT REQUESTS TABLE
-- ────────────────────────────────────────────
create table if not exists contact_requests (
  id         uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  name       text not null,
  email      text not null,
  phone      text,
  subject    text not null,
  message    text not null,
  status     text not null default 'new' check (status in ('new', 'replied', 'closed'))
);

-- ────────────────────────────────────────────
-- ADMIN USERS TABLE
-- ────────────────────────────────────────────
create table if not exists admin_users (
  id         uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  email      text not null unique,
  name       text not null,
  role       text not null default 'admin' check (role in ('super_admin', 'admin', 'editor')),
  avatar     text,
  last_login timestamptz
);

-- ────────────────────────────────────────────
-- UPDATED_AT TRIGGER FUNCTION
-- ────────────────────────────────────────────
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply trigger to tables with updated_at
create trigger enquiries_updated_at
  before update on enquiries
  for each row execute function handle_updated_at();

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function handle_updated_at();

create trigger job_listings_updated_at
  before update on job_listings
  for each row execute function handle_updated_at();

-- ────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ────────────────────────────────────────────

-- Enable RLS on all tables
alter table enquiries enable row level security;
alter table blog_posts enable row level security;
alter table job_listings enable row level security;
alter table job_applications enable row level security;
alter table testimonials enable row level security;
alter table newsletter_subscribers enable row level security;
alter table contact_requests enable row level security;
alter table admin_users enable row level security;

-- Public read policies (blog, jobs, testimonials)
create policy "Public can read published blog posts"
  on blog_posts for select
  using (published = true);

create policy "Public can read active job listings"
  on job_listings for select
  using (active = true);

create policy "Public can read published testimonials"
  on testimonials for select
  using (published = true);

-- Anonymous INSERT policies (for forms)
create policy "Anyone can submit enquiry"
  on enquiries for insert
  with check (true);

create policy "Anyone can apply for job"
  on job_applications for insert
  with check (true);

create policy "Anyone can subscribe to newsletter"
  on newsletter_subscribers for insert
  with check (true);

create policy "Anyone can submit contact"
  on contact_requests for insert
  with check (true);

-- Service role has full access (admin API)
create policy "Service role full access enquiries"
  on enquiries for all
  using (auth.role() = 'service_role');

create policy "Service role full access blog"
  on blog_posts for all
  using (auth.role() = 'service_role');

create policy "Service role full access jobs"
  on job_listings for all
  using (auth.role() = 'service_role');

create policy "Service role full access applications"
  on job_applications for all
  using (auth.role() = 'service_role');

create policy "Service role full access testimonials"
  on testimonials for all
  using (auth.role() = 'service_role');

create policy "Service role full access newsletter"
  on newsletter_subscribers for all
  using (auth.role() = 'service_role');

create policy "Service role full access contacts"
  on contact_requests for all
  using (auth.role() = 'service_role');

create policy "Service role full access admins"
  on admin_users for all
  using (auth.role() = 'service_role');

-- ────────────────────────────────────────────
-- INDEXES
-- ────────────────────────────────────────────
create index if not exists enquiries_status_idx on enquiries(status);
create index if not exists enquiries_created_at_idx on enquiries(created_at desc);
create index if not exists blog_posts_slug_idx on blog_posts(slug);
create index if not exists blog_posts_category_idx on blog_posts(category);
create index if not exists blog_posts_published_idx on blog_posts(published) where published = true;
create index if not exists job_applications_status_idx on job_applications(status);
create index if not exists newsletter_email_idx on newsletter_subscribers(email);

-- ────────────────────────────────────────────
-- SEED: Default admin user
-- (Update email and name to match your admin)
-- ────────────────────────────────────────────
insert into admin_users (email, name, role)
values ('admin@scsayushsolution.com', 'Super Admin', 'super_admin')
on conflict (email) do nothing;
