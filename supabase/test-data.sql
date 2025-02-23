-- Insert test authors
insert into authors (name, credentials, bio, avatar_url) values
  (
    'Dr. Sarah Smith',
    'Ph.D. in Quantum Physics',
    'Leading researcher in quantum computing and theoretical physics with over 10 years of experience.',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  ),
  (
    'Prof. John Doe',
    'Professor of Molecular Biology',
    'Specializing in CRISPR technology and genetic engineering. Published researcher with multiple papers in Nature.',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  ),
  (
    'Dr. Michael Brown',
    'Ph.D. in Astrophysics',
    'NASA consultant and expert in black hole physics. Lead researcher at the Space Science Institute.',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
  );

-- Insert some tags
insert into tags (name) values
  ('quantum'),
  ('technology'),
  ('genetics'),
  ('medicine'),
  ('astronomy'),
  ('physics'),
  ('AI'),
  ('climate'),
  ('neuroscience');

-- Insert sample posts
insert into posts (
  title,
  slug,
  content,
  author_id,
  category_id,
  status,
  published_at
) values
(
  'The Future of Quantum Computing',
  'future-of-quantum-computing',
  jsonb_build_object(
    'excerpt', 'Exploring the latest breakthroughs in quantum computing and their implications for the future of technology.',
    'body', E'# The Future of Quantum Computing\n\nQuantum computing represents one of the most significant technological leaps in human history. Unlike classical computers that process bits in binary states (0 or 1), quantum computers leverage quantum mechanical phenomena to perform calculations using quantum bits or qubits.\n\n## Recent Breakthroughs\n\nResearchers have recently achieved quantum supremacy, demonstrating that a quantum computer can solve problems that would be practically impossible for classical computers.\n\n## Practical Applications\n\n- Cryptography and security\n- Drug discovery\n- Climate modeling\n- Financial modeling\n\n## Challenges Ahead\n\nDespite these advances, significant challenges remain in scaling quantum computers and maintaining qubit coherence.',
    'references', array[
      'Nature 567, 209-212 (2019)',
      'Science 369, 1084-1089 (2020)'
    ]
  ),
  (select id from authors where name = 'Dr. Sarah Smith'),
  (select id from categories where slug = 'physics'),
  'published',
  now()
),
(
  'Understanding CRISPR Technology',
  'understanding-crispr-technology',
  jsonb_build_object(
    'excerpt', 'A deep dive into how CRISPR gene editing is revolutionizing medicine and biotechnology.',
    'body', E'# Understanding CRISPR Technology\n\nCRISPR-Cas9 has emerged as one of the most powerful tools in genetic engineering. This revolutionary technology allows scientists to edit DNA with unprecedented precision.\n\n## How CRISPR Works\n\nThe system consists of two main components:\n- Guide RNA\n- Cas9 enzyme\n\n## Medical Applications\n\n- Treating genetic disorders\n- Cancer therapy\n- Developing new drugs\n\n## Ethical Considerations\n\nWith great power comes great responsibility. The scientific community continues to debate the ethical implications of gene editing.',
    'references', array[
      'Cell 164, 29-44 (2016)',
      'Nature Biotechnology 32, 347-355 (2014)'
    ]
  ),
  (select id from authors where name = 'Prof. John Doe'),
  (select id from categories where slug = 'biology'),
  'published',
  now()
);

-- Link posts with tags
insert into posts_tags (post_id, tag_id)
select 
  p.id as post_id,
  t.id as tag_id
from posts p
cross join tags t
where 
  (p.slug = 'future-of-quantum-computing' and t.name in ('quantum', 'technology', 'physics'))
  or
  (p.slug = 'understanding-crispr-technology' and t.name in ('genetics', 'medicine'));
