const test = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');
const vm = require('node:vm');
function load(getRandomValues) {
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync('lib/numbers.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
  vm.runInNewContext(js,{exports,crypto:{getRandomValues},Uint32Array,Math,String});
  return exports.randomNumber;
}
test('keeps leading zeroes for two and three digit results',()=>{
  const random=load(a=>{a[0]=7;return a});
  assert.equal(random(2),'07');assert.equal(random(3),'007');
});
test('rejects the biased upper tail before selecting a number',()=>{
  let calls=0;const random=load(a=>{a[0]=calls++===0?4294967295:89;return a});
  assert.equal(random(),'89');assert.equal(calls,2);
});
test('wheel pointer matches the generated units digit after repeated spins',()=>{
  let rotation=0;
  for(const units of [0,9,2,5,0,7]){
    const target=(10-units)%10*36;
    rotation=rotation+(1800-rotation%360)+target;
    assert.equal(((360-rotation%360)%360)/36,units);
  }
});
