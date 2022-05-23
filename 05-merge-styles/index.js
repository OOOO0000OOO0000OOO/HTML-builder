const fs = require('fs');
const path = require('path');

async function createBundle(styles, bundle) {
  try {
    const files = await fs.promises.readdir(styles, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(styles, file.name);
        const readStream = fs.createReadStream(filePath, 'utf-8');
        readStream.on('data', data => bundle.write(data));
      }
    }
    return 'The CSS bundle has been successfully created.';
  } catch (err) {
    return 'Unexpected error. Ensure the \'styles\' directory is present and not empty.';
  }
}

createBundle(
  path.join(__dirname, 'styles'),
  fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))
).then((res) => console.log(res));