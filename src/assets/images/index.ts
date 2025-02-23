// Article Images
import quantumComputing from './articles/quantum-computing.webp';
import crisprTechnology from './articles/crispr-technology.webp';
import blackHoles from './articles/black-holes.webp';

export const articleImages = {
  quantumComputing,
  crisprTechnology,
  blackHoles,
} as const;

export type ArticleImageKey = keyof typeof articleImages;
