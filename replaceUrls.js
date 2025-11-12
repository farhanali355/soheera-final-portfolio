const fs = require('fs');
const path = require('path');

// CDN base URL
const CDN_BASE = "https://farhanali355.github.io/soheera-final-portfolio/cdn-media/";

// Folder with HTML files
const FOLDER = ".";

// Recursively process all files
function processFolder(folder) {
  const files = fs.readdirSync(folder);

  files.forEach(file => {
    const fullPath = path.join(folder, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      processFolder(fullPath); // recursive
    } else if (file.endsWith(".html")) {
      let content = fs.readFileSync(fullPath, 'utf-8');

      // Replace img src
      content = content.replace(/<img\s+[^>]*src=["']([^"']+)["']/g, (match, p1) => {
        const filename = p1.split('/').pop(); // get filename only
        return match.replace(p1, CDN_BASE + filename);
      });

      // Replace video src
      content = content.replace(/<video\s+[^>]*src=["']([^"']+)["']/g, (match, p1) => {
        const filename = p1.split('/').pop(); // get filename only
        return match.replace(p1, CDN_BASE + filename);
      });

      // Replace source src inside video/audio tags
      content = content.replace(/<source\s+[^>]*src=["']([^"']+)["']/g, (match, p1) => {
        const filename = p1.split('/').pop();
        return match.replace(p1, CDN_BASE + filename);
      });

      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log("Updated:", fullPath);
    }
  });
}

processFolder(FOLDER);
