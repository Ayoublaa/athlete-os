const test = require('node:test');
const assert = require('node:assert/strict');
const {pace,volume,progression,partitionDuplicates}=require('../core.js');

test('pace is minutes per kilometre and rejects missing distance',()=>{
  assert.equal(pace(5,30),6);
  assert.equal(pace(3.2,24),7.5);
  assert.equal(pace(0,24),null);
});
test('volume sums completed weighted sets only',()=>{
  assert.equal(volume([{done:true,weight:40,reps:10},{done:false,weight:50,reps:8},{done:true,weight:20,reps:12}]),640);
});
test('progression stays conservative unless all progression conditions are met',()=>{
  const previous={sets:[{done:true,weight:40,reps:10},{done:true,weight:40,reps:9}]};
  const current={sets:[{done:true,weight:40,reps:11},{done:true,weight:40,reps:10}]};
  assert.equal(progression(current,previous).status,'up');
  assert.equal(progression(current,previous,{allTop:true,techniqueOk:true,rirOk:true}).status,'consider');
  assert.equal(progression(current,previous,{allTop:true,pain:true}).status,'hold');
});
test('progression explains missing comparison data',()=>{
  assert.equal(progression(null,null).status,'insufficient');
  assert.equal(progression({sets:[]},null).status,'baseline');
});
test('restore import separates duplicate IDs and deduplicates the incoming batch',()=>{
  const result=partitionDuplicates([{id:'a'},{id:'b'},{id:'b'}],[{id:'a'}]);
  assert.deepEqual(result.unique,[{id:'b'}]);
  assert.deepEqual(result.duplicates,[{id:'a'},{id:'b'}]);
});

