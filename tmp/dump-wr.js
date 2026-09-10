const fs = require('fs');
const s = fs.readFileSync(
  'C:/Users/ronal/.cursor/projects/d-voxelfrontline-voxel-frontline/agent-tools/3264cd2f-b855-4d17-949d-3b4e7f684bf7.txt',
  'utf8'
);
const wr = s.indexOf('function wr(');
const vr = s.indexOf('function vr(');
const chunk = s.slice(wr, vr);
const pretty = chunk.replace(/;/g, ';\n').replace(/\{/g, '{\n').replace(/\}/g, '\n}\n');
fs.writeFileSync('D:/voxelfrontline/voxel-frontline/tmp/doodle-wr-pretty.js', pretty);
console.log('lines', pretty.split('\n').length);
