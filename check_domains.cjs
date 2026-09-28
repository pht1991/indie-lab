const https = require('https');

const domains = [
  // pht 个人品牌系
  'phtlabs.com','phtlab.com','phtmedia.com','phtforge.com','phtpost.com','phtbyte.com','phtstudio.com',
  // 通用科技/媒体系（中性、不锁游戏）
  'byteforge.com','coreforge.com','lumenlabs.com','nimblelabs.com','nexuslab.com','vertexmedia.com',
  'atlaspost.com','quarkpost.com','zestlabs.com','signalpost.com','quillpost.com','pixelpost.com',
  'bitpost.com','stackpost.com','makerpost.com','sharpbyte.com','labbyte.com','codeharbor.com',
  'northlabs.com','brightlab.com','nimbuslab.com','indieforge.com','codelab.com','postforge.com',
  'saltpost.com','foxpost.com','oakpost.com','emberlabs.com'
];

function check(d){
  return new Promise((res)=>{
    const url = `https://rdap.verisign.com/com/v1/domain/${d}`;
    const req = https.get(url, {timeout:8000}, (r)=>{
      r.resume();
      if(r.statusCode===200) return res({d, s:'registered'});
      if(r.statusCode===404) return res({d, s:'available'});
      if(r.statusCode>=300 && r.statusCode<400 && r.headers.location){
        return https.get(r.headers.location, (r2)=>{ r2.resume();
          res({d, s: r2.statusCode===404?'available':'registered'});
        }).on('error',()=>res({d, s:'err'}));
      }
      return res({d, s:'?code'+r.statusCode});
    });
    req.on('timeout',()=>{req.destroy();res({d,s:'timeout'});});
    req.on('error',()=>res({d,s:'err'}));
  });
}

(async()=>{
  const avail=[]; const reg=[];
  for(const d of domains){
    const r = await check(d);
    if(r.s==='available'){ avail.push(d); console.log('  AVAILABLE  '+d); }
    else if(r.s==='registered'){ reg.push(d); console.log('  taken      '+d); }
    else console.log('  '+r.s.padEnd(10)+' '+d);
    await new Promise(x=>setTimeout(x,250));
  }
  console.log('\n=== AVAILABLE ('+avail.length+') ===');
  console.log(avail.join('\n'));
})();
