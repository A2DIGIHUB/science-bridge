import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    filename: 'quantum-computing.webp'
  },
  {
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69',
    filename: 'crispr-technology.webp'
  },
  {
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
    filename: 'black-holes.webp'
  }
];

const outputDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'articles');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Download images
images.forEach(({ url, filename }) => {
  const outputPath = path.join(outputDir, filename);
  
  // Add quality and size parameters to Unsplash URL
  const optimizedUrl = `${url}?q=80&w=800&fm=webp`;
  
  https.get(optimizedUrl, (response) => {
    const fileStream = fs.createWriteStream(outputPath);
    response.pipe(fileStream);
    
    fileStream.on('finish', () => {
      console.log(`Downloaded and optimized: ${filename}`);
      fileStream.close();
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
});
