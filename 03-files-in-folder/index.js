const fs = require('fs/promises');
const path = require('path');

async function printFiles() {
  const dirPath = path.join(__dirname, 'secret-folder/');

  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    for (const file of files)
      if (file.isFile()) {
        const filePath = path.join(dirPath, file.name);
        const stats = await fs.stat(filePath);

        console.log(
          `${path.parse(filePath).name} - ${path.extname(file.name).slice(1)} - ${stats.size} bytes`
        );
      }
  } catch (err) {
    console.error(err);
  }
}

printFiles();