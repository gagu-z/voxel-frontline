const fs = require('fs');
const p =
  'C:/Users/ronal/.cursor/projects/d-voxelfrontline-voxel-frontline/agent-tools/3264cd2f-b855-4d17-949d-3b4e7f684bf7.txt';
const s = fs.readFileSync(p, 'utf8');
console.log('len', s.length);

function around(needle, before, after, max) {
  before = before || 120;
  after = after || 600;
  max = max || 6;
  let i = 0;
  let n = 0;
  while ((i = s.indexOf(needle, i)) >= 0 && n < max) {
    console.log('\n==== ' + needle + ' @' + i + ' ====');
    console.log(s.slice(Math.max(0, i - before), Math.min(s.length, i + after)));
    i += needle.length;
    n++;
  }
  if (!n) console.log('\n(missing) ' + needle);
}

around('var Go=');
around('Go=[');
around('var ks=');
around('ks=[');
around('function Bo(');
around('Bo=');
around('key:"district"');
around('"district"');
around('mexico');
around('spawns');
around('buildings');
around('MAPS');
around('maps=[');
