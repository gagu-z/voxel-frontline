/** Sanity-check the ported guns against our AKM/870/SVD anchors. */
global.window = {};
require('../js/weapon-catalog.js');
const C = window.VF.WEAPON_CATALOG;
const ORDER = window.VF.WEAPON_LOADOUT_ORDER;

const OURS = {
  ar: { nameZh: 'AKM (锚点)', category: 'assault', damage: 22, fireRate: 0.1, magSize: 30, spread: 0.032, recoil: 0.062, range: 95, reloadTime: 1.65, pellets: 1 },
  sg: { nameZh: '870 (锚点)', category: 'shotgun', damage: 14, fireRate: 0.8, magSize: 7, spread: 0.1, recoil: 0.17, range: 36, reloadTime: 2.15, pellets: 8 },
  sr: { nameZh: 'SVD (锚点)', category: 'sniper', damage: 88, fireRate: 0.95, magSize: 10, spread: 0.035, recoil: 0.15, range: 160, reloadTime: 2.45, pellets: 1 },
};

const HP = 100;
const HEADSHOT_MUL = 1.8;

function report(d) {
  const perShot = d.damage * (d.pellets || 1);
  const stk = Math.ceil(HP / perShot);
  const ttk = ((stk - 1) * d.fireRate).toFixed(2);
  const hsStk = Math.ceil(HP / (perShot * HEADSHOT_MUL));
  const dps = Math.round(perShot / d.fireRate);
  const magKills = Math.floor(d.magSize / stk);
  return [
    (d.nameZh || d.name).padEnd(15),
    String(d.category || '').padEnd(9),
    String(perShot).padStart(4),
    String(Math.round(60 / d.fireRate)).padStart(5),
    String(stk).padStart(4),
    String(hsStk).padStart(4),
    ttk.padStart(6),
    String(dps).padStart(5),
    String(d.magSize).padStart(4),
    String(magKills).padStart(5),
    String(d.range).padStart(5),
    d.reloadTime.toFixed(2).padStart(6),
    d.spread.toFixed(4).padStart(7),
    d.recoil.toFixed(3).padStart(6),
  ].join(' ');
}

const head = ['枪械'.padEnd(14), '类别'.padEnd(8), '单发', '  RPM', '几枪', '爆头', '  TTK', '  DPS', ' 弹匣', '匣内杀', ' 射程', ' 换弹', '   散布', '后坐力'].join(' ');
console.log(head);
console.log('='.repeat(head.length + 8));
['ar', 'sg', 'sr'].forEach(function (k) { console.log(report(OURS[k])); });
console.log('-'.repeat(head.length + 8));

let lastCat = '';
ORDER.forEach(function (id) {
  const d = C[id];
  if (d.category !== lastCat) { lastCat = d.category; }
  console.log(report(d));
});

console.log('');
console.log('--- 校验 ---');
const problems = [];
ORDER.forEach(function (id) {
  const d = C[id];
  if (d.spread <= 0) problems.push(id + ': 散布为 0，会变成腰射激光');
  if (d.accuracy >= 100) problems.push(id + ': 准确度到达 100 上限');
  if (d.reloadTime > 4) problems.push(id + ': 换弹 ' + d.reloadTime + 's 过长');
  if (d.damage * (d.pellets || 1) >= HP && d.category !== 'sniper') {
    problems.push(id + ': 非狙击枪却能一枪秒杀');
  }
  ['breakChance', 'coreFalloffStart', 'coreFalloffEnd', 'coreMinDamageScale', 'coreMaxRange',
   'minDamageScale', 'adsSpread', 'spread', 'recoil', 'range', 'adsFov', 'scope', 'adsSens',
   'ammoColor', 'ammoLabel', 'reserve', 'slot', 'category', 'modelStyle'].forEach(function (f) {
    if (d[f] == null) problems.push(id + ': 缺少字段 ' + f);
  });
});
console.log(problems.length ? problems.map(function (p) { return '  ! ' + p; }).join('\n') : '  全部通过');
