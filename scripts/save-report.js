const fs = require('fs');
const path = require('path');

const reportDir = path.resolve(__dirname, '..', 'reports', 'html');
const indexPath = path.join(reportDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.warn(`No report found at ${indexPath}, skipping archive.`);
  process.exit(0);
}

function timestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return [
    d.getFullYear(),
    pad(d.getMonth() + 1),
    pad(d.getDate()),
    pad(d.getHours()),
    pad(d.getMinutes()),
  ].join('');
}

const destPath = path.join(reportDir, `${timestamp()}.html`);
fs.copyFileSync(indexPath, destPath);
console.log(`Report archived: reports/html/${path.basename(destPath)}`);
