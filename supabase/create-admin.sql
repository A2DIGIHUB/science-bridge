-- First, create an admin author with full privileges
insert into authors (
  name,
  credentials,
  bio,
  avatar_url,
  is_admin
) values (
  'A2DIGIHUB Admin',
  'generalchrist@gmail.com',  -- Your email address that you used to sign up
  'Lead Science Writer and Content Manager at A2DIGIHUB',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  true
) on conflict (credentials) do update 
set is_admin = true
returning id;

-- Insert initial categories if they don't exist
insert into categories (name, slug, description) values
  ('Physics', 'physics', 'Fundamental laws and properties of matter and energy'),
  ('Biology', 'biology', 'Study of life and living organisms'),
  ('Chemistry', 'chemistry', 'Composition, structure, and properties of matter'),
  ('Technology', 'technology', 'Scientific innovations and their applications'),
  ('Mathematics', 'mathematics', 'Study of numbers, quantities, and shapes'),
  ('Environmental Science', 'environmental-science', 'Study of environment and ecosystems'),
  ('Space Science', 'space-science', 'Astronomy and space exploration'),
  ('Health', 'health', 'Medical science and healthcare')
on conflict (slug) do nothing;
