const fs = require('fs/promises');
const path = require('path');

async function copyAssets(src, dest) {
  const stats = await fs.stat(src);
  if (stats.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    const items = await fs.readdir(src, { withFileTypes: true });
    for (const item of items) {
      copyAssets(path.join(src, item.name), path.join(dest, item.name));
    }
  } else {
    await fs.copyFile(src, dest);
  }
}

async function buildHTML() {
  const components = await fs.readdir(path.join(__dirname, 'components'));
  let template = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  for (const component of components) {
    const stats = await fs.stat(path.join(__dirname, 'components', component));
    if (stats.isFile() && path.parse(component).ext === '.html') {
      const name = path.parse(component).name;
      const data = await fs.readFile(path.join(__dirname, 'components', component), 'utf-8');
      template = template.replace(new RegExp(`{{${name}}}`, 'g'), data);
    }
  }
  fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
}

async function mergeStyles() {
  const files = await fs.readdir(path.join(__dirname, 'styles'));
  for (const file of files) {
    if (path.parse(file).ext === '.css') {
      const data = await fs.readFile(path.join(__dirname, 'styles', file), 'utf-8');
      await fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data);
    }
  }
}

async function buildPage() {
  try {
    await fs.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true });
    await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
    await copyAssets(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
    await buildHTML();
    await mergeStyles();
    return 'The document has been successfully created.';
  } catch (err) {
    return `Unexpected error!\n${err.message}`;
  }
}

buildPage().then(res => console.log(res));