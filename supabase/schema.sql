create table bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tour_slug text not null,
  customer_name text not null,
  customer_email text not null,
  booking_date date not null,
  return_date date,
  people integer not null default 1,
  status text not null default 'pending'
);

alter table bookings enable row level security;

create policy "Anyone can insert a booking"
  on bookings for insert
  to anon
  with check (true);

create table hotel_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  hotel_slug text not null,
  customer_name text not null,
  customer_email text not null,
  check_in date not null,
  check_out date not null,
  guests integer not null default 1,
  status text not null default 'pending'
);

alter table hotel_bookings enable row level security;

create policy "Anyone can insert a hotel booking"
  on hotel_bookings for insert
  to anon
  with check (true);

create table transfer_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  transfer_slug text not null,
  customer_name text not null,
  customer_email text not null,
  flight_date date not null,
  direction text not null,
  passengers integer not null default 1,
  status text not null default 'pending'
);

alter table transfer_bookings enable row level security;

create policy "Anyone can insert a transfer booking"
  on transfer_bookings for insert
  to anon
  with check (true);

create table package_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  package_slug text not null,
  customer_name text not null,
  customer_email text not null,
  start_date date not null,
  people integer not null default 1,
  status text not null default 'pending'
);

alter table package_bookings enable row level security;

create policy "Anyone can insert a package booking"
  on package_bookings for insert
  to anon
  with check (true);

create table trip_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  when_option text not null,
  from_date date,
  to_date date,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  notes text,
  status text not null default 'pending'
);

alter table trip_requests enable row level security;

create policy "Anyone can insert a trip request"
  on trip_requests for insert
  to anon
  with check (true);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  nationality text,
  phone text,
  email text not null,
  message text not null,
  status text not null default 'new'
);

alter table contact_messages enable row level security;

create policy "Anyone can insert a contact message"
  on contact_messages for insert
  to anon
  with check (true);

create table survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tour_slug text,
  customer_name text,
  customer_email text,
  nationality text,
  rating integer not null,
  comment text,
  redirected_to text
);

alter table survey_responses enable row level security;

create policy "Anyone can insert a survey response"
  on survey_responses for insert
  to anon
  with check (true);

-- Demo-only read access for the internal dashboard (no auth yet)
create policy "Anyone can read bookings" on bookings for select to anon using (true);
create policy "Anyone can read hotel bookings" on hotel_bookings for select to anon using (true);
create policy "Anyone can read transfer bookings" on transfer_bookings for select to anon using (true);
create policy "Anyone can read package bookings" on package_bookings for select to anon using (true);
create policy "Anyone can read contact messages" on contact_messages for select to anon using (true);
create policy "Anyone can read trip requests" on trip_requests for select to anon using (true);
create policy "Anyone can read survey responses" on survey_responses for select to anon using (true);
