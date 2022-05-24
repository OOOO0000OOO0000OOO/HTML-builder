const fs = require('fs/promises');
const path = require('path');

async function clearDest(dest) {
  try {
    await fs.rm(dest, { recursive: true, force: true });
    await fs.mkdir(dest, { recursive: true });
  } catch (err) {
    console.error('Function clearDest:', err);
  }
}

async function copyDir(src, dest) {
  try {
    await clearDest(dest);
    const files = await fs.readdir(src, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        fs.copyFile(path.join(src, file.name), path.join(dest, file.name));
      }
    }
    return '\x1b[1m\x1b[32mSource directory has been successfully copied.\x1b[0m';
  } catch (err) {
    return '\x1b[31mUnexpected error. Ensure the \'files\' directory is present and not empty.\x1b[0m';
  }
}

copyDir(
  path.join(__dirname, 'files/'),
  path.join(__dirname, 'files-copy/')
).then((res) => console.log(res));


