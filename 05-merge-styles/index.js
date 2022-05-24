const fs = require('fs');
const path = require('path');

async function createBundle(styles, dist) {
  try {
    await fs.promises.stat(dist);
    const bundle = fs.createWriteStream(path.join(dist, 'bundle.css'));
    const files = await fs.promises.readdir(styles, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(styles, file.name);
        const readStream = fs.createReadStream(filePath, 'utf-8');
        readStream.on('data', data => bundle.write(data));
      }
    }
    return '\x1b[1m\x1b[32mThe CSS bundle has been successfully created.\n\x1b[0m';
  } catch (err) {
    return '\x1b[31mUnexpected error. Ensure the \'styles\' or \'project-dist\' directories are present and not empty.\x1b[0m';
  }
}

createBundle(
  path.join(__dirname, 'styles'),
  path.join(__dirname, 'project-dist')
).then((res) => console.log(res));