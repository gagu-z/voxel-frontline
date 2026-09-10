const fs = require('fs');
const s = fs.readFileSync(
  'C:/Users/ronal/.cursor/projects/d-voxelfrontline-voxel-frontline/agent-tools/3264cd2f-b855-4d17-949d-3b4e7f684bf7.txt',
  'utf8'
);

function findFn(name) {
  const re = new RegExp('function ' + name + '\\(');
  const m = s.search(re);
  console.log(name, 'at', m);
  return m;
}

const vr = findFn('vr');
const Er = findFn('Er');
const kr = findFn('kr');
const wr = findFn('wr');
const Bo = findFn('Bo');

// dump vr until Bo (Bo follows the last map builder)
const out = 'D:/voxelfrontline/voxel-frontline/tmp/doodle-vr.js';
fs.writeFileSync(out, s.slice(vr, Bo));
console.log('vr length', Bo - vr);

// also dump a pretty-ish version with some newlines after ; and }
const pretty = s
  .slice(vr, Bo)
  .replace(/;/g, ';\n')
  .replace(/\{/g, '{\n')
  .replace(/\}/g, '\n}\n');
fs.writeFileSync('D:/voxelfrontline/voxel-frontline/tmp/doodle-vr-pretty.js', pretty);
console.log('pretty lines', pretty.split('\n').length);
