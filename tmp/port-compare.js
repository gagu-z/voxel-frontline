/**
 * Compare the 12 requested battlefield guns against our engine's stat schema.
 * Battlefield uses RPM / accuracy(0-100) / verticalRecoil; we use sec-per-shot /
 * spread / scalar recoil. Conversion constants are lifted from the battlefield
 * weapons.js so the numbers land on the same felt scale.
 */
const BF = 'D:/VF_Battlefield/voxel-frontline-battle/js/';
global.window = {};
require(BF + 'weapon-catalog.js');
const C = window.VF.WEAPON_CATALOG;

const RECOIL_KICK_SCALE = 0.048;
const ACCURACY_SPREAD_MAX = 0.12;
/** Their maps run ~300m engagements; ours cap near 95m. Anchored on AKM vs AK-74. */
const RANGE_SCALE = 0.3;

const WANTED = [
  ['assault', 'ak74'],
  ['assault', 'acr'],
  ['assault', 'scarh'],
  ['carbine', 'm4a1'],
  ['carbine', 'hk419'],
  ['smg', 'mp7'],
  ['smg', 'p90'],
  ['smg', 'mp5'],
  ['lmg', 'm249'],
  ['dmr', 'mk14ebr'],
  ['sniper', 'm200'],
  ['pistol', 'usp'],
];

function adsSpreadMul(scope) {
  if (scope === 'sniper') return 0.03;
  if (scope === 'optic') return 0.31;
  return 0.6;
}

function convert(d) {
  const spread = ACCURACY_SPREAD_MAX * (1 - Math.max(0, Math.min(100, d.accuracy)) / 100);
  return {
    damage: d.damage,
    fireRate: +(60 / d.fireRate).toFixed(3),
    rpm: d.fireRate,
    magSize: d.magSize,
    spread: +spread.toFixed(4),
    adsSpread: +(spread * adsSpreadMul(d.scope)).toFixed(4),
    recoil: +(d.verticalRecoil * RECOIL_KICK_SCALE).toFixed(4),
    range: Math.round(Math.max(d.falloffEnd, d.range) * RANGE_SCALE),
    falloffStart: Math.round(d.falloffStart * RANGE_SCALE),
    falloffEnd: Math.round(d.falloffEnd * RANGE_SCALE),
    minDamageScale: +(d.minDamage / d.damage).toFixed(2),
    reloadTime: d.reloadTime,
    scope: d.scope,
    automatic: d.automatic,
  };
}

const OURS = {
  ar: { name: 'AKM (现有)', damage: 22, fireRate: 0.1, magSize: 30, spread: 0.032, adsSpread: 0.01, recoil: 0.062, range: 95, falloffStart: 35, falloffEnd: 90, minDamageScale: 0.55, reloadTime: 1.65 },
  sg: { name: '870 (现有)', damage: 14, fireRate: 0.8, magSize: 7, spread: 0.1, adsSpread: 0.06, recoil: 0.17, range: 36, falloffStart: 10, falloffEnd: 32, minDamageScale: 0.35, reloadTime: 2.15 },
  sr: { name: 'SVD (现有)', damage: 88, fireRate: 0.95, magSize: 10, spread: 0.035, adsSpread: 0.001, recoil: 0.15, range: 160, falloffStart: 55, falloffEnd: 150, minDamageScale: 0.65, reloadTime: 2.45 },
};

function row(label, s) {
  return [
    label.padEnd(14),
    String(s.damage).padStart(4),
    (s.rpm ? String(s.rpm) : '-').padStart(5),
    s.fireRate.toFixed(3).padStart(6),
    String(s.magSize).padStart(4),
    s.spread.toFixed(4).padStart(7),
    s.adsSpread.toFixed(4).padStart(7),
    s.recoil.toFixed(4).padStart(7),
    String(s.range).padStart(5),
    (s.falloffStart + '-' + s.falloffEnd).padStart(8),
    s.minDamageScale.toFixed(2).padStart(5),
    s.reloadTime.toFixed(2).padStart(6),
  ].join(' ');
}

console.log('换算系数: RPM->秒 = 60/rpm | 散布 = 0.12*(1-准确度/100) | 后坐力 = 垂直后坐力*0.048 | 射程 x' + RANGE_SCALE);
console.log('');
const head = ['枪械'.padEnd(13), '伤害'.padStart(3), ' RPM', '  秒/发', ' 弹匣', '   散布', 'ADS散布', ' 后坐力', ' 射程', '  衰减段', ' 尾伤', ' 换弹'].join(' ');
console.log(head);
console.log('-'.repeat(head.length + 6));

Object.keys(OURS).forEach(function (k) {
  const o = OURS[k];
  console.log(row(o.name, Object.assign({ rpm: Math.round(60 / o.fireRate) }, o)));
});
console.log('-'.repeat(head.length + 6));

let lastCat = '';
WANTED.forEach(function (w) {
  const cat = w[0], id = w[1];
  if (cat !== lastCat) { console.log('[' + cat + ']'); lastCat = cat; }
  const d = C[id];
  if (!d) { console.log('  !! 目录里找不到 ' + id); return; }
  console.log(row('  ' + d.name, convert(d)));
});

console.log('');
console.log('--- 我们引擎需要、但大战场目录里没有的字段 ---');
const missing = ['breakChance', 'coreFalloffStart', 'coreFalloffEnd', 'coreMinDamageScale', 'coreMaxRange', 'minDamageScale', 'adsSpread', 'spread', 'recoil'];
console.log('  ' + missing.join(', '));
console.log('  -> spread/adsSpread/recoil/minDamageScale 可由上表换算得出；');
console.log('  -> breakChance(打碎方块概率) 与 core*(PVE 核心攻击衰减) 是我们独有，必须按类别补。');
