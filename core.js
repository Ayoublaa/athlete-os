/* Shared pure calculations used by the app and Node's built-in test runner. */
(function(root){
  function pace(distanceKm,durationMin){const d=Number(distanceKm),t=Number(durationMin);return d>0&&t>0?Math.round(t/d*100)/100:null}
  function volume(sets){return (sets||[]).filter(s=>s.done).reduce((sum,s)=>sum+(Number(s.weight)||0)*(Number(s.reps)||0),0)}
  function progression(current,previous,opts={}){
    if(!current)return {status:'insufficient',message:'Complete a session to start a comparison.'};
    if(!previous)return {status:'baseline',message:'This is your baseline. Log another session to compare.'};
    const c=volume(current.sets),p=volume(previous.sets),techniqueOk=opts.techniqueOk!==false,pain=opts.pain===true,allTop=opts.allTop===true,rirOk=opts.rirOk!==false;
    if(pain)return {status:'hold',message:'You noted pain. Do not increase the load; adjust or stop as needed.'};
    if(c<p)return {status:'down',message:'Logged volume was lower. Maintain your usual plan and review recovery.'};
    if(c>p&&allTop&&techniqueOk&&rirOk)return {status:'consider',message:'All target reps reached with good technique and suitable RIR. Consider a small increase.'};
    if(c>p)return {status:'up',message:'Logged volume improved. Keep the load steady until all target reps and technique are consistent.'};
    return {status:'steady',message:'Logged volume held steady. Maintain the load and focus on controlled reps.'};
  }
  function partitionDuplicates(incoming,existing){const seen=new Set((existing||[]).map(x=>x.id));const unique=[],duplicates=[];for(const item of incoming||[]){if(seen.has(item.id))duplicates.push(item);else{unique.push(item);seen.add(item.id)}}return {unique,duplicates}}
  const api={pace,volume,progression,partitionDuplicates};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AthleteCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);

