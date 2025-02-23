-- First, create an admin author
insert into authors (
  name,
  credentials,
  bio,
  avatar_url,
  is_admin
) values (
  'Admin User',
  'admin@a2digihub.com', -- Replace with your admin email
  'Site Administrator and Content Manager',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  true
) on conflict (credentials) do update 
set is_admin = true
returning id;
