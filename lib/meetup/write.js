const fs = require('fs');
const path = require('path');

module.exports = (output) => (data) => {
  const outputPath = path.resolve(__dirname, '../../dist');
  if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);
  fs.writeFileSync(
    path.resolve(outputPath, output),
    JSON.stringify(data)
  );
}
