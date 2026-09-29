import{$ as e,A as t,B as n,C as r,D as i,E as a,F as o,H as s,I as c,J as l,K as u,L as d,M as f,N as p,O as m,P as h,Q as g,R as _,S as v,T as y,U as b,V as x,W as S,X as C,Y as w,_ as T,_t as E,a as D,at as O,b as k,c as A,ct as j,d as M,dt as N,et as P,f as F,ft as I,g as L,gt as R,h as z,ht as B,i as ee,it as te,j as V,k as ne,l as re,lt as ie,m as ae,mt as H,n as oe,nt as U,o as se,ot as W,p as ce,pt as le,q as ue,r as G,rt as de,s as fe,st as pe,tt as me,u as he,ut as ge,v as _e,w as ve,x as K,y as q,z as ye}from"./sun-Bt5VUp3R.js";var J=-620,be=[[0,[.16,.13,.1]],[12,[.46,.43,.36]],[100,[.3,.29,.27]],[225,[.38,.25,.17]],[340,[.19,.19,.19]],[420,[.09,.12,.15]]],xe={snow:[.86,.88,.93],tundra:[.19,.23,.12],taigaFloor:[.14,.15,.09],ice:[.55,.66,.72],water:[.05,.09,.12],asphalt:[.34,.325,.265],roadGravel:[.365,.345,.283],roadDirt:[.3,.25,.183],gravel:[.28,.26,.24],spoil:[.31,.28,.24],concrete:[.42,.41,.39]};function Se(e){return e>=288||e<=105?1:e<140?1-(e-105)/35:e>258?(e-258)/30:0}function Ce(){return{depths:be.map(([e])=>e),colors:be.flatMap(([,e])=>e)}}var we=`
  uniform float uBandDepth[${be.length}];
  uniform vec3  uBandColor[${be.length}];
  vec3 strataAt(float y) {
    float d = -y;
    vec3 c = uBandColor[0];
    for (int i = 1; i < ${be.length}; i++) {
      float t = smoothstep(uBandDepth[i] - 14.0, uBandDepth[i] + 14.0, d);
      c = mix(c, uBandColor[i], t);
    }
    return c;
  }`,Y=`
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i), hash21(i + vec2(1, 0)), f.x),
               mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * vnoise(p); p *= 2.03; a *= 0.5; }
    return v;
  }`,X=new i(new Uint8Array([0,0,0,0]),1,1,e);X.needsUpdate=!0;var Te={uLampMap:{value:X},uLampBox:{value:new R(0,0,1,1)},uLampCol:{value:new B(0,0,0)},uDoorCol:{value:new B(0,0,0)},uWinCol:{value:new B(0,0,0)},uLitFrac:{value:.56}},Ee=`
  uniform sampler2D uLampMap;
  uniform vec4 uLampBox;
  uniform vec3 uLampCol;
  uniform vec3 uDoorCol;
  uniform vec3 uWinCol;
  vec3 lampRaw(vec2 xz) {
    vec2 uv = (xz - uLampBox.xy) * uLampBox.zw;
    vec3 e = texture2D(uLampMap, uv).rgb;
    vec2 inside = step(vec2(0.0), uv) * step(uv, vec2(1.0));
    return e * e * inside.x * inside.y;
  }
  vec3 lampIrr(vec2 xz) {
    vec3 e = lampRaw(xz);
    return uLampCol * e.r + uDoorCol * e.g + uWinCol * e.b;
  }
`,De=[1,2,4,8,16],Oe=[900,2e3,4500,1e4],ke=class{constructor(e,t,n,r){this.meta=e,this.ground=t,this.W=e.width,this.H=e.height,this.cell=e.cellM,this.ox=e.originX,this.oz=e.originZ,this.cxN=Math.floor((this.W-1)/128),this.cyN=Math.floor((this.H-1)/128),this.spanX=this.cxN*128*this.cell,this.spanZ=this.cyN*128*this.cell,this.group=new p,this.chunks=[],this.pending=new Map,this.tris=0,this.built=0,this._makeTextures(n,r),this.material=this._makeMaterial();for(let e=0;e<this.cyN;e++)for(let t=0;t<this.cxN;t++){let n=new b(new v,this.material);n.position.set(this.ox+t*128*this.cell,0,this.oz+e*128*this.cell),n.scale.setScalar(.1),n.castShadow=!0,n.receiveShadow=!0,n.visible=!1,n.frustumCulled=!1,this.group.add(n),this.chunks.push({cx:t,cy:e,mesh:n,lod:-1,want:-1,centre:new B(this.ox+(t+.5)*128*this.cell,0,this.oz+(e+.5)*128*this.cell)})}}_makeTextures(e,t){let a=(e,t)=>{let n=new i(e,this.W,this.H,me,le);return n.magFilter=n.minFilter=t,n.wrapS=n.wrapT=r,n.unpackAlignment=1,n.needsUpdate=!0,n};this.splatTex=a(e,ue),this.aoTex=a(t,n)}heightAt(e,t){let n=(e-this.ox)/this.cell,r=(t-this.oz)/this.cell,i=Math.max(0,Math.min(this.W-2,Math.floor(n))),a=Math.max(0,Math.min(this.H-2,Math.floor(r))),o=Math.max(0,Math.min(1,n-i)),s=Math.max(0,Math.min(1,r-a)),c=this.ground,l=this.W,u=c[a*l+i],d=c[a*l+i+1],f=c[(a+1)*l+i],p=c[(a+1)*l+i+1];return(u+(d-u)*o+(f+(p-f)*o-(u+(d-u)*o))*s)*.1}_makeMaterial(){let{depths:e,colors:t}=Ce(),n=xe,r={uSplat:{value:this.splatTex},uAO:{value:this.aoTex},uGridOrigin:{value:new H(this.ox,this.oz)},uGridSpan:{value:new H(this.W*this.cell,this.H*this.cell)},uTexel:{value:new H(1/this.W,1/this.H)},uSnow:{value:1},uBandDepth:{value:e},uBandColor:{value:be.map(([,e])=>new B(...e))}};this.uniforms=r;let i=new u({roughness:.95,metalness:0});return i.onBeforeCompile=e=>{Object.assign(e.uniforms,r,Te),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
          varying vec3 vWPos; varying vec3 vWNrm;`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
          vWNrm = normalize(mat3(modelMatrix) * objectNormal);`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
          vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
          varying vec3 vWPos; varying vec3 vWNrm;
          float gRough; float gMetal;
          uniform sampler2D uSplat;
          uniform sampler2D uAO;
          uniform vec2 uGridOrigin, uGridSpan, uTexel;
          uniform float uSnow;
          ${Ee}
          ${we}
          ${Y}

          const vec3 C_SNOW = vec3(${n.snow});
          const vec3 C_TUNDRA = vec3(${n.tundra});
          const vec3 C_LITTER = vec3(${n.taigaFloor});
          const vec3 C_ICE = vec3(${n.ice});
          const vec3 C_WATER = vec3(${n.water});
          const vec3 C_ASPHALT = vec3(${n.asphalt});
          const vec3 C_GRAVEL = vec3(${n.gravel});
          const vec3 C_SPOIL = vec3(${n.spoil});
          const vec3 C_CONCRETE = vec3(${n.concrete});
        `).replace(`#include <map_fragment>`,`
          vec2 guv = (vWPos.xz - uGridOrigin) / uGridSpan;
          // Jitter the lookup by a little noise before a NEAREST fetch. The
          // classes are hard-edged 2 m cells; without this a lake shore is a
          // staircase, with it the boundary breaks up the way a real one does.
          vec2 jn = vec2(fbm(vWPos.xz * 0.7), fbm(vWPos.xz * 0.7 + 31.0)) - 0.5;
          vec2 juv = guv + jn * uTexel * 2.6;
          float cls = floor(texture2D(uSplat, juv).r * 255.0 + 0.5);
          // Engineered edges stay engineered: where either lookup lands on
          // road, runway or pad, re-sample with a quarter of the wobble —
          // enough to melt the 2 m staircase on a diagonal kerb, nowhere near
          // the ±5 m that tore the road and let grey chew at both sides. The
          // full wobble is for lake shores and forest edges.
          float clsH = floor(texture2D(uSplat, guv + jn * uTexel * 0.7).r * 255.0 + 0.5);
          bool hardH = clsH == 2.0 || clsH == 7.0 || clsH == 8.0;
          bool hardJ = cls == 2.0 || cls == 7.0 || cls == 8.0;
          if (hardH || hardJ) cls = clsH;
          float flat_ = clamp(vWNrm.y, 0.0, 1.0);

          float grain = fbm(vWPos.xz * 0.22);
          float fine  = fbm(vWPos.xz * 3.1);

          vec3 albedo; float rough = 0.95; float metal = 0.0;
          if (cls < 0.5) {                    // open ground
            albedo = mix(C_TUNDRA * (0.72 + 0.55 * grain), C_SNOW, 0.0);
          } else if (cls < 1.5) {             // water / ice
            albedo = mix(C_WATER, C_ICE * (0.85 + 0.3 * fine), uSnow);
            rough = mix(0.06, 0.34, uSnow);
          } else if (cls < 2.5) {             // road underlay
            albedo = C_ASPHALT * (0.8 + 0.5 * fine);
            rough = 0.72;
          } else if (cls < 3.5) {             // taiga
            // Beyond ~3.5 km the stems are culled and this *is* the forest, so
            // it has to be a canopy, not a forest floor. Winter larch is bare —
            // grey-ochre twigs over snow, not the dark green a northern forest
            // is usually painted — and the summer value is the ten weeks it is
            // actually green.
            vec3 canopy = mix(vec3(0.10, 0.14, 0.07), vec3(0.29, 0.25, 0.18), uSnow);
            float clump = fbm(vWPos.xz * 0.09) * 0.6 + fbm(vWPos.xz * 0.45) * 0.4;
            albedo = mix(C_LITTER, canopy, 0.80) * (0.55 + 0.95 * clump);
          } else if (cls < 4.5) {             // the pit
            // horizontal bedding, plus vertical streaking down the benches
            float bed = fbm(vec2(vWPos.x * 0.05 + vWPos.z * 0.05, vWPos.y * 0.9));
            albedo = strataAt(vWPos.y) * (0.74 + 0.5 * bed);
            rough = 0.98;
          } else if (cls < 5.5) {             // spoil / tailings
            albedo = C_SPOIL * (0.65 + 0.8 * grain);
          } else if (cls < 6.5) {             // gravel yard
            albedo = C_GRAVEL * (0.75 + 0.5 * fine);
          } else if (cls < 7.5) {             // runway tarmac
            albedo = C_ASPHALT * 1.25 * (0.85 + 0.3 * fine);
            rough = 0.66;
          } else if (cls < 8.5) {             // building pad
            albedo = C_CONCRETE * (0.85 + 0.3 * fine);
            rough = 0.85;
          } else {                            // courtyard: packed dirt patched
            // with concrete slabs — the satellite-checked floor of the town.
            // Soft, broad transitions: the first pass used a hard step on the
            // same noise and the quarters read as camouflage from the air.
            albedo = mix(vec3(0.30, 0.27, 0.23), C_CONCRETE,
                         smoothstep(0.50, 0.78, grain)) * (0.88 + 0.24 * fine);
            rough = 0.9;
          }

          // Snow: falls everywhere, holds only where the ground is flat enough.
          // The pit walls run 40-50 deg, which is why they stay bare rock all
          // winter while the benches go white — the single detail that makes
          // the hole read as a hole rather than as a grey disc.
          float stick = smoothstep(0.62, 0.90, flat_);
          float drift = 0.80 + 0.35 * fbm(vWPos.xz * 0.6);
          float snow = uSnow * stick * clamp(drift, 0.0, 1.0);
          if (cls > 0.5 && cls < 1.5) snow = 0.0;     // ice is its own surface
          if (cls > 1.5 && cls < 2.5) snow *= 0.25;   // ploughed
          if (cls > 6.5 && cls < 7.5) snow *= 0.30;   // the runway is kept clear
          // A canopy holds some snow and hides the rest. Letting the forest go
          // as white as open ground is what turned the whole taiga into a
          // snowfield with dark specks on it.
          if (cls > 2.5 && cls < 3.5) snow *= 0.42;
          albedo = mix(albedo, C_SNOW * (0.92 + 0.14 * fine), snow);
          rough = mix(rough, 0.80, snow);

          diffuseColor.rgb *= albedo;
          gRough = rough; gMetal = metal;
        `).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = gRough;`).replace(`#include <metalnessmap_fragment>`,`float metalnessFactor = gMetal;`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
          reflectedLight.directDiffuse += BRDF_Lambert(diffuseColor.rgb) * lampIrr(vWPos.xz);`).replace(`#include <aomap_fragment>`,`
          // baked sky-view factor: static, sun-independent, and the reason a
          // 433 m funnel has a floor instead of a flat grey disc
          float svf = texture2D(uAO, guv).r;
          float occ = pow(clamp(svf, 0.0, 1.0), 1.7);
          reflectedLight.indirectDiffuse *= occ;
          reflectedLight.indirectSpecular *= occ;
        `)},i.customProgramCacheKey=()=>`mirny-terrain-lamps`,i}_window(e,t,n,r){let i=n+3,a=r+3,o=new Int16Array(i*a),s=this.ground,c=this.W,l=this.H,u=e*128,d=t*128;for(let e=-1;e<=r+1;e++){let t=Math.max(0,Math.min(l-1,d+e))*c,r=(e+1)*i;for(let e=-1;e<=n+1;e++)o[r+e+1]=s[t+Math.max(0,Math.min(c-1,u+e))]}return{out:o,pw:i}}startWorkers(e=6){this.workers=Array.from({length:e},()=>{let e=new Worker(new URL(`/mirny/assets/terrainWorker-XKI1Yepu.js`,``+import.meta.url),{type:`module`});return e.onmessage=t=>this._receive(e,t.data),e.onerror=t=>this._workerFailed(e,t.error||Error(t.message)),e.onmessageerror=()=>this._workerFailed(e,Error(`terrain worker message error`)),e}),this.idle=[...this.workers],this.queue=[]}_settle(){if(this._done&&!this.queue.length&&!this.pending.size){let e=this._done;this._done=null,e.resolve()}}_workerFailed(e,t){let n=e._terrainKey;n&&this.pending.delete(n),this.idle=this.idle.filter(t=>t!==e),this.workers=this.workers.filter(t=>t!==e),e.terminate();let r=t instanceof Error?t:Error(String(t));if(this.error=r,this.queue.length=0,this._done){let e=this._done;this._done=null,e.reject(r)}else console.error(`terrain worker failed`,r)}_receive(e,t){e._terrainKey=null;let n=`${t.cx0},${t.cy0}`,r=this.pending.get(n);if(this.pending.delete(n),r){let e=new v;e.setAttribute(`position`,new K(new Int16Array(t.pos),3)),e.setAttribute(`normal`,new K(new Int8Array(t.nor),3,!0)),e.setIndex(new K(new Uint16Array(t.idx),1)),e.computeBoundingSphere(),this.tris+=e.index.count/3,r.mesh.geometry&&(this.tris-=(r.mesh.geometry.index?.count??0)/3,r.mesh.geometry.dispose()),r.mesh.geometry=e,r.mesh.visible=!0,r.mesh.frustumCulled=!0,r.lod<0&&this.built++,r.lod=De.indexOf(t.step)}this.idle.push(e),this._pump(),this._settle()}_pump(){for(;this.idle.length&&this.queue.length;){let e=this.queue.shift(),t=`${e.cx},${e.cy}`;if(this.pending.has(t)||e.want===e.lod)continue;let{out:n,pw:r}=this._window(e.cx,e.cy,128,128);this.pending.set(t,e);let i=this.idle.pop();i._terrainKey=t,i.postMessage({id:t,hin:n.buffer,pw:r,cx0:e.cx,cy0:e.cy,w:128,h:128,step:De[e.want],cellM:this.cell},[n.buffer])}}update(e,t=24){let n=[];for(let t of this.chunks){let r=e.x-t.centre.x,i=e.z-t.centre.z,a=e.y,o=Math.sqrt(r*r+i*i+a*a*.35),s=Oe.length;for(let e=0;e<Oe.length;e++)if(o<Oe[e]){s=e;break}s!==t.lod&&s!==t.want?(t.want=s,n.push([o,t])):s!==t.lod&&t.want===s&&!this.pending.has(`${t.cx},${t.cy}`)&&!this.queue.includes(t)&&n.push([o,t])}if(n.length){n.sort((e,t)=>e[0]-t[0]);for(let[,e]of n.slice(0,t))this.queue.includes(e)||this.queue.push(e);this._pump()}}primeFromPit(e){if(this.error)return Promise.reject(this.error);if(!this.workers?.length)return Promise.reject(Error(`terrain worker pool is unavailable`));let t=this.ox+e[0]*this.cell,n=this.oz+e[1]*this.cell,r=this.chunks.map(e=>{let r=e.centre.x-t,i=e.centre.z-n,a=Math.hypot(r,i),o=Oe.length;for(let e=0;e<Oe.length;e++)if(a<Oe[e]){o=e;break}return e.want=o,[a,e]});r.sort((e,t)=>e[0]-t[0]),this.queue=r.map(([,e])=>e);let i=new Promise((e,t)=>{this._done={resolve:e,reject:t}});return this._pump(),i}setSnow(e){this.uniforms.uSnow.value=e}},Ae={id:`notched-slab-9`,name:`нотчатая девятиэтажная секционная серия (Мирный)`,runM:15.17,notchM:11.45,halfNotchM:5.8,notchDepthM:1.28,pitchM:26.62,depthMin:12,depthMax:13,bayM:15.17/4},je=.35,Me=.55,Ne=2.4,Pe=2,Fe=2.5,Ie=2,Le=.94,Re=1.35,ze=1.25,Be=.18,Z={wingHalf:1.45,wingOut:3.05,wingRadius:1.3,gap:1.35,canopyHalf:5.2,canopyOut:3.35,canopyT:.42,headroom:2.62,colHalf:.45};function Ve(e,t,n,r){let{emit:i,baseZ:a,floorZ:o,seed:s,levels:c,kb:l,hash2:u}=e,d=i.KIND,{cx:f,cz:p,ux:m,uz:h,nx:g,nz:_}=n,v=[d.CONC,u(s*31,r*5.1),c,l],y=[d.BALC,u(s*17,991),c,l],b=[d.RAIL,u(s*13,r*3.3),c,l],x=Math.max(.5,o-a+.06),S=a+x,C=(e,t,n)=>[f+m*e+g*t,n,p+h*e+_*t],w=S+Z.headroom,T=-1*(Z.gap+Z.wingHalf),E=[];{let e=Z.wingRadius,t=Z.wingOut,n=Z.wingHalf;E.push([T-n,0]),E.push([T-n,t-e]);for(let r=0;r<=6;r++){let i=Math.PI/2*(r/6);E.push([T-n+e-e*Math.cos(i),t-e+e*Math.sin(i)])}E.push([T+n-e,t]);for(let r=0;r<=6;r++){let i=Math.PI/2*(r/6);E.push([T+n-e+e*Math.sin(i),t-e+e*Math.cos(i)])}E.push([T+n,0])}for(let e=0;e<E.length-1;e++){let[t,n]=E[e],[r,o]=E[e+1],s=r-t,c=o-n,l=Math.hypot(s,c);if(l<1e-4)continue;let u=-c/l,d=s/l;i.quad(C(t,n,a-.2),C(r,o,a-.2),C(r,o,w),C(t,n,w),[m*u+g*d,0,h*u+_*d],[[0,0],[l,0],[l,w-a],[0,w-a]],v)}for(let e=1;e<E.length-1;e++)i.tri(C(E[0][0],E[0][1],w),C(E[e][0],E[e][1],w),C(E[e+1][0],E[e+1][1],w),[0,1,0],[[0,0],[1,0],[1,1]],v);let D=1*(Z.gap+Z.colHalf);i.boxSides(f+m*D+g*(Z.wingOut-Z.colHalf),p+h*D+_*(Z.wingOut-Z.colHalf),m,h,Z.colHalf,Z.colHalf,a-.2,w,v);let O=w,k=w+Z.canopyT,A=f+g*(Z.canopyOut/2),j=p+_*(Z.canopyOut/2);i.boxSides(A,j,m,h,Z.canopyHalf,Z.canopyOut/2,O,k,y),i.boxTop(A,j,m,h,Z.canopyHalf,Z.canopyOut/2,k,y),i.quad(C(-Z.canopyHalf,0,O),C(Z.canopyHalf,0,O),C(Z.canopyHalf,Z.canopyOut,O),C(-Z.canopyHalf,Z.canopyOut,O),[0,-1,0],[[0,0],[Z.canopyHalf*2,0],[Z.canopyHalf*2,Z.canopyOut],[0,Z.canopyOut]],v),i.quad(C(-Z.gap,0,S),C(Z.gap,0,S),C(Z.gap,Z.wingOut,S),C(-Z.gap,Z.wingOut,S),[0,1,0],[[0,0],[Z.gap*2,0],[Z.gap*2,Z.wingOut],[0,Z.wingOut]],v);let M=.72,N=S+2.12;i.quad(C(-.72,.04,S),C(M,.04,S),C(M,.04,N),C(-.72,.04,N),[g,0,_],[[0,0],[M*2,0],[M*2,N-S],[0,N-S]],[d.DOOR,u(s*7,r*2.9),c,l]);let P=Math.max(2.3,x*2.7),F=Z.wingOut,I=F+P,L=Math.max(6,Math.min(15,Math.round(x/.145)));for(let e=0;e<L;e++){let t=S-x*e/L,n=F+(I-F)*(e/L),r=F+(I-F)*((e+1)/L);i.quad(C(-Z.gap,n,t),C(Z.gap,n,t),C(Z.gap,r,t),C(-Z.gap,r,t),[0,1,0],[[0,0],[Z.gap*2,0],[Z.gap*2,.35],[0,.35]],v),i.quad(C(-Z.gap,r,t),C(Z.gap,r,t),C(Z.gap,r,t-x/L),C(-Z.gap,r,t-x/L),[g,0,_],[[0,0],[Z.gap*2,0],[Z.gap*2,.15],[0,.15]],v)}for(let e of[-1,1]){i.tri(C(e*Z.gap,F,S),C(e*Z.gap,I,a),C(e*Z.gap,F,a-.25),[m*e,0,h*e],[[0,x],[P,0],[0,-.25]],v);let t=.98,n=.06;for(let r of[1,-1])i.quad(C(e*Z.gap,F,S+t),C(e*Z.gap,I,a+t),C(e*Z.gap,I,a+t-n),C(e*Z.gap,F,S+t-n),[m*e*r,0,h*e*r],[[0,0],[P,0],[P,n],[0,n]],b);i.boxSides(f+m*e*Z.gap+g*I,p+h*e*Z.gap+_*I,m,h,.05,.05,a,a+t,b)}}function He(e){if(!Array.isArray(e)||e.length<8)return null;let t=0,n=0,r=-1;for(let i=0;i<e.length;i++){let a=(i+1)%e.length,o=e[a][0]-e[i][0],s=e[a][1]-e[i][1],c=o*o+s*s;c>r&&(r=c,t=o,n=s)}let i=Math.hypot(t,n);if(i<20)return null;let a=t/i,o=n/i,s=-o,c=a,l=([e,t])=>[e*a+t*o,e*s+t*c],u=(e,t)=>[e*a+t*s,e*o+t*c],d=e.map(e=>{let[t,n]=l(e);return{u:t,v:n}}),f=1/0,p=-1/0,m=1/0,h=-1/0;for(let e of d)e.u<f&&(f=e.u),e.u>p&&(p=e.u),e.v<m&&(m=e.v),e.v>h&&(h=e.v);let g=p-f,_=h-m;if(_<Ae.depthMin||_>Ae.depthMax)return null;let v=[];for(let e=0;e<d.length;e++){let t=d[e],n=d[(e+1)%d.length],r=n.u-t.u,i=n.v-t.v,a=Math.hypot(r,i);a<1e-6||v.push({a:t,b:n,l:a,along:Math.abs(r)/a>Le,across:Math.abs(i)/a>Le})}let y=null;for(let e of[1,-1]){let t=e>0?h:m,n=v.filter(e=>e.along&&Math.abs(e.a.v-t)<je&&Math.abs(e.b.v-t)<je);(!y||n.length>y.flat.length)&&(y={s:e,outerV:t,flat:n})}if(!y||y.flat.length<2)return null;let b=y.outerV,x=y.s>0?m:h,S=s*y.s,C=c*y.s,w=v.filter(e=>e.along&&Math.abs(e.a.v-x)<je&&Math.abs(e.b.v-x)<je);if(!w.length||w.reduce((e,t)=>e+t.l,0)<g-1)return null;let T=-y.s,E=v.filter(e=>{if(!e.along)return!1;let t=((e.a.v+e.b.v)/2-b)*T;return t>-.35&&t<2.75}).map(e=>({u0:Math.min(e.a.u,e.b.u),u1:Math.max(e.a.u,e.b.u),v:(e.a.v+e.b.v)/2})).sort((e,t)=>e.u0-t.u0).map(e=>({...e,len:e.u1-e.u0,outer:Math.abs(e.v-b)<je}));if(E.length<3||Math.abs(E[0].u0-f)>.25||Math.abs(E[E.length-1].u1-p)>.25)return null;for(let e=1;e<E.length;e++)if(Math.abs(E[e].u0-E[e-1].u1)>.25)return null;if(E.length%2==0)return null;for(let e=0;e<E.length;e++)if(E[e].outer!==(e%2==1))return null;let D=E.filter(e=>e.outer),O=D.length;if(O<1)return null;for(let e of D)if(Math.abs(e.len-Ae.runM)>Pe)return null;for(let e=0;e<E.length;e+=2){let t=E[e],n=e===0||e===E.length-1,r=n?Ae.halfNotchM:Ae.notchM,i=n?Ie:Fe;if(Math.abs(t.len-r)>i)return null;let a=Math.abs(t.v-b);if(a<Me||a>Ne)return null}let k=O*Ae.pitchM-Ae.notchM+2*Ae.halfNotchM;if(Math.abs(g-k)>3)return null;for(let e of D)e.mid=(e.u0+e.u1)/2;return{ux:a,uz:o,px:s,pz:c,outX:S,outZ:C,toWorld:u,uMin:f,uMax:p,len:g,depth:_,notchedV:b,straightV:x,faceSign:y.s,spans:E,runs:D,sections:O,bay:Ae.bayM,notchDepth:Math.abs(E[0].v-b)}}function Ue(e,t=Ae.bayM){return Math.max(1,Math.floor(e/t+.5))}function We(e){let{rec:t,outer:n,outerSign:r,entranceSites:i,emit:a}=e,o=He(n);if(!o)return null;let s=[];for(let e=0;e<o.spans.length-1;e++)s.push(o.spans[e].u1);let c=e=>e[0]*o.ux+e[1]*o.uz,l=e=>e[0]*o.px+e[1]*o.pz,u=e=>o.runs.some(t=>Math.abs(e-t.mid)<o.bay*.98),d=[];{let e=0;for(let t of o.spans){let n=Ue(t.len,o.bay);for(let r=0;r<n;r++){let i=t.u0+t.len*(r+.5)/n;if(e++,!u(i)&&r%2!=1)for(let n of[1,-1])d.push({u:i,v:n>0?t.v:o.straightV,facing:n,hk:e*2+(n>0?0:1)})}}}let f=0,p=0;for(let n=0;n<t.rings.length;n++){let i=t.rings[n];if(i.length<3)continue;let u=n===0?r:e.ringSign(n);for(let t=0;t<i.length;t++){let r=i[t],m=i[(t+1)%i.length],h=m[0]-r[0],g=m[1]-r[1],_=Math.hypot(h,g);if(_<.05)continue;let v=n===0&&Math.abs(h*o.px+g*o.pz)/_>Le,y=n===0&&!v&&Math.abs(l(r)-o.straightV)<je&&Math.abs(l(m)-o.straightV)<je;if(v||n!==0){a.wall(r,m,u,v,!0),f++;continue}let b=c(r),x=c(m),S=Math.min(b,x),C=Math.max(b,x),w=(l(r)+l(m))/2,T=e=>{let t=(e-b)/(x-b);return[r[0]+h*t,r[1]+g*t]},E=g/_*u,D=-h/_*u,O=d.filter(e=>Math.abs(e.v-w)<je&&e.u-Re>S+.35&&e.u+Re<C-.35).map(e=>({...e,u0:e.u-Re,u1:e.u+Re})),k=y?s.filter(e=>e-S>.6&&C-e>.6&&!O.some(t=>e>t.u0-.2&&e<t.u1+.2)):[],A=x>b,j=[...O.map(e=>({u:A?e.u0:e.u1,exit:A?e.u1:e.u0,hole:e})),...k.map(e=>({u:e,exit:e,hole:null}))].sort((e,t)=>A?e.u-t.u:t.u-e.u),M=b;for(let t of j){if(!t.hole){a.wall(T(M),T(t.u),u,!1,!0),f++,M=t.u;continue}let n=t.hole;a.wall(T(M),T(t.u),u,!1,!0),f++;let r=e=>[e[0]-E*ze,e[1]-D*ze];a.wall(r(T(t.u)),r(T(t.exit)),u,!1,!0),f++;let[i,o]=T(n.u);p+=a.loggia({cx:i,cz:o,ux:h/_*(x>b?1:-1),uz:g/_*(x>b?1:-1),nx:E,nz:D,halfW:Re,depth:ze,splay:Be,infoKey:3701+n.hk*13,glassKey:5107+n.hk*17,gu:n.hk%64,glazed:t=>e.hash2(e.seed*53+n.hk*11.1,t*5.9)<e.glazedP}),M=t.exit}a.wall(T(M),m,u,!1,!0),f++}}let m=t.entrances?.length>0,h=[];if(m)for(let e of i){let t=n[e.edge],i=n[(e.edge+1)%n.length],a=i[0]-t[0],o=i[1]-t[1],s=Math.hypot(a,o);if(s<.2)continue;let c=s*e.fraction;h.push({cx:t[0]+a/s*c,cz:t[1]+o/s*c,ux:a/s,uz:o/s,nx:o/s*r,nz:-a/s*r})}else for(let e of o.runs){let[t,n]=o.toWorld(e.mid,o.notchedV);h.push({cx:t,cz:n,ux:o.ux,uz:o.uz,nx:o.outX,nz:o.outZ})}let g=0;for(let t=0;t<h.length;t++){let n=h[t];Ve(e,o,n,t),g++}return{applied:!0,series:Ae.id,sections:o.sections,seams:o.runs.map(e=>e.mid),walls:f,porches:g,loggias:p,entranceSource:m?`mapped`:`series`}}var Ge={1:Ae.id},Ke={NONE:0,CANDIDATE:1,CONFIRMED:2},qe={[Ae.id]:We},Je=null;function Ye(){if(Je===null){let e=!1;try{typeof location<`u`&&location.search&&(e=new URLSearchParams(location.search).get(`kit`)===`0`)}catch{e=!1}Je=!e}return Je}function Xe(e){if(!Ye())return null;let t=e.rec||{},n=t.seriesId|0;if(!n||(t.seriesProv|0)!==Ke.CONFIRMED)return null;let r=Ge[n],i=r&&qe[r];if(!i)return null;try{let t=i(e);return t&&t.applied?t:null}catch(t){return console.error(`series kit ${r} failed on building ${e.index}:`,t),null}}var Ze=2.8,Qe=3.2,$e=5.800000000000001,et=.75,tt=1.6,nt=1.9,rt=.9,it=.42,at=4.5,ot=1.4,st=0,ct=1,lt=2,ut=3,dt=4,ft=5,pt=6,mt=7,ht=8,gt=0,_t=1,vt=2,yt=3,bt=4,xt=5,St=6,Ct=7,wt=8,Tt=9,Et=10,Dt=11,Ot=new Set([lt,ut,dt,ft]),kt=new Set([st,ct,pt]),At=256,jt=3.7925;function Mt(e){let t=0;for(let n=0,r=e.length;n<r;n++){let i=(n+1)%r;t+=e[n][0]*e[i][1]-e[i][0]*e[n][1]}return t*.5}function Nt(e){let t=0,n=0,r=-1;for(let i=0;i<e.length;i++){let a=(i+1)%e.length,o=e[a][0]-e[i][0],s=e[a][1]-e[i][1],c=o*o+s*s;c>r&&(r=c,t=o,n=s)}let i=Math.hypot(t,n);if(i<1e-6)return null;let a=t/i,o=n/i,s=1/0,c=-1/0,l=1/0,u=-1/0;for(let[t,n]of e){let e=t*a+n*o,r=-t*o+n*a;e<s&&(s=e),e>c&&(c=e),r<l&&(l=r),r>u&&(u=r)}return{ux:a,uz:o,u0:s,u1:c,v0:l,v1:u,area:(c-s)*(u-l)}}var Pt=e=>e-Math.floor(e),Ft=(e,t)=>Pt(Math.sin(e*127.1+t*311.7)*43758.5453);function It(e){let t=new DataView(e),n=0,r=t.byteLength>=12&&t.getUint8(0)===86&&t.getUint8(1)===77&&t.getUint8(2)===66&&t.getUint8(3)===68,i=1,a=22,o;if(r){if(i=t.getUint16(4,!0),a=t.getUint16(6,!0),o=t.getUint32(8,!0),n=12,i!==2&&i!==3||a<32)throw Error(`unsupported buildings.bin v${i}/${a}`);if(i>=3&&a<34)throw Error(`buildings.bin v3 needs 34 fixed bytes, header says ${a}`)}else o=t.getUint32(n,!0),n+=4;let s=[];for(let e=0;e<o;e++){if(n+a>t.byteLength)throw Error(`truncated buildings.bin at record ${e}/${o}`);let i=n,c=t.getFloat32(i,!0),l=t.getFloat32(i+4,!0),u=e>>>0,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T=0,E,D=0,O=0;r?(u=t.getUint32(i+8,!0),d=t.getUint8(i+12),f=t.getUint8(i+13),p=t.getUint8(i+14),m=t.getUint8(i+15),h=t.getUint8(i+16),g=[t.getUint8(i+17),t.getUint8(i+18),t.getUint8(i+19)],_=[t.getUint8(i+20),t.getUint8(i+21),t.getUint8(i+22)],v=t.getUint8(i+23),y=t.getUint8(i+24),b=t.getUint8(i+25),x=t.getUint8(i+26),S=t.getUint8(i+27),C=t.getUint8(i+28),w=t.getUint8(i+29),T=t.getUint8(i+30),E=t.getUint8(i+31),a>=34&&(D=t.getUint8(i+32),O=t.getUint8(i+33))):(d=t.getUint8(i+8),f=t.getUint8(i+9),p=t.getUint8(i+10),m=t.getUint8(i+11),h=t.getUint8(i+12),g=[t.getUint8(i+13),t.getUint8(i+14),t.getUint8(i+15)],_=[t.getUint8(i+16),t.getUint8(i+17),t.getUint8(i+18)],v=y=b=t.getUint8(i+19),x=S=C=0,w=t.getUint8(i+20),E=t.getUint8(i+21)),n=i+a;let k=[];for(let r=0;r<E;r++){if(n+2>t.byteLength)throw Error(`truncated buildings.bin ring header at record ${e}`);let r=t.getUint16(n,!0);if(n+=2,n+r*8>t.byteLength)throw Error(`truncated buildings.bin ring at record ${e}`);let i=Array(r);for(let e=0;e<r;e++)i[e]=[t.getFloat32(n,!0),t.getFloat32(n+4,!0)],n+=8;if(i.length>1){let e=i[0],t=i[i.length-1];Math.hypot(e[0]-t[0],e[1]-t[1])<1e-4&&i.pop()}k.push(i)}let A=[];for(let r=0;r<T;r++){if(n+4>t.byteLength)throw Error(`truncated buildings.bin entrances at record ${e}`);A.push({edge:t.getUint16(n,!0),fraction:t.getUint16(n+2,!0)/65535}),n+=4}s.push({baseZ:c,height:l,levels:d,roof:f,bucket:p,klass:m,finish:h,tint:g,rtint:_,prov:v,wallProv:v,roofProv:y,finishProv:b,heightProv:x,entranceProv:S,structureProv:C,seed:u,nEntr:w,seriesId:D,seriesProv:O,entrances:A,rings:k})}if(n!==t.byteLength)throw Error(`buildings.bin has ${t.byteLength-n} trailing bytes`);return s}function Lt(e){let t=[],n=[],r=[],i=[],a=[],o=0,s=0,c=0,l=0,u=0,d=0,f=(e,o,s,c,l,f,m)=>{let h=o[0]-e[0],g=o[1]-e[1],_=o[2]-e[2],v=s[0]-e[0],y=s[1]-e[1],b=s[2]-e[2],x=g*b-_*y,S=_*v-h*b,C=h*y-g*v,w=[e,o,s],T=l;x*c[0]+S*c[1]+C*c[2]<0&&(w=[e,s,o],T=[l[0],l[2],l[1]]);let E=m||p;for(let e=0;e<3;e++)t.push(w[e][0],w[e][1],w[e][2]),n.push(c[0],c[1],c[2]),r.push(T[e][0],T[e][1]),i.push(f[0],f[1],f[2],f[3]),a.push(E[0],E[1],u,d)},p=[0,0],m=(e,t,n,r,i,a,o,s)=>{f(e,t,n,i,[a[0],a[1],a[2]],o,s),f(e,n,r,i,[a[0],a[2],a[3]],o,s)},h=(e,t,n,r,i,a,o,s,c,l)=>{let u=[[-i,-a],[i,-a],[i,a],[-i,a]],d=(i,a,o)=>[e+n*i-r*a,o,t+r*i+n*a];for(let e=0;e<4;e++){let[t,i]=u[e],[a,f]=u[(e+1)%4],p=(t+a)/2,h=(i+f)/2,g=Math.hypot(a-t,f-i),_=n*p-r*h,v=r*p+n*h,y=Math.hypot(_,v)||1;m(d(t,i,o),d(a,f,o),d(a,f,s),d(t,i,s),[_/y,0,v/y],[[0,0],[g,0],[g,s-o],[0,s-o]],c,l)}},g=(e,t,n,r,i,a,o,s,c)=>{let l=(i,a)=>[e+n*i-r*a,o,t+r*i+n*a];m(l(-i,-a),l(i,-a),l(i,a),l(-i,a),[0,1,0],[[0,0],[i*2,0],[i*2,a*2],[0,a*2]],s,c)};e.forEach((e,t)=>{let{baseZ:n,height:r,levels:i,klass:a,bucket:p,finish:_,nEntr:v}=e,y=e.tint||[94,94,94],b=e.rtint||[94,94,94];u=y[0]*65536+y[1]*256+y[2],d=b[0]*65536+b[1]*256+b[2];let x=(e.wallProv||0)*64,S=(e.seed>>>0)/4294967296,C=a*64+_%8*8+p%8,w=[gt,S,i,C],T=[_t,S,i,C],E=[vt,S,i,C],D=[Ct,S,i,C],O=[Et,S,i,C],k=[Dt,S,i,C],A=e.rings[0];if(!A||A.length<3)return;let j=Math.sign(Mt(A))||1,M=a===ht||a===mt||i<2&&a!==st,N=kt.has(a),P=M?0:a===st?rt:nt,F=n+P,I=F+r,L=M?n-tt:N?n-.5:F,R=L-F,z=-1,B=0,ee=[];{let e=0;for(let t=0;t<A.length;t++){let n=A[t],r=A[(t+1)%A.length],i=Math.hypot(r[0]-n[0],r[1]-n[1]);ee.push(e),e+=i,i>B&&(B=i,z=t)}}let te=[];if(e.entrances?.length)for(let t of e.entrances)t.edge>=0&&t.edge<A.length&&te.push({edge:t.edge,fraction:Math.max(0,Math.min(1,t.fraction))});else if(v>0&&z>=0)for(let e=0;e<v;e++)te.push({edge:z,fraction:(e+.5)/v});let V=new Map,ne=(e,t)=>{V.has(e)||V.set(e,[]),V.get(e).push(t)},re=(e,t)=>{let n=A[e],r=A[(e+1)%A.length],i=A[t],a=A[(t+1)%A.length],o=r[0]-n[0],s=r[1]-n[1],c=a[0]-i[0],l=a[1]-i[1],u=Math.hypot(o,s)*Math.hypot(c,l);return u>1e-6&&(o*c+s*l)/u>.985};for(let e of te)if(ne(e.edge,e.fraction),e.fraction<=1/65535){let t=(e.edge-1+A.length)%A.length;re(t,e.edge)&&ne(t,1)}else if(e.fraction>=1-1/65535){let t=(e.edge+1)%A.length;re(e.edge,t)&&ne(t,0)}let ie=0,ae=t=>t===0?j:-(Math.sign(Mt(e.rings[t]))||1),H=(e,t,n,i,a)=>{let o=t[0]-e[0],s=t[1]-e[1],c=Math.hypot(o,s);if(c<.05)return 0;let l=[s/c*n,0,-o/c*n],u=[c,+!!i+ie%32*2+x+(a?At:0)];return m([e[0],L,e[1]],[t[0],L,t[1]],[t[0],I,t[1]],[e[0],I,e[1]],l,[[0,R],[c,R],[c,r],[0,r]],w,u),ie++,c},oe=a===st,U=Math.max(.5,F-n+.06),se=(e,t,r,a,o,s,c,l)=>{let u=l?.stair??`sides`,d=oe?1.1:1.75,p=oe?1.3:2.9,_=(p+.15)/2,v=(p-.15)/2,y=e+o*v,b=t+s*v,x=n+U;h(y,b,r,a,d,_,n-.25,x,D),g(y,b,r,a,d,_,x,D);let w=[Tt,S+c*.017,i,C];if(oe){let n=x+2.25;h(y,b,r,a,d+.2,_+.15,n,n+.14,D),g(y,b,r,a,d+.2,_+.15,n+.14,D);let l=.62,u=x+2.05;m([e-r*l+o*.03,x,t-a*l+s*.03],[e+r*l+o*.03,x,t+a*l+s*.03],[e+r*l+o*.03,u,t+a*l+s*.03],[e-r*l+o*.03,u,t-a*l+s*.03],[o,0,s],[[0,0],[l*2,0],[l*2,u-x],[0,u-x]],[wt,S+c*.013,i,C])}else{let l=2.72,v=.22;h(y,b,r,a,d,_,x,x+l,w),h(y,b,r,a,d+.12,_+.12,x+l,x+l+v,D),g(y,b,r,a,d+.12,_+.12,x+l+v,D);let T=.78,E=x+2.15,k=e+o*(p+.03),A=t+s*(p+.03);m([k-r*T,x,A-a*T],[k+r*T,x,A+a*T],[k+r*T,E,A+a*T],[k-r*T,E,A-a*T],[o,0,s],[[0,0],[T*2,0],[T*2,E-x],[0,E-x]],[wt,S+c*.013,i,C]);let j=x+2.35,M=e+o*(p+.45),N=t+s*(p+.45);if(h(M,N,r,a,d*.72,.48,j,j+.12,D),g(M,N,r,a,d*.72,.48,j+.12,D),u===`straight`){let i=Math.max(2.2,U*2.6),c=d*.86,l=(n,i,c)=>[e+r*n+o*i,c,t+a*n+s*i],u=p+.12,g=u+i,_=Math.max(6,Math.min(15,Math.round(U/.145)));for(let e=0;e<_;e++){let t=x-U*e/_,n=u+(g-u)*(e/_),r=u+(g-u)*((e+1)/_);m(l(-c,n,t),l(c,n,t),l(c,r,t),l(-c,r,t),[0,1,0],[[0,0],[c*2,0],[c*2,.35],[0,.35]],D),m(l(-c,r,t),l(c,r,t),l(c,r,t-U/_),l(-c,r,t-U/_),[o,0,s],[[0,0],[c*2,0],[c*2,.15],[0,.15]],D)}for(let d of[-1,1]){f(l(d*c,u,x),l(d*c,g,n),l(d*c,u,n-.25),[r*d,0,a*d],[[0,U],[i,0],[0,-.25]],D);let p=.96,_=.06;for(let e of[1,-1])m(l(d*c,u,x+p),l(d*c,g,n+p),l(d*c,g,n+p-_),l(d*c,u,x+p-_),[r*d*e,0,a*d*e],[[0,0],[i,0],[i,_],[0,_]],O);let v=.045;h(e+r*d*c+o*g,t+a*d*c+s*g,r,a,v,v,n,n+p,O)}}if(u!==`straight`){let i=.3,c=1.6;for(let l of[-1,1]){let u=Math.max(1.9,U*2.4),p=(n,i,c)=>[e+r*n+o*i,c,t+a*n+s*i],g=l*d,_=l*(d+u),v=Math.max(6,Math.min(15,Math.round(U/.145)));for(let e=0;e<v;e++){let t=x-U*e/v,n=g+(_-g)*(e/v),o=g+(_-g)*((e+1)/v);m(p(n,i,t),p(n,c,t),p(o,c,t),p(o,i,t),[0,1,0],[[0,0],[1.3,0],[1.3,.35],[0,.35]],D),m(p(o,i,t),p(o,c,t),p(o,c,t-U/v),p(o,i,t-U/v),[r*l,0,a*l],[[0,0],[1.3,0],[1.3,.15],[0,.15]],D)}for(let[e,t]of[[i,-1],[c,1]])f(p(g,e,x),p(_,e,n),p(g,e,n-.25),[o*t,0,s*t],[[0,U],[u,0],[0,-.25]],D);let y=.96,b=.06;for(let l of[i,c]){for(let e of[1,-1])m(p(g,l,x+y),p(_,l,n+y),p(_,l,n+y-b),p(g,l,x+y-b),[o*e,0,s*e],[[0,0],[u,0],[u,b],[0,b]],O);let i=.045;h(e+r*_+o*l,t+a*_+s*l,r,a,i,i,n,n+y,O)}}}}if(!oe&&i>=4){let n=.8,c=F+3.35;m([e-r*n+o*.02,c,t-a*n+s*.02],[e+r*n+o*.02,c,t+a*n+s*.02],[e+r*n+o*.02,I-.4,t+a*n+s*.02],[e-r*n+o*.02,I-.4,t-a*n+s*.02],[o,0,s],[[0,c-F],[n*2,c-F],[n*2,I-.4-F],[0,I-.4-F]],[xt,S,i,C])}},W=e=>{let{cx:t,cz:n,nx:r,nz:a,infoKey:o,glassKey:s,gu:c,glazed:l}=e,u=e.ux,d=e.uz,f=e.bw??1.15,p=e.bd??.95,h=[yt,Ft(S*17,o),i,C],g=0;for(let o=e.from??1;o<i;o++){let e=F+o*Ze,_=t+r*p,v=n+a*p;m([t-u*f,e-.13,n-d*f],[t+u*f,e-.13,n+d*f],[_+u*f,e-.13,v+d*f],[_-u*f,e-.13,v-d*f],[0,-1,0],[[0,0],[f*2,0],[f*2,p],[0,p]],h),m([_-u*f,e-.13,v-d*f],[_+u*f,e-.13,v+d*f],[_+u*f,e+.02,v+d*f],[_-u*f,e+.02,v-d*f],[r,0,a],[[0,0],[f*2,0],[f*2,.15],[0,.15]],h),m([_-u*f,e+.02,v-d*f],[_+u*f,e+.02,v+d*f],[_+u*f,e+1.05,v+d*f],[_-u*f,e+1.05,v-d*f],[r,0,a],[[0,.2],[f*2,.2],[f*2,1.2],[0,1.2]],h);for(let i of[-1,1]){let o=t+u*i*f,s=n+d*i*f;m([o,e+.02,s],[o+r*p,e+.02,s+a*p],[o+r*p,e+1.05,s+a*p],[o,e+1.05,s],[u*i,0,d*i],[[0,.2],[p,.2],[p,1.2],[0,1.2]],h)}if(l(o)){let t=[bt,Ft(S*29,s+o),i,C],n=c*10;m([_-u*f,e+1.05,v-d*f],[_+u*f,e+1.05,v+d*f],[_+u*f,e+Ze-.35,v+d*f],[_-u*f,e+Ze-.35,v-d*f],[r,0,a],[[n,1.05],[n+f*2,1.05],[n+f*2,2.4499999999999997],[n,2.4499999999999997]],t)}g++}return g},ce=e=>{let{cx:t,cz:n,nx:r,nz:a,infoKey:o,glassKey:s,gu:c,glazed:l}=e,u=e.ux,d=e.uz,f=e.halfW??1.55,p=e.depth??1.25,h=e.splay??.22,g=[yt,Ft(S*17,o),i,C],_=[Ct,Ft(S*23,o+7),i,C],v=(e,i,o)=>[t+u*e+r*i,o,n+d*e+a*i],y=0;for(let e of[-1,1])m(v(e*f,0,F),v(e*(f+h),-p,F),v(e*(f+h),-p,I),v(e*f,0,I),[-u*e,0,-d*e],[[0,0],[p,0],[p,I-F],[0,I-F]],_);for(let t=e.from??1;t<i;t++){let e=F+t*Ze;for(let t of[1,-1])m(v(-f,0,e),v(f,0,e),v(f+h,-p,e),v(-(f+h),-p,e),[0,t,0],[[0,0],[f*2,0],[f*2,p],[0,p]],g);m(v(-f,0,e),v(f,0,e),v(f,0,e+1.05),v(-f,0,e+1.05),[r,0,a],[[0,.2],[f*2,.2],[f*2,1.25],[0,1.25]],_);for(let t of[-1,1])m(v(t*f,0,e),v(t*(f+h),-p,e),v(t*(f+h),-p,e+1.05),v(t*f,0,e+1.05),[-u*t,0,-d*t],[[0,0],[p,0],[p,1.05],[0,1.05]],_);if(l(t)){let n=[bt,Ft(S*29,s+t),i,C],o=c*10;m(v(-f,0,e+1.05),v(f,0,e+1.05),v(f,0,e+Ze-.35),v(-f,0,e+Ze-.35),[r,0,a],[[o,1.05],[o+f*2,1.05],[o+f*2,2.4499999999999997],[o,2.4499999999999997]],n)}y++}return y},le=a===dt?.85:a===lt?.6:a===ut?.55:a===ft?.3:.5,ue=Xe({rec:e,index:t,outer:A,outerSign:j,ringSign:ae,entranceSites:te,seed:S,levels:i,kb:C,klass:a,bucket:p,finish:_,glazedP:le,baseZ:n,height:r,floorZ:F,top:I,wallBase:L,uvBase:R,pileH:P,onGrade:M,closed:N,FLOOR_H:Ze,hash2:Ft,emit:{tri:f,quad:m,boxSides:h,boxTop:g,wall:H,porch:se,balcony:W,loggia:ce,KIND:{WALL:gt,CONC:Ct,DOOR:wt,RAIL:Et,BALC:yt,STAIR:xt,VEST:Tt}}});if(ue&&(l++,c+=ue.porches||0,s+=ue.balconies||0),!ue)for(let t=0;t<e.rings.length;t++){let n=e.rings[t];if(n.length<3)continue;let r=ae(t);for(let e=0;e<n.length;e++){let i=n[e],a=n[(e+1)%n.length],o=Math.hypot(a[0]-i[0],a[1]-i[1]);H(i,a,r,t===0&&o<.55*B&&o<16,!1)}}if(P>0&&!N&&(Rt(e,F,f,E,!0),Bt(e,n-ot,F,f,E),a!==st)){let e=Math.min(1.15,P-.35);if(e>.4)for(let t=0;t<A.length;t++){let r=A[t],i=A[(t+1)%A.length],a=i[0]-r[0],o=i[1]-r[1],s=Math.hypot(a,o);if(s<6)continue;let c=o/s*j,l=-a/s*j,u=c*-.1,d=l*-.1;for(let t of[1,-1])m([r[0]+u,n-.1,r[1]+d],[i[0]+u,n-.1,i[1]+d],[i[0]+u,n+e,i[1]+d],[r[0]+u,n+e,r[1]+d],[c*t,0,l*t],[[0,0],[s,0],[s,e],[0,e]],k)}}if(!ue&&te.length)for(let e=0;e<te.length;e++){let t=te[e],n=A[t.edge],r=A[(t.edge+1)%A.length],i=r[0]-n[0],a=r[1]-n[1],o=Math.hypot(i,a);if(o<.2)continue;let s=i/o,l=a/o,u=a/o*j,d=-i/o*j,f=o*t.fraction;se(n[0]+s*f,n[1]+l*f,s,l,u,d,e),c++}if(!ue&&(Ot.has(a)||a===ct)&&i>=3){let e=Ot.has(a)&&a!==lt?.8:.55,t=0;for(let n=0;n<A.length;n++){let r=A[n],i=A[(n+1)%A.length],a=i[0]-r[0],o=i[1]-r[1],c=Math.hypot(a,o);if(c<11)continue;t++;let l=a/c,u=o/c,d=o/c*j,f=-a/c*j,p=V.get(n)||[],m=Math.floor((c-1.2)/$e);for(let n=0;n<m;n++){let i=.6+n*$e+Qe/2;if(Ft(S*91+t*7.3,n*3.7)>e||p.some(e=>Math.abs(i-c*e)<3.3))continue;let a=Ft(S*53+t*11.1,n*5.9)<le;s+=W({cx:r[0]+l*i,cz:r[1]+u*i,ux:l,uz:u,nx:d,nz:f,infoKey:t*13+n,glassKey:t*17+n*3,gu:n,glazed:()=>a})}}}let G=Nt(A),de=G?Math.abs(Mt(A))/G.area:0;if(e.roof===1&&G&&A.length<=8&&de>.8?(Ht(G,I,f,T),o++):e.roof===2&&G&&A.length<=10&&de>.72?(Ut(G,I,f,[St,S,i,C],a===st?.45:.3,a===st?.45:.3),o++):(Rt(e,I,f,T),i>=3&&Vt(A,I,j,f,T)),G&&Ot.has(a)&&i>=7){let t=G.u1-G.u0,n=Math.max(1,v||Math.round(t/28)),r=(e,t)=>[e*G.ux-t*G.uz,e*G.uz+t*G.ux],i=(G.v0+G.v1)/2;for(let a=0;a<n;a++){let o=G.u0+t*(a+.5)/n,s=i+(Ft(S*37,a*7.7)-.5)*(G.v1-G.v0)*.25,[c,l]=r(o,s),u=!0;for(let[t,n]of[[-3,-1.7],[3,-1.7],[3,1.7],[-3,1.7]]){let[i,a]=r(o+t,s+n);if(!zt(e.rings,i,a)){u=!1;break}}u&&(h(c,l,G.ux,G.uz,3,1.7,I,I+2.6,D),g(c,l,G.ux,G.uz,3,1.7,I+2.6,T))}}if(G&&i>=3&&e.roof===0){let t=2+Math.floor(Ft(S*71,1.3)*3),n=(e,t)=>[e*G.ux-t*G.uz,e*G.uz+t*G.ux];for(let r=0;r<t;r++){let[t,i]=n(G.u0+(G.u1-G.u0)*Ft(S*13,r*9.1),G.v0+(G.v1-G.v0)*Ft(S*23,r*4.7));if(!zt(e.rings,t,i))continue;let a=.8+Ft(S,r)*.6;h(t,i,G.ux,G.uz,.26,.26,I,I+a,D),g(t,i,G.ux,G.uz,.26,.26,I+a,D)}}});let _=new v;return _.setAttribute(`position`,new V(t,3)),_.setAttribute(`normal`,new V(n,3)),_.setAttribute(`aFuv`,new V(r,2)),_.setAttribute(`aInfo`,new V(i,4)),_.setAttribute(`aExtra`,new V(a,4)),_.computeBoundingSphere(),{geometry:_,nGable:o,nBalc:s,nPorch:c,nSeries:l,verts:t.length/3}}function Rt(e,t,n,r,i=!1){let a=e.rings[0].map(([e,t])=>new H(e,t)),o=e.rings.slice(1).filter(e=>e.length>=3).map(e=>e.map(([e,t])=>new H(e,t))),s;try{s=pe.triangulateShape(a,o)}catch{return}let c=a.concat(...o),l=i?[0,-1,0]:[0,1,0];for(let e of s){let i=e.map(e=>[c[e].x,t,c[e].y]);n(i[0],i[1],i[2],l,[[i[0][0],i[0][2]],[i[1][0],i[1][2]],[i[2][0],i[2][2]]],r)}}function zt(e,t,n){let r=e=>{let r=!1;for(let i=0,a=e.length-1;i<e.length;a=i++){let[o,s]=e[i],[c,l]=e[a];s>n!=l>n&&t<(c-o)*(n-s)/(l-s)+o&&(r=!r)}return r};if(!r(e[0]))return!1;for(let t=1;t<e.length;t++)if(e[t].length>=3&&r(e[t]))return!1;return!0}function Bt(e,t,n,r,i){let a=e.rings[0],o=1/0,s=-1/0,c=1/0,l=-1/0;for(let[e,t]of a)e<o&&(o=e),e>s&&(s=e),t<c&&(c=t),t>l&&(l=t);let u=it/2;for(let a=o+it;a<=s-it;a+=at)for(let o=c+it;o<=l-it;o+=at)if(zt(e.rings,a,o))for(let[e,s,c,l]of[[0,-.21,0,-1],[u,0,1,0],[0,u,0,1],[-.21,0,-1,0]]){let d=a+e,f=o+s,p=d-(l===0?0:u),m=f-(c===0?0:u),h=d+(l===0?0:u),g=f+(c===0?0:u);r([p,t,m],[h,t,g],[h,n,g],[c,0,l],[[0,0],[it,0],[it,n-t]],i),r([p,t,m],[h,n,g],[p,n,m],[c,0,l],[[0,0],[it,n-t],[0,n-t]],i)}}function Vt(e,t,n,r,i){let a=t+et;for(let o=0;o<e.length;o++){let s=e[o],c=e[(o+1)%e.length],l=c[0]-s[0],u=c[1]-s[1],d=Math.hypot(l,u);if(d<.05)continue;let f=[u/d*n,0,-l/d*n];r([s[0],t,s[1]],[c[0],t,c[1]],[c[0],a,c[1]],f,[[0,0],[d,0],[d,et]],i),r([s[0],t,s[1]],[c[0],a,c[1]],[s[0],a,s[1]],f,[[0,0],[d,et],[0,et]],i),r([s[0],a,s[1]],[c[0],a,c[1]],[c[0]+f[0]*.3,a,c[1]+f[2]*.3],[0,1,0],[[0,0],[d,0],[d,.3]],i),r([s[0],a,s[1]],[c[0]+f[0]*.3,a,c[1]+f[2]*.3],[s[0]+f[0]*.3,a,s[1]+f[2]*.3],[0,1,0],[[0,0],[d,.3],[0,.3]],i)}}function Ht(e,t,n,r){let{ux:i,uz:a,u0:o,u1:s,v0:c,v1:l}=e,u=(e,t)=>[e*i-t*a,e*a+t*i],d=l-c,f=s-o,p=Math.min(d*.16,1.4),m=(c+l)/2,h=Math.hypot(p,d/2),g=(e,t,n)=>{let[r,i]=u(e,t);return[r,n,i]};for(let e of[-1,1]){let u=e<0?c:l,_=[e*-a*p/h,d/2/h,e*i*p/h],v=g(o,u,t),y=g(s,u,t),b=g(s,m,t+p),x=g(o,m,t+p);n(v,y,b,_,[[0,0],[f,0],[f,h]],r),n(v,b,x,_,[[0,0],[f,h],[0,h]],r)}for(let e of[-1,1]){let u=e<0?o:s,f=[e*i,0,e*a];n(g(u,c,t),g(u,l,t),g(u,m,t+p),f,[[0,0],[d,0],[d/2,p]],r)}}function Ut(e,t,n,r,i,a){let{ux:o,uz:s,u0:c,u1:l,v0:u,v1:d}=e;c-=a,l+=a,u-=a,d+=a;let f=(e,t)=>[e*o-t*s,e*s+t*o],p=d-u,m=l-c,h=Math.max(1.4,Math.min(p*i,4.6)),g=(u+d)/2,_=Math.min(c+p/2,(c+l)/2),v=Math.max(l-p/2,(c+l)/2),y=Math.hypot(h,p/2),b=(e,t,n)=>{let[r,i]=f(e,t);return[r,n,i]};for(let e of[-1,1]){let i=e<0?u:d,a=[e*-s*h/y,p/2/y,e*o*h/y],f=b(c,i,t),x=b(l,i,t),S=b(v,g,t+h),C=b(_,g,t+h);n(f,x,S,a,[[0,0],[m,0],[m-p/2,y]],r),n(f,S,C,a,[[0,0],[m-p/2,y],[p/2,y]],r)}for(let e of[-1,1]){let i=e<0?c:l,a=e<0?_:v,f=Math.hypot(h,p/2),m=[e*o*h/f,p/2/f,e*s*h/f];n(b(i,u,t),b(i,d,t),b(a,g,t+h),m,[[0,0],[p,0],[p/2,Math.hypot(h,Math.abs(i-a))]],r)}}function Wt(){let e={uSnow:{value:1},uNight:{value:0},uProv:{value:+!!new URLSearchParams(location.search).get(`prov`)}},t=new u({roughness:.88,metalness:0});return t.userData.uniforms=e,t.onBeforeCompile=t=>{Object.assign(t.uniforms,e,Te),t.vertexShader=t.vertexShader.replace(`#include <common>`,`#include <common>
        attribute vec4 aInfo; attribute vec2 aFuv; attribute vec4 aExtra;
        varying vec4 vInfo; varying vec2 vFuv; varying vec4 vExtra; varying vec3 vWNrm;
        varying vec2 vLampXZ;`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
        vWNrm = normalize(mat3(modelMatrix) * objectNormal);
        vInfo = aInfo; vFuv = aFuv; vExtra = aExtra;`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
        vLampXZ = (modelMatrix * vec4(transformed, 1.0)).xz;`),t.fragmentShader=t.fragmentShader.replace(`#include <common>`,`#include <common>
        varying vec4 vInfo; varying vec2 vFuv; varying vec4 vExtra; varying vec3 vWNrm;
        varying vec2 vLampXZ;
        uniform float uSnow; uniform float uNight; uniform float uProv;
        uniform float uLitFrac;
        float gRough;
        ${Ee}
        ${Y}
        float rectM(vec2 p, vec2 lo, vec2 hi) {
          vec2 s = step(lo, p) * step(p, hi);
          return s.x * s.y;
        }`).replace(`#include <map_fragment>`,`
        float kind = vInfo.x, seed = vInfo.y, levels = vInfo.z;
        float kls = floor(vInfo.w / 64.0 + 0.001);
        float rest = vInfo.w - kls * 64.0;
        float finF = floor(rest / 8.0 + 0.001);
        float buck = rest - finF * 8.0;
        int ki = int(kind + 0.5);
        int kc = int(kls + 0.5);
        int kf = int(finF + 0.5);
        vec2 fuv = vFuv;
        // vExtra.y packs four small ints: end-wall flag (bit 0), wall index
        // (bits 1-5), provenance in the 64s, and from 256 up the series-kit
        // flag. Wall UVs are local per wall, so the index is what keeps two
        // same-length walls from rendering identical window patterns. Note the
        // provenance decode masks 256 off first: it used to divide the whole
        // value by 64, which the kit flag would have turned into provenance 7.
        float wEnd = mod(vExtra.y, 2.0);
        float wIdx = floor(mod(vExtra.y, 64.0) / 2.0);
        float wProv = floor(mod(vExtra.y, 256.0) / 64.0);
        float wKit = floor(vExtra.y / 256.0);

        vec3 albedo = vec3(0.3); float rough = 0.88; float emit = 0.0;
        vec3 emitC = vec3(1.0, 0.76, 0.44);

        float lvl = fuv.y / 2.8;
        float storey = floor(lvl);
        float fy = fract(lvl) * 2.8;

        if (ki == 0 || ki == 5) {
          // ---- wall family: class base coat, then windows -----------------
          // bay parameterisation: the panel stock alternates 3.2/2.6 m bays;
          // everything else runs a single module.
          float period = 5.8;
          float mw; float bx; float col;
          bool panels = kc >= 2 && kc <= 5;
          if (panels) {
            float t = mod(fuv.x, period);
            bool wide = t < 3.2;
            mw = wide ? 3.2 : 2.6;
            bx = wide ? t : t - 3.2;
            col = floor(fuv.x / period) * 2.0 + (wide ? 0.0 : 1.0);
          } else {
            float m = kc == 0 ? 3.2 : kc == 1 ? 3.6 : kc == 6 ? 4.2 : 3.4;
            mw = m; bx = mod(fuv.x, m); col = floor(fuv.x / m);
          }
          if (wKit > 0.5) {
            // A wall laid out by a series kit divides into a whole number of
            // the series own bays instead of the 3.2/2.6 alternation, which is
            // published for series 111-121 and is a different building. The kit
            // cuts each face at the section joints, so this partition and the
            // balcony columns the kit emitted land on the same centres. The
            // module here is derived and not measured: the un-notched run of
            // 15.17 m over four, four being what makes the run and the 11.45 m
            // notch whole multiples of one module.
            float nb = max(1.0, floor(vExtra.x / ${jt.toFixed(4)} + 0.5));
            mw = vExtra.x / nb;
            bx = mod(fuv.x, mw);
            col = floor(fuv.x / mw);
          }
          col += wIdx * 43.0;   // decorrelate the per-column hashes per wall

          // window rectangle in metres within the bay, per class
          vec2 wlo = vec2(0.0); vec2 whi = vec2(0.0);
          bool hasWin = true;
          if (kc == 0)      { wlo = vec2(1.00, 0.95); whi = vec2(2.15, 2.20); }
          else if (kc == 1) { wlo = vec2(0.90, 0.75); whi = vec2(2.30, 2.45); }
          else if (kc == 6) { wlo = vec2(0.50, 0.55); whi = vec2(3.70, 2.55); }
          else if (kc == 7) { wlo = vec2(0.80, 0.60); whi = vec2(2.60, 1.90); }
          else if (kc == 8) { hasWin = false; }
          else              { wlo = vec2(0.85, 0.80); whi = vec2(mw - 0.75, 2.30); }
          if (panels && storey < 1.0) { wlo.y = 1.30; }          // technical ground floor
          if (kc == 6 && storey < 1.0) { wlo = vec2(0.25, 0.30); whi = vec2(3.95, 2.70); }
          // On a kit wall the opening is a fixed 2.20 m centred in its bay,
          // rather than the bay minus fixed piers: a face that ends in a
          // leftover part-bay then gets a normal window off-centre instead of
          // one absurd four-metre one, and the opening lines up with the
          // balcony the kit hung on the same centre.
          if (wKit > 0.5) { wlo.x = mw * 0.5 - 1.10; whi.x = mw * 0.5 + 1.10; }

          // ---- base coats --------------------------------------------------
          if (kc == 0) {
            // timber: per-plank tone, corner boards, board skirt below floor 0
            vec3 wc = buck < 1.5 ? vec3(0.11, 0.14, 0.11)
                    : buck < 2.5 ? vec3(0.16, 0.10, 0.07)
                    : buck < 4.5 ? vec3(0.18, 0.17, 0.15) : vec3(0.33, 0.22, 0.11);
            float plank = floor(fuv.y / 0.24);
            albedo = wc * (0.82 + 0.30 * hash21(vec2(plank, seed * 61.0)));
            albedo *= 1.0 - 0.35 * step(fract(fuv.y / 0.24), 0.09);
            if (min(fuv.x, vExtra.x - fuv.x) < 0.14) albedo = vec3(0.42, 0.41, 0.37);
            if (fuv.y < 0.0) {
              albedo = vec3(0.10, 0.066, 0.045)
                       * (0.8 + 0.4 * hash21(vec2(floor(fuv.x / 0.18) + wIdx * 29.0, seed)));
              hasWin = false;
            }
          } else if (kc == 1) {
            // painted brick of the 1960s centre
            vec3 bc = buck < 1.5 ? vec3(0.47, 0.30, 0.12)
                    : buck < 2.5 ? vec3(0.50, 0.28, 0.19)
                    : buck < 4.5 ? vec3(0.55, 0.53, 0.48) : vec3(0.42, 0.26, 0.11);
            albedo = bc * (0.90 + 0.18 * vnoise(fuv * 1.7 + seed * 40.0));
            if (fuv.y > levels * 2.8 - 0.55) albedo = mix(albedo, vec3(0.58, 0.57, 0.53), 0.8);
            if (fuv.y < 0.0) { albedo = vec3(0.30, 0.29, 0.27); hasWin = false; }
          } else if (kc >= 2 && kc <= 5) {
            // ---- the tall stock ------------------------------------------
            // Colour is the register's отделка (kf), texture is the class.
            // Before this split each class carried the colour of the single
            // building it was photographed on, so when the register join
            // spread the classes across town it spread five buildings colours
            // with them: twelve blocks on Солдатова, all built 1988-92, came
            // out olive, charcoal, cream and tan. Measured off the same
            // frames (docs/SOURCES.md 19) the whole tall stock is one narrow
            // warm-neutral family; what differs between neighbours is
            // ornament, not hue. Values are measured albedo lifted 1.35x into
            // this scene's deliberately-high winter exposure, as everywhere.
            // Saturation is capped at the measured ceiling. Patch medians over
            // nine hand-placed samples in five Commons frames put Mirny's tall
            // stock at HSL saturation 2.9-16.7%, median 10.9%, and under
            // neutral summer overcast 3-9%. The palette this replaces carried
            // three finishes at 23-36%, i.e. above anything measurable
            // anywhere in the town.
            vec3 base = vec3(0.40, 0.385, 0.36);              // 0 bare panel
            if (kf == 1)      base = vec3(0.20, 0.177, 0.155);// 1 aggregate
            else if (kf == 2) base = vec3(0.44, 0.40, 0.355); // 2 sand paint
            else if (kf == 3) base = vec3(0.42, 0.42, 0.41);  // 3 grey paint
            else if (kf == 4) base = vec3(0.46, 0.40, 0.33);  // 4 ochre
            else if (kf == 5) base = vec3(0.40, 0.355, 0.30); // 5 mosaic cream
            else if (kf == 6) base = vec3(0.46, 0.46, 0.45);  // 6 clad cassette

            // MEASURED per-building lightness. Off a 32.7 deg off-nadir ESRI
            // Wayback acquisition, every Солдатова block's sunlit wall wedge
            // was sampled against the same frame's road surface: eleven of the
            // twelve are achromatic to within 6%, and they spread by a factor
            // of 1.78 in VALUE. So the street varies the way the imagery says
            // it varies, and the hue stays one family. Buildings with no
            // sample decode to 1.0 and keep the class base.
            float tr = floor(vExtra.z / 65536.0);
            float tg = floor((vExtra.z - tr * 65536.0) / 256.0);
            float tbv = vExtra.z - tr * 65536.0 - tg * 256.0;
            base *= vec3(tr, tg, tbv) / 255.0 * 1.5 + 0.45;

            // What is left for the hash is weathering and repaint dates: a few
            // per cent of value and a hair of warmth. Never another paint.
            base *= 0.96 + 0.09 * hash21(vec2(seed * 37.0, 2.1));
            albedo = base * (0.94 + 0.11 * vnoise(fuv * 1.4 + seed * 23.0));

            if (kf == 1) {
              // Exposed aggregate: the chip speckle is the whole surface, and
              // it is high-frequency — at street distance it reads as tone,
              // at arm's length as gravel. Pale cast surrounds frame each
              // opening, which is what gives this stock its grid.
              albedo = base * (0.72 + 0.56 * vnoise(fuv * 26.0 + seed * 31.0 + wIdx * 7.3));
              // The pale cast panels are the pattern itself, not a trim. In
              // DSC 4648 a light spandrel runs the full width of the bay
              // under each opening and wraps its jambs, so the elevation
              // reads as pale blocks set into an aggregate field — that
              // alternation is what says "КПД panel" before the colour does.
              // Measured against snow in the same light, the aggregate pier is
              // albedo 0.099 at a warm 1.000:0.886:0.774 and the smooth ribbon
              // 0.347 at a near-neutral 1.000:0.966:0.906 — a 3.5:1 two-tone,
              // so the ribbon is both much paler AND less warm than the field.
              vec3 pale = base * 2.5 * vec3(1.0, 1.09, 1.17);
              float sp = rectM(vec2(bx, fy), vec2(0.30, 0.0),
                               vec2(mw - 0.30, wlo.y + 0.12));
              float sur = rectM(vec2(bx, fy), wlo - vec2(0.32, 0.0),
                                whi + vec2(0.32, 0.34));
              albedo = mix(albedo, pale * (0.93 + 0.13 * vnoise(fuv * 2.3)),
                           max(sp, sur));
            } else if (kf == 5) {
              // The lozenge mosaic: a tile lattice over the full panel, not a
              // band under the sill. Measured at 0.45x the cream ground it
              // sits on, same hue — a texture, not a second colour.
              vec2 dp = fuv / 0.58;
              float dd = abs(fract(dp.x) - 0.5) + abs(fract(dp.y) - 0.5);
              float lat = step(dd, 0.40) * step(0.20, dd);
              float band = 1.0 - 0.55 * step(1.55, fy);   // sparser up the bay
              albedo = mix(albedo, base * 0.45, lat * band * 0.85);
            } else if (kf == 0) {
              // Bare panel: the patch repairs are the character. Big soft
              // blotches of a slightly different grey where mastic went on.
              float pt = vnoise(fuv * 0.55 + seed * 61.0 + wIdx * 5.7);
              albedo = mix(albedo, base * 0.80, smoothstep(0.62, 0.78, pt));
            }

            // ---- joints, common to the whole tall stock --------------------
            if (kf == 6) {
              // A ventilated curtain facade hides the structure entirely: a
              // flat cassette grid on its own module, no panel joints at all.
              float cu = step(min(mod(fuv.x, 1.2), 1.2 - mod(fuv.x, 1.2)), 0.02);
              float cv = step(min(mod(fuv.y, 1.2), 1.2 - mod(fuv.y, 1.2)), 0.02);
              albedo *= 1.0 - 0.10 * max(cu, cv);
              rough = 0.55;
            } else if (kc == 2) {
              // keramzit block: a coursed seam grid, half-lapped per row
              float row = floor(fuv.y / 0.6);
              float sx = mod(fuv.x + mod(row, 2.0) * 0.6, 1.2);
              float su = step(min(sx, 1.2 - sx), 0.035);
              float sv = step(min(mod(fuv.y, 0.6), 0.6 - mod(fuv.y, 0.6)), 0.03);
              albedo *= 1.0 - 0.14 * max(su, sv);
            } else {
              // Panel joints: measured 0.69x the wall they sit in, same hue,
              // and wider than a hairline because they are sealed mastic that
              // has been redone by hand a few times. This is the strongest
              // single cue that a wall is a panel wall — in DSC 4571 the dark
              // grid reads before the colour does — so it gets a real width
              // and a wobble rather than a one-pixel line that aliases away
              // at the far end of a 106 m slab.
              float wob = 0.012 * vnoise(fuv * 3.1 + seed * 51.0);
              float ju = smoothstep(0.085, 0.030, min(bx, mw - bx) + wob);
              float jv = smoothstep(0.075, 0.025, min(fy, 2.8 - fy) + wob);
              albedo *= 1.0 - 0.34 * max(ju, jv);
              // the horizontal storey joint is the deeper of the two, and
              // it holds the snow line and the drip stain under it
              albedo *= 1.0 - 0.10 * smoothstep(0.55, 0.0, fy);
            }
            // the end walls of the slabs are blind, and carry the chevron
            if (wEnd > 0.5) {
              hasWin = false;
              float zig = abs(fract(fuv.x * 0.26
                                    + step(0.5, fract(lvl * 0.5)) * 0.5) - 0.5);
              albedo = mix(albedo, base * 0.55, 0.6 * step(zig, 0.07));
            }
            // The ochre landmark keeps its salmon band — but as the parapet
            // strip it is in the photograph, not the whole top storey the old
            // class painted, and only on buildings the survey names.
            if (kf == 4) {
              albedo = mix(albedo, vec3(0.52, 0.30, 0.22),
                           0.85 * step(levels * 2.8 - 1.05, fuv.y));
            }
            // The painted stock is two-tone, and this is the one place a
            // saturated colour belongs on these walls: a socle in mint,
            // teal or dark green runs from the deck to about the top of the
            // entrance canopy, with the pale body above (DSC 4684, 4689).
            // It is the управляющая компания's paint, so it is a per-building
            // choice — hence buck, which is per building.
            if ((kf == 2 || kf == 3) && lvl < 1.15) {
              vec3 soc = buck < 1.5 ? vec3(0.115, 0.185, 0.155)
                       : buck < 3.0 ? vec3(0.085, 0.135, 0.145)
                       : buck < 4.5 ? vec3(0.135, 0.155, 0.115)
                       : base * vec3(0.66, 0.68, 0.70);
              albedo = mix(albedo, soc * (0.86 + 0.28 * vnoise(fuv * 2.2 + seed * 9.0)),
                           smoothstep(1.15, 0.95, lvl));
            } else if (lvl < 1.0) {
              // everything else just goes greyer and dirtier at the base
              albedo = mix(albedo, base * vec3(0.62, 0.64, 0.68), 0.55);
            }
          } else if (kc == 6) {
            // civic white stone
            albedo = vec3(0.55, 0.56, 0.57) * (0.93 + 0.11 * vnoise(fuv * 1.1 + seed * 9.0));
            float g = step(min(mod(fuv.x, 1.4), 1.4 - mod(fuv.x, 1.4)), 0.03)
                    + step(min(mod(fuv.y, 1.2), 1.2 - mod(fuv.y, 1.2)), 0.03);
            albedo *= 1.0 - 0.07 * clamp(g, 0.0, 1.0);
            if (fuv.y < 0.0) { albedo = vec3(0.34, 0.33, 0.32); hasWin = false; }
          } else if (kc == 7) {
            // sheet-metal hall: corrugation + a high window strip
            vec3 mc = buck < 1.5 ? vec3(0.30, 0.34, 0.38)
                    : buck < 3.5 ? vec3(0.24, 0.30, 0.25) : vec3(0.34, 0.34, 0.34);
            albedo = mc * (0.88 + 0.22 * abs(fract(fuv.x / 0.16) - 0.5));
            hasWin = hasWin && mod(col, 2.0) < 1.0 && lvl > levels - 1.4;
          } else {
            // garage row: concrete + a gate per bay
            albedo = vec3(0.33, 0.31, 0.29) * (0.85 + 0.28 * vnoise(fuv * 0.9 + seed * 12.0));
            float g = rectM(vec2(bx, fuv.y), vec2(0.30, -9.0), vec2(mw - 0.30, 2.05));
            vec3 gc = hash21(vec2(col, seed * 44.0)) < 0.5
                      ? vec3(0.17, 0.16, 0.15) : vec3(0.15, 0.19, 0.22);
            gc *= 0.85 + 0.3 * hash21(vec2(col * 1.7, seed * 91.0));
            albedo = mix(albedo, gc, g);
            if (fuv.y < 0.0) albedo = vec3(0.24, 0.23, 0.22);
          }

          // ---- stair strips override the bay grid --------------------------
          if (ki == 5) {
            albedo = kc == 3 || kc == 4
                     ? vec3(0.36, 0.34, 0.30) * (0.9 + 0.2 * vnoise(fuv * 3.0 + seed * 5.0))
                     : albedo;
            float fs = fract(lvl + 0.5) * 2.8;
            mw = vExtra.x > 0.0 ? vExtra.x : 1.6;
            bx = fuv.x; col = 777.0;
            wlo = vec2(mw * 0.5 - 0.35, 1.00); whi = vec2(mw * 0.5 + 0.35, 1.80);
            fy = fs;
            hasWin = true;
          }

          // ---- windows -----------------------------------------------------
          float inBody = step(0.12, fuv.y) * step(lvl, levels - 0.02);
          float win = hasWin ? rectM(vec2(bx, fy), wlo, whi) * inBody : 0.0;
          if (win > 0.5) {
            vec2 wp = vec2(bx, fy) - wlo;
            vec2 wsz = whi - wlo;
            float fr = step(min(min(wp.x, wsz.x - wp.x), min(wp.y, wsz.y - wp.y)), 0.075);
            if (fr > 0.5) {
              // Frames are white in every frame of the reference set — painted
              // timber then, PVC now — and they are what makes a facade read
              // as inhabited rather than as a grid of holes.
              albedo = vec3(0.62, 0.615, 0.59);
              rough = 0.6;
            } else {
              // Glass. Measured off the reference set, not assumed: against
              // the wall it sits in, a window runs 0.7x (an unlit room behind
              // it, overcast) to 2.1x (the pane returning a bright sky), and
              // it is blue-shifted at every hour. It was drawn at a flat
              // 0.055 — three to six times too dark, which is the single
              // reason a lit town read as rows of black pits. Keeping it
              // relative to the wall also means it tracks the finish instead
              // of fighting it.
              float sky = hash21(vec2(col * 5.9 + seed * 23.0, storey * 2.7));
              albedo = vec3(0.150, 0.178, 0.225) * (0.72 + 0.95 * sky);
              rough = 0.14;
              // reveal: the opening shades its own top and one jamb
              float shade = 1.0 - 0.35 * smoothstep(0.30, 0.0, wsz.y - wp.y)
                                - 0.20 * smoothstep(0.22, 0.0, wp.x);
              albedo *= max(shade, 0.5);
              // Lit windows are the point of a town at 62.5 N: for most of the
              // working day in December the sun is simply not up. Stable hash
              // per flat so nothing flickers as the clock runs; what moves is
              // the threshold, uLitFrac, which features/nightlights.js drives
              // off the hour (an invented evening-peak profile). Stairwells
              // (kind 5) are lit all night and keep their fixed share.
              float r = hash21(vec2(col * 7.3 + seed * 91.0, storey * 3.1 + seed * 13.0));
              float on = ki == 5 ? step(0.30, r) * 0.5 : step(1.0 - uLitFrac, r);
              emit = uNight * on * (0.5 + 0.5 * hash21(vec2(col + 0.5, storey + seed)));
              // Not every room is the same bulb behind the same curtain: mostly
              // warm, some neutral LED, some through orange or green cloth.
              // Stairwells are the building's own fittings, cooler and dimmer.
              // Shares invented; they only break the flat cream grid.
              float tint = hash21(vec2(col * 1.7 + seed * 37.0, storey * 5.3 + seed * 3.0));
              emitC = ki == 5 ? vec3(0.80, 0.80, 0.72)
                    : tint < 0.58 ? vec3(1.0, 0.66, 0.34)
                    : tint < 0.78 ? vec3(0.95, 0.84, 0.66)
                    : tint < 0.90 ? vec3(1.0, 0.50, 0.24)
                    : tint < 0.96 ? vec3(0.70, 0.82, 0.46) : vec3(0.62, 0.66, 0.92);
              emit *= 0.85;
              // daytime variety: curtains and blinds break the perfect grid
              float cu = hash21(vec2(col * 3.7 + seed * 51.0, storey * 9.1));
              if (emit < 0.01 && cu > 0.62) {
                albedo = mix(albedo, vec3(0.28, 0.28, 0.30), 0.55); rough = 0.5;
              }
            }
          } else if (hasWin) {
            // sill line just below the opening catches paint and snow
            float sill = rectM(vec2(bx, fy), vec2(wlo.x, wlo.y - 0.08), vec2(whi.x, wlo.y)) * inBody;
            albedo = mix(albedo, vec3(0.50, 0.50, 0.48), 0.6 * sill);
            albedo = mix(albedo, vec3(0.82, 0.85, 0.90), sill * uSnow * 0.7);
          }
          // Weathering: grime at the base, and — on the tall stock — the
          // vertical runoff streaks that a flat roof with no gutter puts down
          // every joint. In the reference frames these are the difference
          // between a rendered box and a building that has stood through
          // thirty winters, and they cost one noise lookup.
          albedo *= 1.0 - 0.18 * smoothstep(1.4, 0.2, fuv.y) * step(0.0, fuv.y);
          if (kc >= 2 && kc <= 5) {
            float st = vnoise(vec2(fuv.x * 2.6 + seed * 17.0 + wIdx * 3.1, fuv.y * 0.045));
            albedo *= 1.0 - 0.16 * smoothstep(0.52, 0.86, st)
                           * smoothstep(0.0, 0.35, fuv.y / max(levels * 2.8, 1.0));
          }
        } else if (ki == 1 || ki == 6) {
          // Per-building roof tint, measured off the orthoimagery for 1,406
          // addressed roofs (make_albedo_survey.py) — this is what puts the
          // real rust-red lids back on the timber quarters. Unmeasured roofs
          // decode to exactly 1.0.
          float rr2 = floor(vExtra.w / 65536.0);
          float rg2 = floor((vExtra.w - rr2 * 65536.0) / 256.0);
          float rb2 = vExtra.w - rr2 * 65536.0 - rg2 * 256.0;
          vec3 roofTint = vec3(rr2, rg2, rb2) / 255.0 * 1.5 + 0.45;
          if (kc == 8) {
            // Garage rows roof in per-section sheet metal — zinc grey with the
            // odd rusted lid. Painted the same near-black felt as the street,
            // a row along a road merged with it into one toothed smear that
            // took four diagnostic renders to unpick (the satellite shows the
            // rows clearly LIGHTER than the asphalt).
            float sec = floor(fuv.x / 3.4);
            float rr = hash21(vec2(sec * 1.7, seed * 53.0));
            vec3 mc = rr < 0.62 ? vec3(0.34, 0.35, 0.37)
                    : rr < 0.85 ? vec3(0.30, 0.23, 0.16) : vec3(0.26, 0.28, 0.30);
            albedo = mc * (0.82 + 0.30 * hash21(vec2(sec, seed * 77.0)));
            albedo *= 1.0 - 0.18 * step(fract(fuv.x / 3.4), 0.04);
            rough = 0.55;
          } else if (ki == 1) {
            // flat roof: bitumen felt
            albedo = vec3(0.12, 0.12, 0.13) * (0.85 + 0.3 * vnoise(fuv * 0.7 + seed * 19.0));
            rough = 0.92;
          } else {
            // Hipped sheet roofs of the timber and brick stock. Where the
            // imagery measured this roof, its hue comes entirely from the
            // tint — a rusty lid is up to 1.8x red against 0.55x blue — so
            // the bucket's invented colour steps aside for a neutral sheet
            // base rather than multiplying green into rust.
            float rmeas = step(0.10, abs(roofTint.r - 1.0) + abs(roofTint.g - 1.0)
                                     + abs(roofTint.b - 1.0));
            vec3 rc = buck < 1.5 ? vec3(0.16, 0.13, 0.11)
                    : buck < 3.5 ? vec3(0.12, 0.16, 0.12) : vec3(0.19, 0.19, 0.20);
            rc = mix(rc, vec3(0.16, 0.155, 0.15), rmeas);
            albedo = rc * (0.88 + 0.2 * vnoise(fuv * 1.3 + seed * 33.0));
            albedo *= 1.0 - 0.10 * step(fract(fuv.x / 0.62), 0.07);   // standing seams
            rough = 0.7;
          }
          albedo *= roofTint;
        } else if (ki == 2) {
          // piles and the underside of the floor slab: bare cast concrete,
          // permanently in its own shadow
          albedo = vec3(0.16, 0.155, 0.15) * (0.75 + 0.4 * vnoise(fuv * 2.2 + seed * 17.0));
          rough = 0.96;
        } else if (ki == 7) {
          // porches, canopies, machine rooms, vents: daylight concrete
          albedo = vec3(0.31, 0.30, 0.28) * (0.85 + 0.26 * vnoise(fuv * 2.0 + seed * 13.0));
          rough = 0.9;
        } else if (ki == 3) {
          // balcony solids: the slab edge is concrete, the rail is slats
          if (fuv.y < 0.18) {
            albedo = vec3(0.30, 0.29, 0.27);
          } else {
            // Balcony fronts are the one place this stock is allowed a colour,
            // and it is a per-BUILDING decision: the whole elevation goes in
            // one shade, because it was one order of steel. So this keys on
            // buck, which is per building, and not on seed, which the mesher
            // sets per bay — that is what put a maroon balcony next to an
            // olive one on the same block. Maroon and galvanised are the two
            // in the reference set (DSC 4571 right-hand slab; the landmark
            // frame), so they carry two slots each.
            vec3 sc = buck < 0.5 ? vec3(0.21, 0.075, 0.065)
                    : buck < 1.5 ? vec3(0.30, 0.30, 0.29)
                    : buck < 2.5 ? vec3(0.13, 0.16, 0.14)
                    : buck < 3.5 ? vec3(0.21, 0.075, 0.065)
                    : buck < 4.5 ? vec3(0.24, 0.17, 0.11) : vec3(0.32, 0.31, 0.29);
            albedo = sc * (0.80 + 0.35 * hash21(vec2(floor(fuv.y / 0.09), seed * 71.0)));
          }
          rough = 0.8;
        } else if (ki == 4) {
          // Resident-glazed loggia fronts: mismatched mullions, dim lights.
          // Same measurement as the windows — a glazed loggia is a wall of
          // sky reflection, and drawn at 0.035 it read as a hole punched
          // through the block. The frames are the mismatched part: white
          // plastic, bare aluminium and varnished timber all on one facade.
          float cell = floor(fuv.x / 10.0);
          float lu = mod(fuv.x, 10.0);
          float sky = hash21(vec2(cell * 2.3 + seed * 13.0, floor(fuv.y / 2.8)));
          albedo = vec3(0.125, 0.150, 0.195) * (0.55 + 1.5 * sky);
          rough = 0.10;
          float mull = step(fract(lu / 0.72), 0.07) + step(fract(fuv.y / 1.12), 0.05);
          if (mull > 0.5) {
            float fm = hash21(vec2(cell * 7.1, seed * 29.0));
            albedo = fm < 0.45 ? vec3(0.55, 0.55, 0.53)
                   : fm < 0.72 ? vec3(0.36, 0.36, 0.35) : vec3(0.26, 0.17, 0.09);
            rough = 0.6;
          }
          float r = hash21(vec2(cell * 3.1, floor(fuv.y / 2.8) + seed * 77.0));
          // a loggia is lit by the room behind it: 0.72 of the flats' share,
          // which is the old fixed 0.40 against the old 0.56
          emit = uNight * step(1.0 - uLitFrac * 0.72, r) * 0.45;
        } else if (ki == 8) {
          // Entrance door and the lamp over it. The door is a steel leaf with
          // a little light behind its glazed panel; the lamp is a small fitting
          // across the top, neutral-white LED (the replacement fitting, an
          // assumption shared with features/nightlights.js, whose light map
          // throws its pool on the steps and the snow).
          albedo = vec3(0.15, 0.12, 0.09);
          rough = 0.7;
          float fit = step(0.42, fuv.x) * step(fuv.x, 1.02) * smoothstep(1.86, 1.92, fuv.y);
          emit = uNight * (0.05 + 1.5 * fit);
          emitC = vec3(0.95, 0.92, 0.84);
        } else if (ki == 9) {
          // The vestibule box. It is an addition, so it is almost never the
          // colour of the block it hangs off — it gets whatever paint the
          // управляющая компания had, and it weathers on its own schedule.
          // That is the one place a per-building hue lottery is truthful.
          float vh = hash21(vec2(seed * 131.0, 4.9));
          vec3 vc = vh < 0.32 ? vec3(0.46, 0.42, 0.33)
                  : vh < 0.55 ? vec3(0.34, 0.38, 0.40)
                  : vh < 0.74 ? vec3(0.30, 0.36, 0.30)
                  : vh < 0.89 ? vec3(0.44, 0.44, 0.43) : vec3(0.40, 0.28, 0.22);
          albedo = vc * (0.88 + 0.22 * vnoise(fuv * 2.6 + seed * 43.0));
          // splashed and salted to about knee height
          albedo = mix(albedo, vec3(0.26, 0.25, 0.23), 0.55 * smoothstep(0.85, 0.15, fuv.y));
          rough = 0.85;
        } else if (ki == 10) {
          // painted steel handrail — teal is the Yakutian ЖКХ default and it
          // is what DSC 4571 shows on both flights
          float rh2 = hash21(vec2(seed * 197.0, 8.3));
          albedo = rh2 < 0.5 ? vec3(0.075, 0.165, 0.150)
                 : rh2 < 0.78 ? vec3(0.085, 0.115, 0.175) : vec3(0.20, 0.10, 0.07);
          rough = 0.55;
        } else if (ki == 11) {
          // Expanded-metal screen across the crawl space: dark, and its own
          // weave is what stops it reading as a painted board.
          float g = step(0.30, fract(fuv.x / 0.11)) * step(0.30, fract(fuv.y / 0.11));
          albedo = mix(vec3(0.055, 0.057, 0.060), vec3(0.115, 0.116, 0.118), g);
          albedo *= 0.85 + 0.3 * vnoise(fuv * 1.5 + seed * 27.0);
          rough = 0.75;
        }

        // ?prov=1 — the provenance map. Walls flood in the colour of where
        // their appearance decision came from, so "which buildings are still
        // generic" is a glance instead of an audit: red default, amber
        // register, blue measured, green survey.
        if (uProv > 0.5 && (ki == 0 || ki == 5)) {
          albedo = wProv < 0.5 ? vec3(0.45, 0.10, 0.08)
                 : wProv < 1.5 ? vec3(0.48, 0.32, 0.07)
                 : wProv < 2.5 ? vec3(0.10, 0.22, 0.48) : vec3(0.10, 0.42, 0.14);
          emit = 0.0; rough = 0.9;
        }

        // Snow lies on whatever faces up — roofs, parapet caps, canopies,
        // sills — but not under the building or on glass.
        float lie = clamp(uSnow * smoothstep(0.35, 0.80, clamp(vWNrm.y, 0.0, 1.0))
                          * (0.85 + 0.3 * vnoise(fuv * 0.8)), 0.0, 1.0);
        if (ki == 2 || ki == 4) lie = 0.0;
        albedo = mix(albedo, vec3(0.82, 0.85, 0.90), lie);
        rough = mix(rough, 0.85, lie);

        diffuseColor.rgb *= albedo;
        gRough = rough;
        totalEmissiveRadiance += emitC * emit * 2.4;
      `).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = gRough;`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
        {
          vec3 nW = normalize(vWNrm);
          float wallish = clamp(1.0 - abs(nW.y) * 1.4, 0.0, 1.0);
          vec3 le = lampRaw(vLampXZ + nW.xz * 3.0);
          float hy = max(fuv.y, 0.0);
          float fs = exp(-max(hy - 7.0, 0.0) / 5.0);
          float fd = exp(-max(hy - 3.0, 0.0) / 1.6);
          vec3 lv = (uLampCol * le.r * fs + uDoorCol * le.g * fd) * wallish * 0.6;
          if (ki == 7 || ki == 9 || ki == 10) lv += lampIrr(vLampXZ) * clamp(nW.y, 0.0, 1.0);
          reflectedLight.directDiffuse += BRDF_Lambert(diffuseColor.rgb) * lv;
        }`)},t.customProgramCacheKey=()=>`mirny-buildings-v6-lamps`,t}function Gt(e){let t=new DataView(e),n=t.getUint32(0,!0),r=4,i=[];for(let e=0;e<n;e++){let e=t.getUint8(r),n=t.getFloat32(r+1,!0),a=t.getUint16(r+5,!0);r+=7;let o=new Float32Array(a*2*3);for(let e=0;e<a*2*3;e++)o[e]=t.getFloat32(r,!0),r+=4;let s=new Float32Array(a*2*2);for(let e=0;e<a*2*2;e++)s[e]=t.getFloat32(r,!0),r+=4;i.push({klass:e,half:n,np:a,pos:o,uv:s})}return i}function Kt(e){let t=0,n=0;for(let r of e)t+=r.np*2,n+=r.np-1;let r=new Float32Array(t*3),i=new Float32Array(t*3),a=new Float32Array(t*2),o=new Float32Array(t*2),s=new Uint32Array(n*6),c=0,l=0;for(let t of e){let e=c;for(let e=0;e<t.np*2;e++)r[(c+e)*3]=t.pos[e*3],r[(c+e)*3+1]=t.pos[e*3+1],r[(c+e)*3+2]=t.pos[e*3+2],i[(c+e)*3+1]=1,a[(c+e)*2]=t.uv[e*2],a[(c+e)*2+1]=t.uv[e*2+1],o[(c+e)*2]=t.klass,o[(c+e)*2+1]=t.half;for(let n=0;n<t.np-1;n++){let r=e+n,i=e+n+1,a=e+t.np+n,o=e+t.np+n+1;s[l++]=r,s[l++]=a,s[l++]=o,s[l++]=r,s[l++]=o,s[l++]=i}c+=t.np*2}let u=new v;return u.setAttribute(`position`,new K(r,3)),u.setAttribute(`normal`,new K(i,3)),u.setAttribute(`aFuv`,new K(a,2)),u.setAttribute(`aRoad`,new K(o,2)),u.setIndex(new K(s,1)),u.computeVertexNormals(),u.computeBoundingSphere(),{geometry:u,ways:e.length,tris:l/3}}function qt(){let e={uSnow:{value:1}},t=new u({roughness:.7,metalness:0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-3});return t.userData.uniforms=e,t.onBeforeCompile=t=>{Object.assign(t.uniforms,e,Te),t.vertexShader=t.vertexShader.replace(`#include <common>`,`#include <common>
        attribute vec2 aFuv; attribute vec2 aRoad;
        varying vec2 vFuv; varying vec2 vRoad; varying vec2 vLampXZ;`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
        vFuv = aFuv; vRoad = aRoad;`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
        vLampXZ = (modelMatrix * vec4(transformed, 1.0)).xz;`),t.fragmentShader=t.fragmentShader.replace(`#include <common>`,`#include <common>
        varying vec2 vFuv; varying vec2 vRoad; varying vec2 vLampXZ;
        uniform float uSnow;
        float gRough;
        ${Ee}
        ${Y}`).replace(`#include <map_fragment>`,`
        float across = vFuv.x;                 // 0 = left kerb, 1 = right kerb
        float along = vFuv.y;                  // metres
        float edge = min(across, 1.0 - across) * 2.0;   // 0 at kerb, 1 at centre
        float fromKerb = edge * vRoad.y;       // metres in from the nearer kerb
        float klass = vRoad.x;

        // Surface by class. A track outside town is bare dirt and a garage-row
        // service lane is gravel; drawing both as asphalt put a paved network
        // across the taiga.
        vec3 base = vec3(${xe.asphalt});
        float rough = 0.70;
        if (klass > 2.5) {                     // track
          base = vec3(${xe.roadDirt});
          rough = 0.94;
        } else if (klass > 1.5) {              // service, pedestrian
          base = vec3(${xe.roadGravel});
          rough = 0.88;
        }
        // Deliberately less break-up than the ground has. What makes a street
        // legible from the air in the reference is not its tone — it is within
        // a few percent of the yards either side — it is that a carriageway is
        // *smooth* where a courtyard is mottled with concrete patches, parked
        // cars and scrub. Matched to the ground's own noise the network
        // dissolved into the quarters completely.
        vec3 albedo = base * (0.91 + 0.18 * fbm(vec2(along * 0.35, across * 4.0)));

        // Nothing here has a kerb. Every carriageway in the imagery bleeds into
        // a scuffed shoulder a metre or so wide, darker than the running
        // surface, before the yard starts — and that dark margin is the other
        // half of why a street reads. A ribbon ending on a razor edge against
        // green was the most artificial thing left in a quarter. Narrow, and in
        // the ribbon, so it cannot chew at the road the way the old splat
        // jitter did.
        float shoulder = smoothstep(1.35, 0.10, fromKerb);
        albedo = mix(albedo, vec3(${xe.roadDirt}) * 0.62, shoulder * 0.72);
        rough = mix(rough, 0.95, shoulder * 0.72);

        // Mirny does not clear its roads to asphalt, it compacts them. From
        // October the carriageway is a packed snow-ice surface most of a metre
        // thick, pale grey, with darker polished wheel tracks and a plough bank
        // either side. Drawn as bare asphalt the street network came out as
        // black cord laid over a white model — graphically legible and quite
        // wrong for the place.
        float bank = uSnow * smoothstep(0.40, 0.05, edge);
        float film = uSnow * (0.62 + 0.30 * fbm(vec2(along * 0.12, across * 2.0)));
        albedo = mix(albedo, vec3(0.56, 0.59, 0.64), clamp(film, 0.0, 1.0));
        // two polished tracks where the wheels run
        float track = smoothstep(0.085, 0.0, abs(abs(across - 0.5) - 0.20));
        albedo *= 1.0 - 0.34 * track * uSnow;
        albedo = mix(albedo, vec3(0.82, 0.85, 0.90), clamp(bank, 0.0, 1.0));
        rough = mix(rough, 0.86, clamp(bank, 0.0, 1.0));
        rough = mix(rough, 0.42, track * uSnow);

        // Centre line, main roads only, and only where neither the plough nor
        // the dust has buried it. It is nearly gone on purpose: sampled at z17
        // over shosse Kirova — primary, tagged lanes=2, the best-marked road
        // in town — the imagery shows no marking at all, and at full strength
        // this striped the whole town yellow from the air. What is left is the
        // worn remnant that reads from a car and disappears from a helicopter.
        if (klass < 0.5) {
          float c = smoothstep(0.05, 0.0, abs(across - 0.5)) * step(0.5, fract(along / 9.0));
          albedo = mix(albedo, vec3(0.50, 0.46, 0.24), c * 0.22 * (1.0 - uSnow * 0.85));
        }
        diffuseColor.rgb *= albedo;
        gRough = rough;
      `).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = gRough;`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
        reflectedLight.directDiffuse += BRDF_Lambert(diffuseColor.rgb) * lampIrr(vLampXZ);`)},t.customProgramCacheKey=()=>`mirny-roads-lamps`,t}var Jt=900,Yt=[800,2e3],Xt=1400,Zt=3600;function Qt(e,t,n,r,i){let a=new y(t,n,r,1,!0);return a.translate(0,e+n/2,0),a.setAttribute(`aPart`,new V(Array(a.attributes.position.count).fill(i),1)),a}function $t(e){let t=[];if(e===0){let e=new a(.014,.03,.42,6,1,!0);e.translate(0,.21,0),e.setAttribute(`aPart`,new V(Array(e.attributes.position.count).fill(0),1)),t.push(e,Qt(.2,.175,.38,9,1),Qt(.46,.135,.34,9,1),Qt(.7,.085,.32,8,1))}else if(e===1){let e=new a(.016,.03,.3,4,1,!0);e.translate(0,.15,0),e.setAttribute(`aPart`,new V(Array(e.attributes.position.count).fill(0),1)),t.push(e,Qt(.16,.17,.5,6,1),Qt(.6,.105,.42,6,1))}else t.push(Qt(.1,.165,.92,5,1));let n=F(t,!1);return n.computeVertexNormals(),n}function en(e){let t=new DataView(e).getUint32(0,!0),n=4,r=new Float32Array(e,n,t*3);n+=t*12;let i=new Float32Array(e,n,t);n+=t*4;let a=new Float32Array(e,n,t);return n+=t*4,{n:t,pos:r,hgt:i,rot:a,spec:new Uint8Array(e,n,t)}}var tn=class{constructor(e,t){this.group=new p,this.geoms=[$t(0),$t(1),$t(2)],this.tiles=[],this.count=e.n;let n=new Map;for(let t=0;t<e.n;t++){let r=e.pos[t*3],i=e.pos[t*3+2],a=`${Math.floor(r/Jt)},${Math.floor(i/Jt)}`,o=n.get(a);o||n.set(a,o=[]),o.push(t)}let r=new s,i=new g,a=new B(0,1,0),o=new ve;for(let s of n.values()){let n=new _(this.geoms[2],t,s.length);n.castShadow=!0,n.receiveShadow=!0,n.instanceMatrix.setUsage(ge);let c=new q;s.forEach((t,s)=>{let l=e.pos[t*3],u=e.pos[t*3+1],d=e.pos[t*3+2],f=e.hgt[t],p=e.spec[t]?1.45:1;i.setFromAxisAngle(a,e.rot[t]),r.compose(new B(l,u,d),i,new B(f*.36*p,f,f*.36*p)),n.setMatrixAt(s,r);let m=(t*2654435761>>>0)%997/997;e.spec[t]?o.setRGB(.34+.1*m,.33+.09*m,.24+.06*m):o.setRGB(.15+.09*m,.2+.1*m,.11+.05*m),n.setColorAt(s,o),c.expandByPoint(new B(l,u,d)),c.expandByPoint(new B(l,u+f,d))}),n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0),c.expandByScalar(12),n.boundingBox=c,n.boundingSphere=c.getBoundingSphere(new j),n.frustumCulled=!0,this.group.add(n),this.tiles.push({mesh:n,centre:c.getCenter(new B),lod:2})}}update(e){let t=0;for(let n of this.tiles){let r=n.centre.distanceTo(e);if(n.mesh.visible=r<Zt,!n.mesh.visible)continue;n.mesh.castShadow=r<Xt,t+=n.mesh.count;let i=r<Yt[0]?0:r<Yt[1]?1:2;i!==n.lod&&(n.lod=i,n.mesh.geometry=this.geoms[i])}this.drawn=t}};function nn(){let e={uSnow:{value:1}},t=new u({vertexColors:!0,roughness:.94,metalness:0});return t.userData.uniforms=e,t.onBeforeCompile=t=>{Object.assign(t.uniforms,e),t.vertexShader=t.vertexShader.replace(`#include <common>`,`#include <common>
        attribute float aPart;
        varying float vPart; varying vec3 vWNrm; varying vec3 vWPos;`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
        vPart = aPart;
        vWNrm = normalize(mat3(modelMatrix) * objectNormal);`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
        vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),t.fragmentShader=t.fragmentShader.replace(`#include <common>`,`#include <common>
        varying float vPart; varying vec3 vWNrm; varying vec3 vWPos;
        uniform float uSnow;
        ${Y}`).replace(`#include <color_fragment>`,`
        // Larch is deciduous. In winter these are bare twigs, not green
        // needles — which is why the Yakutian taiga reads grey-ochre under
        // snow instead of the dark green everyone paints it.
        // Kept dark and only partly desaturated. A bare larch is twigs, and
        // twigs want alpha we do not have — a pale grey solid cone reads as a
        // dead tree rather than a bare one, and a hillside of them reads as a
        // burn scar. Dark enough and the stand aggregates into woodland again.
        vec3 bare = vec3(0.15, 0.13, 0.10);
        vec3 c = mix(vColor.rgb, bare * (0.75 + 0.5 * vnoise(vWPos.xz * 2.3)), uSnow * 0.62);
        if (vPart < 0.5) c = vec3(0.09, 0.075, 0.06);           // trunk
        // snow caught in the crown, upper surfaces only, and not much of it —
        // there are no needles left for it to sit on
        float lie = uSnow * smoothstep(0.30, 0.85, clamp(vWNrm.y, 0.0, 1.0))
                    * (0.30 + 0.45 * vnoise(vWPos.xz * 1.7 + vWPos.y));
        c = mix(c, vec3(0.72, 0.76, 0.82), clamp(lie, 0.0, 0.55) * step(0.5, vPart));
        diffuseColor.rgb *= c;
      `)},t.customProgramCacheKey=()=>`mirny-trees`,t}var rn=7,an=9,on=.035;function sn(e){let t=new DataView(e),n=t.getUint32(0,!0),r=4,i=[];for(let e=0;e<n;e++){let e=t.getUint8(r),n=t.getFloat32(r+1,!0),a=t.getFloat32(r+5,!0),o=t.getUint16(r+9,!0);r+=11;let s=new Float32Array(o*3);for(let e=0;e<o*3;e++)s[e]=t.getFloat32(r,!0),r+=4;i.push({kind:e,height:n,radius:a,pts:s,n:o})}return i}var cn=class{constructor(){this.P=[],this.N=[],this.C=[]}tri(e,t,n,r,i){for(let a of[e,t,n])this.P.push(a[0],a[1],a[2]),this.N.push(r[0],r[1],r[2]),this.C.push(i[0],i[1],i[2])}quad(e,t,n,r,i,a){this.tri(e,t,n,i,a),this.tri(e,n,r,i,a)}box(e,t,n,r,i,a,o){let[s,c]=[e-r,e+r],[l,u]=[t-i,t+i],[d,f]=[n-a,n+a],p=(e,t,n)=>[e,t,n];this.quad(p(s,l,d),p(c,l,d),p(c,u,d),p(s,u,d),[0,0,-1],o),this.quad(p(c,l,f),p(s,l,f),p(s,u,f),p(c,u,f),[0,0,1],o),this.quad(p(c,l,d),p(c,l,f),p(c,u,f),p(c,u,d),[1,0,0],o),this.quad(p(s,l,f),p(s,l,d),p(s,u,d),p(s,u,f),[-1,0,0],o),this.quad(p(s,u,d),p(c,u,d),p(c,u,f),p(s,u,f),[0,1,0],o)}tube(e,t,n,r){let i=new B(0,1,0),a=new B,o=new B,s=new B,c=[];for(let r=0;r<e.length;r++){let l=e[Math.max(0,r-1)],u=e[Math.min(e.length-1,r+1)];a.set(u[0]-l[0],u[1]-l[1],u[2]-l[2]),a.lengthSq()<1e-9&&a.set(0,0,1),a.normalize(),o.crossVectors(a,i),o.lengthSq()<1e-6&&o.set(1,0,0),o.normalize(),s.crossVectors(o,a).normalize();let d=[];for(let i=0;i<n;i++){let a=i/n*Math.PI*2,c=Math.cos(a)*t,l=Math.sin(a)*t;d.push({p:[e[r][0]+o.x*c+s.x*l,e[r][1]+o.y*c+s.y*l,e[r][2]+o.z*c+s.z*l],n:[o.x*Math.cos(a)+s.x*Math.sin(a),o.y*Math.cos(a)+s.y*Math.sin(a),o.z*Math.cos(a)+s.z*Math.sin(a)]})}c.push(d)}for(let e=0;e<c.length-1;e++)for(let t=0;t<n;t++){let i=(t+1)%n,a=c[e][t],o=c[e][i],s=c[e+1][i],l=c[e+1][t];this.tri(a.p,o.p,s.p,a.n,r),this.tri(a.p,s.p,l.p,a.n,r)}}geometry(){let e=new v;return e.setAttribute(`position`,new V(this.P,3)),e.setAttribute(`normal`,new V(this.N,3)),e.setAttribute(`color`,new V(this.C,3)),e.computeBoundingSphere(),e}},ln=[.52,.5,.46],un=[.26,.26,.27],dn=[.09,.09,.1],fn=[.2,.17,.13];function pn(e,t){let{pts:n,n:r,height:i,radius:a}=t,o=[];for(let e=0;e<r;e++)o.push([n[e*3],n[e*3+1]+i,n[e*3+2]]);e.tube(o,a,rn,ln);let s=0;for(let t=0;t<r-1;t++){let r=n[t*3],o=n[t*3+1],c=n[t*3+2],l=n[t*3+3],u=n[t*3+4],d=n[t*3+5],f=Math.hypot(l-r,d-c);if(!(f<.01)){for(let t=s;t<f;t+=an){let n=t/f,s=r+(l-r)*n,p=c+(d-c)*n,m=o+(u-o)*n,h=m+i;e.box(s,(m+h-a)/2,p,.13,(h-a-m)/2,.13,un),e.box(s,h-a*.3,p,a*1.25,.09,.16,un)}s=(s-f)%an,s<0&&(s+=an)}}}function mn(e,t){let{pts:n,n:r,height:i,radius:a}=t,o=i>18,s=o?5:1.5,c=o?[-s,0,s]:[-s,s];for(let t=0;t<r-1;t++){let r=[n[t*3],n[t*3+1]+i,n[t*3+2]],o=[n[t*3+3],n[t*3+4]+i,n[t*3+5]],s=o[0]-r[0],l=o[2]-r[2],u=Math.hypot(s,l);if(u<1||u>900)continue;let d=-l/u,f=s/u,p=u*on;for(let t of c){let n=[];for(let e=0;e<=6;e++){let i=e/6,a=4*p*i*(1-i);n.push([r[0]+s*i+d*t,r[1]+(o[1]-r[1])*i-a,r[2]+l*i+f*t])}e.tube(n,a,4,dn)}}for(let t=0;t<r;t++){let r=n[t*3],a=n[t*3+1],c=n[t*3+2],l=a+i;if(o){for(let[t,n]of[[-1.7,-1.7],[1.7,-1.7],[1.7,1.7],[-1.7,1.7]])e.box(r+t*.55,(a+l)/2,c+n*.55,.22,(l-a)/2,.22,un);e.box(r,l-1.2,c,s,.22,.3,un),e.box(r,l-5.5,c,s*.8,.2,.28,un)}else e.box(r,(a+l)/2,c,.16,(l-a)/2,.16,fn),e.box(r,l-.7,c,s,.09,.11,fn)}}function hn(e){let t=new cn,n=0,r=0;for(let i of e)i.n<2||(i.kind===0?(pn(t,i),n++):(mn(t,i),r++));return{geometry:t.geometry(),pipes:n,spans:r,tris:t.P.length/9}}function gn(){let e={uSnow:{value:1}},t=new u({vertexColors:!0,roughness:.82,metalness:.15});return t.userData.uniforms=e,t.onBeforeCompile=t=>{Object.assign(t.uniforms,e),t.vertexShader=t.vertexShader.replace(`#include <common>`,`#include <common>
 varying vec3 vWNrm; varying vec3 vWPos;`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
        vWNrm = normalize(mat3(modelMatrix) * objectNormal);`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
        vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),t.fragmentShader=t.fragmentShader.replace(`#include <common>`,`#include <common>
        varying vec3 vWNrm; varying vec3 vWPos;
        uniform float uSnow;
        ${Y}`).replace(`#include <color_fragment>`,`
        vec3 c = vColor.rgb * (0.82 + 0.36 * vnoise(vWPos.xz * 1.4 + vWPos.y * 0.7));
        // A cap of snow along the top of every run — the giveaway that the pipe
        // is outdoors and has been all winter.
        float lie = uSnow * smoothstep(0.45, 0.92, clamp(vWNrm.y, 0.0, 1.0));
        c = mix(c, vec3(0.80, 0.83, 0.88), clamp(lie, 0.0, 0.9));
        diffuseColor.rgb *= c;
      `)},t.customProgramCacheKey=()=>`mirny-infra`,t}var _n=[];function vn(e={}){let t={uSnow:{value:1},uNight:{value:0},uLie:{value:e.snow??1}},n=new u({roughness:e.roughness??.9,metalness:e.metalness??0,vertexColors:e.vertexColors??!0});return e.color!==void 0&&n.color.set(e.color),e.emissive!==void 0&&n.emissive.set(e.emissive),n.userData.uniforms=t,n.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
        varying vec3 vLmNrm; varying vec3 vLmPos;`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
        vLmNrm = normalize(mat3(modelMatrix) * objectNormal);`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        vLmPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        varying vec3 vLmNrm; varying vec3 vLmPos;
        uniform float uSnow; uniform float uNight; uniform float uLie;`).replace(`#include <color_fragment>`,`#include <color_fragment>
        {
          float nz = fract(sin(dot(floor(vLmPos.xz * 1.7),
                                   vec2(127.1, 311.7))) * 43758.5453);
          float lie = clamp(uSnow * uLie
                            * smoothstep(0.45, 0.85, vLmNrm.y)
                            * (0.75 + 0.5 * nz), 0.0, 1.0);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.82, 0.85, 0.90), lie);
        }`)},n.customProgramCacheKey=()=>`mirny-lm-${e.key??`std`}-${e.snow??1}`,_n.push(n),n}var yn=[[-50,-102.8],[-49.6,-96.6],[-47.5,-89.2],[-44.8,-84.3],[-41,-79.4],[-36.3,-74.8],[-31.9,-71.7],[-26.1,-68.9],[-20,-67.2],[-11.9,-66.4],[-4.7,-67.4],[1.5,-69.5],[7.1,-72.7],[12.3,-77],[17.4,-84.6],[19.9,-89.2],[44.5,-184.6],[43.6,-192.3],[40.9,-199.7],[38,-205.6],[32.3,-211.3],[27.3,-215.3],[20,-219],[13.3,-220.5],[3.7,-220.8],[-3.7,-219.1],[-10.3,-216.2],[-15.3,-212.4],[-19.9,-208.1],[-23.5,-202.2]],bn=[{id:`west`,roofed:!0,rows:9,a:[[-65.3,-107.7],[-38.3,-206]],b:[[-74.2,-110.2],[-47.2,-208.4]]},{id:`sw`,rows:6,a:[[-27.7,-55],[-66,-65],[-69.2,-54.1]],b:[[-29.9,-46.4],[-69.2,-54.1]]},{id:`south`,rows:6,a:[[-27.7,-55],[-27.3,-57.2],[-23.2,-55.9],[-19,-55.2],[-14.6,-54.9],[-9.6,-55],[-5,-55.5],[-.1,-56.5],[5,-58.2],[9.5,-60.2],[14,-63.1],[18.6,-66.7],[23.8,-61]],b:[[-29,-49.5],[-22.7,-48.1],[-16.8,-47.6],[-9,-47.6],[-.9,-48.4],[6.9,-51],[13.8,-54.4],[19.2,-57.3],[23.8,-61]]},{id:`east`,rows:6,a:[[30.4,-65.7],[24.6,-71.1],[29.2,-77.5],[31.7,-81.8],[33.4,-86.4],[55.9,-173.6],[56.9,-178.9],[57,-185.2],[56.3,-191.9],[63.6,-193]],b:[[30.4,-65.7],[33.9,-70.8],[36.8,-75.3],[39.1,-79.9],[40.8,-84.6],[63.1,-172.1],[64.3,-177.7],[64.4,-182.4],[64,-187.7],[63.6,-193]]},{id:`ne`,rows:6,a:[[60.2,-203.7],[53.1,-200.9],[51.6,-205.3],[49.8,-209],[47.8,-212.7],[45,-216.3],[41.2,-220.1],[38.6,-222.3],[33.8,-225.7],[29.3,-228.7],[24.5,-230.4],[20.4,-231.9],[21.9,-238.5]],b:[[60.2,-203.7],[58.1,-208.9],[55.8,-213.1],[52.4,-218.5],[49.1,-222.3],[44.9,-226.1],[40.4,-229.7],[35.4,-233.2],[28.9,-236],[21.9,-238.5]]},{id:`north`,rows:6,a:[[20,-239.1],[18.7,-233.8],[-13.6,-241.9]],b:[[20,-239.1],[20.5,-240.9],[-11.8,-249]]}],xn=[[-121.4,-99.8],[-102.5,-163.1],[-81,-252.8],[-19.1,-234.7],[-15.3,-249.9],[-11.8,-249]],Sn=[[34.5,-60],[70,-197],[-53,-215],[-80.5,-106]],Cn=6,wn=1.22,Tn=.05,En=.3,Dn=1.9,On=.55,kn=.38,An=.45,jn=8.2,Mn=11,Nn=24,Pn=2,Fn=2.6,In=.12,Ln=.1,Rn=2376238,zn=10448998,Bn=5002306,Vn=12165236,Hn=14605010,Un=11053222,Wn=3104680,Gn=3820377,Kn=9277588,qn=9341820;function Jn(){return{p:[],n:[],c:[]}}var Yn=new ve;function Xn(e,t,n,r,i){let a=n[0]-t[0],o=n[1]-t[1],s=n[2]-t[2],c=r[0]-t[0],l=r[1]-t[1],u=r[2]-t[2],d=o*u-s*l,f=s*c-a*u,p=a*l-o*c,m=Math.hypot(d,f,p)||1;d/=m,f/=m,p/=m,Yn.setHex(i,de);for(let i of[t,n,r])e.p.push(i[0],i[1],i[2]),e.n.push(d,f,p),e.c.push(Yn.r,Yn.g,Yn.b)}function Zn(e,t,n,r,i,a){Xn(e,t,n,r,a),Xn(e,t,r,i,a)}function Qn(e,t,n){return(t[2]-e[2])*(n[0]-e[0])-(t[0]-e[0])*(n[2]-e[2])>=0}function $n(e,t,n,r,i,a){Qn(t,n,r)?Zn(e,t,n,r,i,a):Zn(e,t,i,r,n,a)}function er(e,t,n,r,i){Qn(t,n,r)?Xn(e,t,n,r,i):Xn(e,t,r,n,i)}function tr(e,t){if(!e.p.length)return null;let n=new v;n.setAttribute(`position`,new V(e.p,3)),n.setAttribute(`normal`,new V(e.n,3)),n.setAttribute(`color`,new V(e.c,3));let r=new b(n,t);return r.castShadow=!0,r.receiveShadow=!0,r}function nr(e,t){let n=[],r=[],i=0;for(let t=1;t<e.length;t++){let r=Math.hypot(e[t][0]-e[t-1][0],e[t][1]-e[t-1][1]);n.push(r),i+=r}for(let a=0;a<t;a++){let o=i*a/(t-1),s=0;for(;s<n.length-1&&o>n[s];)o-=n[s],s++;let c=n[s]>1e-6?o/n[s]:0;r.push([e[s][0]+c*(e[s+1][0]-e[s][0]),e[s][1]+c*(e[s+1][1]-e[s][1])])}return r}function rr(e,t){let n=e.concat([e[0]]),r=0;for(let e=1;e<n.length;e++)r+=Math.hypot(n[e][0]-n[e-1][0],n[e][1]-n[e-1][1]);let i=Math.max(24,Math.round(r/t));return nr(n,i+1).slice(0,i)}function ir(e){let t=0,n=0;for(let r of e)t+=r[0],n+=r[1];t/=e.length,n/=e.length;let r=e.length,i=[];for(let a=0;a<r;a++){let o=e[(a-1+r)%r],s=e[a],c=e[(a+1)%r],l=c[1]-o[1],u=-(c[0]-o[0]),d=Math.hypot(l,u)||1;l/=d,u/=d,l*(s[0]-t)+u*(s[1]-n)<0&&(l=-l,u=-u),i.push([l,u])}return i}function ar(e){let t=0,n=0;for(let r of e)t+=r[0],n+=r[1];return[t/e.length,n/e.length]}function or(e){let{terrain:t,data:n}=e;if(!n||!n.sites||!n.sites.stadium)return null;let r=(n.sites.stadium.features||[]).find(e=>e.role===`field`);if(!r||!r.rings||!r.rings.length)return null;let i=sr(r.rings[0]);if(!i)return null;let a=new p;a.name=`stadium`;let o=vn({key:`stad-surf`,roughness:.97}),s=vn({key:`stad-conc`,roughness:.9}),c=vn({key:`stad-seat`,roughness:.55,vertexColors:!1,color:Wn}),l=vn({key:`stad-met`,roughness:.6,metalness:.2}),u=vn({key:`stad-lamp`,roughness:.35,vertexColors:!1,color:14146785,emissive:2764598,snow:0}),d=rr(yn,2),f=ir(d),m=(e,n)=>t.heightAt(e,n),h=-1e9;for(let e of d)h=Math.max(h,m(e[0],e[1]));for(let e of i)h=Math.max(h,m(e[0],e[1]));h+=Ln;let g=Jn(),_=Jn(),v=Jn(),y=Jn();ur(g,d,f,h),pr(g,d,f,h,m),mr(g,d,h,i),vr(g,i,h);let b=[],x=[];for(let e of bn)br(e,_,v,b,d,h,m),x.push(lr(e.a.concat(e.b)));for(let e of Sn)Dr(v,y,e[0],e[1],m(e[0],e[1]));Or(v,m),Ar(v,i,h),jr(_,v,i,h);for(let[e,t]of[[g,o],[_,s],[v,l],[y,u]]){let n=tr(e,t);n&&a.add(n)}return b.length&&a.add(Sr(b,c)),{object:a,claims:x}}function sr(e){let t=e.slice();for(;t.length>1;){let e=t[0],n=t[t.length-1];if(Math.hypot(e[0]-n[0],e[1]-n[1])<.5)t.pop();else break}if(t.length<4)return null;let n=null,r=-1;for(let e=0;e<t.length;e++)for(let i=e+1;i<t.length;i++)for(let a=i+1;a<t.length;a++)for(let o=a+1;o<t.length;o++){let s=[t[e],t[i],t[a],t[o]],c=Math.abs(cr(s));c>r&&(r=c,n=s)}return n}function cr(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];t+=r[0]*i[1]-i[0]*r[1]}return t/2}function lr(e){let t=1e9,n=1e9,r=-1e9,i=-1e9;for(let a of e)t=Math.min(t,a[0]),r=Math.max(r,a[0]),n=Math.min(n,a[1]),i=Math.max(i,a[1]);return{x0:t,z0:n,x1:r,z1:i}}function ur(e,t,n,r){let i=[[0,En,Hn]],a=En;for(let e=0;e<Cn;e++)i.push([a,a+wn-Tn,zn]),i.push([a+wn-Tn,a+wn,Hn]),a+=wn;i.push([a,a+Dn,zn]);let o=t.length;for(let[a,s,c]of i)for(let i=0;i<o;i++){let l=(i+1)%o,u=dr(t[i],n[i],a),d=dr(t[l],n[l],a),f=dr(t[l],n[l],s),p=dr(t[i],n[i],s);$n(e,[u[0],r,u[1]],[d[0],r,d[1]],[f[0],r,f[1]],[p[0],r,p[1]],c)}}function dr(e,t,n){return[e[0]+t[0]*n,e[1]+t[1]*n]}function fr(){return 9.52}function pr(e,t,n,r,i){let a=fr(),o=t.length;for(let s=0;s<o;s++){let c=(s+1)%o,l=dr(t[s],n[s],a),u=dr(t[c],n[c],a),d=dr(t[c],n[c],a+15),f=dr(t[s],n[s],a+15);$n(e,[l[0],r,l[1]],[u[0],r,u[1]],[d[0],Math.min(r,i(d[0],d[1])),d[1]],[f[0],Math.min(r,i(f[0],f[1])),f[1]],qn)}}function mr(e,t,n,r){let i=ar(t),a=t.length,o=n-.06;for(let n=0;n<4;n++){let r=n/4,s=(n+1)/4;for(let n=0;n<a;n++){let c=(n+1)%a,l=(e,n)=>[i[0]+(t[n][0]-i[0])*e,i[1]+(t[n][1]-i[1])*e],u=l(r,n),d=l(r,c),f=l(s,c),p=l(s,n);$n(e,[u[0],o,u[1]],[d[0],o,d[1]],[f[0],o,f[1]],[p[0],o,p[1]],Bn)}}let s=gr(r);if(!s)return;let c=hr(s.a,s.b,ar(r)),l=t.map(e=>hr(s.a,s.b,e)*c<0),u=l.indexOf(!0);if(u<0||l.indexOf(!1)<0)return;for(;l[(u-1+a)%a];)u=(u-1+a)%a;let d=[];for(let e=u;l[e]&&d.length<a;e=(e+1)%a)d.push(t[e]);if(d.length<2)return;let f=(e,t)=>Math.hypot(e[0]-t[0],e[1]-t[1]),p=f(d[0],s.a)<f(d[0],s.b)?[s.a].concat(d,[s.b]):[s.b].concat(d,[s.a]),m=ar(p),h=n+.08;for(let t=0;t<p.length;t++){let n=(t+1)%p.length;er(e,[m[0],h,m[1]],[p[t][0],h,p[t][1]],[p[n][0],h,p[n][1]],Vn)}}function hr(e,t,n){return(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0])}function gr(e){let t=null,n=1e9;for(let r=0;r<4;r++){let i=e[r],a=e[(r+1)%4],o=Math.hypot(a[0]-i[0],a[1]-i[1]),s=(i[1]+a[1])/2;o<85&&s<n&&(n=s,t={a:i,b:a})}return t}function _r(e){let t=[];for(let n=0;n<4;n++){let r=e[n],i=e[(n+1)%4];t.push(Math.hypot(i[0]-r[0],i[1]-r[1]))}let n=ar(e),r=t[0]+t[2]>t[1]+t[3],i=+!r,a=e[i],o=e[(i+1)%4],s=o[0]-a[0],c=o[1]-a[1],l=Math.hypot(s,c)||1;s/=l,c/=l;let u=(r?t[0]+t[2]:t[1]+t[3])/4,d=(r?t[1]+t[3]:t[0]+t[2])/4;return{c:n,ux:s,uz:c,vx:-c,vz:s,halfL:u,halfW:d}}function vr(e,t,n){let r=_r(t),i=n+.08;for(let t=0;t<22;t++)for(let n=0;n<16;n++){let a=-r.halfL+2*r.halfL*t/22,o=-r.halfL+2*r.halfL*(t+1)/22,s=-r.halfW+2*r.halfW*n/16,c=-r.halfW+2*r.halfW*(n+1)/16,l=(e,t)=>[r.c[0]+r.ux*e+r.vx*t,i,r.c[1]+r.uz*e+r.vz*t];$n(e,l(a,s),l(o,s),l(o,c),l(a,c),Rn)}yr(e,r,n+.17)}function yr(e,t,n){let r=t.halfL-Fn,i=t.halfW-Fn,a=(e,r)=>[t.c[0]+t.ux*e+t.vx*r,n,t.c[1]+t.uz*e+t.vz*r],o=(t,n,r,i)=>{let o=r-t,s=i-n,c=Math.hypot(o,s)||1,l=-s/c*(In/2),u=o/c*(In/2);$n(e,a(t+l,n+u),a(r+l,i+u),a(r-l,i-u),a(t-l,n-u),Hn)};o(-r,-i,r,-i),o(r,-i,r,i),o(r,i,-r,i),o(-r,i,-r,-i),o(0,-i,0,i);for(let e=0;e<40;e++){let t=e/40*Math.PI*2,n=(e+1)/40*Math.PI*2;o(9.15*Math.cos(t),9.15*Math.sin(t),9.15*Math.cos(n),9.15*Math.sin(n))}for(let e of[-1,1]){for(let[t,n]of[[16.5,20.16],[5.5,9.16]]){let i=e*r,a=e*(r-t);o(i,-n,a,-n),o(a,-n,a,n),o(a,n,i,n)}let t=e*(r-11);o(t-.3,0,t+.3,0)}}function br(e,t,n,r,i,a,o){let s=ar(i),c=nr(e.a,28),l=nr(e.b,28),u=e=>e.reduce((e,t)=>e+Math.hypot(t[0]-s[0],t[1]-s[1]),0)/e.length;if(u(c)>u(l)){let e=c;c=l,l=e}let d=Math.hypot(c[0][0]-l[0][0],c[0][1]-l[0][1]);Math.hypot(c[0][0]-l[27][0],c[0][1]-l[27][1])<d&&l.reverse();let f=a,p=e=>Math.min(f,o(e[0],e[1]))-.4,m=e.rows,h=(e,t)=>[c[e][0]+(l[e][0]-c[e][0])*t,c[e][1]+(l[e][1]-c[e][1])*t],g=e=>f+An+e*kn;for(let e=0;e<m;e++){let n=e/m,i=(e+1)/m,a=g(e);for(let r=0;r<27;r++){let o=h(r,n),s=h(r+1,n),c=h(r+1,i),l=h(r,i);$n(t,[o[0],a,o[1]],[s[0],a,s[1]],[c[0],a,c[1]],[l[0],a,l[1]],Un);let u=g(e+1);Zn(t,[c[0],a,c[1]],[s[0],a,s[1]],[s[0],u,s[1]],[c[0],u,c[1]],Un)}let o=[];for(let e=0;e<28;e++)o.push(h(e,n+(i-n)*.62));xr(r,o,a,c,l)}let _=g(m);for(let e=0;e<27;e++){let n=h(e,0),r=h(e+1,0);Zn(t,[n[0],p(n),n[1]],[r[0],p(r),r[1]],[r[0],g(0),r[1]],[n[0],g(0),n[1]],Un);let i=h(e,1),a=h(e+1,1);Zn(t,[a[0],p(a),a[1]],[i[0],p(i),i[1]],[i[0],_,i[1]],[a[0],_,a[1]],Un)}for(let e of[0,27]){let n=h(e,0),r=h(e,1);Zn(t,[n[0],p(n),n[1]],[r[0],p(r),r[1]],[r[0],_,r[1]],[n[0],g(0),n[1]],Un)}e.roofed?Cr(n,c,l,28,f,_):Tr(n,l,28,_)}function xr(e,t,n,r,i){for(let a=0;a<t.length-1;a++){let o=t[a][0],s=t[a][1],c=t[a+1][0],l=t[a+1][1],u=Math.hypot(c-o,l-s),d=Math.floor(u/On);for(let t=0;t<d;t++){let u=(t+.5)/Math.max(1,d),f=o+(c-o)*u,p=s+(l-s)*u,m=r[a][0]-i[a][0],h=r[a][1]-i[a][1];e.push([f,n,p,Math.atan2(m,h)])}}}function Sr(e,t){let n=new v,r=Jn(),i=.22,a=.42,o=.94,c=-.18,l=.2;Zn(r,[-.22,a,c],[i,a,c],[i,a,l],[-.22,a,l],Wn),Zn(r,[-.22,a,c],[-.22,o,c],[i,o,c],[i,a,c],Wn),n.setAttribute(`position`,new V(r.p,3)),n.setAttribute(`normal`,new V(r.n,3));let u=new _(n,t,e.length),d=new s,f=new g,p=new ne,m=new B,h=new B(1,1,1);for(let t=0;t<e.length;t++)p.set(0,e[t][3],0),f.setFromEuler(p),m.set(e[t][0],e[t][1],e[t][2]),u.setMatrixAt(t,d.compose(m,f,h));return u.instanceMatrix.needsUpdate=!0,u.castShadow=!0,u.receiveShadow=!0,u}function Cr(e,t,n,r,i,a){let o=i+jn,s=i+Mn;for(let i=0;i<r-1;i++){let r=wr(t[i],n[i],-1.4),a=wr(t[i+1],n[i+1],-1.4),c=n[i],l=n[i+1];Zn(e,[r[0],o,r[1]],[a[0],o,a[1]],[l[0],s,l[1]],[c[0],s,c[1]],Gn),Zn(e,[r[0],o,r[1]],[r[0],o-.5,r[1]],[a[0],o-.5,a[1]],[a[0],o,a[1]],Hn)}for(let t=0;t<r-1;t++){let r=n[t],i=n[t+1];Zn(e,[r[0],a,r[1]],[i[0],a,i[1]],[i[0],s,i[1]],[r[0],s,r[1]],Gn)}for(let a=2;a<r-1;a+=4){let r=wr(t[a],n[a],-1.4*.2);Er(e,r[0],i,r[1],.32,o-i,.32,Kn)}}function wr(e,t,n){let r=t[0]-e[0],i=t[1]-e[1],a=Math.hypot(r,i)||1;return[e[0]+r/a*n,e[1]+i/a*n]}function Tr(e,t,n,r){for(let i=0;i<n-1;i++){let n=t[i],a=t[i+1];Zn(e,[n[0],r,n[1]],[a[0],r,a[1]],[a[0],r+1.1,a[1]],[n[0],r+1.1,n[1]],Kn)}}function Er(e,t,n,r,i,a,o,s){let c=t-i/2,l=t+i/2,u=r-o/2,d=r+o/2,f=n+a;Zn(e,[c,f,u],[l,f,u],[l,f,d],[c,f,d],s),Zn(e,[c,n,u],[c,f,u],[l,f,u],[l,n,u],s),Zn(e,[l,n,u],[l,f,u],[l,f,d],[l,n,d],s),Zn(e,[l,n,d],[l,f,d],[c,f,d],[c,n,d],s),Zn(e,[c,n,d],[c,f,d],[c,f,u],[c,n,u],s)}function Dr(e,t,n,r,i){let a=Nn;for(let t=0;t<4;t++){let o=i+a*t/4,s=i+a*(t+1)/4,c=.75-.11*t,l=.75-.11*(t+1);for(let t=0;t<4;t++){let i=t/4*Math.PI*2,a=(t+1)/4*Math.PI*2;Zn(e,[n+Math.cos(i)*c,o,r+Math.sin(i)*c],[n+Math.cos(a)*c,o,r+Math.sin(a)*c],[n+Math.cos(a)*l,s,r+Math.sin(a)*l],[n+Math.cos(i)*l,s,r+Math.sin(i)*l],Kn)}}Er(e,n,i+a,r,4.4,.35,1.5,Kn);for(let e=0;e<3;e++)Er(t,n-1.4+e*1.4,i+a+.35,r,1.1,.55,1.2,0)}function Or(e,t){let n=nr(xn,Math.max(2,Math.round(kr(xn)/2.6)));for(let r=0;r<n.length-1;r++){let i=n[r],a=n[r+1],o=t(i[0],i[1]),s=t(a[0],a[1]);Zn(e,[i[0],o+.25,i[1]],[a[0],s+.25,a[1]],[a[0],s+Pn,a[1]],[i[0],o+Pn,i[1]],Kn),r%2==0&&Er(e,i[0],o,i[1],.16,2.15,.16,Kn)}}function kr(e){let t=0;for(let n=1;n<e.length;n++)t+=Math.hypot(e[n][0]-e[n-1][0],e[n][1]-e[n-1][1]);return t}function Ar(e,t,n){let r=_r(t),i=r.halfL-Fn;for(let t of[-1,1]){let a=(e,t,n)=>[r.c[0]+r.ux*e+r.vx*t,n,r.c[1]+r.uz*e+r.vz*t],o=t*i,s=2.44,c=3.66,l=1.9;for(let t of[-3.66,c]){let r=a(o,t,n),i=a(o,t,n+s);Zn(e,[r[0]-.06,n,r[2]],[r[0]+.06,n,r[2]],[i[0]+.06,n+s,i[2]],[i[0]-.06,n+s,i[2]],Hn)}let u=a(o,-3.66,n+s),d=a(o,c,n+s);Zn(e,[u[0],n+s,u[2]],[d[0],n+s,d[2]],[d[0],n+s+.12,d[2]],[u[0],n+s+.12,u[2]],Hn);let f=a(o+t*l,-3.66,n),p=a(o+t*l,c,n);Zn(e,[f[0],n,f[2]],[p[0],n,p[2]],[p[0],n+s*.75,p[2]],[f[0],n+s*.75,f[2]],Hn)}}function jr(e,t,n,r){let i=_r(n),a=i.halfW+1.6;for(let n of[-9,9]){let o=[i.c[0]+i.ux*n+i.vx*a,i.c[1]+i.uz*n+i.vz*a];Er(e,o[0],r,o[1],6,1.1,2.2,Un),Er(t,o[0],r+1.1,o[1],6.2,.18,2.4,Hn)}}var Mr=[[-573.26,-128.31],[-535.65,-118.64],[-540.15,-101.21],[-577.76,-110.88],[-575.52,-119.54],[-573.26,-128.31]],Nr=[-557.3,-87.5],Pr=2,Fr=12.6,Ir=13.2,Lr=15.2,Rr=16.6,zr=19.6,Br=17.6,Vr=4.9,Hr=3.8,Ur=32,Wr=2.3,Gr=1.9,Kr=24,qr=-8,Jr=9.4,Yr=12,Xr=16,Zr=16.6,Qr=12.6,$r=-15,ei=3.3,ti=2,ni=5.4,Q={wall:14730396,trim:15790057,granite:9343125,pave:10723481,metal:2896432,iron:1711134,gold:14200138,glass:2901840,door:9067059,icon:12096063,figure:4016747,lamp:16770736};function ri(){return{pos:[],nrm:[],col:[],idx:[],n:0}}var ii=new x,ai=new B,oi=new ve,si=new s;function ci(e,t,n,r,i){let a=t;i&&(a=t.toNonIndexed(),a.computeVertexNormals());let o=a.attributes.position,s=a.attributes.normal;ii.getNormalMatrix(n),oi.setHex(r);let c=e.n;for(let t=0;t<o.count;t++)ai.fromBufferAttribute(o,t).applyMatrix4(n),e.pos.push(ai.x,ai.y,ai.z),ai.fromBufferAttribute(s,t).applyMatrix3(ii).normalize(),e.nrm.push(ai.x,ai.y,ai.z),e.col.push(oi.r,oi.g,oi.b);if(a.index)for(let t=0;t<a.index.count;t++)e.idx.push(c+a.index.getX(t));else for(let t=0;t<o.count;t++)e.idx.push(c+t);e.n+=o.count,a!==t&&a.dispose(),t.dispose()}function li(e){let t=new v;return t.setAttribute(`position`,new V(e.pos,3)),t.setAttribute(`normal`,new V(e.nrm,3)),t.setAttribute(`color`,new V(e.col,3)),t.setIndex(e.idx),t}function ui(e,t,n,r,i,a,o,s){si.makeTranslation((n+a)/2,(r+o)/2,(i+s)/2),ci(e,new k(Math.abs(a-n),Math.abs(o-r),Math.abs(s-i)),si,t)}function di(e,t,n,r,i,a,o,s,c=0){si.makeRotationY(c).setPosition(n,r,i),ci(e,new k(a,o,s),si,t)}function fi(e,t,n,r,i,o,s,c,l,u){si.makeTranslation(n,r+c/2,i),ci(e,new a(o,s,c,l),si,t,u)}function pi(e,t,n){let r=(e*e+t*t)/(2*t),i=t-r,a=[];for(let t=0;t<=n;t++){let o=-e+2*e*t/n;a.push([o,i+Math.sqrt(Math.max(0,r*r-o*o))])}return a}function mi(e,t,n,r=9){let i=new W;i.moveTo(-e/2,0),i.lineTo(e/2,0),i.lineTo(e/2,t);for(let[a,o]of pi(e/2,n,r))i.lineTo(-a,t+o);return i.lineTo(-e/2,0),i}var hi={bevelEnabled:!1,curveSegments:6},gi=[[0,1],[0,-1],[1,0],[-1,0]],_i=[0,Math.PI,Math.PI/2,-Math.PI/2];function vi(e,n,r,i,a,o,s,c){si.makeRotationY(_i[c]).setPosition(a,o,s),ci(e,new t(r,{...hi,depth:i}),si,n)}function yi(e,t,n,r,i,a,o,s){let c=gi[s];vi(e,Q.trim,mi(n+.5,r+.25,(n+.5)/2),.2,i,a-.12,o,s),vi(t,Q.glass,mi(n,r,n/2),.14,i-c[0]*.2,a,o-c[1]*.2,s)}function bi(e,t,n,r,i,a,o){let s=[[.7,0],[.87,.05],[.97,.12],[1,.22],[.97,.33],[.89,.45],[.76,.57],[.61,.68],[.45,.77],[.3,.85],[.17,.91],[.07,.96],[0,1]],c=i/2,l=s.map(([e,t])=>new H(e*c,t*a));si.makeTranslation(t,n,r),ci(e,new ye(l,o),si,Q.gold,!0);let u=i*.1;si.makeTranslation(t,n+a+u*.75,r),ci(e,new ie(u,10,7),si,Q.gold),xi(e,t,n+a+u*1.6,r,i*.44)}function xi(e,t,n,r,i){let a=Math.max(.05,i*.045);ui(e,Q.gold,t-a/2,n,r-a/2,t+a/2,n+i,r+a/2),di(e,Q.gold,t,n+i*.8,r,i*.3,a,a),di(e,Q.gold,t,n+i*.58,r,i*.52,a,a),si.makeRotationZ(.42).setPosition(t,n+i*.3,r),ci(e,new k(i*.34,a,a),si,Q.gold)}function Si(e,t,n,r,i,a,o){let s=r-t,c=i-n,l=Math.hypot(s,c);if(l<.4)return;let u=Math.atan2(s,c),d=(t+r)/2,f=(n+i)/2;di(e,Q.iron,d,a+o-.07,f,.05,.09,l,u),di(e,Q.iron,d,a+o*.4,f,.05,.07,l,u);let p=Math.max(2,Math.round(l/.26));for(let r=0;r<=p;r++){let i=r/p;di(e,Q.iron,t+s*i,a+o/2,n+c*i,.045,o,.045,u)}}function Ci(e){let t=e&&e.sites&&e.sites.church,n=(t&&t.features||[]).find(e=>e.role===`church`&&e.tags&&(e.tags.building===`church`||e.tags.amenity===`place_of_worship`));return n&&n.rings&&n.rings[0]||Mr}function wi(e){let t=0,n=-1;for(let r=0;r<e.length-1;r++){let i=(e[r+1][0]-e[r][0])**2+(e[r+1][1]-e[r][1])**2;i>n&&(n=i,t=r)}let r=Math.sqrt(n),i=(e[t+1][0]-e[t][0])/r,a=(e[t+1][1]-e[t][1])/r;i<0&&(i=-i,a=-a);let o=-a,s=i,c=1/0,l=-1/0,u=1/0,d=-1/0;for(let[t,n]of e){let e=t*i+n*a,r=t*o+n*s;e<c&&(c=e),e>l&&(l=e),r<u&&(u=r),r>d&&(d=r)}let f=(c+l)/2,p=(u+d)/2;return{cx:f*i+p*o,cz:f*a+p*s,hl:(l-c)/2,hw:(d-u)/2,yaw:Math.atan2(-a,i)}}function Ti(e){let t=e&&e.terrain;if(!t)return null;let n=Ci(e.data),r=wi(n),i=r.hl,o=r.hw,s=Math.cos(r.yaw),c=Math.sin(r.yaw),l=(e,t)=>[r.cx+e*s+t*c,r.cz-e*c+t*s],u=1/0,d=-1/0;for(let e=-1;e<=1;e++)for(let n=-1;n<=1;n++){let[r,a]=l(e*(i+4),n*(o+4)),s=t.heightAt(r,a);s<u&&(u=s),s>d&&(d=s)}let f=d+.25,m=ri(),h=ri(),g=ri(),_=ri(),v=i+4.6,x=o+4.6;ui(m,Q.pave,-v,u-2.4-f,-x,v,0,x);let S=[],C=(e,t,n,r,i)=>{let a=n-e,o=r-t,s=Math.max(2,Math.round(Math.hypot(a,o)/5.2));for(let n=0;n<s;n++){let r=n/s,c=(n+1)/s;i&&Math.abs((r+c)/2-.5)<.6/s||Si(h,e+a*r,t+o*r,e+a*c,t+o*c,.45,1.35),S.push([e+a*r,t+o*r])}S.push([n,r])};ui(m,Q.granite,-v,0,-x,v,.45,-x+.35),ui(m,Q.granite,-v,0,x-.35,v,.45,x),ui(m,Q.granite,-v,0,-x,-v+.35,.45,x),ui(m,Q.granite,v-.35,0,-x,v,.45,x),C(-v,-x,v,-x,!0),C(-v,x,v,x,!0),C(-v,-x,-v,x,!1),C(v,-x,v,x,!1);for(let[e,t]of S)ui(m,Q.granite,e-.3,0,t-.3,e+.3,1.95,t+.3),ui(m,Q.granite,e-.36,1.95,t-.36,e+.36,2.12,t+.36);for(let[e,t]of[[-i*.55,-x+1.7],[i*.55,-x+1.7],[-i*.55,x-1.7],[i*.55,x-1.7],[-v+1.7,0],[v-1.7,0]]){ui(m,Q.granite,e-.26,0,t-.26,e+.26,.9,t+.26),fi(h,Q.iron,e,.9,t,.07,.11,3,8);for(let[n,r,i]of[[0,4.5,0],[.62,3.9,0],[-.62,3.9,0],[0,3.9,.62],[0,3.9,-.62]])si.makeTranslation(e+n,r,t+i),ci(_,new ie(.19,8,6),si,Q.lamp),(n||i)&&di(h,Q.iron,e+n/2,3.9,t+i/2,n?Math.abs(n):.05,.05,i?Math.abs(i):.05)}ui(m,Q.granite,-i,0,-o,i,Pr,o);for(let e=-i+3;e<i-2.5;e+=4.6)for(let t of[-1,1])di(_,Q.metal,e,.9,t*(o+.03),1.5,.7,.12);ui(m,Q.wall,qr,Pr,-7.3,Qr,Fr,7.3),ui(m,Q.wall,-i+.3,Pr,-7.3,qr,Jr,7.3);for(let e of[-1,1])ui(m,Q.wall,-3.4000000000000004,Pr,e*6.3999999999999995,7.4,Ir,e*(o-.3));let T=i-Qr;si.makeTranslation(Qr,12.2/2,0),ci(m,new a(T,T,8.2,7,1,!1,0,Math.PI),si,Q.wall,!0),si.makeTranslation(Qr,11.25,0),ci(h,new y(T+.3,2.1,7,1,!1,0,Math.PI),si,Q.metal,!0);let E=(e,t,n,r,i)=>{let a=n-e,o=r-t,s=Math.hypot(a,o),c=Math.atan2(a,o),l=Math.round(s/.78);for(let n=0;n<l;n++){let r=(n+.5)/l;di(m,Q.trim,e+a*r,i-.3,t+o*r,.44,.52,.16,c)}};for(let e of[-1,1]){let t=e*7.3;ui(m,Q.trim,qr,12.25,t-e*.35,Qr,Fr,t+e*.35),E(-7.6,t+e*.12,Qr,t+e*.12,12.25),ui(m,Q.trim,-i+.15,9.05,t-e*.35,qr,Jr,t+e*.35),E(-i+.6,t+e*.12,-8.4,t+e*.12,9.05),ui(m,Q.trim,-3.7,12.85,e*(o-.3),7.7,Ir,e*(o+.05))}ui(h,Q.metal,qr,Fr,-7.5,Qr,12.95,7.5),ui(h,Q.metal,-i+.1,Jr,-7.5,qr,9.75,7.5);for(let e of[-1,1])ui(h,Q.metal,-3.7500000000000004,Ir,e*6.3999999999999995,7.75,13.7,e*(o-2.3));for(let e of[-1,1]){let t=e>0?0:1,n=e*(o-.28);vi(m,Q.wall,mi(ni*2,.25,2.4000000000000004,12),1.9,ti,Ir,n-e*1.9,t);for(let[t,r]of pi(5.7,2.72,16))di(m,Q.trim,ti+t,Ir+r,n+e*.12,.92,.34,.32)}ui(m,Q.wall,-3.4000000000000004,Fr,-5.4,7.4,Lr,ni),ui(m,Q.trim,-3.6500000000000004,14.799999999999999,-5.65,7.65,Lr,5.65),ui(h,Q.metal,-3.7,Lr,-5.7,7.7,15.479999999999999,5.7),ui(m,Q.wall,-1.2000000000000002,Lr,-3.2,5.2,Rr,3.2),fi(m,Q.trim,ti,Rr,0,2.35,2.35,3,16);for(let e=0;e<8;e++){let t=e/8*Math.PI*2+Math.PI/8,n=Math.sin(t),r=Math.cos(t);si.makeRotationY(t).setPosition(ti+n*2.31,18.5,r*2.31),ci(_,new k(.66,2.3,.2),si,Q.glass),si.makeRotationY(t+Math.PI/8).setPosition(ti+Math.sin(t+Math.PI/8)*2.43,18.6,Math.cos(t+Math.PI/8)*2.43),ci(m,new k(.3,4,.24),si,Q.trim)}fi(m,Q.trim,ti,19.150000000000002,0,2.62,2.42,.45,16),bi(g,ti,zr,0,Vr,Hr,Ur);for(let e of[-1,1])for(let t of[-1,1]){let n=ti+e*4.4,r=t*4.4;fi(m,Q.trim,n,Lr,r,1,1,2.400000000000002,12),fi(m,Q.trim,n,17.3,r,1.15,1.05,.3,12);for(let e=0;e<6;e++){let t=e/6*Math.PI*2;si.makeRotationY(t).setPosition(n+Math.sin(t)*.97,16.599999999999998,r+Math.cos(t)*.97),ci(_,new k(.3,1.2,.12),si,Q.glass)}bi(g,n,Br,r,Wr,Gr,Kr)}ui(m,Q.granite,-18.45,0,-3.3-.15,-11.7+.15,Pr,3.4499999999999997),ui(m,Q.wall,-18.3,Pr,-3.3,-11.7,Yr,ei),ui(m,Q.trim,-18.52,11.5,-3.52,-11.7+.22,Yr,3.52);for(let e of[-1,1])for(let t of[-1,1])di(m,Q.trim,$r+e*2.9499999999999997,14/2,t*3.4,1,10,.28),di(m,Q.trim,$r+e*3.4,14/2,t*2.9499999999999997,.28,10,1);for(let e=0;e<4;e++){let t=new W;t.moveTo(-3.3,0),t.lineTo(ei,0),t.lineTo(ei,4),t.lineTo(-3.3,4),t.lineTo(-3.3,0);let n=new w;n.moveTo(-2,0),n.lineTo(2,0),n.lineTo(2,1.3);for(let[e,t]of pi(2,2,8))n.lineTo(-e,1.3+t);n.lineTo(-2,0),t.holes.push(n);let r=gi[e];vi(m,Q.wall,t,.4,$r+r[0]*ei,Yr,r[1]*ei,e);for(let[e,t]of pi(2.2,2.2,12))di(m,Q.trim,$r+r[0]*3.7199999999999998+(r[1]?e:0),13.3+t,r[1]*3.7199999999999998+(r[0]?e:0),r[1]?.62:.22,.3,r[1]?.22:.62)}for(let[e,t,n]of[[0,0,.5],[-1.3,.6,.33],[1.3,-.6,.33]])fi(h,Q.metal,$r+e,13.6,t,n*.45,n,.9,8);ui(m,Q.trim,-18.85,Xr,-3.3-.55,-11.7+.55,Zr,3.8499999999999996),fi(h,Q.metal,$r,Zr,0,.16,3.9499999999999997,9.099999999999998,8,!0);for(let[e,t]of[[0,1],[0,-1],[1,0],[-1,0]])di(m,Q.trim,$r+e*1.75,19.8,t*1.75,t?.52:.18,1.05,t?.18:.52);fi(m,Q.trim,$r,25.599999999999998,0,.85,.85,1.3,12),fi(m,Q.trim,$r,26.9,0,1,.9,.26,12),bi(g,$r,27.15,0,1.95,1.7,16);for(let e of[-1,1]){let t=e>0?0:1,n=e*7.3;for(let e of[-5.7,8.7,11])yi(m,_,1.5,2.9,e,6.3,n,t),yi(m,_,1.05,1.3,e,3,n,t);for(let e of[-17.4,-14,-10.6])yi(m,_,1.4,2.2,e,5.4,n,t),yi(m,_,1,1.2,e,2.9,n,t);let r=e*(o-.28);vi(m,Q.trim,mi(4.4,5.3,2.2),.28,ti,4.4,r,t),yi(m,_,2.9,4,ti,5,r+e*.2,t),di(m,Q.trim,ti,7.9,r+e*.42,2.6,.16,.12),di(m,Q.trim,ti,7.5,r+e*.42,.16,3.4,.12);for(let e of[-4,4])yi(m,_,1.15,2.3,ti+e,5.7,r,t)}for(let e of[-.68,0,.68])yi(m,_,1.2,2.5,Qr+Math.cos(e)*T,5.4,Math.sin(e)*T,2);for(let e of[-1,1])di(_,Q.glass,$r,8.6,e*3.46,.55,1.6,.12);for(let e of[-1,1]){for(let t of[-7.6,7.9,12.299999999999999])di(m,Q.trim,t,14.6/2,e*7.3999999999999995,.8,10.6,.32);for(let t of[-i+.6,-12.2,-8.4])di(m,Q.trim,t,11.4/2,e*7.3999999999999995,.8,7.4,.32);for(let t of[-4.9,-4,4,4.9])di(m,Q.trim,ti+t,15.2/2,e*(o-.18),.62,11.2,.34)}let D=(e,t,n)=>{let r=gi[n],i=4.6,a=e+r[0]*.1,o=t+r[1]*.1;di(m,Q.granite,e+r[0]*2.2,Pr/2,t+r[1]*2.2,r[1]?6.6:4.4,Pr,r[1]?4.4:6.6);for(let n=0;n<5;n++){let i=3.1+n*.42,a=Pr-(n+1)*.34;di(m,Q.granite,e+r[0]*i,a/2,t+r[1]*i,r[1]?5.8:.44,a,r[1]?.44:5.8)}let s=new W;s.moveTo(-4.6/2,0),s.lineTo(i/2,0),s.lineTo(i/2,2.5);for(let[e,t]of pi(i/2,i/2,9))s.lineTo(-e,2.5+t);s.lineTo(-4.6/2,0);let c=new w;c.moveTo(-1.5,0),c.lineTo(1.5,0),c.lineTo(1.5,2);for(let[e,t]of pi(1.5,1.5,8))c.lineTo(-e,2+t);c.lineTo(-1.5,0),s.holes.push(c),vi(m,Q.trim,s,2.6,a,Pr,o,n),di(h,Q.metal,e+r[0]*1.35,6.92,t+r[1]*1.35,r[1]?4.8999999999999995:2.9,.26,r[1]?2.9:4.8999999999999995),di(m,Q.door,e+r[0]*.22,3.6,t+r[1]*.22,r[1]?2.2:.22,3.2,r[1]?.22:2.2)};D(ti,-(o-.25),1),D(ti,o-.25,0),D(-i+.35,0,3);let O=(e,t,n,r)=>{let i=gi[r];vi(m,Q.trim,mi(2.1,2.6,1.05),.18,e,t,n,r),vi(m,Q.icon,mi(1.6,2.2,.8),.24,e,t+.2,n,r),di(m,Q.figure,e+i[0]*.26,t+1.5,n+i[1]*.26,i[1]?.6:.12,1.8,i[1]?.12:.6)};for(let e of[-1,1]){let t=e>0?0:1,n=e*7.3;O(10,8.4,n,t),O(-12.2,6.6,n,t)}O(-i+.35,6.4,-3.6,3),O(-i+.35,6.4,3.6,3);{let e=Nr[0]-r.cx,n=Nr[1]-r.cz,i=e*s-n*c,a=e*c+n*s,o=t.heightAt(Nr[0],Nr[1])-f;ui(m,Q.granite,i-2.1,o-1.4,a-2.1,i+2.1,o+.35,a+2.1),ui(m,Q.wall,i-1.6,o+.35,a-1.6,i+1.6,o+3.1,a+1.6),ui(m,Q.trim,i-1.85,o+2.8,a-1.85,i+1.85,o+3.1,a+1.85),di(m,Q.door,i,o+1.4,a-1.62,1,2.1,.14),fi(h,Q.metal,i,o+3.1,a,.1,2.35,2.9,8,!0),fi(m,Q.trim,i,o+5.9,a,.42,.42,.7,10),bi(g,i,o+6.6,a,1,.9,16)}let A=new p;A.position.set(r.cx,f,r.cz),A.rotation.y=r.yaw;let j=[[m,vn({key:`ch-stone`,roughness:.93})],[h,vn({key:`ch-metal`,roughness:.44,metalness:.55})],[g,vn({key:`ch-gold`,roughness:.32,metalness:.85,snow:0})],[_,vn({key:`ch-glass`,roughness:.25,metalness:.12,snow:0,emissive:4865056})]];for(let[e,t]of j){if(!e.n)continue;let n=new b(li(e),t);n.castShadow=!0,n.receiveShadow=!0,A.add(n)}let M=n.map(e=>e[0]),N=n.map(e=>e[1]);return{object:A,claims:[{x0:Math.min(...M)-4,z0:Math.min(...N)-4,x1:Math.max(...M)+4,z1:Math.max(...N)+4}]}}var Ei=.5,Di=3,Oi=.06,ki=4.5,Ai=.1,ji=.34,Mi=4,Ni=.24,Pi=11,Fi=13,Ii=8,Li=4.4,Ri=.5,zi=[10.7,28.4,48.7,65.7],Bi=13,Vi=9407878,Hi=7763311,Ui=4869714,Wi=5982776,Gi=5004345,Ki=3099188,qi=4865070,Ji=3356218,Yi=11579046,Xi=14605526,Zi=8218690,Qi=7236196;function $i(e){let t=e.length;return t>2&&e[0][0]===e[t-1][0]&&e[0][1]===e[t-1][1]?e.slice(0,t-1):e.slice()}function ea(e){let t=0,n=-1;for(let r=0;r<e.length;r++){let i=(r+1)%e.length,a=Math.hypot(e[i][0]-e[r][0],e[i][1]-e[r][1]);a>n&&(n=a,t=r)}let r=(t+1)%e.length,i=(e[r][0]-e[t][0])/n,a=(e[r][1]-e[t][1])/n,o={ox:e[0][0],oz:e[0][1],ux:i,uz:a,vx:-a,vz:i},s=1/0,c=-1/0,l=1/0,u=-1/0;for(let t of e){let[e,n]=ta(o,t[0],t[1]);s=Math.min(s,e),c=Math.max(c,e),l=Math.min(l,n),u=Math.max(u,n)}return o.aMin=s,o.aMax=c,o.bMin=l,o.bMax=u,o}function ta(e,t,n){let r=t-e.ox,i=n-e.oz;return[r*e.ux+i*e.uz,r*e.vx+i*e.vz]}function na(e,t,n){return[e.ox+e.ux*t+e.vx*n,e.oz+e.uz*t+e.vz*n]}function ra(e){return Math.atan2(e.vx,e.vz)}function ia(e){let t=0,n=0;for(let r of e)t+=r[0],n+=r[1];return[t/e.length,n/e.length]}function aa(e,t,n=8){let[r,i]=ia(t),[a,o]=ta(e,r,i),s=Math.abs(a-e.aMin)<=Math.abs(a-e.aMax);return{a:s?e.aMin:e.aMax,inward:s?1:-1,b:Math.min(Math.max(o,e.bMin+n),e.bMax-n)}}function oa(e,t,n){let r=!1;for(let i=0,a=e.length-1;i<e.length;a=i++){let[o,s]=e[i],[c,l]=e[a];s>n!=l>n&&t<(c-o)*(n-s)/(l-s)+o&&(r=!r)}return r}function sa(e,t){let n=e.attributes.position.count,r=new ve(t),i=new Float32Array(n*3);for(let e=0;e<n;e++)i[e*3]=r.r,i[e*3+1]=r.g,i[e*3+2]=r.b;return e.setAttribute(`color`,new K(i,3)),e}function ca(e,t,n,r,i){let a=new s;return i&&a.makeRotationY(i),a.setPosition(t,n,r),e.applyMatrix4(a),e}function la(e,t,n,r,i,a,o,s){return ca(sa(new k(e,t,n),r),i,a,o,s)}function ua(e){let t={uSnow:{value:1},uNight:{value:0},uLie:{value:.25},uOrig:{value:new H(e.ox,e.oz)},uAxU:{value:new H(e.ux,e.uz)},uAxV:{value:new H(e.vx,e.vz)}},n=new u({roughness:.87,metalness:0,vertexColors:!0});return n.userData.uniforms=t,n.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
        varying vec3 vLmNrm; varying vec3 vLmPos;`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
        vLmNrm = normalize(mat3(modelMatrix) * objectNormal);`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        vLmPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        varying vec3 vLmNrm; varying vec3 vLmPos;
        uniform float uSnow; uniform float uNight; uniform float uLie;
        uniform vec2 uOrig; uniform vec2 uAxU; uniform vec2 uAxV;`).replace(`#include <color_fragment>`,`#include <color_fragment>
        {
          vec2 rel = vLmPos.xz - uOrig;
          vec2 ab = vec2(dot(rel, uAxU), dot(rel, uAxV));
          float aa = max(fwidth(ab.x), fwidth(ab.y));
          // Each grid gets its own width clamp and its own fade. Letting the
          // joint width run with aa unclamped is what turns the fine grid into
          // a flat tint from the air: the half-width overruns the half-period,
          // every fragment is joint, and the pattern disappears into a wash.
          float wf = min(0.035 + aa * 0.6, 0.16);
          float visF = 1.0 - smoothstep(0.10, 0.24, aa);
          vec2 qf = abs(fract(ab / ${Ei.toFixed(2)} + 0.5) - 0.5) * ${Ei.toFixed(2)};
          float fine = (1.0 - smoothstep(0.0, wf, min(qf.x, qf.y))) * visF;
          float wp = min(0.10 + aa * 0.6, 0.55);
          float visP = 1.0 - smoothstep(0.9, 2.2, aa);
          vec2 qp = abs(fract(ab / ${Di.toFixed(2)} + 0.5) - 0.5) * ${Di.toFixed(2)};
          float band = (1.0 - smoothstep(0.03, wp, min(qp.x, qp.y))) * visP;
          vec2 cell = floor(ab / ${Di.toFixed(2)});
          float h = fract(sin(dot(cell, vec2(41.3, 289.1))) * 43758.5453);
          diffuseColor.rgb *= (0.93 + 0.14 * h)
                            * (1.0 - 0.10 * fine - 0.22 * band);
        }
        {
          float nz = fract(sin(dot(floor(vLmPos.xz * 1.7),
                                   vec2(127.1, 311.7))) * 43758.5453);
          float lie = clamp(uSnow * uLie
                            * smoothstep(0.45, 0.85, vLmNrm.y)
                            * (0.55 + 0.9 * nz), 0.0, 1.0);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.82, 0.85, 0.90), lie);
        }`)},n.customProgramCacheKey=()=>`mirny-lm-paving`,_n.push(n),n}function da(){let e={uSnow:{value:1},uNight:{value:0}},t=new u({color:13620184,roughness:.32,metalness:0,emissive:new ve(16770747),emissiveIntensity:1.6});return t.userData.uniforms=e,t.onBeforeCompile=t=>{Object.assign(t.uniforms,e),t.fragmentShader=t.fragmentShader.replace(`#include <common>`,`#include <common>
        uniform float uNight;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        totalEmissiveRadiance *= uNight;`)},t.customProgramCacheKey=()=>`mirny-lm-globe`,_n.push(t),t}function fa(e,t,n){let r=e.aMax-e.aMin,i=e.bMax-e.bMin,a=Math.max(2,Math.round(r/ki)),o=Math.max(2,Math.round(i/ki)),s=r/a,c=i/o,l=[],u=[],d=[],f=new ve(Vi);for(let t=0;t<=o;t++)for(let r=0;r<=a;r++){let[i,a]=na(e,e.aMin+r*s,e.bMin+t*c);l.push(i,n(i,a)+Oi,a),u.push(f.r,f.g,f.b)}for(let n=0;n<o;n++)for(let r=0;r<a;r++){let[i,o]=na(e,e.aMin+(r+.5)*s,e.bMin+(n+.5)*c);if(!oa(t,i,o))continue;let l=n*(a+1)+r,u=l+1,f=l+(a+1),p=f+1;d.push(l,f,u,u,f,p)}let p=new v;return p.setAttribute(`position`,new V(l,3)),p.setAttribute(`color`,new V(u,3)),p.setIndex(d),p.computeVertexNormals(),p}function pa(e,t,n){let r=[];for(let e=0;e<t.length;e++){let i=t[e],a=t[(e+1)%t.length],o=Math.hypot(a[0]-i[0],a[1]-i[1]),s=Math.max(1,Math.round(o/5)),c=Math.atan2(a[0]-i[0],a[1]-i[1]);for(let e=0;e<s;e++){let t=(e+.5)/s,l=i[0]+(a[0]-i[0])*t,u=i[1]+(a[1]-i[1])*t,d=n(l,u)+Oi+Ai;r.push(la(ji,.9,o/s+.05,Hi,l,d-.45,u,c))}}return r}function ma(e,t){let n=[];for(let r of t){let{a:t,b:i,y:a}=r,o=ra(e),s=Ri/2;for(let r of[-1,1]){let[c,l]=na(e,t+r*(Fi/2-s),i);n.push(la(Ri,.55,Ii,Ui,c,a+.16,l,o));let[u,d]=na(e,t,i+r*(Ii/2-s));n.push(la(12.5,.55,Ri,Ui,u,a+.16,d,o))}let[c,l]=na(e,t,i);n.push(la(Fi-Ri*2,.12,Ii-Ri*2,Wi,c,a+.34,l,o)),n.push(la(9.8,.06,4.8,Gi,c,a+.41,l,o))}return n}function ha(e,t,n,r){let i=[];i.push(la(4.6,.18,3.4,Qi,e,n+.09,t,r)),i.push(la(3.8,.18,2.7,Qi,e,n+.27,t,r)),i.push(la(3,.26,2,Qi,e,n+.49,t,r));let a=n+.62,o=[];o.push(la(2.5,.1,.58,Zi,0,.46,.02,0)),o.push(la(2.5,.52,.08,Zi,0,.74,-.24,0)),o.push(la(.1,.46,.54,Zi,-1.16,.23,.02,0)),o.push(la(.1,.46,.54,Zi,1.16,.23,.02,0)),o.push(la(.52,.22,.4,Zi,-.3,.6,-.04,0)),o.push(la(.58,.74,.44,Zi,-.3,1.05,.02,0)),o.push(la(.44,.26,.34,Zi,-.3,1.52,.1,0)),o.push(la(.22,.24,.2,Zi,-.3,1.71,.14,0)),o.push(la(.2,.2,.52,Zi,-.44,.6,.28,0)),o.push(la(.2,.2,.52,Zi,-.16,.6,.28,0)),o.push(la(.18,.48,.18,Zi,-.44,.28,.48,0)),o.push(la(.18,.48,.18,Zi,-.16,.28,.48,0)),o.push(la(.15,.54,.16,Zi,-.6,1.06,.16,0)),o.push(la(.15,.48,.16,Zi,-.02,1.08,.14,0));let s=F(o,!1);return ca(s,e,a,t,r),i.push(s),i}function ga(e,t,n,r){let i=[],o=sa(new a(.12,.2,r*.35,6),qi);i.push(ca(o,e,t+r*.175,n,0));for(let[a,o,s]of[[.3,.52,.46],[.56,.4,.36],[.78,.26,.28]]){let c=sa(new y(o*r*.5,s*r,8),Ki);i.push(ca(c,e,t+a*r+s*r*.5,n,0))}return i}function _a(e){let{terrain:t,data:n}=e,r=n&&n.sites&&n.sites.lenin_square;if(!r||!r.features)return null;let i=r.features.find(e=>e.role===`square`);if(!i||!i.rings||!i.rings.length)return null;let o=$i(i.rings[0]);if(o.length<3)return null;let c=ea(o),[l,u]=ia(o),d=t.heightAt(l,u),f=(e,n)=>{let r=t.heightAt(e,n);return Number.isFinite(r)?r:d},m=Math.atan2(c.ux,c.uz),h=new p;h.name=`lenin_square`;let g=r.features.find(e=>/Администрация района/.test(e.name||``)),v=c.aMin;if(g&&g.rings&&g.rings.length){let[e,t]=ia($i(g.rings[0])),[n]=ta(c,e,t);v=n<(c.aMin+c.aMax)/2?c.aMin:c.aMax}let y=v===c.aMin?1:-1,x=r.features.find(e=>/Администрация города/.test(e.name||``)),S=x&&x.rings&&x.rings.length?aa(c,$i(x.rings[0])):{a:c.aMax,inward:-1,b:(c.bMin+c.bMax)/2},C=vn({vertexColors:!0,roughness:.93,snow:.55,key:`sq-stone`}),w=vn({vertexColors:!0,roughness:.52,metalness:.55,snow:.15,key:`sq-metal`}),T=vn({vertexColors:!0,roughness:.52,metalness:.45,snow:.22,key:`sq-bronze`}),E=vn({vertexColors:!0,roughness:.95,snow:.75,key:`sq-green`}),D=new b(fa(c,o,f),ua(c));D.receiveShadow=!0,h.add(D);let O=F(pa(c,o,f),!1);if(O){let e=new b(O,C);e.castShadow=!0,e.receiveShadow=!0,h.add(e)}let k=(c.aMin+c.aMax)/2,A=na(c,k,c.bMin)[1]>na(c,k,c.bMax)[1]?c.bMin:c.bMax,j=A===c.bMin?1:-1,M=A+j*Li,N=zi.map(e=>{let t=S.a+S.inward*e,[n,r]=na(c,t,M);return{a:t,b:M,y:f(n,r)+Oi}}),P=F(ma(c,N),!1);if(P){let e=new b(P,C);e.castShadow=!0,e.receiveShadow=!0,h.add(e)}let I=(r.points||[]).find(e=>e.kind===`monument`),L=null;if(I&&I.xz){let[e,t]=ta(c,I.xz[0],I.xz[1]);e=Math.min(Math.max(e,c.aMin+5),c.aMax-5),t=Math.min(Math.max(t,c.bMin+5),c.bMax-5);let[n,r]=na(c,e,t),i=Math.atan2(l-n,u-r);L={a:e,b:t,x:n,z:r,yaw:i};let a=F(ha(n,r,f(n,r)+Oi,i),!1);if(a){let e=new b(a,T);e.castShadow=!0,e.receiveShadow=!0,h.add(e)}}let R=S.a+S.inward*6.5,z=S.b;Math.abs(z-M)<10&&(z=M+j*13);let B=S.a+S.inward*3.2,ee=[];for(let e=0;e<8;e++){let t=c.bMin+5+(c.bMax-c.bMin-10)*(e/7);Math.abs(t-z)<6||Math.abs(t-M)<7||ee.push(t)}let te=[],V=(c.aMax-c.aMin-16)/5,ne=A===c.bMin?c.bMax-5:c.bMin+5;for(let e of[A+j*Bi,ne])for(let t=0;t<=5;t++)te.push([c.aMin+8+t*V,e]);let re=(c.bMax-c.bMin-36)/2;for(let e of[c.aMin+5,c.aMax-5])for(let t=0;t<=2;t++)te.push([e,c.bMin+18+t*re]);let ae=([e,t])=>L&&Math.hypot(e-L.a,t-L.b)<7||Math.abs(e-R)<3.5&&Math.abs(t-z)<6.5||ee.some(n=>Math.hypot(e-B,t-n)<4.5)?!0:N.some(n=>Math.abs(e-n.a)<8.5&&Math.abs(t-n.b)<6),H=te.filter(e=>!ae(e)),oe=F([ca(sa(new a(.085,.14,Mi,8),Ji),0,Mi/2,0,0),la(.3,.16,.3,Ji,0,.08,0,0),la(1.1,.07,.07,Ji,0,Mi,0,0)],!1),U=F([ca(new ie(Ni,8,6),-.5,4.18,0,0),ca(new ie(Ni,8,6),.5,4.18,0,0)],!1);if(oe&&U&&H.length){let e=new _(oe,w,H.length),t=new _(U,da(),H.length);e.castShadow=!0;let n=new s;H.forEach(([r,i],a)=>{let[o,s]=na(c,r,i);n.makeRotationY(m),n.setPosition(o,f(o,s)+Oi,s),e.setMatrixAt(a,n),t.setMatrixAt(a,n)}),h.add(e,t)}let se=F([la(1.9,.07,.5,Yi,0,.45,0,0),la(1.9,.44,.06,Yi,0,.7,-.24,0),la(.07,.45,.46,Ji,-.88,.22,0,0),la(.07,.45,.46,Ji,.88,.22,0,0)],!1),W=[];for(let e of N)for(let t of[-1,1])W.push([e.a+t*3.4,e.b+j*5.4,j>0?ra(c):ra(c)+Math.PI]);if(L){let e=Math.min(Math.max(L.a+y*7.5,c.aMin+3),c.aMax-3);for(let t of[-1,1]){let n=Math.min(Math.max(L.b+t*4.5,c.bMin+3),c.bMax-3);W.push([e,n,L.yaw+Math.PI])}}if(se&&W.length){let e=new _(se,w,W.length);e.castShadow=!0;let t=new s;W.forEach(([n,r,i],a)=>{let[o,s]=na(c,n,r);t.makeRotationY(i),t.setPosition(o,f(o,s)+Oi,s),e.setMatrixAt(a,t)}),h.add(e)}let ce=[];{let[e,t]=na(c,R,z);ce.push(la(2.4,.34,6.6,Qi,e,f(e,t)+Oi+.17,t,ra(c)))}for(let e of[-2.4,0,2.4]){let[t,n]=na(c,R,z+e),r=f(t,n)+Oi+.34;ce.push(ca(sa(new a(.08,.13,Pi,8),Xi),t,r+Pi/2,n,0))}let le=F(ce,!1);if(le){let e=new b(le,C);e.castShadow=!0,e.receiveShadow=!0,h.add(e)}let ue=[];ee.forEach((e,t)=>{if(L&&Math.hypot(B-L.a,e-L.b)<9)return;let[n,r]=na(c,B,e),i=8.5+t*37%11*.25;ue.push(...ga(n,f(n,r),r,i))});let G=F(ue,!1);if(G){let e=new b(G,E);e.castShadow=!0,h.add(e)}return{object:h}}var va=110,ya=.909,ba=.655,xa=4.2,Sa=2.6,Ca=3.7,wa=7,Ta=.42,Ea=.13,Da=.15,Oa=.56,ka=-302,Aa=-863,ja=110,Ma=.75,Na=.16,Pa=12,Fa=7.3,Ia=Fa,La=Fa,Ra=.667,za=.75,Ba=4.3,Va=3.85,Ha=8,Ua=4,Wa=.85,Ga=9382685,Ka=14078663,qa=8158850,Ja=12631475,Ya=9144448,Xa=null,Za=null,Qa=null,$a=null,eo=null;function to(e){let t={uSnow:{value:1},uNight:{value:0}},n=new e.MeshStandardMaterial({color:5579548,emissive:16717064,emissiveIntensity:2.2,roughness:.45,metalness:0});return n.userData.uniforms=t,n.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uNight;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
totalEmissiveRadiance *= uNight;`)},n.customProgramCacheKey=()=>`mirny-lm-som`,_n.push(n),n}function no(e){Xa||(Xa=vn({key:`tower-steel`,snow:0,roughness:.62,metalness:.18}),Za=vn({key:`tower-paint`,snow:0,roughness:.62,metalness:.18,vertexColors:!1,color:Ga}),Qa=vn({key:`tower-dish`,snow:0,roughness:.7,metalness:.08,vertexColors:!1,color:Ja}),eo=vn({key:`tower-conc`,snow:1,roughness:.93,metalness:0,vertexColors:!1,color:Ya}),$a=to(e))}function ro(e){let t=new e.BoxGeometry(1,1,1),n=t.attributes.position.count;return t.setAttribute(`color`,new e.BufferAttribute(new Float32Array(n*3).fill(1),3)),t}function io(e,t,n,r,i={}){let a=new e.Group,o=r*(i.latticeFrac??ya),s=r*(i.kinkFrac??ba),c=(n[0][0]+n[1][0]+n[2][0]+n[3][0])/4,l=(n[0][1]+n[1][1]+n[2][1]+n[3][1])/4,u=n.map(e=>[e[0]-c,e[1]-l]),d=0;for(let e=0;e<4;e++){let t=n[e],r=n[(e+1)%4];d+=Math.hypot(r[0]-t[0],r[1]-t[1])/4}let f=(i.kinkW??xa)/d,p=(i.topW??Sa)/d,m=e=>e<=s?1+(f-1)*(e/s):f+(p-f)*((e-s)/(o-s)),h=Math.max(8,Math.min(30,Math.round(o/Ca))),g=[0];{let e=[];for(let t=0;t<h;t++)e.push(1.25+-.5*(t/(h-1)));let t=o/e.reduce((e,t)=>e+t,0);for(let n of e)g.push(g[g.length-1]+n*t)}let _=[0],v=(i.bands??wa)|1;for(let e=1;e<v;e++){let t=e*r/v;if(t>=o){_.push(t);continue}let n=g[0];for(let e of g)Math.abs(e-t)<Math.abs(n-t)&&(n=e);_.push(n)}_.push(r);let y=e=>{let t=0;for(;t<v-1&&e>=_[t+1];)t++;return t%2==0?Ga:Ka},b=(t,n)=>new e.Vector3(u[t][0]*m(n),n,u[t][1]*m(n)),x=(e,t,n)=>e.clone().lerp(t,n),S=[],C=new e.Vector3(0,1,0),w=new e.Vector3,T=(t,n,r,i)=>{w.subVectors(n,t);let a=w.length();if(a<1e-4)return;let o=new e.Quaternion().setFromUnitVectors(C,w.divideScalar(a)),s=new e.Matrix4().compose(t.clone().add(n).multiplyScalar(.5),o,new e.Vector3(r,a,r));S.push([s,i??y((t.y+n.y)/2)])};for(let e=0;e<h;e++){let t=g[e],n=g[e+1],r=n-t,i=Ta+t/o*-.22999999999999998;for(let e=0;e<4;e++)T(b(e,t),b(e,n),i);for(let e=0;e<4;e++){let i=(e+1)%4,a=b(e,t),o=b(i,t),s=b(e,n),c=b(i,n),l=Math.max(1,Math.min(3,Math.round(a.distanceTo(o)/Math.max(.001,r))));for(let e=0;e<l;e++){let t=e/l,n=(e+1)/l;T(x(a,o,t),x(s,c,n),Ea),T(x(a,o,n),x(s,c,t),Ea)}for(let e=1;e<l;e++){let t=e/l;T(x(a,o,t),x(s,c,t),Ea*.8)}}}for(let e=0;e<=h;e++){let t=g[e];for(let e=0;e<4;e++)T(b(e,t),b((e+1)%4,t),Da)}for(let t=0;t<h;t++){let n=g[t],r=g[t+1],i=x(b(0,n),b(1,n),.5),a=x(b(0,r),b(1,r),.5),o=new e.Vector3().subVectors(b(1,n),b(0,n)).setY(0).normalize().multiplyScalar(Oa/2);for(let e of[-1,1]){let t=o.clone().multiplyScalar(e);T(i.clone().add(t),a.clone().add(t),.06,qa)}let s=Math.max(1,Math.round((r-n)/.9));for(let e=0;e<s;e++){let t=n+(e+.5)*(r-n)/s,i=x(b(0,t),b(1,t),.5);T(i.clone().sub(o),i.clone().add(o),.05,qa)}}let E=(i.platforms??[.36,.66,.82]).map(e=>{let t=e*o,n=g[0];for(let e of g)Math.abs(e-t)<Math.abs(n-t)&&(n=e);return n});for(let t of E){let n=b(0,t).distanceTo(b(1,t))+1.1;T(new e.Vector3(0,t-.06,0),new e.Vector3(0,t+.06,0),n,qa)}let D=n.map(e=>t.heightAt(e[0],e[1])),O=D.reduce((e,t)=>e+t,0)/4,k=[];for(let t=0;t<4;t++){let n=b(t,0),r=D[t]-O-1.6,i=1.1;k.push(new e.Matrix4().compose(new e.Vector3(n.x,(r+i)/2,n.z),new e.Quaternion,new e.Vector3(1.7,i-r,1.7)))}if(i.cup){let t=i.cup,n=r*t.yFrac0,o=r*t.yFrac1,s=(n+o)/2,c=new e.Mesh(new e.CylinderGeometry(t.rLower,t.rLower*.92,(s-n)*1.1,16,1),eo);c.position.set(0,n+(s-n)*.55,0),c.castShadow=!0,c.receiveShadow=!0,a.add(c);let l=new e.Mesh(new e.CylinderGeometry(t.rUpper,t.rUpper*.94,(o-s)*1.05,16,1),eo);l.position.set(0,s+(o-s)*.5,0),l.castShadow=!0,l.receiveShadow=!0,a.add(l);let u=t.dishes??Ha,d=t.dishR??Wa,f=new e.CylinderGeometry(d,d*.36,d*.8,12,1);for(let r=0;r<u;r++){let i=r/u*Math.PI*2+.4,o=new e.Vector3(Math.cos(i),0,Math.sin(i)),c=new e.Mesh(f,Qa);c.quaternion.setFromUnitVectors(C,o);let l=n+(s-n)*(.35+r%2*.5);c.position.set(o.x*(t.rLower+d*.7),l,o.z*(t.rLower+d*.7)),c.castShadow=!0,a.add(c),T(new e.Vector3(o.x*t.rLower,l,o.z*t.rLower),c.position,.08,qa)}let p=t.panels??Ua,m=new e.BoxGeometry(.5,1.7,.12);for(let n=0;n<p;n++){let r=n/p*Math.PI*2+1.1,i=new e.Vector3(Math.cos(r),0,Math.sin(r)),s=new e.Mesh(m,Xa);s.quaternion.setFromUnitVectors(C,i),s.position.set(i.x*(t.rUpper+.1),o-1,i.z*(t.rUpper+.1)),s.castShadow=!0,a.add(s)}}let A=r-o,j=new e.Mesh(new e.CylinderGeometry(.19,.55,A,12,1),Za);j.position.set(0,o+A/2,0),j.castShadow=!0,a.add(j);for(let t of[.2,.45,.7]){let n=o+A*t,r=1.6-.5*t;for(let t=0;t<4;t++){let i=t*Math.PI/2,a=new e.Vector3(Math.cos(i),0,Math.sin(i));T(a.clone().multiplyScalar(.35).setY(n),a.clone().multiplyScalar(r).setY(n),.11,Ga),T(a.clone().multiplyScalar(r).setY(n-.7),a.clone().multiplyScalar(r).setY(n+.7),.09,Ga)}}for(let t of i.dishes??[]){let n=t.y*o,r=t.r,i=new e.Vector3(t.dx,0,t.dz).normalize(),s=0,c=-1/0;for(let t=0;t<4;t++){let r=b(t,n),a=new e.Vector3(r.x,0,r.z).normalize().dot(i);a>c&&(c=a,s=t)}let l=b(s,n),u=new e.Mesh(new e.CylinderGeometry(r,r*.34,r*.85,18,1),Qa);u.quaternion.setFromUnitVectors(C,i),u.position.set(l.x+i.x*(r*.6+.9),n,l.z+i.z*(r*.6+.9)),u.castShadow=!0,a.add(u),T(l,new e.Vector3(u.position.x,n,u.position.z),.12,qa)}let M=ro(e),N=new e.InstancedMesh(M,Xa,S.length),P=new e.Color;for(let e=0;e<S.length;e++)N.setMatrixAt(e,S[e][0]),N.setColorAt(e,P.set(S[e][1]));N.instanceMatrix.needsUpdate=!0,N.instanceColor&&(N.instanceColor.needsUpdate=!0),N.castShadow=!0,N.receiveShadow=!0,a.add(N);let F=new e.InstancedMesh(new e.BoxGeometry(1,1,1),eo,k.length);for(let e=0;e<k.length;e++)F.setMatrixAt(e,k[e]);F.instanceMatrix.needsUpdate=!0,F.castShadow=!0,F.receiveShadow=!0,a.add(F);let I=Math.max(1,Math.ceil(r/45)),L=[];for(let t=1;t<I;t++){let n=t*r/I;for(let t=0;t<4;t++){let r=b(t,Math.min(n,o)),i=new e.Vector3(r.x,0,r.z).normalize().multiplyScalar(.8);L.push(new e.Vector3(r.x+i.x,n,r.z+i.z))}}L.push(new e.Vector3(0,r-.4,0));let R=new e.SphereGeometry(.45,8,6),z=new e.InstancedMesh(R,$a,L.length),B=new e.Matrix4;for(let e=0;e<L.length;e++)z.setMatrixAt(e,B.makeTranslation(L[e].x,L[e].y,L[e].z));return z.instanceMatrix.needsUpdate=!0,a.add(z),a.position.set(c,O,l),a}function ao(e,t,n){let r=n/2;return[[e-r,t-r],[e+r,t-r],[e+r,t+r],[e-r,t+r]]}function oo(e){let{THREE:t,terrain:n,data:r}=e,i=r&&r.sites&&r.sites.tv_tower;if(!i)return null;no(t);let a=new t.Group;a.name=`tv_tower`;let o=(i.features||[]).find(e=>e.role===`tower`&&e.rings&&e.rings.length),s=(i.points||[]).find(e=>e.name===`РРС-0`);if(o){let e=o.rings[0].slice(0,4).map(e=>[e[0],e[1]]),r=Number(o.tags&&o.tags.height)||va,i=[{y:.72,r:1.5,dx:-1,dz:1},{y:.72,r:1.2,dx:-.29,dz:1},{y:.88,r:1.2,dx:1,dz:.35}];s&&(i[0].dx=s.xz[0]-(e[0][0]+e[2][0])/2,i[0].dz=s.xz[1]-(e[0][1]+e[2][1])/2),a.add(io(t,n,e,r,{dishes:i}))}{let e=ao(ka,Aa,Pa);a.add(io(t,n,e,ja,{latticeFrac:Ma,kinkFrac:Na,kinkW:Ia,topW:La,cup:{yFrac0:Ra,yFrac1:za,rLower:Ba,rUpper:Va,dishes:Ha,panels:Ua,dishR:Wa},platforms:[.4,.6],dishes:[]}))}if(s){let e=Number(s.height)||45;a.add(io(t,n,ao(s.xz[0],s.xz[1],e/9),e,{bands:9,kinkW:1.9,topW:1.4,platforms:[.55,.85],dishes:[{y:.8,r:1,dx:1,dz:-1}]}))}let c=(i.points||[]).find(e=>e.kind===`mast`);return c&&a.add(io(t,n,ao(c.xz[0],c.xz[1],3.6),32,{bands:7,kinkW:1.5,topW:1.1,platforms:[.8],dishes:[]})),{object:a}}var so=13619659,co=11777456,lo=2850936,uo=1859417,fo=12854827,po=2766144,mo=11052188,ho=15131869,go=13674546,_o=11250085,vo=9341048,yo=9146258,bo=15527919,xo=2193006,So=13027782,Co=7304048,wo=3816764,To=45,Eo=20,Do=.03,Oo=.13,ko=3.6,Ao=3,jo=6.6;function Mo(e,t){let n=new ve(t),r=e.attributes.position.count,i=new Float32Array(r*3);for(let e=0;e<r;e++)i[e*3]=n.r,i[e*3+1]=n.g,i[e*3+2]=n.b;return e.setAttribute(`color`,new K(i,3)),e.deleteAttribute(`uv`),e.index||e.setIndex([...Array(r).keys()]),e}function No(e,t,n,r){return r&&t.applyMatrix4(r),e.push(Mo(t,n)),t}function Po(e,t,n,r,i,a,o,c,l=0){let u=new s().makeRotationY(l);return u.setPosition(n,r,i),No(e,new k(a,o,c),t,u)}function Fo(e,t,n,r,i,a,o,s,c,l){return Po(e,t,n,(c+l)/2,r,s,l-c,o,Math.atan2(i,a))}function Io(e,t,n,r,i,o,c,l,u=10){return No(e,new a(o,c,l,u,1),t,new s().setPosition(n,r,i))}var Lo=[.06,.12,.06,.88,.64,.12,.64,.88,.12,.95,.58,.95,.12,.05,.58,.05,.06,.86,.14,.96,.64,.86,.56,.96,.06,.14,.14,.04,.64,.14,.56,.04],Ro={А:[.03,0,.35,1,.67,0,.35,1,.14,.3,.56,.3],Э:[.06,.93,.6,.93,.62,.9,.62,.1,.06,.07,.6,.07,.28,.5,.62,.5],Р:[.07,0,.07,1,.07,.94,.6,.94,.62,.92,.62,.57,.07,.55,.6,.55],О:Lo,П:[.07,0,.07,.94,.63,0,.63,.94,.05,.94,.65,.94],Т:[.02,.94,.68,.94,.35,0,.35,.94],М:[.05,0,.05,1,.05,1,.35,.4,.35,.4,.65,1,.65,1,.65,0],И:[.07,0,.07,1,.63,0,.63,1,.07,.08,.63,.92],Н:[.07,0,.07,1,.63,0,.63,1,.07,.5,.63,.5],Ы:[.05,0,.05,1,.05,.52,.42,.52,.44,.5,.44,.09,.05,.07,.42,.07,.86,0,.86,1],Й:[.07,0,.07,1,.63,0,.63,1,.07,.08,.63,.92,.18,1.14,.52,1.14],0:Lo,7:[.03,.95,.67,.95,.67,.95,.24,0],2:[.06,.94,.6,.94,.62,.92,.62,.57,.06,.55,.62,.55,.06,.53,.06,.09,.04,.06,.68,.06],5:[.05,.94,.66,.94,.05,.94,.05,.53,.05,.53,.6,.53,.62,.51,.62,.1,.05,.07,.62,.07]},zo=e=>e===`Ы`?.92:.7;function Bo(e){let t=Ro[e]||[],n=[];for(let e=0;e<t.length;e+=4)n.push([t[e],t[e+1],t[e+2],t[e+3]]);return n}function Vo(e,t){let n=[];for(let r=0;r<e.length-1;r++){let i=e[r],a=e[r+1],o=Math.hypot(a[0]-i[0],a[1]-i[1]),s=Math.max(1,Math.ceil(o/t));for(let e=0;e<s;e++)n.push([i[0]+(a[0]-i[0])*e/s,i[1]+(a[1]-i[1])*e/s])}return n.push(e[e.length-1]),n}function Ho(e,t,n,r,i,a=22,o=Oo,s=null){let c=Vo(r,a);if(c.length<2)return null;let l=[],u=[],d=[];for(let e=0;e<c.length;e++){let t=c[e],r=c[Math.min(e+1,c.length-1)],a=c[Math.max(e-1,0)],f=r[0]-a[0],p=r[1]-a[1],m=Math.hypot(f,p)||1;f/=m,p/=m;let h=-p*i,g=f*i,_=(s?s(t[0],t[1]):n.heightAt(t[0],t[1]))+o;if(l.push(t[0]-h,_,t[1]-g,t[0]+h,_,t[1]+g),u.push(0,1,0,0,1,0),e>0){let t=(e-1)*2;d.push(t,t+2,t+1,t+1,t+2,t+3)}}let f=new v;return f.setAttribute(`position`,new K(new Float32Array(l),3)),f.setAttribute(`normal`,new K(new Float32Array(u),3)),f.setIndex(d),No(e,f,t)}function Uo(e){let t={uSnow:{value:1},uNight:{value:0},uLie:{value:0}},n=new u({emissive:new ve(e.emissive),roughness:e.roughness??.55,metalness:0,vertexColors:!0});n.userData.uniforms=t;let r=(e.gain??1).toFixed(2),i=e.tint?`totalEmissiveRadiance *= diffuseColor.rgb;`:``;return n.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        uniform float uSnow; uniform float uNight; uniform float uLie;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        totalEmissiveRadiance *= uNight * ${r};
        ${i}`)},n.customProgramCacheKey=()=>`mirny-lm-night-${e.key}`,_n.push(n),n}function Wo(e,t,n){let r=!1;for(let i=0,a=n.length-1;i<n.length;a=i++){let o=n[i],s=n[a];o[1]>t!=s[1]>t&&e<(s[0]-o[0])*(t-o[1])/(s[1]-o[1])+o[0]&&(r=!r)}return r}function Go(e,t,n){let r=1/0;for(let i=0,a=n.length-1;i<n.length;a=i++){let o=n[i],s=n[a],c=s[0]-o[0],l=s[1]-o[1],u=c*c+l*l,d=u?Math.max(0,Math.min(1,((e-o[0])*c+(t-o[1])*l)/u)):0;r=Math.min(r,Math.hypot(e-o[0]-d*c,t-o[1]-d*l))}return r}function Ko(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let a of e)t=Math.min(t,a[0]),r=Math.max(r,a[0]),n=Math.min(n,a[1]),i=Math.max(i,a[1]);return[t,n,r,i]}function qo(e,t,n){let[r,i,a,o]=Ko(e),s=null,c=1/0;for(let l=1;l<40;l++)for(let u=1;u<40;u++){let d=r+(a-r)*l/40,f=i+(o-i)*u/40;if(!Wo(d,f,e)||Go(d,f,e)<t)continue;let p=Math.hypot(d-n[0],f-n[1]);p<c&&(c=p,s=[d,f])}return s}function Jo(e,t=4,n=12){let[r,i,a,o]=Ko(e),s=0,c=0;for(let t of e)s+=t[0],c+=t[1];s/=e.length,c/=e.length;let l=[{x0:s-7,z0:c-7,x1:s+7,z1:c+7}];for(let s=r-t;s<a+t;s+=n)for(let r=i-t;r<o+t;r+=n){let i=s+n/2,a=r+n/2;(Wo(i,a,e)||Go(i,a,e)<t)&&l.push({x0:s,z0:r,x1:s+n,z1:r+n})}return l}function Yo(e,t,n,r,i,a,o,s,c){let l=Vo(n,c),u=l.length;if(u<2)return null;let d=e=>{let t=l[Math.max(0,e-1)],n=l[Math.min(u-1,e+1)],r=Math.hypot(n[0]-t[0],n[1]-t[1])||1;return[(n[0]-t[0])/r,(n[1]-t[1])/r]},f=new Float64Array(u),p=new Float64Array(u);for(let e=0;e<u;e++){let n=d(e),i=-n[1],a=n[0];f[e]=t.heightAt(l[e][0],l[e][1]);let o=f[e];for(let n of[-.55,.55])o=Math.max(o,t.heightAt(l[e][0]+i*r*n,l[e][1]+a*r*n));p[e]=o+.06}let m=Float64Array.from(p);for(let e=0;e<14;e++){let e=Float64Array.from(m);for(let t=1;t<u-1;t++)m[t]=(e[t-1]+2*e[t]+e[t+1])/4}for(let e=0;e<u;e++)m[e]=Math.max(f[e]-1.2,Math.min(f[e]+1.8,m[e]));let h=[],g=[],_=[];for(let e=0;e<u;e++){let t=d(e),n=-t[1]*r,i=t[0]*r,o=m[e]+a;if(h.push(l[e][0]-n,o,l[e][1]-i,l[e][0]+n,o,l[e][1]+i),g.push(0,1,0,0,1,0),e){let t=(e-1)*2;_.push(t,t+2,t+1,t+1,t+2,t+3)}}let y=new v;y.setAttribute(`position`,new K(new Float32Array(h),3)),y.setAttribute(`normal`,new K(new Float32Array(g),3)),y.setIndex(_),No(e,y,o);for(let n of[1,-1]){let i=[],o=[],c=[];for(let e=0;e<u;e++){let s=d(e),u=-s[1]*r*n,f=s[0]*r*n,p=l[e][0]+u,h=l[e][1]+f,g=m[e]+a,_=Math.max(g-3,Math.min(g-.05,t.heightAt(p,h)-.5));if(i.push(p,g,h,p,_,h),o.push(-s[1]*n,0,s[0]*n,-s[1]*n,0,s[0]*n),e){let t=(e-1)*2;c.push(t,t+1,t+2,t+1,t+3,t+2)}}let f=new v;f.setAttribute(`position`,new K(new Float32Array(i),3)),f.setAttribute(`normal`,new K(new Float32Array(o),3)),f.setIndex(c),No(e,f,s)}return(e,t)=>{let n=0,r=1/0;for(let i=0;i<u;i++){let a=(e-l[i][0])**2+(t-l[i][1])**2;a<r&&(r=a,n=i)}return m[n]+a}}function Xo(e,t,n,r){let i=[n[0],n[n.length-1]];return Yo(e,t,i,30.5,30.5,Do,vo,vo,18),{hRwy:Yo(e,t,i,To/2,30.5,.13,_o,vo,18),hTwy:r.map(n=>Yo(e,t,n,Eo/2,12,.09,_o,vo,14))}}function Zo(e,t,n,r,i){let a=n[0],o=n[n.length-1],s=Math.hypot(o[0]-a[0],o[1]-a[1]),c=(o[0]-a[0])/s,l=(o[1]-a[1])/s,u=-l,d=c,f=(e,t)=>[a[0]+c*e+u*t,a[1]+l*e+d*t],p=i.hRwy,m=(n,r,i,a,o)=>Ho(e,ho,t,[f(n,r),f(i,a)],o,22,Oo,p);for(let e of[-21.6,To/2-.9])m(0,e,s,e,.45);for(let e=60;e<s-60;e+=50)e>50&&e<115||e>s-115&&e<s-50||m(e,0,e+30,0,.45);for(let n of[0,1]){let r=n?-1:1,i=n?s:0,a=e=>i+r*e;for(let e=0;e<12;e++)m(a(6),(e-5.5)*3.6,a(36),(e-5.5)*3.6,.9);let o=[...n?`25`:`07`];for(let n=0;n<o.length;n++){let i=(n-(o.length-1)/2)*15.75-zo(o[n])*15/2;for(let s of Bo(o[n]))Ho(e,ho,t,[f(a(75+s[1]*20),r*(i+s[0]*15)),f(a(75+s[3]*20),r*(i+s[2]*15))],.95,22,Oo,p)}for(let e of[-13,13])m(a(400),e,a(450),e,4);for(let e of[150,300,600,750])for(let t of[-9.5,9.5])m(a(e),t,a(e+22.5),t,1.5)}r.forEach((n,r)=>Ho(e,go,t,n,.375,14,Oo,i.hTwy[r]))}function Qo(e,t,n,r,i,o,c,l){let u=[],d=new a(c,c,o*.66,12,1,!0);d.rotateX(Math.PI/2),u.push(d);let f=new a(c*.3,c,o*.17,12,1,!0);f.rotateX(-Math.PI/2),f.translate(0,0,-o*.415),u.push(f);let p=new a(c*.22,c,o*.3,12,1,!0);p.rotateX(Math.PI/2),p.translate(0,l*.5,o*.48),u.push(p);let m=F(u,!1);m.deleteAttribute(`uv`);let h=m.attributes.position,g=h.count,_=new Float32Array(g*3),v=new ve(bo),y=new ve(xo);for(let e=0;e<g;e++){let t=h.getY(e),n=h.getZ(e),r=t<-c*.15+l/o*Math.max(0,n)&&n<o*.44?y:v;_[e*3]=r.r,_[e*3+1]=r.g,_[e*3+2]=r.b}m.setAttribute(`color`,new K(_,3));let b=new s().makeRotationY(i);b.setPosition(t,n,r),m.applyMatrix4(b),e.push(m)}function $o(e,t,n,r,i){let o=n+3.4,c=Math.cos(i),l=Math.sin(i),u=(e,n)=>[t+e*c+n*l,r-e*l+n*c];Qo(e,t,o,r,i,39.5,1.88,2.2);for(let t of[1,-1]){let r=u(t*9.9,1.5),c=new s().makeRotationY(i-t*.42).multiply(new s().makeRotationZ(t*.05));c.setPosition(r[0],o-.7,r[1]),No(e,new k(17.9,.55,5.2),bo,c);let l=u(t*5.6,-1.4),d=new a(1.28,1.28,4.6,12,1,!0);d.rotateX(Math.PI/2);let f=new s().makeRotationY(i);f.setPosition(l[0],o-2.05,l[1]),No(e,d,xo,f);let p=u(t*3.6,2);Io(e,wo,p[0],n+.95,p[1],.42,.42,1.9,8);let m=u(t*6.4,17.2),h=new s().makeRotationY(i-t*.5);h.setPosition(m[0],o+1.9,m[1]),No(e,new k(6.4,.35,3),bo,h)}let d=u(0,-14.5);Io(e,wo,d[0],n+1.1,d[1],.32,.32,2.2,8);let f=u(0,16.4),p=new s().makeRotationY(i);p.setPosition(f[0],o+5.2,f[1]),No(e,new k(.45,8.6,6.2),bo,p);let m=new a(1.5,1.5,.62,12);m.rotateZ(Math.PI/2);let h=new s().makeRotationY(i);h.setPosition(f[0],o+7.3,f[1]),No(e,m,xo,h)}function es(e,t,n,r,i,o){let c=o?23.5:15.7,l=o?29.2:22.1,u=o?1.4:1,d=n+(o?2.6:2),f=Math.cos(i),p=Math.sin(i),m=(e,n)=>[t+e*f+n*p,r-e*p+n*f];Qo(e,t,d,r,i,c,u,o?1.6:1.1);let h=d+u*.95;for(let t of[1,-1]){let r=m(t*l/4,-c*.02),u=new s().makeRotationY(i);u.setPosition(r[0],h,r[1]),No(e,new k(l/2,.42,o?2.9:2.2),bo,u);let f=o?5:4.2,p=m(t*f,-c*.1),g=new a(o?.85:.62,o?.7:.5,o?5.4:3.8,10);g.rotateX(Math.PI/2);let _=new s().makeRotationY(i);_.setPosition(p[0],h-.35,p[1]),No(e,g,bo,_);let v=m(t*f,-c*.1-(o?3:2.1)),y=o?1.95:1.4;for(let t=0;t<4;t++){let n=new k(y,.3,.09);n.translate(y/2,0,0),n.rotateZ(t*Math.PI/2+.5);let r=new s().makeRotationY(i);r.setPosition(v[0],h-.35,v[1]),No(e,n,5462108,r)}Io(e,wo,p[0],n+(d-n)*.35,p[1],.28,.28,(d-n)*.7,8);let b=m(t*(o?4.4:3.4),c*.42),x=new s().makeRotationY(i);x.setPosition(b[0],d+(o?2.6:1.9),b[1]),No(e,new k(o?4.4:3.4,.3,o?2.2:1.7),bo,x)}let g=m(0,-c*.42);Io(e,wo,g[0],n+(d-n)*.4,g[1],.22,.22,(d-n)*.8,8);let _=m(0,c*.4),v=new s().makeRotationY(i);v.setPosition(_[0],d+(o?2.9:2.1),_[1]),No(e,new k(.4,o?4.4:3.2,o?4.4:3.4),bo,v);let y=new a(o?.95:.7,o?.95:.7,.5,10);y.rotateZ(Math.PI/2);let b=new s().makeRotationY(i);b.setPosition(_[0],d+(o?4.1:3),_[1]),No(e,y,xo,b)}function ts(e,t,n,r,i,o){let c=o?33.7:18.2,l=o?16:10.65,u=o?2.3:1.3,d=n+(o?3.4:2.4),f=Math.cos(i),p=Math.sin(i),m=(e,n)=>[t+e*f+n*p,r-e*p+n*f];Qo(e,t,d,r,i,c*.62,u,.6);let h=m(0,c*.34),g=new a(u*.24,u*.5,c*.44,8);g.rotateX(Math.PI/2);let _=new s().makeRotationY(i);_.setPosition(h[0],d+u*.25,h[1]),No(e,g,bo,_);let v=m(0,c*.53),y=o?4.4:3,b=new s().makeRotationY(i);b.setPosition(v[0],d+u*.9+y/2,v[1]),No(e,new k(.3,y,o?3.2:2.2),bo,b);let x=new a(o?3.6:1.9,o?3.6:1.9,.12,10);x.rotateZ(Math.PI/2);let S=new s().makeRotationY(i);S.setPosition(v[0],d+u*.9+y*.75,v[1]),No(e,x,5462108,S);let C=m(0,-c*.02);Po(e,bo,C[0],d+u*1.05,C[1],u*1.5,u*.7,c*.24,i),Io(e,yo,C[0],d+u*1.55,C[1],.34,.42,u*.9,8);let w=o?8:5;for(let t=0;t<w;t++){let n=new k(l,.16,o?.95:.6);n.translate(l/2,-l*.055,0),n.rotateY(t*2*Math.PI/w+.4);let r=new s().makeRotationY(i);r.setPosition(C[0],d+u*2,C[1]),No(e,n,4869970,r)}for(let t of[1,-1])for(let r of[-c*.14,c*.16]){let i=m(t*u*1.1,r);Io(e,wo,i[0],n+(d-n)*.35,i[1],.24,.24,(d-n)*.7,6)}}function ns(e){let{terrain:n,data:r}=e;if(!r||!r.sites||!r.sites.airport)return null;let i=r.sites.airport,o=i.features||[],c=o.find(e=>e.tags&&e.tags.aeroway===`runway`&&e.tags.ref),l=o.filter(e=>e.tags&&e.tags.aeroway===`terminal`),u=e=>{if(!c)return!0;let t=c.line[0],n=c.line[c.line.length-1],r=n[0]-t[0],i=n[1]-t[1],a=r*r+i*i,o=e[Math.floor(e.length/2)],s=Math.max(0,Math.min(1,((o[0]-t[0])*r+(o[1]-t[1])*i)/a));return Math.hypot(o[0]-t[0]-s*r,o[1]-t[1]-s*i)<900},d=o.filter(e=>e.tags&&e.tags.aeroway===`taxiway`).map(e=>e.line).filter(e=>e&&e.length>1&&u(e)),f=o.find(e=>e.tags&&e.tags.aeroway===`helipad`);if(!c&&!l.length)return null;let m=[],h=[],g=[],_=[],v=[],y=[],x=[],S=(e,t)=>n.heightAt(e,t),C=null;c&&(C=Xo(g,n,c.line,d),Zo(g,n,c.line,d,C));let w=l.find(e=>e.tags[`building:levels`]===`3`)||l[0],T=1,E=0,D=0,O=0,A=0,j=1,M=0,N=0,P=!1;if(w&&w.rings&&w.rings[0]){let e=w.rings[0],t=0;for(let n=0;n<e.length-1;n++){let r=Math.hypot(e[n+1][0]-e[n][0],e[n+1][1]-e[n][1]);r>t&&(t=r,T=(e[n+1][0]-e[n][0])/r,E=(e[n+1][1]-e[n][1])/r)}A=-E,j=T;let n=1/0,r=-1/0,i=1/0,o=-1/0;for(let t of e){let e=t[0]*T+t[1]*E,a=t[0]*A+t[1]*j;n=Math.min(n,e),r=Math.max(r,e),i=Math.min(i,a),o=Math.max(o,a)}if(M=r-n,N=o-i,D=(n+r)/2*T+(i+o)/2*A,O=(n+r)/2*E+(i+o)/2*j,P=!0,c){let e=c.line[Math.floor(c.line.length/2)];(e[0]-D)*A+(e[1]-O)*j<0&&(A=-A,j=-j)}let l=(S(D,O)+S(D+T*M*.45,O+E*M*.45)+S(D-T*M*.45,O-E*M*.45))/3,u=l+3*ko,d=u+1;Fo(m,so,D,O,T,E,M,N,l-2.4,u),Fo(m,Co,D,O,T,E,M+.5,N+.5,u,u+.25);for(let e of[1,-1])Fo(m,lo,D+A*e*(N/2-.2),O+j*e*(N/2-.2),T,E,M+.5,.4,u+.25,d),Fo(m,lo,D+T*e*(M/2-.2),O+E*e*(M/2-.2),T,E,.4,N+.5,u+.25,d);Fo(m,uo,D,O,T,E,M+.3,N+.3,l-.4,l+1.25);for(let e of[1,-1])for(let[t,n]of[[4,7.4],[8.4,10.2]])Fo(h,po,D+A*e*(N/2+.02),O+j*e*(N/2+.02),T,E,M-3,.35,l+t,l+n);for(let e=-M/2+3;e<M/2-3;e+=3.1)for(let t of[1,-1])Fo(m,co,D+T*e+A*t*(N/2+.05),O+E*e+j*t*(N/2+.05),T,E,.22,.34,l+4,l+10.2);let f=D-N/2*A,p=O-N/2*j;Fo(m,mo,f-A*2.2,p-j*2.2,T,E,22,4.4,l-1.6,l+1.35);for(let e=0;e<11;e++){let t=2.6+e*.38;Fo(m,mo,f-A*t,p-j*t,T,E,16-e*.1,.42,l-1.6,l+1.3-e*.115)}for(let e of[1,-1])Fo(_,lo,f+T*e*8.1-A*3.4,p+E*e*8.1-j*3.4,T,E,.09,6.4,l+.9,l+2);Fo(h,po,f-A*1,p-j*1,T,E,15,2,l+1.35,l+4.2),Fo(m,so,f-A*2.4,p-j*2.4,T,E,19,.45,l+4.3,l+4.9);for(let e of[1,-1])Fo(_,lo,f+T*e*8.6-A*2.2,p+E*e*8.6-j*2.2,T,E,.22,.22,l+1.3,l+4.4);let g=D+A*(N/2+5.4),v=O+j*(N/2+5.4);Fo(m,lo,g,v,T,E,M*.78,11,l-2,l+4.9),Fo(m,Co,g,v,T,E,M*.78+.9,11.9,l+4.9,l+5.3),Fo(h,po,g+A*5.52,v+j*5.52,T,E,M*.78-2.5,.3,l+2.2,l+4.4);for(let e of[1,-1]){let t=e*M*.24;for(let e=0;e<7;e++)Fo(m,uo,g+T*t+A*(6.2+e*.42),v+E*t+j*(6.2+e*.42),T,E,4.2,.44,l-1,l+1.3-e*.19)}let b=(e,t,n)=>{let r=[...e],i=r.length*jo,o=d+.55,c=t*(N/2-1.6),l=t*j,u=-t*A,f=Math.atan2(-u,l),p=(e,t,n)=>{let r=new s().makeRotationY(f);r.setPosition(D+l*t+A*c,n,O+u*t+j*c),No(y,e,fo,r)};if(Fo(_,yo,D+A*c,O+j*c,T,E,i+(n?7:0),.18,d,o),r.forEach((e,t)=>{let n=-i/2+(t+.5)*jo-zo(e)*Ao/2;for(let t of Bo(e)){let e=n+t[0]*Ao,r=o+t[1]*Ao,i=n+t[2]*Ao,a=o+t[3]*Ao,s=Math.hypot(i-e,a-r)+.45,c=new k(s,.45,.3);c.rotateZ(Math.atan2(a-r,i-e)),p(c,(e+i)/2,(r+a)/2)}}),n){let e=i/2+3.2,t=o+Ao*.5,n=new a(1.15,1.15,.28,12);n.rotateX(Math.PI/2),p(n,e,t);for(let n of[1,-1]){let r=new k(2.6,.34,.22);r.rotateZ(n*.12),p(r,e+n*2.2,t+.15)}}};b(`МИРНЫЙ`,1,!1),b(`АЭРОПОРТ`,-1,!0),x.push(...Jo(e))}let I=l.find(e=>e!==w);if(I&&I.rings&&I.rings[0]){let e=I.rings[0].slice(0,-1),n=e.map(e=>new H(e[0],e[1]));pe.isClockWise(n)&&n.reverse();let r=new W(n),i=0,a=0;for(let t of e)i+=t[0],a+=t[1];i/=e.length,a/=e.length;let o=S(i,a),s=3*ko-.4,c=(e,n,i)=>{let a=new t(r,{depth:n-e,bevelEnabled:!1});a.rotateX(Math.PI/2),a.translate(0,n,0),No(m,a,i,null)};c(o-2.4,o+s,so),c(o+s,o+s+.9,lo),c(o-.5,o+1.2,uo);for(let t=0;t<e.length;t++){let n=e[t],r=e[(t+1)%e.length],i=r[0]-n[0],a=r[1]-n[1],s=Math.hypot(i,a);if(s<9)continue;let c=i/s,l=a/s;for(let e=0;e<3;e++)Fo(h,po,(n[0]+r[0])/2,(n[1]+r[1])/2,c,l,s-2.4,.32,o+2+e*ko,o+3.9+e*ko)}let l=qo(e,5,[D,O])||[i,a],u=S(l[0],l[1]),d=Math.atan2(T,E);Po(m,so,l[0],u+8.1,l[1],8.4,16.2,8.4,d),Po(m,uo,l[0],u+16,l[1],11.4,.7,11.4,d),Po(h,po,l[0],u+18.3,l[1],10.6,3.9,10.6,d),Po(m,so,l[0],u+20.6,l[1],11.6,.7,11.6,d),Po(m,lo,l[0],u+21.4,l[1],11,.8,11,d);for(let e=0;e<5;e++){let t=e*1.257+.4;Io(_,yo,l[0]+Math.cos(t)*4.6,u+24.8,l[1]+Math.sin(t)*4.6,.05,.09,6,5)}for(let e=0;e<7;e++)Po(_,e%2?fo:so,l[0]+4.4,u+22.5+e*1.35,l[1]-4.4,.5-e*.03,1.35,.5-e*.03,d);x.push(...Jo(e))}if(P){let e=(e,t)=>[D+T*e+A*t,O+E*e+j*t],t=Math.atan2(T,E),r=e(18,62),i=e(-30,58),a=e(-58,52);$o(_,r[0],S(r[0],r[1]),r[1],t),es(_,i[0],S(i[0],i[1]),i[1],t+.12,!0),es(_,a[0],S(a[0],a[1]),a[1],t-.1,!1);for(let e of[r,i,a])Ho(g,go,n,[[e[0]+A*34,e[1]+j*34],[e[0]+A*2,e[1]+j*2]],.375)}if(f&&f.rings&&f.rings[0]){let e=f.rings[0],t=e[1][0]-e[0][0],n=e[1][1]-e[0][1],r=Math.hypot(t,n),i=-n/r,a=t/r,o=Math.atan2(t/r,n/r);[.16,.34,.52,.72].forEach((r,s)=>{let c=e[0][0]+t*r+i*24,l=e[0][1]+n*r+a*24;ts(_,c,S(c,l),l,o+(s%2?.15:-.1),s===1)})}if(P){let e=Math.atan2(T,E);for(let t=-2;t<=2;t++){let n=D+T*t*52+A*90,r=O+E*t*52+j*90,i=S(n,r);Io(_,yo,n,i+13,r,.26,.85,26,4);for(let t of[6,12,18,23])Po(_,yo,n,i+t,r,.95-t*.02,.16,.95-t*.02,e+.78);Po(_,yo,n,i+26.4,r,.4,.35,6,e);for(let t=-2;t<=2;t++)Po(v,16773327,n+T*t*1.35,i+26.9,r+E*t*1.35,.55,.4,.7,e)}}if(c){let e=c.line[0],t=c.line[c.line.length-1],n=Math.hypot(t[0]-e[0],t[1]-e[1]),r=(t[0]-e[0])/n,i=(t[1]-e[1])/n;for(let t=0;t<=n;t+=60)for(let a of[-45/2-2.5,25]){let o=e[0]+r*t-i*a,s=e[1]+i*t+r*a;Po(v,t<30?3137658:t>n-30?14693428:16774366,o,(C?C.hRwy(o,s):S(o,s))+.35,s,.5,.5,.5)}}if(P){let e=Math.atan2(T,E),t=D-T*118-A*26,n=O-E*118-j*26;for(let r=0;r<5;r++){let i=t+A*r*8.5,o=n+j*r*8.5,c=S(i,o),l=new a(1.7,1.7,11.5,12);l.rotateX(Math.PI/2);let u=new s().makeRotationY(e);u.setPosition(i,c+2.3,o),No(_,l,So,u);for(let t of[1,-1])Po(m,mo,i+T*t*3.9,c+.7,o+E*t*3.9,3.6,1.4,1.2,e)}let r=t-T*22,i=n-E*22;Io(_,So,r,S(r,i)+5.5,i,4.2,4.2,11,14);let o=D-T*96-A*58,c=O-E*96-j*58,l=S(o,c),u=new a(9.5,9.5,34,16,1,!1,Math.PI/2,Math.PI);u.rotateX(Math.PI/2);let d=new s().makeRotationY(e);d.setPosition(o,l,c),No(m,u,co,d)}let L=Math.atan2(T,E);for(let e of i.points||[]){if(e.kind!==`mural`||!e.xz)continue;let[t,n]=e.xz,r=S(t,n),i=n<265,a=i?14:10,o=i?5.4:4.6,s=i?[12084012,13214010,10304298,9404262,12084012]:[10467012,14673640,8361896,13161688,9348016];Po(m,mo,t,r+.35,n,1.6,.9,a+1.2,L);for(let e=0;e<s.length;e++)Po(m,s[e],t,r+.8+o*(e+.5)/s.length,n,.55,o/s.length,a,L);Po(m,mo,t,r+.8+o+.16,n,.8,.32,a+.5,L)}if(P){let e=Math.atan2(T,E);for(let t=-9;t<=9;t++){let n=D+T*t*4.4-A*34,r=O+E*t*4.4-j*34,i=S(n,r);Po(m,so,n,i+.55,r,.75,1.1,.9,e),Po(m,12610146,n,i+.8,r,.79,.26,.94,e)}}let R=new p;R.name=`airport`;let z=(e,t,n=!0)=>{if(!e.length)return;let r=F(e,!1);if(!r)return;let i=new b(r,t);i.castShadow=n,i.receiveShadow=n,R.add(i)};return z(m,vn({key:`airstruct`,roughness:.93})),z(h,vn({key:`airglass`,roughness:.16,metalness:.82,snow:0})),z(_,vn({key:`airmetal`,roughness:.48,metalness:.18,snow:.35})),z(g,vn({key:`airmark`,roughness:.86,snow:.45})),z(y,Uo({key:`airsign`,emissive:14170156,gain:1})),z(v,Uo({key:`airlamp`,emissive:16777215,gain:2.6,tint:!0,roughness:.4}),!1),{object:R,claims:x}}var rs=[or,Ti,_a,oo,ns];function is(e){let t=new p,n=[];for(let r of rs)try{let i=r(e);i&&i.object&&t.add(i.object),i&&i.claims&&n.push(...i.claims)}catch(e){console.error(`landmark ${r.name} failed:`,e)}return{group:t,claims:n,materials:_n}}var as=`modulepreload`,os=function(e){return`/mirny/`+e},ss={},cs=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=os(t,n),t=s(t),t in ss)return;ss[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:as,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},ls=[.5,.5,.5,.5],us=.85,ds=[{lx:1.3,lz:1.775,front:!0},{lx:-1.3,lz:1.775,front:!0},{lx:1.24,lz:-1.775,front:!1},{lx:-1.24,lz:-1.775,front:!1}],fs=112,ps=1.4,ms=111*ps,hs=32,gs=12600,_s=3150,vs=5250,ys=27e3;function bs(e,t=null){let n=null,r=null,i=null,a=[],o=[],s=null,c=null,l=null,u=0,d=0,f=0,p=null,m=!1,h=new Float32Array(12544),g=()=>({p:[0,0,0],q:[0,0,0,1],w:ds.map(()=>({ly:us,steer:0}))}),_=g(),v=g(),y={ready:!1,error:null,out:{x:0,y:0,z:0,quat:[0,0,0,1],vFwd:0,vy:0,upY:1,yaw:0,wheels:ds.map(()=>({ly:us,steer:0,spin:0}))}},b=[0,0,0],x=[0,0,0];cs(()=>import(`./box3d.inline-BWc-YrM6.js`).then(e=>e.default()),[]).then(e=>{n=e,C(),y.ready=!0}).catch(e=>{y.error=e,console.warn(`box3d unavailable, staying arcade:`,e)});function S(e,t,r,i,a,o,s,c,l=.6){let u=[];for(let e of[t,a])for(let t of[r,o])for(let n of[i,s])u.push(e,t,n);let d=n.b3CreateHull(new Float32Array(u)),f=n.b3DefaultShapeDef();f.density=c/Math.abs((a-t)*(o-r)*(s-i)),f.baseMaterial.friction=l;let p=n.b3CreateHullShape(e,f,d);return n.b3DestroyHull(d),p}function C(){let e=n.b3DefaultWorldDef();e.gravity=[0,-9.81,0],e.contactHertz=15,r=n.b3CreateWorld(e);let t=n.b3DefaultBodyDef();t.type=n.b3BodyType.b3_dynamicBody,t.position=[0,500,0],t.angularDamping=.3,t.linearDamping=.02,i=n.b3CreateBody(r,t),S(i,-1.56,.5,-3.9,1.56,1.5,2.45,gs),S(i,-1.5,1.5,.6,1.68,3.1,2.45,_s),S(i,-1.74,2.05,-4.2,1.74,3.5,1.4,vs);for(let e of ds){let t=n.b3DefaultBodyDef();t.type=n.b3BodyType.b3_dynamicBody,t.position=[e.lx,500.85,e.lz],t.allowFastRotation=!0;let s=n.b3CreateBody(r,t),c=n.b3DefaultShapeDef();c.density=900/(4/3*Math.PI*us**3),c.baseMaterial.friction=1.8,c.baseMaterial.rollingResistance=.03,n.b3CreateSphereShape(s,c,{center:[0,0,0],radius:us});let l=n.b3DefaultWheelJointDef();l.base.bodyIdA=i,l.base.bodyIdB=s,l.base.localFrameA={position:[e.lx,us,e.lz],quaternion:ls},l.base.localFrameB={position:[0,0,0],quaternion:ls},l.enableSuspensionSpring=!0,l.suspensionHertz=1.8,l.suspensionDampingRatio=.9,l.enableSuspensionLimit=!0,l.lowerSuspensionLimit=-.35,l.upperSuspensionLimit=.15,l.enableSpinMotor=!0,l.maxSpinTorque=0,e.front&&(l.enableSteering=!0,l.steeringHertz=2.5,l.steeringDampingRatio=1,l.maxSteeringTorque=12e3,l.enableSteeringLimit=!0,l.lowerSteeringLimit=-.62,l.upperSteeringLimit=.62),o.push(n.b3CreateWheelJoint(r,l)),a.push(s)}}function w(i,a){let o=i-ms/2,p=a-ms/2;for(let t=0;t<fs;t++){let n=p+t*ps;for(let r=0;r<fs;r++)h[t*fs+r]=e(o+r*ps,n).y}let m=n.b3CreateHeightField(h,fs,fs,[ps,1,ps]),g=n.b3DefaultBodyDef();g.position=[o,0,p];let _=n.b3CreateBody(r,g),v=n.b3DefaultShapeDef();if(v.baseMaterial.friction=.85,n.b3CreateHeightFieldShape(_,v,m),s&&n.b3DestroyBody(s),c&&n.b3DestroyHeightField(c),s=_,c=m,d=i,f=a,t){let e=t(o,p,o+ms,p+ms),i=n.b3CreateBody(r,n.b3DefaultBodyDef()),a=n.b3DefaultShapeDef();a.baseMaterial.friction=.5;let s=0;for(let t of e){let e=n.b3CreateHull(t);e&&(n.b3CreateHullShape(i,a,e),n.b3DestroyHull(e),s++)}l&&n.b3DestroyBody(l),l=i,u=s}}function T(t,r,s){if(!y.ready)return;w(t,r);let c=Math.sin(s),l=Math.cos(s),u=-1e9;for(let n of ds){let i=t+n.lx*l+n.lz*c,a=r+n.lz*l-n.lx*c;u=Math.max(u,e(i,a).y)}let d=[0,Math.sin(s/2),0,Math.cos(s/2)];n.b3Body_SetTransform(i,[t,u+.4,r],d),n.b3Body_SetLinearVelocity(i,[0,0,0]),n.b3Body_SetAngularVelocity(i,[0,0,0]);for(let e=0;e<ds.length;e++){let i=ds[e],s=t+i.lx*l+i.lz*c,f=r+i.lz*l-i.lx*c;n.b3Body_SetTransform(a[e],[s,u+.4+us,f],d),n.b3Body_SetLinearVelocity(a[e],[0,0,0]),n.b3Body_SetAngularVelocity(a[e],[0,0,0]),ds[e].front&&n.b3WheelJoint_SetTargetSteeringAngle(o[e],0)}n.b3Body_SetAwake(i,!0),E(v),E(_)}function E(e){n.b3Body_GetTransform(e.p,e.q,i);let t=-e.q[0],r=-e.q[1],s=-e.q[2],c=e.q[3];for(let i=0;i<a.length;i++){n.b3Body_GetPosition(x,a[i]);let l=x[0]-e.p[0],u=x[1]-e.p[1],d=x[2]-e.p[2],f=2*(r*d-s*u),p=2*(s*l-t*d),m=2*(t*u-r*l);e.w[i].ly=u+c*p+(s*f-t*m),e.w[i].steer=ds[i].front?n.b3WheelJoint_GetSteeringAngle(o[i]):0}}function D(e,t){if(!y.ready)return;n.b3Body_GetPosition(b,i),Math.hypot(b[0]-d,b[2]-f)>hs&&w(b[0],b[2]);for(let e=0;e<o.length;e++){let r=o[e],i=ds[e].front;i&&n.b3WheelJoint_SetTargetSteeringAngle(r,t.steer),t.brakeTorque>0?(n.b3WheelJoint_SetSpinMotorSpeed(r,0),n.b3WheelJoint_SetMaxSpinTorque(r,t.brakeTorque)):i?n.b3WheelJoint_SetMaxSpinTorque(r,0):(n.b3WheelJoint_SetSpinMotorSpeed(r,t.spin),n.b3WheelJoint_SetMaxSpinTorque(r,t.driveTorque))}t.wake&&n.b3Body_SetAwake(i,!0);let a=_;_=v,v=a,n.b3World_Step(r,e,4),E(v)}function O(e=1){let t=y.out;if(!y.ready)return t;let r=e<0?0:e>1?1:e,s=_,c=v;t.x=s.p[0]+(c.p[0]-s.p[0])*r,t.y=s.p[1]+(c.p[1]-s.p[1])*r,t.z=s.p[2]+(c.p[2]-s.p[2])*r;let l=s.q[0]*c.q[0]+s.q[1]*c.q[1]+s.q[2]*c.q[2]+s.q[3]*c.q[3]<0?-1:1,u=s.q[0]+(l*c.q[0]-s.q[0])*r,d=s.q[1]+(l*c.q[1]-s.q[1])*r,f=s.q[2]+(l*c.q[2]-s.q[2])*r,p=s.q[3]+(l*c.q[3]-s.q[3])*r,m=Math.hypot(u,d,f,p)||1;u/=m,d/=m,f/=m,p/=m,t.quat[0]=u,t.quat[1]=d,t.quat[2]=f,t.quat[3]=p;let h=2*(u*f+p*d),g=1-2*(u*u+d*d);t.yaw=Math.atan2(h,g),t.upY=1-2*(u*u+f*f),n.b3Body_GetLinearVelocity(x,i),t.vFwd=x[0]*h+x[2]*g,t.vy=x[1];for(let e=0;e<a.length;e++)t.wheels[e].ly=s.w[e].ly+(c.w[e].ly-s.w[e].ly)*r,t.wheels[e].steer=s.w[e].steer+(c.w[e].steer-s.w[e].steer)*r,t.wheels[e].spin=n.b3WheelJoint_GetSpinSpeed(o[e]);return t}function k(e){!y.ready||e===m||(m=e,e?p=S(i,-1.35,2.2,-4,1.35,3.4,1.3,ys,.6):p&&=(n.b3DestroyShape(p,!0),null),n.b3Body_SetAwake(i,!0))}return y.place=T,y.step=D,y.read=O,y.setLoaded=k,y.patch=()=>({x:d,z:f,n:fs,cell:ps,obstacles:u}),y}var xs={x:-2302,z:-2830,r:15},Ss=27,Cs=32.5,ws=4,Ts=4.2,Es=6,Ds=.22,Os=.055,ks=2.4,As=2.2,js=8.5,Ms=11.5,Ns=3.6,Ps=.87,Fs=.85,Is=1.3,Ls=1.775,Rs=7,zs=.055,Bs=4.4,Vs=5.9,Hs=1.45,Us=2.6,Ws=.08,Gs=126*Math.PI/180,Ks=-24,qs=-441,Js=1.2*Math.PI/180,Ys=8,Xs=9076590,Zs=10326654,Qs=6314061,$s=7037270,ec=14721052,tc=12087823,nc=2829359,rc=1447449,ic=7172213,ac=1779763,oc=5922659,sc=5001559,cc=3752524,lc=4871262,uc=new ve;function dc(){return{p:[],n:[],c:[]}}function fc(e,t,n,r,i){let a=n[0]-t[0],o=n[1]-t[1],s=n[2]-t[2],c=r[0]-t[0],l=r[1]-t[1],u=r[2]-t[2],d=o*u-s*l,f=s*c-a*u,p=a*l-o*c,m=Math.hypot(d,f,p)||1;d/=m,f/=m,p/=m,uc.setHex(i,de);for(let i of[t,n,r])e.p.push(i[0],i[1],i[2]),e.n.push(d,f,p),e.c.push(uc.r,uc.g,uc.b)}function pc(e,t,n,r,i,a){fc(e,t,n,r,a),fc(e,t,r,i,a)}function mc(e,t,n,r,i,a,o,s,c){let l=n[0]-t[0],u=n[1]-t[1],d=n[2]-t[2],f=r[0]-t[0],p=r[1]-t[1],m=r[2]-t[2],h=u*m-d*p,g=d*f-l*m,_=l*p-u*f;h*o+g*s+_*c>=0?pc(e,t,n,r,i,a):pc(e,t,i,r,n,a)}function hc(e,t,n,r,i,a,o,s,c=s){let l=Math.min(t,i),u=Math.max(t,i),d=Math.min(n,a),f=Math.max(n,a),p=Math.min(r,o),m=Math.max(r,o),h=(e,t,n)=>[e,t,n];mc(e,h(l,f,p),h(u,f,p),h(u,f,m),h(l,f,m),c,0,1,0),mc(e,h(l,d,p),h(u,d,p),h(u,d,m),h(l,d,m),s,0,-1,0),mc(e,h(l,d,m),h(u,d,m),h(u,f,m),h(l,f,m),s,0,0,1),mc(e,h(l,d,p),h(u,d,p),h(u,f,p),h(l,f,p),s,0,0,-1),mc(e,h(u,d,p),h(u,d,m),h(u,f,m),h(u,f,p),s,1,0,0),mc(e,h(l,d,p),h(l,d,m),h(l,f,m),h(l,f,p),s,-1,0,0)}function gc(e,t,n,r,i=r){let a=[[t[0],t[1],t[2]],[t[3],t[1],t[2]],[t[3],t[1],t[5]],[t[0],t[1],t[5]]],o=[[n[0],n[1],n[2]],[n[3],n[1],n[2]],[n[3],n[1],n[5]],[n[0],n[1],n[5]]];mc(e,o[0],o[1],o[2],o[3],i,0,1,0),mc(e,a[0],a[1],a[2],a[3],r,0,-1,0);let s=(t[0]+t[3])/2,c=(t[2]+t[5])/2;for(let t=0;t<4;t++){let n=(t+1)%4,i=(a[t][0]+a[n][0])/2-s,l=(a[t][2]+a[n][2])/2-c;mc(e,a[t],o[t],o[n],a[n],r,i,0,l)}}function _c(e,t,n,r,i,a,o,s,c=s){for(let l=0;l<o;l++){let u=l/o*Math.PI*2,d=(l+1)/o*Math.PI*2,f=Math.cos(u)*i,p=Math.sin(u)*i,m=Math.cos(d)*i,h=Math.sin(d)*i;mc(e,[t-a,n+f,r+p],[t+a,n+f,r+p],[t+a,n+m,r+h],[t-a,n+m,r+h],s,0,f+m,p+h),mc(e,[t+a,n,r],[t+a,n+f,r+p],[t+a,n+m,r+h],[t+a,n+m,r+h],c,1,0,0),mc(e,[t-a,n,r],[t-a,n+f,r+p],[t-a,n+m,r+h],[t-a,n+m,r+h],c,-1,0,0)}}function vc(e,t,n,r,i,a,o){for(let s=0;s<a;s++){let c=s/a*Math.PI*2,l=(s+1)/a*Math.PI*2,u=Math.cos(c)*i,d=Math.sin(c)*i,f=Math.cos(l)*i,p=Math.sin(l)*i;mc(e,[t[0]+u,n,t[1]+d],[t[0]+u,r,t[1]+d],[t[0]+f,r,t[1]+p],[t[0]+f,n,t[1]+p],o,u+f,0,d+p),mc(e,[t[0],r,t[1]],[t[0]+u,r,t[1]+d],[t[0]+f,r,t[1]+p],[t[0]+f,r,t[1]+p],o,0,1,0)}}function yc(e,t,n=!0){if(!e.p.length)return null;let r=new v;r.setAttribute(`position`,new V(e.p,3)),r.setAttribute(`normal`,new V(e.n,3)),r.setAttribute(`color`,new V(e.c,3)),r.computeBoundingSphere();let i=new b(r,t);return i.castShadow=n,i.receiveShadow=n,i}var bc=(e,t,n)=>e<t?t:e>n?n:e,xc=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-n*r));function Sc(e){let{scene:t,terrain:n,camera:r,meta:i,buildings:o}=e,c=new p,l=i.pit,d=n.ox+l.centreCell[0]*n.cell,f=n.oz+l.centreCell[1]*n.cell,m=(e,t)=>n.heightAt(e,t),h=new Float32Array(19840);{let e=new Float32Array(19840);for(let t=0;t<128;t++){let n=t/128*Math.PI*2,r=Math.sin(n),i=Math.cos(n);for(let n=0;n<155;n++){let a=80+n*4;e[t*155+n]=m(d+r*a,f+i*a)}}let t=new Float32Array(19840);for(let n=0;n<128;n++)for(let r=0;r<155;r++){let i=0,a=0;for(let t=-6;t<=6;t++){let o=r+t;o<0||o>=155||(i+=e[n*155+o],a++)}t[n*155+r]=i/a}for(let e=0;e<128;e++)for(let n=0;n<155;n++){let r=0;for(let i=-1;i<=1;i++)r+=t[((e+i)%128+128)%128*155+n];h[e*155+n]=r/3}for(let e=0;e<128;e++)for(let t=1;t<155;t++){let n=h[e*155+t-1];h[e*155+t]<n+.05&&(h[e*155+t]=n+.05)}}let _=(e,t)=>{let n=e*155;if(t<=h[n])return 80;if(t>=h[n+155-1])return 696;let r=0,i=154;for(;i-r>1;){let e=r+i>>1;h[n+e]<t?r=e:i=e}let a=(t-h[n+r])/(h[n+i]-h[n+r]);return 80+(r+a)*4},v=(e,t)=>{let n=e/(Math.PI*2)*128,r=(Math.floor(n)%128+128)%128,i=n-Math.floor(n);return _(r,t)*(1-i)+_((r+1)%128,t)*i},y=[];{let e=Gs,t=Ks,n=bc(v(Gs,Ks)-Rs,88,620);for(;t>qs&&y.length<3e3;){let r=d+Math.sin(e)*n,i=f+Math.cos(e)*n;y.push([r,i,t]);let a=n*Js;if(t-=Ws*a,e+=Js,n=bc(bc(v(e,t)-Rs,88,620),n-.3*a,n+.3*a),n<=90)break}}let x=[943.6,388.3];{let e=y[0],t=[];for(let n=0;n<15;n++){let r=n/15,i=x[0]+(e[0]-x[0])*r,a=x[1]+(e[1]-x[1])*r;t.push([i,a,Math.max(m(i,a)+.55,e[2]+(1-r)*3.2)])}y.unshift(...t)}let C=(()=>{let e=y[y.length-1],t=Math.atan2(e[0]-d,e[1]-f),n=Math.hypot(e[0]-d,e[1]-f);for(let e=0;e<240&&n>78;e++){n-=.45,t+=Js;let e=d+Math.sin(t)*n,r=f+Math.cos(t)*n;y.push([e,r,m(e,r)+.6])}let r=y[Math.max(0,y.length-12)];return[r[0],r[1],r[2]]})(),w=(()=>{let e=[y[0].slice()],t=0;for(let n=1;n<y.length;n++){let r=e[e.length-1].slice(),i=y[n],a=Math.hypot(i[0]-r[0],i[1]-r[1]);for(;t+a>=Ys&&a>1e-6;){let n=(Ys-t)/a;r=[r[0]+(i[0]-r[0])*n,r[1]+(i[1]-r[1])*n,r[2]+(i[2]-r[2])*n],e.push(r.slice()),a=Math.hypot(i[0]-r[0],i[1]-r[1]),t=0}t+=a}e.push(y[y.length-1].slice());for(let t=0;t<4;t++){let t=e.map(e=>e.slice());for(let n=1;n<e.length-1;n++)for(let r=0;r<3;r++)t[n][r]=e[n][r]+.3*(e[n-1][r]+e[n+1][r]-2*e[n][r]);e=t}let n=(e,t)=>{let n=e[t][0]-e[t-1][0],r=e[t][1]-e[t-1][1],i=e[t+1][0]-e[t][0],a=e[t+1][1]-e[t][1],o=Math.hypot(n,r),s=Math.hypot(i,a);return o<1e-4||s<1e-4?0:Math.acos(bc((n*i+r*a)/(o*s),-1,1))};for(let t=0;t<300;t++){let t=e.map(e=>e.slice()),r=!1;for(let i=1;i<e.length-1;i++)if(!(n(e,i)<.16)){r=!0;for(let n=0;n<3;n++)t[i][n]=e[i][n]+.3*(e[i-1][n]+e[i+1][n]-2*e[i][n])}if(e=t,!r)break}for(let t of e){let e=m(t[0],t[1])+.55;t[2]<e&&(t[2]=e)}for(let t=0;t<30;t++){let t=e.map(e=>e[2]);for(let n=1;n<e.length-1;n++){let r=t[n]+.42*(t[n-1]+t[n+1]-2*t[n]);e[n][2]=Math.max(r,m(e[n][0],e[n][1])+.45)}}let r=.09;for(let t=1;t<e.length;t++){let n=Math.hypot(e[t][0]-e[t-1][0],e[t][1]-e[t-1][1]);e[t][2]=Math.max(e[t][2],e[t-1][2]-r*n)}for(let t=e.length-2;t>=0;t--){let n=Math.hypot(e[t+1][0]-e[t][0],e[t+1][1]-e[t][1]);e[t][2]=Math.max(e[t][2],e[t+1][2]-r*n)}return e})(),T=w.length,E=Array(T),D=0;for(let e=0;e<T;e++){let t=w[Math.max(0,e-1)],n=w[Math.min(T-1,e+1)],r=n[0]-t[0],i=n[1]-t[1],a=Math.hypot(r,i)||1;r/=a,i/=a;let o=i,s=-r,c=w[e],l=m(c[0]+o*Rs,c[1]+s*Rs),u=m(c[0]-o*Rs,c[1]-s*Rs);(D===0||Math.abs(l-u)>1.5)&&(D=l<u?1:-1);let d=o*D,f=s*D,p=c[2]-m(c[0]+d*Rs,c[1]+f*Rs);E[e]={x:c[0],y:c[2],z:c[1],tx:r,tz:i,dx:d,dz:f,berm:bc(p*.3,0,Hs)}}function O(e,t,n){let r=e+t*zs;return t>Bs&&(r+=n*(t<Vs?(t-Bs)/1.5:Math.max(0,(Rs-t)/1.0999999999999996))),r}let k=vn({key:`haul`,roughness:.97,snow:.62});{let e=dc(),t=[-7,-2.4,2,Bs,Vs,Rs],n=(e,t,n)=>[e.x+e.dx*t,n,e.z+e.dz*t],r=E.map(e=>{let r=t.map(t=>n(e,t,O(e.y,t,e.berm))),i=e.x-e.dx*8.4,a=e.z-e.dz*8.4;r.unshift([i,Math.min(O(e.y,-7,e.berm)-.7,m(i,a)-.35),a]);let o=Rs,s=O(e.y,Rs,e.berm);for(let t=0;t<16;t++){o+=1.4,s-=1.4*Us;let t=e.x+e.dx*o,n=e.z+e.dz*o;if(s<=m(t,n)-.3)break}return r.push([e.x+e.dx*o,s-.3,e.z+e.dz*o]),r}),i=[$s,Xs,Xs,Xs,Zs,Zs,Qs],a=(e,t)=>bc(Math.round((e>>16&255)*t),0,255)<<16|bc(Math.round((e>>8&255)*t),0,255)<<8|bc(Math.round((e&255)*t),0,255);for(let t=0;t<T-1;t++){let n=r[t],o=r[t+1],s=E[t],c=Math.sin(t*12.9898)*43758.5453;for(let t=0;t<i.length;t++){let r=t===0||t===i.length-1;mc(e,n[t],n[t+1],o[t+1],o[t],a(i[t],.95+.1*(c-Math.floor(c))),r?s.dx:0,r?.35:1,r?s.dz:0)}}c.add(yc(e,k))}let A=(()=>{let e=0,t=0,n=Math.atan2(w[0][0]-d,w[0][1]-f);for(let r=1;r<T;r++){e+=Math.hypot(w[r][0]-w[r-1][0],w[r][1]-w[r-1][1],w[r][2]-w[r-1][2]);let i=Math.atan2(w[r][0]-d,w[r][1]-f),a=i-n;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;t+=a,n=i}return{length:e,turns:Math.abs(t)/(Math.PI*2),drop:w[0][2]-w[T-1][2],samples:T,grade:(w[0][2]-w[T-1][2])/e}})(),j=new Map,M=(e,t)=>e*100003+t;for(let e=0;e<T-1;e++){let t=E[e],n=E[e+1],r=Math.min(t.x,n.x)-10,i=Math.max(t.x,n.x)+10,a=Math.min(t.z,n.z)-10,o=Math.max(t.z,n.z)+10;for(let t=Math.floor(r/24);t<=Math.floor(i/24);t++)for(let n=Math.floor(a/24);n<=Math.floor(o/24);n++){let r=M(t,n),i=j.get(r);i||j.set(r,i=[]),i.push(e)}}let N={y:0,on:!1,i:-1,d:0};function P(e,t){let n=j.get(M(Math.floor(e/24),Math.floor(t/24)));if(N.on=!1,N.i=-1,n){let r=1e9;for(let i of n){let n=E[i],a=E[i+1],o=a.x-n.x,s=a.z-n.z,c=o*o+s*s;if(c<1e-6)continue;let l=((e-n.x)*o+(t-n.z)*s)/c,u=bc(l,0,1),d=Math.hypot(e-(n.x+o*u),t-(n.z+s*u));if(d>7.6||d>r)continue;let f=bc(l,-.25,1.25),p=n.x+o*f,m=n.z+s*f,h=n.dx+(a.dx-n.dx)*u,g=n.dz+(a.dz-n.dz)*u,_=Math.hypot(h,g)||1,v=((e-p)*h+(t-m)*g)/_;r=d,N.on=!0,N.i=i,N.d=v,N.y=O(n.y+(a.y-n.y)*f,v,n.berm+(a.berm-n.berm)*u)}}return N.on||(N.y=m(e,t)),N}let F=bs(P,(()=>{if(!o||!o.length)return null;let e=[];for(let t of o){let n=t.rings[0];if(!n||n.length<3||!(t.height>0))continue;let r=1e9,i=1e9,a=-1e9,o=-1e9;for(let[e,t]of n)e<r&&(r=e),e>a&&(a=e),t<i&&(i=t),t>o&&(o=t);e.push({x0:r,z0:i,x1:a,z1:o,ring:n,y0:t.baseZ-1.5,y1:t.baseZ+t.height+2})}return(t,n,r,i)=>{let a=[];for(let o of e){if(o.x1<t||o.x0>r||o.z1<n||o.z0>i)continue;let e=Math.max(1,Math.ceil(o.ring.length/10)),s=[];for(let t=0;t<o.ring.length;t+=e){let[e,n]=o.ring[t];s.push(e,o.y0,n,e,o.y1,n)}a.push(new Float32Array(s))}return a}})()),I=!/[?&]phys=arcade\b/.test(location.search),L=`auto`,R=!1,z=0,ee=1/60,te=[{id:`load`,x:C[0],z:C[1],r:20,col:16756794,beacon:110},{id:`dump`,x:xs.x,z:xs.z,r:xs.r,col:5890191,beacon:55}],V=[];for(let e of te){e.y=P(e.x,e.z).y;let t=new U(e.r-2.2,e.r,48,1);t.rotateX(-Math.PI/2);let n=new u({color:856342,emissive:new ve(e.col),emissiveIntensity:2.4,transparent:!0,opacity:.85,depthWrite:!1,side:2}),r=new b(t,n);r.position.set(e.x,e.y+.25,e.z),c.add(r),V.push({zn:e,mat:n,mesh:r});let i=new a(1.4,1.4,e.beacon,10,1,!0),o=new S({color:new ve(e.col),transparent:!0,opacity:.13,depthWrite:!1,blending:2,side:2}),s=new b(i,o);s.position.set(e.x,e.y+e.beacon/2,e.z),c.add(s);let l=dc();vc(l,[0,0],0,6,.22,8,oc),hc(l,-1.3,6,-.12,1.3,7.4,.12,e.id===`load`?tc:oc);let d=yc(l,vn({key:`cp`,roughness:.8,snow:.6}));d.position.set(e.x+e.r*.82,e.y,e.z+e.r*.82),c.add(d)}let ne=vn({key:`belaz`,roughness:.62,metalness:.16,snow:.22}),re=vn({key:`ore`,roughness:.95,snow:.35}),ie=new p,ae=new p,H=new p,oe=[];ie.add(ae,H),c.add(ie);{let e=dc();hc(e,-1.06,1.02,-3.9,1.06,1.46,2.44,nc),hc(e,-1.34,.66,1.58,1.34,1.06,1.96,oc),hc(e,-1.56,.6,-1.99,1.56,1.1,-1.52,oc),hc(e,-1.52,.72,2.42,1.52,1.38,2.74,tc),gc(e,[-1.5,1.44,.58,.12,0,2.46],[-1.42,2.32,.62,.06,0,2.2],ec,ec),hc(e,-1.46,2.2,.6,.1,2.34,1.3,tc),hc(e,.2,1.46,.68,1.64,2.06,2.36,ec),hc(e,.22,2.06,.7,1.62,2.94,2.34,ac),hc(e,.16,2.94,.64,1.68,3.12,2.4,ec),hc(e,.3,1.2,1.1,.42,1.5,1.9,nc),hc(e,.24,.55,1.3,.38,1.22,1.44,nc),vc(e,[-1.28,1.02],2.3,3.44,.13,8,nc),hc(e,1.62,2.3,2.1,1.98,2.72,2.22,nc),hc(e,1.9,2.16,2.02,2.06,2.78,2.26,oc),hc(e,-1.62,1.72,1.1,-1.02,1.9,2.44,tc),hc(e,1.02,1.72,1.1,1.62,1.9,2.44,tc),ae.add(yc(e,ne));let t=dc();_c(t,0,0,0,Fs,.27,28,rc,rc),_c(t,0,0,0,Fs*.5,.29,18,ic,ic);let n=yc(t,ne).geometry,r=(e,t)=>{let r=new b(n,ne);return r.castShadow=!0,r.receiveShadow=!0,r.position.set(e,Fs,t),r.rotation.order=`YXZ`,ae.add(r),oe.push(r),r},i=[r(Is,Ls),r(-1.3,Ls)];for(let e of[1,-1])r(e*1,-1.775),r(e*1.48,-1.775);ae.userData.steer=i;let a=dc();hc(a,-1.16,1.48,2.72,-.86,1.78,2.8,16773320),hc(a,.86,1.48,2.72,1.16,1.78,2.8,16773320);let o=yc(a,new u({color:2763302,emissive:new ve(16770736),emissiveIntensity:2,vertexColors:!0,roughness:.4}),!1);ae.add(o)}let se=new B(0,2.02,-4.24);{let e=dc(),t=(e,t,n)=>[e,t-se.y,n-se.z],n=(t,n,r,i,a,o,s)=>hc(e,t,n-se.y,r-se.z,i,a-se.y,o-se.z,s),r=1.42,i=-4.2,a=2.46,o=2.08;mc(e,t(-1.56,a,r),t(1.56,a,r),t(1.56,o,i),t(-1.56,o,i),sc,0,1,0),mc(e,t(-1.56,2.36,r),t(1.56,2.36,r),t(1.56,1.98,i),t(-1.56,1.98,i),oc,0,-1,0);for(let n of[1,-1])mc(e,t(n*1.56,a,r),t(n*1.74,3.8,r),t(n*1.74,3.42,i),t(n*1.56,o,i),ec,n,0,0),mc(e,t(n*1.56,o,i),t(n*1.62,3.42,i),t(n*1.62,3.8,r),t(n*1.56,a,r),sc,-n,0,0),mc(e,t(n*1.74,3.8,r),t(n*1.62,3.8,r),t(n*1.62,3.42,i),t(n*1.74,3.42,i),tc,0,1,0);mc(e,t(-1.56,o,i),t(1.56,o,i),t(1.62,3.42,i),t(-1.62,3.42,i),tc,0,0,-1),mc(e,t(-1.56,a,r),t(-1.62,3.8,r),t(1.62,3.8,r),t(1.56,a,r),sc,0,0,1),gc(e,[-1.68,3.8-se.y,1.4-se.z,1.68,0,2.8-se.z],[-1.72,4.08-se.y,1.4-se.z,1.72,0,2.86-se.z],ec,ec);for(let e=0;e<5;e++){let t=.72-e*1.05,r=o+.3799999999999999*((t-i)/5.62);for(let e of[1,-1])n(e*1.56,r+.1,t-.1,e*1.7,r+1.18,t+.1,tc)}H.add(yc(e,ne));let s=dc();gc(s,[-1.44,0,-3.9000000000000004-se.z,1.44,0,1.22-se.z],[-1.16,1.24,-3.35-se.z,1.16,0,.72-se.z],cc,lc);let c=yc(s,re);c.position.set(0,2.14-se.y,0),c.visible=!1,H.add(c),H.userData.ore=c}H.position.copy(se);let W={active:!1,spawned:!1,x:0,y:0,z:0,yaw:0,vy:0,air:!1,vx:0,vz:0,speed:0,steer:0,up:new B(0,1,0),tilt:0,slope:0,onRamp:!1,down:!1,downT:0,downRoll:0,cargo:0,busy:``,busyT:0,tip:0,reward:!1,flash:0,gain:0,diamonds:+(localStorage.getItem(`mirny.diamonds`)||0)||0,trips:+(localStorage.getItem(`mirny.trips`)||0)||0,zone:null,cue:``,camYaw:0,camPitch:0,odo:0,spin:0},ce=[],le=!1,ue=!1,G=0,de=!1,fe={thr:0,brk:0,st:0,boost:!1};function pe(e,t){if(fe.thr=+!!e.has(`KeyW`),fe.brk=+!!e.has(`KeyS`),fe.st=!!e.has(`KeyA`)-+!!e.has(`KeyD`),fe.boost=e.has(`ShiftLeft`)||e.has(`ShiftRight`),!t)return fe;fe.thr=Math.max(fe.thr,t.rt),fe.brk=Math.max(fe.brk,t.lt);let n=-t.lx;return Math.abs(n)>Math.abs(fe.st)&&(fe.st=n),fe.boost=fe.boost||t.down(`l1`),fe}let me=new B,he=new B,ge=new B,_e=new s,K=new g,q=new B,ye=new B;function J(e,t,n){let r=Math.sin(n),i=Math.cos(n),a=-i,o=r,s=(n,s)=>P(e+r*n+a*s,t+i*n+o*s).y,c=s(Ls,-1.3),l=s(Ls,Is),u=s(-1.775,-1.3),d=s(-1.775,Is),f=(c+l+u+d)/4,p=(c+l-(u+d))/(4*Ls),m=(l+d-(c+u))/(4*Is);return me.set(-(r*p+a*m),1,-(i*p+o*m)).normalize(),f}function be(e,t,n,r=!1){W.x=e,W.z=t,W.yaw=n,W.y=J(e,t,n),W.vx=W.vz=W.speed=W.vy=0,W.down=!1,W.downT=0,W.air=!1,r||(ce.length=0),R&&F.place(e,t,n)}let xe=()=>{let e=E[2],t=E[4];be(e.x,e.z,Math.atan2(t.x-e.x,t.z-e.z))};function Se(){for(let e of te)if(Math.hypot(W.x-e.x,W.z-e.z)<e.r&&Math.abs(W.y-e.y)<25)return e;return null}function Ce(){if(W.busy||W.down)return;let e=W.zone;if(W.cargo>0){W.busy=`tip`,W.busyT=0,W.reward=e&&e.id===`dump`;return}e&&e.id===`load`&&(W.busy=`load`,W.busyT=0)}function we(){if(!W.down&&Math.abs(W.speed)>1)return;let e=ce.length>2?ce[ce.length-3]:null;e?(be(e[0],e[1],e[2],!0),ce.length-=2):xe(),W.downRoll=0}function Y(e){W.busy&&(W.busyT+=e,W.busy===`load`?(W.cargo=bc(W.busyT/1.6,0,1),W.busyT>=1.6&&(W.cargo=1,W.busy=``,F.setLoaded(!0))):W.busyT<2?W.tip=W.busyT/2:W.busyT<2.6?(W.tip=1,W.cargo>0&&(W.cargo=0,F.setLoaded(!1),W.reward&&(W.gain=2+Math.floor(Math.random()*6),W.diamonds+=W.gain,W.trips++,localStorage.setItem(`mirny.diamonds`,String(W.diamonds)),localStorage.setItem(`mirny.trips`,String(W.trips)),W.flash=2.2))):W.busyT<4?W.tip=1-(W.busyT-2.6)/1.4:(W.tip=0,W.busy=``))}function X(e,t,r){let{thr:i,brk:a,st:o,boost:s}=pe(t,r);W.steer=xc(W.steer,W.down?0:o,4,e);let c=W.cargo,l=(Cs+-11*c)*(s?ks:1),u=(Ts+-1.6*c)*(s?As:1),d=Es+-1.7999999999999998*c,f=Math.sin(W.yaw),p=Math.cos(W.yaw),m=-p,h=f,g=W.vx*f+W.vz*p,_=W.vx*m+W.vz*h,v=Math.sqrt(Math.max(0,1-me.y*me.y))/Math.max(.2,me.y);W.slope=v;let y=bc((v-.3)/.45,0,1),b=1-y*y*(3-2*y),x=Math.max(b,.25);if(!W.down&&!W.air){if(i>.02&&g<l*i&&(g+=u*i*x*e),a>.02&&(g>.4?g-=d*a*x*e:g=Math.max(-4*(s?1.8:1)*a,g-u*a*x*e)),i<=.02&&a<=.02){let t=Ds*b*e;g-=bc(g,-t,t)}g-=g*Os*e}if(W.vx=g*f+_*m,W.vz=g*p+_*h,!W.air){W.vx+=9.81*me.x*me.y*e,W.vz+=9.81*me.z*me.y*e,g=W.vx*f+W.vz*p,_=W.vx*m+W.vz*h;let t=js*b*e;_-=bc(_,-t,t),W.vx=g*f+_*m,W.vz=g*p+_*h}if(W.speed=g,!W.down){let t=Math.abs(g),n=Math.min(t/Ms,Ns/Math.max(t,.05));W.yaw+=W.steer*n*Math.sign(g||1)*e*x}W.x+=W.vx*e,W.z+=W.vz*e,W.x=bc(W.x,n.ox+8,n.ox+n.spanX-8),W.z=bc(W.z,n.oz+8,n.oz+n.spanZ-8);let S=J(W.x,W.z,W.yaw);W.onRamp=P(W.x,W.z).on,W.air||W.y>S+.55?(W.air=!0,W.vy-=9.81*e,W.y+=W.vy*e,W.y<=S&&(W.vy<-11&&v>.45&&(W.down=!0,W.downT=1),W.y=S,W.vy=0,W.air=!1)):(W.y=xc(W.y,S,18,e),W.vy=0),W.odo+=Math.abs(g)*e,W.spin+=g*e/Fs;let C=me.y;W.tilt=Math.acos(bc(C,-1,1)),W.tilt>Ps&&!W.down?(W.downT+=e,W.downT>.4&&(W.down=!0)):W.down||(W.downT=0),W.downRoll=xc(W.downRoll,+!!W.down,W.down?3:8,e),!W.down&&W.tilt<.5&&(G+=Math.abs(g)*e,G>12&&(G=0,ce.push([W.x,W.z,W.yaw]),ce.length>48&&ce.shift()))}let Te={steer:0,spin:0,driveTorque:0,brakeTorque:0,wake:!1};function Ee(e,t,n){let{thr:r,brk:i,st:a,boost:o}=pe(t,n);W.steer=xc(W.steer,W.down?0:a,2.6,e);let s=W.cargo,c=21e3+27e3*s,l=(Cs+-11*s)*(o?ks:1),u=(Ts+-1.6*s)*(o?As:1),d=Es+-1.7999999999999998*s,f=W.speed,p=Math.min(.55,Math.atan(2*Ls*6.5/Math.max(1,f*f)));Te.steer=W.steer*p,Te.spin=0,Te.driveTorque=0,Te.brakeTorque=0;let m=e=>c*u*Fs/2*(.35+.65*e);for(W.down?Te.brakeTorque=8e3:r>.02?(Te.spin=l*r/Fs,Te.driveTorque=m(r)):i>.02?f>.5?Te.brakeTorque=c*d*Fs/4*i:(Te.spin=-(ws*(o?1.8:1)*i)/Fs,Te.driveTorque=m(i)):Te.brakeTorque=Math.abs(f)<1.5?15e3*(1+s):4e3,W.busy&&(Te.brakeTorque=Math.max(Te.brakeTorque,4e4)),Te.wake=r>.02||i>.02||Math.abs(a)>.02,z=Math.min(z+e,.1);z>=ee;)F.step(ee,Te),z-=ee;let h=F.read(z/ee);W.x=h.x,W.y=h.y,W.z=h.z,W.yaw=h.yaw,W.speed=h.vFwd,W.vy=h.vy,W.air=!1,W.onRamp=P(W.x,W.z).on,W.tilt=Math.acos(bc(h.upY,-1,1)),W.odo+=Math.abs(h.vFwd)*e,W.spin+=h.vFwd*e/Fs,W.tilt>Ps&&!W.down?(W.downT+=e,W.downT>.4&&(W.down=!0)):W.down||(W.downT=0),W.down&&h.upY>.92&&Math.abs(h.vFwd)<1.5&&(W.down=!1,W.downT=0),W.downRoll=0,!W.down&&W.tilt<.5&&(G+=Math.abs(h.vFwd)*e,G>12&&(G=0,ce.push([W.x,W.z,W.yaw]),ce.length>48&&ce.shift()))}function De(e){if(R){let e=F.out;ie.position.set(e.x,e.y,e.z),ie.quaternion.set(e.quat[0],e.quat[1],e.quat[2],e.quat[3]);for(let e of oe)e.rotation.x=W.spin;let t=ae.userData.steer;t[0].rotation.y=e.wheels[0].steer,t[1].rotation.y=e.wheels[1].steer;let n=[0,1,2,2,3,3];for(let t=0;t<oe.length;t++)oe[t].position.y=bc(e.wheels[n[t]].ly,.44999999999999996,1.15);H.rotation.x=-W.tip*.85;let r=H.userData.ore;r.visible=W.cargo>.02,r.scale.set(1,Math.max(.02,W.cargo),1);return}Oe(e)}function Oe(e){ie.position.set(W.x,W.y,W.z),he.set(Math.sin(W.yaw),0,Math.cos(W.yaw)),he.addScaledVector(me,-he.dot(me)).normalize(),ge.crossVectors(me,he).normalize(),_e.makeBasis(ge,me,he),K.setFromRotationMatrix(_e),ie.quaternion.copy(K),W.downRoll>.001&&ie.rotateZ(W.downRoll*1.32);for(let e of oe)e.rotation.x=W.spin;for(let e of ae.userData.steer)e.rotation.y=W.steer*.52;H.rotation.x=-W.tip*.85;let t=H.userData.ore;t.visible=W.cargo>.02,t.scale.set(1,Math.max(.02,W.cargo),1)}function ke(e){q.set(W.x,W.y+3.4,W.z);let t=W.yaw+W.camYaw,n=16.5,i=Math.cos(W.camPitch),a=Math.sin(W.camPitch);ye.set(q.x-Math.sin(t)*n*i,q.y+7.2+n*a,q.z-Math.cos(t)*n*i);let o=P(ye.x,ye.z).y+2.6;ye.y<o&&(ye.y=o);let s=1-Math.exp(-7*e);r.position.lerp(ye,s),r.lookAt(q),Math.abs(W.speed)>2.5&&(W.camYaw=xc(W.camYaw,0,.7,e))}let Ae=document.getElementById(`drive`),je=0;function Me(){if(!Ae||performance.now()-je<110)return;je=performance.now();let e=Math.abs(W.speed)*3.6,t=W.zone,n=``,r=de?`<b>✕</b>`:`<b>F</b>`,i=de?`<b>△</b>`:`<b>R</b>`;W.down?n=`${i} — поставить на колёса`:W.busy===`load`?n=`погрузка…`:W.busy===`tip`?n=`разгрузка…`:t&&t.id===`load`&&W.cargo===0&&Math.abs(W.speed)<1.2?n=`${r} — грузить руду`:t&&t.id===`dump`&&W.cargo>0&&Math.abs(W.speed)<1.2?n=`${r} — сыпать на фабрике №3`:W.cargo>0&&Math.abs(W.speed)<1.2&&(n=`${r} — сыпать (здесь алмазов не будет)`),W.cue=n;let a=W.cargo>0?te[1]:te[0],o=Math.hypot(W.x-a.x,W.z-a.z);Ae.innerHTML=`БелАЗ-540 · <em>${e.toFixed(0)}</em> км/ч · `+(W.cargo>0?`<em>${Ss}</em> т руды`:`пустой`)+` · 💎 <em>${W.diamonds}</em>${W.flash>0?` <b>+${W.gain}</b>`:``}<br>${W.onRamp?`Рудовозка`:`вне дороги`} · ${W.y.toFixed(0).replace(`-`,`−`)} м · ${R?`box3d · `:``}${W.cargo>0?`фабрика №3`:`забой`} <em>${(o/1e3).toFixed(2).replace(`.`,`,`)}</em> км`+(n?`<br>${n}`:``)}function Ne(e,t,n){let r=n&&n.on?n:null;de=!!r;let i=t.has(`KeyF`)||(r?r.down(`cross`):!1);i&&!le&&Ce(),le=i;let a=t.has(`KeyR`)||(r?r.down(`triangle`):!1);a&&!ue&&we(),ue=a,r&&(r.rx||r.ry)&&(W.camYaw=bc(W.camYaw-r.rx*Math.abs(r.rx)*2.6*e,-2.6,2.6),W.camPitch=bc(W.camPitch+r.ry*Math.abs(r.ry)*1.6*e,-.35,.9)),W.zone=Se(),Y(e);let o=I&&L===`auto`&&F.ready&&!F.error;o&&!R?(R=!0,F.place(W.x,W.z,W.yaw),F.setLoaded(W.cargo>.5)):!o&&R&&(R=!1),R?Ee(e,t,r):X(e,t,r),De(e),ke(e),Me();let s=performance.now()*.002;for(let e of V){let t=W.zone===e.zn;e.mat.opacity=(t?.95:.6)+.22*Math.sin(s+(e.zn.id===`load`?0:2)),e.mat.emissiveIntensity=t?4:2.2}W.flash>0&&(W.flash-=e)}return{group:c,get active(){return W.active},state:W,ramp:{...A,line:w,seg:E,surfaceAt:P,pad:C,plant:xs},enter(e){e?(be(e.x,e.z,e.yaw),W.spawned=!0):W.spawned||=(xe(),!0),W.active=!0,Ae&&(Ae.style.display=`block`),De(.016),ke(1)},exit(){W.active=!1,Ae&&(Ae.style.display=`none`)},update:Ne,look(e,t){W.camYaw=bc(W.camYaw-e*.0026,-2.6,2.6),W.camPitch=bc(W.camPitch+t*.0018,-.35,.9)},step(e,t=[],n=null){return Ne(e,new Set(t),n),W},physics(e){return e&&(L=e),{mode:R?`box3d`:`arcade`,wanted:I,ready:F.ready,error:F.error?String(F.error):null,patch:F.ready?F.patch():null,out:F.out,in:Te,ctl:{...fe},pad:de}},selfTest(){ie.updateMatrixWorld(!0);let e=ie.matrixWorld,t=new B(0,0,1).transformDirection(e),n=new B(1,0,0).transformDirection(e),r=new B(Math.sin(W.yaw),0,Math.cos(W.yaw)),i=new B(r.z,0,-r.x),a=(e,t)=>+(Math.acos(bc(e.dot(t),-1,1))*57.3).toFixed(1);return{noseVsHeadingDeg:a(t,r),modelPlusXvsLeftDeg:a(n,i),cabIsOn:n.dot(i)>0?`left`:`right`}},warp(e){if(e===`floor`){let e=T-2,t=1e9;for(let n=0;n<T-1;n++){let r=(E[n].x-C[0])**2+(E[n].z-C[1])**2;r<t&&(t=r,e=n)}let n=bc(e-2,1,T-2),r=E[n],i=E[n+1];be(r.x,r.z,Math.atan2(i.x-r.x,i.z-r.z))}else if(e===`plant`)be(xs.x+8,xs.z+8,Math.atan2(-8,-8));else if(typeof e==`number`){let t=bc(Math.round(Math.abs(e)),1,T-2),n=E[t],r=E[t+(e<0?-1:1)];be(n.x,n.z,Math.atan2(r.x-n.x,r.z-n.z))}else xe();return De(.016),ke(1),W}}}var Cc=[`cross`,`circle`,`square`,`triangle`,`l1`,`r1`,`l2`,`r2`,`share`,`options`,`l3`,`r3`,`up`,`down`,`left`,`right`,`ps`],wc=new Map(Cc.map((e,t)=>[e,t])),Tc=.12,Ec=.04;function Dc(e,t){let n=Math.hypot(e,t);if(n<Tc)return[0,0];let r=(n-Tc)/.88/n;return[e*r,t*r]}var Oc=e=>e<Ec?0:(e-Ec)/.96;function kc({onChange:e=null}={}){let t=-1,n=0,r=0,i=!0,a={on:!1,id:``,lx:0,ly:0,rx:0,ry:0,lt:0,rt:0},o=()=>{a.lx=a.ly=a.rx=a.ry=a.lt=a.rt=0,n=r=0};function s(){let s=navigator.getGamepads?navigator.getGamepads():[],c=null,l=null;for(let e of s)!e||!e.connected||(e.index===t&&(l=e),c||=e);if(c=l||c,!c)return a.on&&(a.on=!1,a.id=``,t=-1,o(),e?.(!1,``)),r=0,!1;c.index!==t&&(t=c.index,i=!0);let u=c.axes;[a.lx,a.ly]=Dc(u[0]||0,u[1]||0),[a.rx,a.ry]=Dc(u[2]||0,u[3]||0);let d=c.buttons,f=e=>d[e]?d[e].value??+!!d[e].pressed:0;a.lt=Oc(f(6)),a.rt=Oc(f(7));let p=0;for(let e=0;e<Cc.length;e++)d[e]&&(d[e].pressed||d[e].value>.5)&&(p|=1<<e);return r=i?0:p&~n,n=p,i=!1,a.on||(a.on=!0,a.id=c.id||`gamepad`,e?.(!0,a.id)),!0}return{poll:s,get on(){return a.on},get id(){return a.id},get lx(){return a.lx},get ly(){return a.ly},get rx(){return a.rx},get ry(){return a.ry},get lt(){return a.lt},get rt(){return a.rt},down:e=>!!(n&1<<wc.get(e)),hit:e=>!!(r&1<<wc.get(e)),debug:()=>({on:a.on,id:a.id,lx:+a.lx.toFixed(3),ly:+a.ly.toFixed(3),rx:+a.rx.toFixed(3),ry:+a.ry.toFixed(3),lt:+a.lt.toFixed(3),rt:+a.rt.toFixed(3),held:Cc.filter((e,t)=>n&1<<t)})}}var Ac=1.2;function jc(e,t,n,r,i,a,o,s,c){let l=r*a,u=i*a,d=(r,i)=>e[Math.min(n-1,Math.max(0,i))*t+Math.min(t-1,Math.max(0,r))]*.1,f=(e,t)=>{let n=-1e9;for(let r=-2;r<=2;r++)n=Math.max(n,d(e+r,t),d(e,t+r));return n+.5},p=[],m=[],h=(e,t,n,r,i)=>{p.push(...e,...t,...n,...e,...n,...r);for(let e=0;e<6;e++)m.push(...i)};for(let[e,t]of[[0,-1],[u,1]]){let n=c+e*o+t*Ac;for(let r=0;r<l;r+=1){let i=Math.min(l,r+1),a=f(r,e),c=f(i,e),u=[s+r*o,a,n],d=[s+i*o,c,n],p=[s+i*o,J,n],m=[s+r*o,J,n];t<0?h(u,d,p,m,[0,0,-1]):h(d,u,m,p,[0,0,1])}}for(let[e,t]of[[0,-1],[l,1]]){let n=s+e*o+t*Ac;for(let r=0;r<u;r+=1){let i=Math.min(u,r+1),a=f(e,r),s=f(e,i),l=[n,a,c+r*o],d=[n,s,c+i*o],p=[n,J,c+i*o],m=[n,J,c+r*o];t>0?h(l,d,p,m,[1,0,0]):h(d,l,m,p,[-1,0,0])}}h([s-Ac,J,c-Ac],[s+l*o+Ac,J,c-Ac],[s+l*o+Ac,J,c+u*o+Ac],[s-Ac,J,c+u*o+Ac],[0,-1,0]);let g=new v;return g.setAttribute(`position`,new V(p,3)),g.setAttribute(`normal`,new V(m,3)),g.computeBoundingSphere(),g}function Mc(){let{depths:e}=Ce(),t={uBandDepth:{value:e},uBandColor:{value:be.map(([,e])=>new B(...e))}},n=new u({roughness:.97,metalness:0});return n.userData.uniforms=t,n.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
 varying vec3 vWPos;`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
        vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        varying vec3 vWPos;
        ${we}
        ${Y}`).replace(`#include <map_fragment>`,`
        // bedding planes wobble a little; a perfectly level stripe reads as a
        // graphic, a wobbling one reads as rock
        float wob = (fbm(vec2(vWPos.x * 0.004 + vWPos.z * 0.004, 0.5)) - 0.5) * 26.0;
        float yb = vWPos.y + wob;
        vec3 c = strataAt(yb);
        c *= 0.72 + 0.55 * fbm(vec2((vWPos.x + vWPos.z) * 0.06, vWPos.y * 0.16));
        c *= 0.85 + 0.3 * fbm(vec2((vWPos.x + vWPos.z) * 0.9, vWPos.y * 2.2));

        // Bedding planes. Albedo alone does not survive the full-slab zoom —
        // the whole 620 m of section is about 50 px tall there and a sunward
        // wall clips into one orange smear. A dark line every 38 m is a
        // structure the eye keeps at any size, and limestone really does part
        // along its bedding.
        float bed = abs(fract(yb / 38.0) - 0.5);
        c *= 1.0 - 0.34 * smoothstep(0.5, 0.40, bed);
        diffuseColor.rgb *= c;
      `)},n.customProgramCacheKey=()=>`mirny-slab`,n}var $={fog0:new Float32Array(4),fog1:new Float32Array(4),fog2:new Float32Array(4),fog3:new Float32Array(4),fog4:new Float32Array(4),rect:new Float32Array(4),col:new Float32Array(4),sun:new Float32Array(4),sunc:new Float32Array(4)};function Nc(){return{uWxFog0:{value:$.fog0},uWxFog1:{value:$.fog1},uWxFog2:{value:$.fog2},uWxFog3:{value:$.fog3},uWxFog4:{value:$.fog4},uWxRect:{value:$.rect},uWxCol:{value:$.col},uWxSun:{value:$.sun},uWxSunC:{value:$.sunc}}}var Pc=`
uniform vec4 uWxFog0;
uniform vec4 uWxFog1;
uniform vec4 uWxFog2;
uniform vec4 uWxFog3;
uniform vec4 uWxFog4;
uniform vec4 uWxRect;
uniform vec4 uWxCol;
uniform vec4 uWxSun;
uniform vec4 uWxSunC;

float wxG(float y, float top, float H) {
  float h = y - top;
  return h <= 0.0 ? h : H * (1.0 - exp(-h / H));
}
float wxF(float y, float top, float H) {
  return exp(-max(y - top, 0.0) / H);
}
// optical depth (in units of the layer's density) along a segment of length L
// from height y0 to height y1
float wxLayer(float y0, float y1, float L, float top, float H) {
  float dy = y1 - y0;
  if (abs(dy) < 1e-3 * L + 1e-4) return L * wxF(0.5 * (y0 + y1), top, H);
  return L * (wxG(y1, top, H) - wxG(y0, top, H)) / dy;
}
float wxHash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float wxNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(wxHash(i), wxHash(i + vec2(1.0, 0.0)), f.x),
             mix(wxHash(i + vec2(0.0, 1.0)), wxHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float wxInPit(vec2 xz) {
  return 1.0 - smoothstep(uWxFog3.x - 90.0, uWxFog3.x, length(xz - uWxFog2.zw));
}
// slow wobble of a pool's top, -0.5..0.5, drifting with the wind
float wxWob(vec2 xz) {
  return (wxNoise(xz / 260.0 + uWxFog3.yz) + 0.6 * wxNoise(xz / 90.0 - uWxFog3.yz * 1.7)) / 1.6 - 0.5;
}
// where the eye ray crosses height y (clamped to the segment): a pool's top is
// read there, which is the surface actually seen from above
vec2 wxCross(vec3 c, vec3 dir, float L, float y) {
  float t = abs(dir.y) > 1e-4 ? clamp((y - c.y) / dir.y, 0.0, L) : L;
  return c.xz + dir.xz * t;
}
// Seen from above, an opaque pool shows its top: a bumpy surface lit by the
// sun. Returns sun-facing-ness of that surface at q (slope from the wobble).
float wxSurf(vec2 q, float amp) {
  float e = 14.0;
  float gx = (wxWob(q + vec2(e, 0.0)) - wxWob(q - vec2(e, 0.0))) / (2.0 * e);
  float gz = (wxWob(q + vec2(0.0, e)) - wxWob(q - vec2(0.0, e))) / (2.0 * e);
  return dot(normalize(vec3(-gx * amp, 1.0, -gz * amp)), uWxSun.xyz);
}

// Set by wxDepth for wxFogColor: how much of what is seen is a pool's lit top,
// signed by whether that bit of surface faces the sun.
float wxS;

// Optical depth from the camera c to a point p at distance L. wob = 1 lets the
// pool tops wobble and be lit as surfaces; the sky passes 0 (a smooth veil).
// Inside the pit (by where the ray ends or starts) the town's layers give way
// to the pit's own: a thin haze thickening with depth over the upper benches,
// then the pool the lower horizons go under.
float wxDepth(vec3 c, vec3 p, float L, float wob) {
  vec3 dir = (p - c) / max(L, 1e-3);
  float pit = max(wxInPit(p.xz), wxInPit(c.xz));
  float amp = uWxFog1.z * wob;
  float tau = 0.0;
  wxS = 0.0;
  if (pit < 1.0) {
    vec2 q = wxCross(c, dir, L, uWxFog1.x);
    float top = uWxFog1.x + amp * wxWob(q);
    float tv = uWxFog0.x * wxLayer(c.y, p.y, L, top, uWxFog1.y);
    tau += (1.0 - pit) * (tv + uWxFog0.y * wxLayer(c.y, p.y, L, uWxFog4.x, uWxFog4.y));
    if (wob > 0.0 && c.y > top && tv > 0.2)
      wxS += (1.0 - pit) * min(tv / 2.0, 1.0) * wxSurf(q, amp);
  }
  if (pit > 0.0) {
    vec2 q = wxCross(c, dir, L, uWxFog2.x);
    float top = uWxFog2.x + 1.6 * amp * wxWob(q);
    float tp = uWxFog0.z * wxLayer(c.y, p.y, L, top, uWxFog2.y);
    tau += pit * (tp + uWxFog3.w * wxLayer(c.y, p.y, L, top, uWxFog4.z));
    if (wob > 0.0 && c.y > top && tp > 0.2)
      wxS += pit * min(tp / 2.0, 1.0) * wxSurf(q, 1.6 * amp);
  }
  // falling snow: near-uniform up to ~800 m over the viewer's ground
  if (uWxFog4.w > 0.0)
    tau += uWxFog4.w * wxLayer(c.y, p.y, L, uWxFog4.x + 800.0, 300.0);
  return tau;
}
// Colour the fog scatters toward the eye along direction d: ambient, a
// forward-scattering lobe round the sun (ice crystals scatter hard forward),
// and the sunlit or shaded top of a pool when one is what is seen.
vec3 wxFogColor(vec3 d) {
  float g = uWxSun.w;
  float mu = dot(d, uWxSun.xyz);
  float hg = (1.0 - g * g) / pow(max(1.0 + g * g - 2.0 * g * mu, 1e-4), 1.5);
  return uWxCol.rgb * (1.0 + 0.6 * min(wxS, 0.0))
       + uWxSunC.rgb * ((0.25 + 0.5 * hg) * uWxCol.a + uWxFog1.w * max(wxS, 0.0));
}
`,Fc=`
#ifdef USE_FOG
	varying float vFogDepth;
	varying vec3 vWxRel;
#endif
`,Ic=`
#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
	vWxRel = mvPosition.xyz * mat3( viewMatrix );
#endif
`,Lc=`
#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	varying vec3 vWxRel;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
	${Pc}
#endif
`,Rc=`
#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	if ( uWxFog0.w > 0.0 ) {
		vec3 wxP = cameraPosition + vWxRel;
		float wxIn = step( uWxRect.x + 1.0, wxP.x ) * step( wxP.x, uWxRect.z - 1.0 )
		           * step( uWxRect.y + 1.0, wxP.z ) * step( wxP.z, uWxRect.w - 1.0 );
		if ( wxIn > 0.0 ) {
			float wxL = length( vWxRel );
			float wxT = exp( - uWxFog0.w * wxDepth( cameraPosition, wxP, wxL, 1.0 ) );
			vec3 wxC = linearToOutputTexel( vec4( wxFogColor( vWxRel / max( wxL, 1e-3 ) ), 1.0 ) ).rgb;
			gl_FragColor.rgb = mix( wxC, gl_FragColor.rgb, wxT );
		}
	}
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif
`,zc=!1;function Bc(){if(zc)return{already:!0};zc=!0;let e=ae,t=[e.fog_pars_vertex,e.fog_vertex,e.fog_pars_fragment,e.fog_fragment];e.fog_pars_vertex=Fc,e.fog_vertex=Ic,e.fog_pars_fragment=Lc,e.fog_fragment=Rc;let n=[],r=Nc();for(let[e,t]of Object.entries(z))!t.uniforms||!t.uniforms.fogColor||(Object.assign(t.uniforms,r),n.push(e));return Object.assign(L.fog,r),{libs:n,stockLength:t.map(e=>e.length)}}var Vc=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,Hc=`
  uniform vec3 uSun;         // unit vector toward the sun
  uniform vec3 uZenith, uHorizon, uGlow;
  uniform float uDay;        // 0 deep night .. 1 full day
  uniform float uSunUp;      // 1 when the disc is above the horizon
  uniform float uCloud;      // 0 clear .. 1 overcast
  uniform vec2 uCloudOff;    // wind drift of the cloud field, in cloud heights
  uniform vec3 uCloudLit;    // sunlit cloud colour (linear)
  uniform vec3 uCloudAmb;    // cloud base / overcast deck colour (linear)
  uniform vec4 uVeil;        // general fog colour (linear), amount
  uniform float uVeilK;      // how fast the veil thins with elevation
  uniform float uHalo;       // diamond-dust optics strength
  uniform vec4 uTownGlow;    // warm light from below (linear), amount
  varying vec3 vDir;
  ${Pc}

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float cfbm(vec2 p) {
    float s = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) {
      s += a * wxNoise(p);
      p = mat2(1.6, 1.2, -1.2, 1.6) * p + 3.1;
      a *= 0.5;
    }
    return s / 0.96875;
  }
  vec3 wxOut(vec3 c) { return linearToOutputTexel(vec4(c, 1.0)).rgb; }

  void main() {
    vec3 d = normalize(vDir);
    float up = d.y;

    // Vertical falloff, measured from the horizon rather than from straight
    // down, so the warm band stays a band instead of washing halfway up the
    // dome. Below the horizon there is no sky to model — this is a diorama and
    // the slab hangs in a void, so that half fades to something near black and
    // lets the cut edge read as an edge.
    float t = pow(clamp(up, 0.0, 1.0), 0.52);
    vec3 col = mix(uHorizon, uZenith, t);
    vec3 voidCol = mix(uZenith, vec3(0.004, 0.006, 0.011), 0.72);
    col = mix(col, voidCol, smoothstep(0.0, -0.22, up));

    // Mie forward-scatter round the sun, widening as it drops. The winter sun
    // here never climbs out of this lobe, which is why the whole sky goes the
    // colour of someone else's sunset for four hours and then stops.
    float mu = max(dot(d, uSun), 0.0);
    float low = 1.0 - clamp(uSun.y * 3.0, 0.0, 1.0);
    float lobe = pow(mu, mix(24.0, 5.0, low));
    float band = pow(mu, 2.0) * exp(-abs(up) * 4.0);
    col += uGlow * (lobe * 1.5 + band * 0.85 * low);

    // the disc itself, softened — it is always seen through a lot of air here
    float disc = smoothstep(0.99955, 0.99992, mu) * uSunUp;
    col += uGlow * disc * 9.0;

    // cool anti-solar side, and the earth-shadow band opposite a low sun
    col *= 1.0 - 0.16 * clamp(-dot(d, uSun), 0.0, 1.0) * (1.0 - uDay);

    // stars: only where the sky is dark enough to have earned them
    float night = clamp(1.0 - uDay * 1.9, 0.0, 1.0);
    if (night > 0.01 && up > -0.05) {
      vec2 cell = floor(d.xz * 260.0 / max(abs(d.y) + 0.35, 0.2));
      float r = hash(cell);
      float s = smoothstep(0.9975, 1.0, r) * hash(cell + 7.7);
      col += vec3(0.85, 0.9, 1.0) * s * night * 1.4;
    }

    // A thin bright line on the horizon, which is what stops the void reading
    // as a rendering failure rather than as empty space. Kept tight — wide, it
    // becomes a white sash across a summer sky.
    col += uHorizon * 0.32 * exp(-abs(up) * 170.0);

    // ---- weather ---------------------------------------------------------
    // The cloud layer: a plane some way above the town, seen through the
    // dome; at full cover a deck with no gaps.
    if (uCloud > 0.0) {
      float upc = max(up, 0.0);
      vec2 pc = d.xz / max(upc, 0.04) * 0.9 + uCloudOff;
      float n = cfbm(pc);
      float thick = cfbm(pc * 2.7 + 11.0);
      float cov = uCloud;
      float dens = smoothstep(1.0 - cov, 1.0 - cov + 0.32, n);
      float deck = smoothstep(0.72, 1.0, cov);
      dens = max(dens, deck);
      float thin = 1.0 - smoothstep(0.0, 0.25, n - (1.0 - cov));
      vec3 cc = uCloudAmb * (0.7 + 0.6 * thick)
              + uCloudLit * (0.35 + 1.4 * pow(mu, 5.0) * (0.3 + thin) + 0.25 * thin);
      // An overcast deck is lit from above and seen from below: flat, a
      // little brighter overhead than at the horizon, a diffuse bright patch
      // where the sun is behind it.
      vec3 dk = uCloudAmb * (0.86 + 0.22 * thick) * (0.82 + 0.25 * upc)
              + uCloudLit * 0.30 * pow(mu, 3.0);
      cc = mix(cc, dk, deck);
      cc += uTownGlow.rgb * uTownGlow.a * (0.4 + 0.6 * (1.0 - upc));
      float reach = mix(smoothstep(0.0, 0.12, up), smoothstep(-0.14, 0.0, up), deck);
      col = mix(col, wxOut(cc), dens * reach);
    }

    if (uTownGlow.a > 0.0)
      col += wxOut(uTownGlow.rgb) * uTownGlow.a * exp(-max(up, 0.0) * 9.0) * smoothstep(-0.1, 0.0, up);

    // snow and blizzard: the general fog, thickest at the horizon
    if (uVeil.a > 0.0) {
      float v = uVeil.a * exp(-abs(up) * uVeilK);
      col = mix(col, wxOut(uVeil.rgb), v);
    }

    // frost fog, integrated from the eye over 20 km along this direction;
    // the disc shows back through it as far as the fog lets the sun through
    float sunT = 1.0;
    if (uWxFog0.w > 0.0) {
      float L = 20000.0;
      float tau = uWxFog0.w * wxDepth(cameraPosition, cameraPosition + d * L, L, 0.0);
      col = mix(wxOut(wxFogColor(d)), col, exp(-tau));
      sunT = exp(-uWxFog0.w * wxDepth(cameraPosition, cameraPosition + uSun * L, L, 0.0));
      col += uGlow * disc * 6.0 * sunT * (1.0 - exp(-tau));
    }

    // Diamond dust optics, painted: a 22 degree halo and a pillar through a
    // low sun, drawn by the crystals in the air in front of everything else,
    // so after the veils; only as bright as the sun that reaches them.
    if (uHalo > 0.0 && uSunUp > 0.5) {
      float ang = acos(clamp(dot(d, uSun), -1.0, 1.0));
      float ring = exp(-pow((ang - 0.3840) / 0.010, 2.0))
                 + 0.45 * exp(-pow((ang - 0.4020) / 0.022, 2.0));
      vec2 hd = normalize(d.xz + 1e-5), hs = normalize(uSun.xz + 1e-5);
      float dAz = acos(clamp(dot(hd, hs), -1.0, 1.0)) * sqrt(max(1.0 - up * up, 0.0));
      float dEl = asin(clamp(up, -1.0, 1.0)) - asin(clamp(uSun.y, -1.0, 1.0));
      float pillar = exp(-dAz / 0.0045) * exp(-abs(dEl) / (dEl > 0.0 ? 0.10 : 0.05));
      col += uGlow * uHalo * max(sunT, 0.12) * (0.55 * ring * smoothstep(-0.02, 0.05, up) + 2.2 * pillar);
    }

    gl_FragColor = vec4(col, 1.0);
  }`,Uc=class{constructor(e=6e4){this.uniforms={uSun:{value:new B(0,.2,1)},uZenith:{value:new ve},uHorizon:{value:new ve},uGlow:{value:new ve},uDay:{value:0},uSunUp:{value:0},uCloud:{value:0},uCloudOff:{value:new H},uCloudLit:{value:new ve(0,0,0)},uCloudAmb:{value:new ve(0,0,0)},uVeil:{value:new R(0,0,0,0)},uVeilK:{value:8},uHalo:{value:0},uTownGlow:{value:new R(0,0,0,0)},...Nc()},this.fog=new ve,this.mesh=new b(new ie(e,40,24),new O({uniforms:this.uniforms,vertexShader:Vc,fragmentShader:Hc,side:1,depthWrite:!1,fog:!1})),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-1}update(e,t,n){return this.uniforms.uSun.value.set(t.x,t.y,t.z).normalize(),this.uniforms.uZenith.value.setRGB(...e.top,de),this.uniforms.uHorizon.value.setRGB(...e.bottom,de),this.uniforms.uGlow.value.setRGB(...e.sunColor,de).multiplyScalar(.1+.55*e.day),this.uniforms.uDay.value=e.day,this.uniforms.uSunUp.value=+(n>-.8),this.fog.copy(this.uniforms.uHorizon.value).lerp(this.uniforms.uZenith.value,.55).multiplyScalar(.72),this.fog}setWeather(e){let t=this.uniforms;t.uCloud.value=e.cloud,t.uCloudOff.value.copy(e.cloudOff),t.uCloudLit.value.copy(e.cloudLit),t.uCloudAmb.value.copy(e.cloudAmb),t.uVeil.value.set(e.veil.r,e.veil.g,e.veil.b,e.veilAmount),t.uVeilK.value=e.veilK,t.uHalo.value=e.halo}setTownGlow(e,t){this.uniforms.uTownGlow.value.set(e.r,e.g,e.b,t)}};async function Wc(e,t,n=globalThis.crypto){if(!e||e.schemaVersion!==1||!e.outputs)throw Error(`real bundle manifest is missing or unsupported`);if(!n?.subtle)throw Error(`real bundle verification requires Web Crypto (HTTPS or localhost)`);let r=e=>[...new Uint8Array(e)].map(e=>e.toString(16).padStart(2,`0`)).join(``);await Promise.all(Object.entries(t).map(async([t,i])=>{if(!(i instanceof ArrayBuffer))throw Error(`${t}: bundle payload was not loaded`);let a=e.outputs[t];if(!a)throw Error(`${t}: absent from bundle manifest`);if(i.byteLength!==a.bytes)throw Error(`${t}: ${i.byteLength} bytes, manifest says ${a.bytes}`);if(r(await n.subtle.digest(`SHA-256`,i))!==a.sha256)throw Error(`${t}: bundle checksum mismatch`)}))}function Gc(){return{t:0,dt:0,dateIdx:0,doy:1,simMin:780,running:!0,rate:180,sun:{altitude:0,azimuth:0,vec:new B(0,1,0),sky:null,day:0},snow:0,night:0,mode:`orbit`,focus:new B,walkSpeed:0,weather:{kind:`auto`,resolved:`clear`,label:`ясно`,scenario:!0,tempC:-10,tempNormalC:-10,windMs:2,windDir:0,cloud:0,fog:0,visibilityM:2e4,iceFog:0,fogTopY:-55,snowfall:0,dust:0,sunDim:1},lake:{year:2024,level:null},audio:{muted:!1}}}var Kc={source:`pogodaiklimat.ru/climate/24726.htm (Мирный, 24726), copied 2026-09-29`,max:[-26.1,-21.1,-9.6,1.3,10.7,21.3,23.5,19.7,9.8,-2.7,-18,-26.4],mean:[-29.6,-25.7,-15.3,-4.3,5.2,14.9,17.6,13.7,5,-6.4,-21.6,-29.9],min:[-33,-29.9,-20.9,-9.8,.1,8.9,11.9,8.5,1,-9.7,-25.1,-33.3]},qc=[0,31,59,90,120,151,181,212,243,273,304,334,365],Jc=qc.slice(0,12).map((e,t)=>e+(qc[t+1]-e+1)/2);function Yc(e){let t=0;for(;t<11&&e>qc[t+1];)t++;return t}function Xc(e,t){let n=((t-1)%365+365)%365+1,r=11;for(let e=0;e<12;e++)n>=Jc[e]&&(r=e);let i=(r+1)%12,a=Jc[r],o=Jc[i],s=n;o<=a&&(o+=365,s<a&&(s+=365));let c=(s-a)/(o-a);return e[r]+(e[i]-e[r])*c}function Zc(e){return{max:Xc(Kc.max,e),min:Xc(Kc.min,e),mean:Xc(Kc.mean,e)}}var Qc=1.86,$c=new Map;function el(e){let t=$c.get(e);return t||(t=D(e),$c.set(e,t)),t}function tl(e,t,n,r,i){if(r===null||i===null||i<=r)return(t+n)/2;let a=(e%1440+1440)%1440/60,o=r/60,s=i/60,c=s-o,l=24-c,u=e=>t+(n-t)*Math.sin(Math.PI*e/(c+2*Qc));if(a>=o&&a<=s)return u(a-o);let d=u(c),f=a>s?a-s:a+24-s,p=Math.exp(-2.2);return(t-d*p+(d-t)*Math.exp(-2.2*f/l))/(1-p)}function nl(e,t){let n=Zc(e),{rise:r,set:i}=el(e);return tl(t,n.min,n.max,r,i)}var rl=[`auto`,`clear`,`overcast`,`snow`,`blizzard`,`icefog`],il={clear:`ясно`,overcast:`пасмурно`,snow:`снег`,blizzard:`метель`,icefog:`морозный туман`,fog:`туман`},al={clear:{cloud:0,fog:0,iceFog:0,snowfall:0,windMs:2,sunDim:1,dust:0},overcast:{cloud:1,fog:.15,iceFog:0,snowfall:0,windMs:4,sunDim:.1,dust:0},snow:{cloud:1,fog:.55,iceFog:0,snowfall:.6,windMs:4,sunDim:.06,dust:0},blizzard:{cloud:1,fog:.88,iceFog:0,snowfall:1,windMs:15,sunDim:.03,dust:0},icefog:{cloud:0,fog:.12,iceFog:1,snowfall:0,windMs:.5,sunDim:.45,dust:1}};function ol(e){return 2e4*(100/2e4)**Math.max(0,Math.min(1,e))}function sl(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var cl=[.65,.55,.5,.4,.35,.4,.35,.3,.3,.3,.5,.6],ll=[.12,.15,.2,.25,.3,.3,.35,.4,.4,.4,.25,.15],ul=[1,.8,.3,0,0,0,0,0,0,0,.3,1],dl=[.05,.05,.08,.08,.03,0,0,0,.02,.08,.08,.05];function fl(e,t,n=37){let r=sl(n*1e3+e),i=r(),a=i<cl[t]?`high`:i<cl[t]+ll[t]?`low`:`mixed`,o=t>=10||t<=2,s=r(),c;c=a===`high`?o?-(3+10*s):1+3*s:a===`low`?o?3+5*s:-(1+3*s):(s-.5)*4;let l=r()*Math.PI*2,u=r()<ul[t],d=[r(),r(),r(),r()],f=[r(),r(),r(),r()];return{regime:a,anomaly:c,windDir:l,fogOK:u,blocks:d,extra:f}}function pl(e,t,n,r,i,a={},o=37){let s=fl(e,n,o),c=i+s.anomaly,l=s.fogOK&&r.min+s.anomaly<=-40&&r.max+s.anomaly<=-30,u=Math.floor((t%1440+1440)%1440/360),d=s.blocks[u],f=s.extra[u],p=t/60,m=`clear`,h=null;if(s.regime===`high`){let e=a.noon!=null&&a.set!=null&&t>a.noon+60&&t<a.set+60;l&&c<=-35&&!(e&&c>-40)?m=`icefog`:(m=`clear`,n>=4&&n<=7&&p>12&&p<19&&(h=.1+.1*f))}else s.regime===`mixed`?(m=d<.45?`clear`:d<.8?`overcast`:c<1?`snow`:`overcast`,m===`clear`&&(h=.2*f)):(m=c<1?d<dl[n]*2.5&&f<.6?`blizzard`:d<.65?`snow`:`overcast`:d<.75?`overcast`:`clear`,m===`clear`&&(h=.2*f));return{state:m,anomaly:s.anomaly,windDir:s.windDir,regime:s.regime,cloud:h,fogDay:l}}function ml(e,t,n){if(!(n>=10||n<=2))return e===`overcast`||e===`snow`?-2:0;switch(e){case`clear`:return-2;case`overcast`:return 3;case`snow`:return 4;case`blizzard`:return 6;case`icefog`:return Math.min(-2,-40-t);default:return 0}}var hl=`
  attribute vec4 aSeed;          // xyz in [0,1): place in the box; w: rate key
  attribute vec4 aSpin;          // tumbling axis and phase (dust)
  uniform vec3 uEye;
  uniform vec3 uDrift;           // accumulated wind + fall, metres, kept mod box
  uniform vec3 uVel;             // mean flake velocity, m/s (for the streak)
  uniform float uBox;
  uniform float uRate;           // 0..1 share of flakes alive
  uniform float uTime;
  uniform float uSize;           // flake radius, metres
  uniform float uFlutter;        // sideways wobble amplitude, metres
  uniform float uShutter;        // seconds of motion smeared into the streak
  uniform vec2 uRes;             // drawing buffer size, px
  uniform float uDust;           // 1: diamond dust mode
  uniform vec3 uLightDir;        // unit vector toward the light the glints catch
  varying vec2 vLocal;           // px along / across the streak
  varying float vHalf;           // half streak length, px
  varying float vRad;            // radius, px
  varying float vAlpha;
  varying float vGlint;

  void main() {
    float key = aSeed.w;
    float alive = clamp((uRate - key) * 25.0, 0.0, 1.0);
    vec3 p = aSeed.xyz * uBox + uDrift;
    float ph = key * 97.0;
    p.x += sin(uTime * (0.9 + key) + ph) * uFlutter;
    p.z += cos(uTime * (0.7 + key * 0.8) + ph * 1.3) * uFlutter;
    p = uEye + mod(p - uEye, uBox) - 0.5 * uBox;
    vec3 rel = p - uEye;
    float d = length(rel);
    float edge = 1.0 - smoothstep(0.30 * uBox, 0.48 * uBox, d);
    float near = smoothstep(0.25, 0.9, d);
    vAlpha = alive * edge * near;

    // glint: a crystal face whose normal bisects eye and light
    vGlint = 0.0;
    if (uDust > 0.5) {
      float t = uTime * (1.0 + 2.5 * aSpin.w);
      vec3 n = normalize(vec3(sin(t + aSpin.x * 6.28), cos(t * 0.73 + aSpin.y * 6.28),
                              sin(t * 1.31 + aSpin.z * 6.28)));
      vec3 h = normalize(uLightDir - rel / max(d, 1e-3));
      vGlint = pow(abs(dot(n, h)), 300.0);
    }

    vec4 c0 = projectionMatrix * viewMatrix * vec4(p, 1.0);
    vec4 c1 = projectionMatrix * viewMatrix * vec4(p - uVel * uShutter, 1.0);
    if (c0.w < 0.05 || c1.w < 0.05 || vAlpha <= 0.0 || (uDust > 0.5 && vGlint < 0.02)) {
      gl_Position = vec4(2.0, 2.0, 2.0, 1.0);   // outside the clip volume
      return;
    }
    vec2 s0 = c0.xy / c0.w * 0.5 * uRes;
    vec2 s1 = c1.xy / c1.w * 0.5 * uRes;
    vec2 dir = s0 - s1;
    float len = length(dir);
    vec2 ax = len > 1e-3 ? dir / len : vec2(1.0, 0.0);
    vec2 pe = vec2(-ax.y, ax.x);
    float r = uSize * projectionMatrix[1][1] * 0.5 * uRes.y / c0.w;
    float rp = max(r, 0.7);
    vAlpha *= min(1.0, (r * r) / (0.49));
    vHalf = 0.5 * len;
    vRad = rp;
    vec2 local = vec2(position.x * (vHalf + rp + 1.0), position.y * (rp + 1.0));
    vLocal = local;
    vec2 centre = 0.5 * (s0 + s1);
    vec2 scr = centre + ax * local.x + pe * local.y;
    gl_Position = vec4(scr / (0.5 * uRes) * c0.w, c0.z, c0.w);
  }`,gl=`
  uniform vec3 uColor;           // lit flake colour (linear)
  uniform vec3 uGlintColor;      // glint radiance (linear)
  uniform float uOpacity;
  uniform float uDust;
  varying vec2 vLocal;
  varying float vHalf;
  varying float vRad;
  varying float vAlpha;
  varying float vGlint;
  void main() {
    float dx = max(abs(vLocal.x) - vHalf, 0.0);
    float dist = length(vec2(dx, vLocal.y));
    float a = 1.0 - smoothstep(vRad - 0.5, vRad + 0.6, dist);
    // a streak spreads one flake's light over its length
    a *= vAlpha * uOpacity / (1.0 + vHalf / vRad * 0.5);
    if (a < 0.003) discard;
    vec3 c = uDust > 0.5 ? uGlintColor * vGlint : uColor;
    gl_FragColor = vec4(c, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`;function _l(e,t){let n=t>>>0,r=()=>(n=n*1664525+1013904223>>>0,n/4294967296),i=new d;i.setAttribute(`position`,new V([-1,-1,0,1,-1,0,1,1,0,-1,1,0],3)),i.setIndex([0,1,2,0,2,3]);let a=new Float32Array(e*4),o=new Float32Array(e*4);for(let t=0;t<e*4;t++)a[t]=r(),o[t]=r();return i.setAttribute(`aSeed`,new c(a,4)),i.setAttribute(`aSpin`,new c(o,4)),i.instanceCount=e,i}function vl({count:e,box:t,size:n,dust:r,seed:i}){let a={uEye:{value:new B},uDrift:{value:new B},uVel:{value:new B},uBox:{value:t},uRate:{value:0},uTime:{value:0},uSize:{value:n},uFlutter:{value:.3},uShutter:{value:1/60},uRes:{value:new H(1,1)},uDust:{value:+!!r},uLightDir:{value:new B(0,1,0)},uColor:{value:new ve(1,1,1)},uGlintColor:{value:new ve(1,1,1)},uOpacity:{value:1}},o=new O({uniforms:a,vertexShader:hl,fragmentShader:gl,transparent:!0,depthWrite:!1,fog:!1,blending:r?2:1}),s=new b(_l(e,i),o);return s.frustumCulled=!1,s.renderOrder=5,s.visible=!1,{mesh:s,uniforms:a,box:t}}function yl(e,t,n){let r=vl({count:6e4,box:50,size:.02,dust:!1,seed:11}),i=vl({count:4e4,box:36,size:.006,dust:!0,seed:23});t.add(r.mesh,i.mesh);let a={snow:new B,dust:new B},o=new H;return{snow:r,dust:i,update(e){n.getDrawingBufferSize(o);for(let t of[r,i])t.uniforms.uRes.value.copy(o),t.uniforms.uEye.value.copy(e.eye),t.uniforms.uTime.value=e.t;let t=e.rate>.002&&e.near>.01;if(r.mesh.visible=t,t){let t=r.uniforms.uVel.value.set(e.wind.x,-e.fall,e.wind.z);a.snow.addScaledVector(t,e.dt),bl(a.snow,r.box),r.uniforms.uDrift.value.copy(a.snow),r.uniforms.uRate.value=e.rate,r.uniforms.uFlutter.value=e.flutter,r.uniforms.uColor.value.copy(e.color),r.uniforms.uOpacity.value=e.near*.85}let s=e.dust>.002&&e.near>.01;if(i.mesh.visible=s,s){let t=i.uniforms.uVel.value.set(e.wind.x*.8,-.04,e.wind.z*.8);a.dust.addScaledVector(t,e.dt),bl(a.dust,i.box),i.uniforms.uDrift.value.copy(a.dust),i.uniforms.uRate.value=e.dust,i.uniforms.uFlutter.value=.15,i.uniforms.uLightDir.value.copy(e.dustLight),i.uniforms.uGlintColor.value.copy(e.glint),i.uniforms.uOpacity.value=e.near}}}}function bl(e,t){e.x=(e.x%t+t)%t,e.y=(e.y%t+t)%t,e.z=(e.z%t+t)%t}var xl=[[`auto`,`авто`],[`clear`,`ясно`],[`overcast`,`пасмурно`],[`snow`,`снег`],[`blizzard`,`метель`],[`icefog`,`туман`]],Sl=1.4,Cl={valley:{sigma:.025,top:-55,H:9},hazeOrbit:{sigma:.03,top:-55,H:30},hazeFoot:{sigma:.005,H:35},pit:{sigma:.05,top:-170,H:14},pitHaze:{sigma:.0015,H:150},wobble:12,surface:1},wl={id:`weather`,init(e){let{THREE:t,scene:n,camera:r,renderer:i,terrain:a,lights:o,sky:s,world:c,ui:l}=e,u=Bc();$.rect.set([a.ox,a.oz,a.ox+(a.W-1)*a.cell,a.oz+(a.H-1)*a.cell]),e.pit?($.fog2[2]=e.pit.x,$.fog2[3]=e.pit.z,$.fog3[0]=(e.pit.diameterM||1160)/2+30):$.fog3[0]=0;let d=yl(t,n,i),f={shadowIntensity:o.sun.shadow.intensity,shadowRadius:o.sun.shadow.radius},p={cloud:0,fog:0,iceFog:0,snowfall:0,windMs:2,sunDim:1,dust:0,anomaly:0,wx:1,wz:0},m=!0,h=null,g=e.query?.get(`wx`);g&&rl.includes(g)&&(c.weather.kind=g);let _=l.addGroup(`weather`,`погода`);_.title=`погода — сценарий, не наблюдение; температура — климатическая норма`;let v=xl.map(([e,t])=>{let n=document.createElement(`button`);return n.textContent=t,n.onclick=()=>{c.weather.kind=e},_.appendChild(n),[e,n]}),y=l.hudSlot(`weather`,{parent:`clock`});addEventListener(`keydown`,e=>{if(e.target instanceof HTMLElement&&e.target.tagName===`INPUT`||e.ctrlKey||e.metaKey||e.altKey||e.repeat||e.key.toLowerCase()!==`t`)return;let t=rl.indexOf(c.weather.kind);c.weather.kind=rl[(t+1)%rl.length]});let b={deck:new t.Color,lit:new t.Color,fogWx:new t.Color,amb:new t.Color,flake:new t.Color,glint:new t.Color,grey:new t.Color,tmp:new t.Color,sun:new t.Color},x=new t.Vector2,S=new t.Vector3,C=new t.Vector3,w=new t.Vector3(.3,.55,-.78).normalize(),T=``,E=new Map,O=e=>{let t=E.get(e);if(!t){let n=D(e);t={rise:n.rise,set:n.set,noon:n.rise===null?780:(n.rise+n.set)/2},E.set(e,t)}return t};function k(e,t,n){let r=Yc(t),i=Zc(t),a=nl(t,n),o=O(t),s,c,l,u=null;if(e===`auto`){let e=pl(t,n,r,i,a,o);s=e.state,c=e.anomaly,l=e.windDir,u=e.cloud}else s=e,c=ml(e,i.mean,r),l=fl(t,r).windDir;let d=r>=10||r<=2,f={...al[s]};u!==null&&(f.cloud=u);let p=il[s];return s===`icefog`&&!d&&(p=il.fog,f.dust=0),{state:s,label:p,p:f,anomaly:c,windDir:l,tNormal:a}}function A(e,t,n){p[t]+=(n-p[t])*e}return{fogReport:u,precip:d,snap(){m=!0},set(e){rl.includes(e)&&(c.weather.kind=e)},probe(e,t,n=`auto`){let r=k(n,e,t);return{state:r.state,label:r.label,tempC:r.tNormal+r.anomaly,tNormal:r.tNormal,anomaly:r.anomaly,...r.p}},normals:Kc,seed:37,update(e,t){let n=e.weather;if(rl.includes(n.kind)||(n.kind=`auto`),n.kind!==h){h=n.kind;for(let[e,t]of v)t.classList.toggle(`on`,e===n.kind)}let r=k(n.kind,e.doy,e.simMin),i=m?1:1-Math.exp(-t/Sl);m=!1;for(let e of[`cloud`,`fog`,`iceFog`,`snowfall`,`windMs`,`sunDim`,`dust`])A(i,e,r.p[e]);A(i,`anomaly`,r.anomaly),A(i,`wx`,Math.cos(r.windDir)),A(i,`wz`,Math.sin(r.windDir));for(let e of[`cloud`,`fog`,`iceFog`,`snowfall`,`dust`])Math.abs(p[e]-r.p[e])<1e-4&&(p[e]=r.p[e]);Math.abs(p.sunDim-r.p.sunDim)<1e-4&&(p.sunDim=r.p.sunDim),n.resolved=r.state,n.label=r.label,n.scenario=n.kind===`auto`,n.tempNormalC=r.tNormal,n.tempC=r.tNormal+p.anomaly,n.windMs=p.windMs,n.windDir=Math.atan2(p.wz,p.wx),n.cloud=p.cloud,n.fog=p.fog,n.visibilityM=ol(p.fog),n.iceFog=p.iceFog,n.fogTopY=Cl.valley.top,n.snowfall=p.snowfall,n.dust=p.dust*Math.min(1,Math.max(0,(-25-n.tempC)/8)),n.sunDim=p.sunDim;let a=Math.round(n.tempC),o=`${a<0?`−`:a>0?`+`:``}${Math.abs(a)} °C`,s=n.scenario?`норма и сценарий`:`норма с поправкой на погоду`,c=`${o} · ${n.label} · ${s}`;c!==T&&(T=c,y.textContent=c),j(e,t)}};function j(i,a){let c=i.weather,l=i.sun.sky,{sun:u,hemi:m,fill:h}=o,g=i.sun.altitude,_=p.cloud,v=p.fog,y=p.iceFog,T=.004+.05*l.day+.34*Math.max(0,Math.min(1,g/25))**.7*l.day;if(b.sun.setRGB(...l.sunColor,t.SRGBColorSpace),u.intensity*=p.sunDim,_>0||y>0){let e=Math.max(_,.6*y);u.shadow.intensity=f.shadowIntensity*(1-.75*e),u.shadow.radius=f.shadowRadius*(1+2.5*e),b.grey.setRGB(.78,.8,.84),m.color.lerp(b.grey,.7*_+.35*y),m.groundColor.lerp(b.grey,.4*_),m.intensity*=1+.25*_,h.intensity*=1-.6*_}else u.shadow.intensity=f.shadowIntensity,u.shadow.radius=f.shadowRadius;b.deck.setRGB(.93,.96,1.03).multiplyScalar(T*1.05),b.lit.copy(b.sun).multiplyScalar(l.sunIntensity*.55*(1-.8*_)),b.amb.setRGB(.84,.9,1).multiplyScalar(.008+(T-.004)*4.6).add(b.tmp.setRGB(1,.55,.25).multiplyScalar(.012*i.night)),b.fogWx.copy(b.deck).lerp(b.amb,y);let E=e.terrain.heightAt(r.position.x,r.position.z),D=r.position.y-E,O=1-Tl(60,400,D),k=i.mode===`orbit`,A=ol(v),j=v*(1-y),M=j>0?3.912/ol(j)*O:0;x.x+=p.wx*(p.windMs*2+3)*a/1500,x.y+=p.wz*(p.windMs*2+3)*a/1500,Math.abs(x.x)>1e3&&(x.x%=1e3),Math.abs(x.y)>1e3&&(x.y%=1e3),s.setWeather({cloud:_,cloudOff:x,cloudLit:b.lit,cloudAmb:b.deck,veil:b.fogWx,veilAmount:Math.min(1,j*5)*Math.min(1,j*1.6)*.35*(1-O),veilK:.4+40*(A/2e4)**.6,halo:c.dust*Math.min(1,p.sunDim*2)*+(g>-.5)});let N=n.fog;if(k){if(j>0){let e=(ol(j)/2e4)**.35;N.near*=e,N.far*=e,N.color.lerp(b.fogWx,Math.min(1,j*5))}}else v>0&&(N.far=Math.min(N.far,A*2.5),N.near=Math.min(N.near,A*.5),N.color.lerp(b.fogWx,Math.min(1,v*5)));let P=Cl.hazeOrbit,F=Cl.hazeFoot;$.fog0[0]=Cl.valley.sigma*y,$.fog0[1]=(P.sigma+(F.sigma-P.sigma)*O)*y,$.fog0[2]=Cl.pit.sigma*y,$.fog0[3]=+(y>0||M>0),$.fog1[0]=Cl.valley.top,$.fog1[1]=Cl.valley.H,$.fog1[2]=Cl.wobble,$.fog1[3]=Cl.surface,$.fog2[0]=Cl.pit.top,$.fog2[1]=Cl.pit.H,$.fog3[3]=Cl.pitHaze.sigma*y,$.fog4[0]=P.top+(Math.max(E,P.top)-P.top)*O,$.fog4[1]=P.H+(F.H-P.H)*O,$.fog4[2]=Cl.pitHaze.H,$.fog4[3]=M,$.fog3[1]+=p.wx*(p.windMs+.3)*a/260,$.fog3[2]+=p.wz*(p.windMs+.3)*a/260,$.col[0]=b.fogWx.r,$.col[1]=b.fogWx.g,$.col[2]=b.fogWx.b,$.col[3]=.15*p.sunDim,$.sun[0]=i.sun.vec.x,$.sun[1]=i.sun.vec.y,$.sun[2]=i.sun.vec.z,$.sun[3]=.72;let I=g>-.8?l.sunIntensity*2.2:0;b.tmp.setRGB(1,1,1).lerp(b.sun,.7).multiplyScalar(I),$.sunc[0]=b.tmp.r,$.sunc[1]=b.tmp.g,$.sunc[2]=b.tmp.b;let L=k?1-Tl(120,360,D):1;S.set(p.wx*p.windMs,0,p.wz*p.windMs),b.flake.copy(m.color).multiplyScalar(m.intensity*.55).add(b.tmp.copy(u.color).multiplyScalar(u.intensity*.3)).multiplyScalar(.85);let R=g>-.5;C.copy(R?i.sun.vec:w),R?b.glint.setRGB(1,1,1).lerp(b.sun,.5).multiplyScalar(30*Math.max(.15,p.sunDim)*l.sunIntensity):b.glint.setRGB(1,.6,.28).multiplyScalar(4*i.night),d.update({eye:r.position,t:i.t,dt:a,rate:p.snowfall,wind:S,fall:1+.6*Math.min(1,Math.max(0,(p.windMs-5)/10)),flutter:.35*(1-Math.min(1,p.windMs/12))+.05,color:b.flake,near:L,dust:c.dust,dustLight:C,glint:b.glint})}}};function Tl(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}var El=256,Dl=2,Ol=800,kl=401,Al=10,jl=-470,Ml=20,Nl=98;function Pl(e,t,n){let r=new Float32Array(El*kl);for(let i=0;i<El;i++){let a=i/El*Math.PI*2,o=Math.sin(a),s=-Math.cos(a);for(let a=0;a<kl;a++)r[i*kl+a]=e(t+o*a*Dl,n+s*a*Dl)}return r}function Fl(e,t){if(e[0]>=t)return null;let n=new Float32Array(El),r=new Float32Array(El),i=0,a=1/0,o=0;for(let s=0;s<El;s++){let c=s*kl,l=1;for(;l<kl&&e[c+l]<t;)l++;let u=e[c+l-1],d=l<kl?e[c+l]:t+1,f=(l-1+Math.min(1,Math.max(0,(t-u)/Math.max(1e-6,d-u))))*Dl,p=l-1;for(let n=l;n<kl&&e[c+n]<t+20;n++)e[c+n]<t&&(p=n);n[s]=f,r[s]=Math.max(f,p*Dl),i+=.5*f*f*(2*Math.PI/El),a=Math.min(a,f),o=Math.max(o,f)}return{rIn:n,rOut:r,area:i,rEq:Math.sqrt(i/Math.PI),rMin:a,rMax:o}}function Il(e){let t=new Float32Array(El*Nl);for(let n=0;n<El;n++){let r=n*kl,i=0,a=-1/0;for(let o=0;o<Nl;o++){let s=jl+o/97*490;for(;i<kl&&a<s;)a=Math.max(a,e[r+i]),a<s&&i++;t[o*El+n]=i>=kl?Ol:i*Dl}}return t}function Ll(e,t){let n=0;for(let r=0;r<El;r++){let i=0;for(let n=1;n<kl;n++)i=Math.max(i,(e[r*kl+n]-t)/(n*Dl));let a=Math.cos(Math.atan(i));n+=a*a}return n/El}var Rl=`
  varying vec3 vWPos;
  varying float vShore;
  uniform float uTime, uLevel, uIce, uIceMode, uSnowOnIce, uWind, uSvf, uSnow;
  uniform vec2 uCentre, uWindDir;
  uniform sampler2D uWall;
  uniform vec3 uSunRad, uAmbRad;
  uniform vec3 uSun, uZenith, uHorizon, uGlow;
  uniform float uDay, uSkyGain, uDbg;
  float gIce; float gRough;
  vec3 gNW;
  ${we}
  ${Y}

  const float LAKE_TAU = 6.28318530718;
  const float WALL_Y0 = ${jl.toFixed(1)};
  const float WALL_Y1 = ${Ml.toFixed(1)};

  // Wall radius on bearing of point p (xz), at height y.
  float wallR(vec2 p, float y) {
    vec2 d = p - uCentre;
    float th = atan(d.x, -d.y) / LAKE_TAU;
    return texture2D(uWall, vec2(fract(th), (y - WALL_Y0) / (WALL_Y1 - WALL_Y0))).r;
  }

  // March a ray from o along unit dir (dir.y > 0) through the funnel. Returns
  // the hit distance along the horizontal, or -1 when it leaves over the rim.
  float traceWall(vec3 o, vec3 dir, int steps) {
    float hl = length(dir.xz);
    if (hl < 1e-4) return -1.0;
    vec2 hd = dir.xz / hl;
    float tanE = dir.y / hl;
    float tEnd = min((WALL_Y1 - o.y) / max(tanE, 1e-3), 2400.0);
    float dt = tEnd / float(steps);
    float t0 = 0.0;
    for (int i = 1; i <= 40; i++) {
      if (i > steps) break;
      float t = dt * float(i);
      vec2 p = o.xz + hd * t;
      float y = o.y + tanE * t;
      if (length(p - uCentre) >= wallR(p, y)) {
        float a = t0, b = t;
        for (int k = 0; k < 5; k++) {
          float m = 0.5 * (a + b);
          vec2 pm = o.xz + hd * m;
          if (length(pm - uCentre) >= wallR(pm, o.y + tanE * m)) b = m; else a = m;
        }
        return b;
      }
      t0 = t;
    }
    return -1.0;
  }

  // The sky in direction d: sky.js without the stars and the disc, same uniforms.
  vec3 skyCol(vec3 d) {
    float up = d.y;
    float t = pow(clamp(up, 0.0, 1.0), 0.52);
    vec3 col = mix(uHorizon, uZenith, t);
    float mu = max(dot(d, uSun), 0.0);
    float low = 1.0 - clamp(uSun.y * 3.0, 0.0, 1.0);
    float lobe = pow(mu, mix(24.0, 5.0, low));
    float band = pow(mu, 2.0) * exp(-abs(up) * 4.0);
    col += uGlow * (lobe * 1.5 + band * 0.85 * low);
    return col * uSkyGain;
  }

  // What a ray leaving the water in direction r sees.
  vec3 pitEnv(vec3 o, vec3 r) {
    if (r.y <= 0.0) return uHorizon * 0.1;
    float t = traceWall(o, r, 28);
    if (t < 0.0) return skyCol(r);
    float hl = length(r.xz);
    vec2 hd = r.xz / hl;
    vec2 p = o.xz + hd * t;
    float y = o.y + r.y / hl * t;
    // the wall there: strata, some snow on the benches, lit like the terrain
    vec2 rad = normalize(p - uCentre);
    float r0 = wallR(p, y - 8.0), r1 = wallR(p, y + 8.0);
    float slope = atan(16.0, max(r1 - r0, 0.5));
    vec3 n = normalize(vec3(-rad.x * sin(slope), cos(slope), -rad.y * sin(slope)));
    vec3 alb = strataAt(y) * (0.74 + 0.5 * fbm(vec2(p.x * 0.05 + p.y * 0.05, y * 0.9)));
    alb = mix(alb, vec3(0.86, 0.88, 0.93), uSnow * 0.45);
    float lit = 0.0;
    if (uSun.y > 0.0) {
      vec3 w = vec3(p.x, y, p.y) - vec3(rad.x, 0.0, rad.y) * 3.0 + vec3(0.0, 1.5, 0.0);
      lit = traceWall(w, uSun, 16) < 0.0 ? max(dot(n, uSun), 0.0) : 0.0;
    }
    return alb * (uAmbRad * 0.7 + uSunRad * lit) * RECIPROCAL_PI;
  }
`;function zl(e){let t=e.ShaderChunk.lights_fragment_begin,n=`RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );`,r=t.indexOf(`#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )`),i=r<0?-1:t.indexOf(n,r);return i<0?(console.warn(`lake: lights_fragment_begin changed shape; the fill light will glint`),`#include <lights_fragment_begin>`):t.slice(0,r)+`vec3 lakeSpec0 = vec3(0.0);
`+t.slice(r,i)+`lakeSpec0 = reflectedLight.directSpecular;
    ${n}
    #if ( UNROLLED_LOOP_INDEX > 0 )
    reflectedLight.directSpecular = lakeSpec0;
    #endif`+t.slice(i+127)}function Bl(e){let{THREE:t,terrain:n,pit:r,sky:i,lights:a}=e,o=Pl((e,t)=>n.heightAt(e,t),r.x,r.z),s=Il(o),c=new Uint16Array(s.length);for(let e=0;e<s.length;e++)c[e]=t.DataUtils.toHalfFloat(s[e]);let l=new t.DataTexture(c,El,Nl,t.RedFormat,t.HalfFloatType);l.wrapS=t.RepeatWrapping,l.wrapT=t.ClampToEdgeWrapping,l.magFilter=l.minFilter=t.LinearFilter,l.needsUpdate=!0;let u=new Float32Array(774),d=new Float32Array(258),f=[];for(let e=0;e<El;e++)f.push(0,2+e,1+e);let p=new t.BufferGeometry;p.setAttribute(`position`,new t.BufferAttribute(u,3)),p.setAttribute(`normal`,new t.BufferAttribute(new Float32Array(774).map((e,t)=>+(t%3==1)),3)),p.setAttribute(`aShore`,new t.BufferAttribute(d,1)),p.setIndex(f);let m={uTime:{value:0},uLevel:{value:0},uIce:{value:0},uIceMode:{value:0},uSnowOnIce:{value:0},uWind:{value:2},uWindDir:{value:new t.Vector2(1,0)},uSvf:{value:.85},uSnow:{value:0},uCentre:{value:new t.Vector2(r.x,r.z)},uWall:{value:l},uSunRad:{value:new t.Color},uAmbRad:{value:new t.Color},uSkyGain:{value:.8},uDbg:{value:0},uSun:i.uniforms.uSun,uZenith:i.uniforms.uZenith,uHorizon:i.uniforms.uHorizon,uGlow:i.uniforms.uGlow,uDay:i.uniforms.uDay};m.uBandDepth={value:Ce().depths},m.uBandColor={value:be.map(([,e])=>new t.Vector3(...e))};let h=xe,g=new t.MeshStandardMaterial({color:16777215,roughness:.1,metalness:0});g.polygonOffset=!0,g.polygonOffsetFactor=1,g.polygonOffsetUnits=2,g.onBeforeCompile=e=>{Object.assign(e.uniforms,m),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
        attribute float aShore;
        varying vec3 vWPos;
        varying float vShore;`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
        vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
        vShore = aShore;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        ${Rl}
        const vec3 C_SNOW = vec3(${h.snow});
        const vec3 C_ICE = vec3(${h.ice});
      `).replace(`#include <map_fragment>`,`
        // --- surface: open water, ice, snow on ice -------------------------
        vec2 xz = vWPos.xz;
        float n1 = fbm(xz * 0.018), n2 = fbm(xz * 0.11 + 7.0), n3 = fbm(xz * 0.6);
        // ice cover: spring opens a moat along the shore first, autumn freezes
        // the shallow margin first. vShore is 0 at the centre, 1 on the shore.
        float edge = vShore + (n1 - 0.5) * 0.18;
        float ext = uIce * 1.12;
        float iceM = uIceMode < 0.5
          ? 1.0 - smoothstep(ext - 0.04, ext, edge)
          : smoothstep(1.0 - ext - 0.04, 1.0 - ext, edge);
        iceM = uIce >= 0.999 ? 1.0 : (uIce <= 0.001 ? 0.0 : iceM);
        gIce = iceM;
        // deep water: brine with suspended fines — a dark green-teal body
        // colour (a choice, not a measurement)
        vec3 water = vec3(0.016, 0.052, 0.050) * (0.85 + 0.3 * n1);
        // bare ice grey-blue, rotten ice darker with melt ponds, snow on top
        vec3 bare = C_ICE * vec3(0.55, 0.62, 0.66) * (0.8 + 0.35 * n2);
        // melt ponds: broad, soft, and only once the snow on the ice is gone
        float pond = smoothstep(0.58, 0.74, fbm(xz * 0.03 + 3.0)) * (1.0 - uSnowOnIce);
        bare = mix(bare, vec3(0.06, 0.10, 0.11), pond * 0.55);
        // wind-packed and fresh snow, and the odd scoured patch of bare ice
        float drift = clamp(0.6 + 0.8 * n2 + 0.1 * n3, 0.0, 1.0);
        vec3 snowC = C_SNOW * (0.84 + 0.14 * n1 + 0.08 * n3);
        vec3 ice = mix(bare, snowC, uSnowOnIce * drift);
        diffuseColor.rgb *= mix(water, ice, iceM);
        gRough = mix(0.06, mix(0.35, 0.82, uSnowOnIce), iceM);
      `).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = gRough;`).replace(`#include <metalnessmap_fragment>`,`float metalnessFactor = 0.0;`).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
        {
          // Ripples: wind-aligned waves, 0.8-9 m, each faded out once a pixel
          // covers a quarter of its wavelength. Slopes, not heights.
          vec2 wd = normalize(uWindDir + vec2(1e-4));
          vec2 wp = vec2(-wd.y, wd.x);
          float fw = max(length(fwidth(xz)), 1e-3);
          float amp = (0.010 + 0.014 * uWind) * (1.0 - gIce);
          vec2 s = vec2(0.0);
          float lam = 9.0;
          for (int i = 0; i < 6; i++) {
            float fi = float(i);
            // directions scattered by the golden ratio, within ±50 deg of
            // the wind, so no two waves beat into a lattice
            float ang = (fract(fi * 0.618 + 0.31) - 0.5) * 1.75;
            vec2 dir = wd * cos(ang) + wp * sin(ang);
            float k = 6.2831 / lam;
            float c = sqrt(9.81 / k);
            float ph = dot(xz, dir) * k - uTime * k * c + fi * 1.7;
            float fade = 1.0 - smoothstep(lam * 0.08, lam * 0.3, fw);
            s += dir * cos(ph) * amp * fade;
            lam *= 0.62;
          }
          // wind-blown noise on top, so the waves do not lock into a lattice
          float fn = 1.0 - smoothstep(0.15, 0.6, fw);
          vec2 q = xz * 0.45 - uTime * wd * 0.6;
          s += (vec2(fbm(q), fbm(q + 11.0)) - 0.5) * amp * 2.2 * fn;
          // cat's paws: gusts roughen patches, calm streaks stay glassy
          float gust = smoothstep(0.35, 0.75, fbm(xz * 0.012 + uTime * 0.02 * wd));
          s *= 0.35 + 0.9 * gust;
          // snow drifts on the ice are a much gentler relief
          s += (vec2(fbm(xz * 0.35), fbm(xz * 0.35 + 5.0)) - 0.5) * 0.08 * gIce * uSnowOnIce;
          gNW = normalize(vec3(-s.x, 1.0, -s.y));
          normal = normalize((viewMatrix * vec4(gNW, 0.0)).xyz);
        }
      `).replace(`#include <lights_fragment_begin>`,zl(t)).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
        {
          // The pit, reflected: wall where the ray meets the wall, sky above.
          // Added with water's own Fresnel (Schlick, F0 0.02) rather than fed
          // through three's IBL path, whose split-sum fit loses most of the
          // grazing mirror a calm lake is made of.
          vec3 vd = normalize(vWPos - cameraPosition);
          vec3 rr = reflect(vd, gNW);
          rr.y = abs(rr.y);
          // (skipped under full ice: a snowfield mirrors nothing)
          vec3 env = gIce > 0.999 && uDbg < 0.5 ? vec3(0.0)
            : pitEnv(vec3(vWPos.x, uLevel + 0.5, vWPos.z), normalize(rr));
          float cosT = clamp(dot(-vd, gNW), 0.0, 1.0);
          float F = (0.02 + 0.98 * pow(1.0 - cosT, 5.0)) * (1.0 - gIce);
          reflectedLight.indirectSpecular += env * F;
          reflectedLight.indirectDiffuse *= 1.0 - F;
          if (uDbg > 0.5) {
            reflectedLight.directDiffuse = vec3(0.0); reflectedLight.directSpecular = vec3(0.0);
            reflectedLight.indirectDiffuse = vec3(0.0);
            reflectedLight.indirectSpecular = uDbg > 1.5 ? vec3(F) : env;
          }
        }
      `).replace(`#include <aomap_fragment>`,`
        // the hole takes part of the sky: same idea as the terrain's baked
        // sky-view factor, computed for the water surface itself
        // and a little more at the foot of the wall, which blocks half of it
        reflectedLight.indirectDiffuse *= pow(uSvf, 1.7) * mix(1.0, 0.82, smoothstep(0.5, 1.0, vShore));
      `)},g.customProgramCacheKey=()=>`mirny-lake`;let _=new t.Mesh(p,g);_.receiveShadow=!0,_.castShadow=!1,p.boundingSphere=new t.Sphere(new t.Vector3(r.x,0,r.z),Ol),_.visible=!1,_.name=`lake`;let v=new t.Mesh(p,new t.MeshBasicMaterial({color:666154,side:t.BackSide,fog:!0}));v.visible=!1,v.name=`lake-underside`;let y=null;function b(e){let t=Fl(o,e);if(!t)return _.visible=!1,v.visible=!1,y=null,null;u[0]=r.x,u[1]=e,u[2]=r.z,d[0]=0;for(let n=0;n<=El;n++){let i=n%El,a=i/El*Math.PI*2,o=t.rOut[i]+Al;u[(1+n)*3]=r.x+Math.sin(a)*o,u[(1+n)*3+1]=e,u[(1+n)*3+2]=r.z-Math.cos(a)*o,d[1+n]=o/Math.max(1,t.rIn[i])}p.attributes.position.needsUpdate=!0,p.attributes.aShore.needsUpdate=!0;let n=0;for(let e=0;e<El;e++)n=Math.max(n,t.rOut[e]);return p.boundingSphere.center.set(r.x,e,r.z),p.boundingSphere.radius=n+Al,m.uLevel.value=e,_.visible=!0,y=t,t}let x=new Map;function S(e){let t=Math.round(e/5)*5;return x.has(t)||x.set(t,Ll(o,t)),x.get(t)}function C(e,t,n){if(!y||n>=m.uLevel.value)return 0;let i=e-r.x,a=t-r.z,o=Math.atan2(i,-a),s=Math.round((o/(Math.PI*2)+1)%1*El)%El;return Math.hypot(i,a)<y.rIn[s]?m.uLevel.value-n:0}let w=new t.Color;return{mesh:_,under:v,material:g,uniforms:m,spokes:o,wallTex:l,setLevel:b,svf:S,depthBelow:C,shoreAt:e=>Fl(o,e),get shore(){return y},submerge(e,t,n,r){if(v.visible=t>0,!(t>0)||!e.fog)return;let i=(.15+.85*n)*Math.exp(-t/60)*(1-.6*r);w.setRGB(.012*i,.045*i,.045*i),e.fog.color.copy(w),e.fog.near=0,e.fog.far=30,v.material.color.copy(w).multiplyScalar(1.6)},frame(e,t,n,r){m.uTime.value=e.t;let i=e.weather||{};m.uWind.value=Math.max(0,(i.windMs??2)*.35);let o=i.windDir??0;m.uWindDir.value.set(Math.cos(o),Math.sin(o)),m.uSnow.value=e.snow,m.uIce.value=t,m.uIceMode.value=n,m.uSnowOnIce.value=r,m.uSunRad.value.copy(a.sun.color).multiplyScalar(a.sun.intensity),m.uAmbRad.value.copy(a.hemi.color).multiplyScalar(a.hemi.intensity),y&&(m.uSvf.value=S(m.uLevel.value))}}}var Vl={2018:{y:-392.2,depth:376.5,strip:`WV01 10.04.2018`,matched:!1,pm:13,note:`дно не сопоставлено — уровень по краю пустоты, ±13 м`},2020:{y:-357.5,depth:341.9,strip:`WV01 08.05.2020`,matched:!1,pm:5,note:`дно не сопоставлено — уровень по освещённому берегу, ±5 м`},2023:{y:-273.9,depth:258.3,strip:`WV03 09.05.2023`,matched:!0,sigma:.16,note:`стерео, 100 % сопоставлено, ровно до 0.16 м`},2024:{y:-260.3,depth:245.1,strip:`WV01 20.04.2024`,matched:!0,sigma:.31,note:`стерео, 100 % сопоставлено, ровно до 0.31 м`}},Hl=[`dry`,2018,2020,2023,2024],Ul=-452,Wl=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)},Gl=e=>e===`dry`||e===null?`dry`:Vl[+e]?+e:void 0;function Kl(e,t){return t<200?{ice:Wl(.1,.6,e),mode:0,snowOnIce:Wl(.55,.95,e)}:{ice:Wl(.6,1,e),mode:1,snowOnIce:Wl(.7,1,e)}}var ql={id:`lake`,init(e){if(!e.pit)return{};let{world:t}=e,n=Bl(e);e.scene.add(n.mesh,n.under);let r=Gl(e.query?.get(`lake`));r!==void 0&&e.query.has(`lake`)&&(t.lake.year=r),Gl(t.lake.year)===void 0&&(t.lake.year=2024);let i=e.ui.addGroup(`lake`,`вода`),a=new Map;for(let e of Hl){let n=document.createElement(`button`);n.textContent=e===`dry`?`сухо`:String(e),n.title=e===`dry`?`до прорыва 2017: рельеф мозаики ArcticDEM — смесь съёмок, в основном до затопления (дно −438 м)`:`${Vl[e].strip} · уровень ${Vl[e].y} м · ${Vl[e].note}`,n.onclick=()=>{t.lake.year=e},i.appendChild(n),a.set(e,n)}addEventListener(`keydown`,e=>{if(e.key.toLowerCase()!==`y`||e.ctrlKey||e.metaKey||e.altKey||e.target instanceof HTMLElement&&e.target.tagName===`INPUT`)return;let n=Gl(t.lake.year)??2024;t.lake.year=Hl[(Hl.indexOf(n)+1)%Hl.length]});let o=e.ui.hudSlot(`lake`),s=e=>e===`dry`?Ul:Vl[e].y,c=Gl(t.lake.year),l=s(c),u=null,d=null,f=``;n.setLevel(l);let p=()=>{for(let[e,t]of a)t.classList.toggle(`on`,e===c)};p();function m(e){let t;if(c===`dry`)t=`сухо — до прорыва 2017 · мозаика ArcticDEM`;else{let e=Vl[c],n=Math.round(e.depth);t=e.matched?`вода <em>−${n} м</em> от кромки · стерео ${e.strip}`:`вода <em>≈−${n} м</em> от кромки ±${e.pm} · ${e.strip}, дно не сопоставлено`}let n=``;return u?n=u.to>u.from?`вода поднимается…`:`вода уходит…`:c!==`dry`&&(n=e.ice>=.99?e.snowOnIce>.5?`лёд под снегом`:`лёд без снега`:e.ice>.01?e.mode===0?`вскрытие: закраины у берега`:`ледостав от берегов`:`открытая вода`,n+=e.ice>.01?` · лёд по снежному покрову, дата не измерена`:` · цвет и рябь — вывод`),n?`${t}<br>${n}`:t}function h(){let e=n.shore;t.lake.level=e?l:null,t.lake.radius=e?Math.round(e.rEq):null,t.lake.target=c===`dry`?null:Vl[c].y}return h(),{water:n,levels:Vl,set(e){return t.lake.year=e,Gl(e)!==void 0},snap(e){t.lake.year=e,c=Gl(e),u=null,l=s(c),n.setLevel(l),p(),h()},state:()=>({year:c,level:t.lake.level,radius:t.lake.radius,ice:t.lake.ice,animating:!!u,shore:n.shore&&{rEq:n.shore.rEq,rMin:n.shore.rMin,rMax:n.shore.rMax}}),update(t,r){let i=Gl(t.lake.year);if(i===void 0)console.warn(`lake: unknown year`,t.lake.year,`— keeping`,c),t.lake.year=c;else if(i!==c){c=i;let e=s(i);u={from:l,to:e,t:0,dur:Math.min(6,2.2+Math.abs(e-l)/60)},p()}if(u){u.t+=r;let e=Math.min(1,u.t/u.dur);l=u.from+(u.to-u.from)*e*e*(3-2*e),n.setLevel(l),e>=1&&(u=null)}let a=Kl(t.snow,t.doy);d===null&&(d={...a});let g=Math.min(1,r*1.5);d.ice+=(a.ice-d.ice)*g,d.snowOnIce+=(a.snowOnIce-d.snowOnIce)*g,d.mode=a.mode,t.lake.ice=n.shore?d.ice:null,n.frame(t,d.ice,d.mode,d.snowOnIce),h();let _=e.camera.position,v=n.depthBelow(_.x,_.z,_.y);t.lake.submerged=v,n.submerge(e.scene,v,t.sun.day??1,d.ice);let y=m({...a});v>0&&(y+=`<br>под водой: <em>${Math.round(v)} м</em> до поверхности`),y!==f&&(f=y,o.innerHTML=y)}}}},Jl=8.5,Yl=1.65,Xl=1.2,Zl=[34,38,54],Ql=13,$l=[220,110,55],eu=[255,145,50],tu=[.95,.92,.84],nu=1.15,ru=.8,iu=.75,au=[1,.76,.44],ou=3,su=-2.6,cu=-3.3,lu=3,uu=4,du=[.24,.13,.08,.06,.05,.07,.2,.44,.4,.27,.23,.21,.21,.21,.23,.27,.35,.47,.58,.64,.66,.64,.53,.38],fu=e=>e<0?0:e>1?1:e,pu=(e,t,n)=>{let r=fu((n-e)/(t-e));return r*r*(3-2*r)},mu=e=>e-Math.floor(e),hu=(e,t)=>mu(Math.sin(e*127.1+t*311.7)*43758.5453);function gu(e){let t=(e/60%24+24)%24,n=Math.floor(t),r=t-n;return du[n]+(du[(n+1)%24]-du[n])*r}function _u(e,t,n=0){let r=lu*fu(n);return t?e<cu+r:e<su+r}function vu(e,t,n){let r=!1;for(let i=0,a=e.length-1;i<e.length;a=i++){let[o,s]=e[i],[c,l]=e[a];s>n!=l>n&&t<(c-o)*(n-s)/(l-s)+o&&(r=!r)}return r}function yu(e,t){let n=Math.ceil(t.spanX/20)+1,r=Math.ceil(t.spanZ/20)+1,i=new Float32Array(n*r).fill(1e9),a=new Map,o=(e,t)=>t*n+e;for(let s of e){let e=s.rings?.[0];if(!e?.length)continue;let c=1/0,l=1/0,u=-1/0,d=-1/0;for(let[a,s]of e){let e=Math.floor((a-t.ox)/20),f=Math.floor((s-t.oz)/20);e>=0&&f>=0&&e<n&&f<r&&(i[o(e,f)]=0),a<c&&(c=a),a>u&&(u=a),s<l&&(l=s),s>d&&(d=s)}s._nlBox=[c,l,u,d];for(let e=Math.floor((l-t.oz)/20);e<=Math.floor((d-t.oz)/20);e++)for(let l=Math.floor((c-t.ox)/20);l<=Math.floor((u-t.ox)/20);l++){if(l<0||e<0||l>=n||e>=r)continue;i[o(l,e)]=0;let t=o(l,e);a.has(t)||a.set(t,[]),a.get(t).push(s)}}let s=20*Math.SQRT2;for(let e=0;e<r;e++)for(let t=0;t<n;t++){let r=i[o(t,e)];t>0&&(r=Math.min(r,i[o(t-1,e)]+20)),e>0&&(r=Math.min(r,i[o(t,e-1)]+20)),t>0&&e>0&&(r=Math.min(r,i[o(t-1,e-1)]+s)),t<n-1&&e>0&&(r=Math.min(r,i[o(t+1,e-1)]+s)),i[o(t,e)]=r}for(let e=r-1;e>=0;e--)for(let t=n-1;t>=0;t--){let a=i[o(t,e)];t<n-1&&(a=Math.min(a,i[o(t+1,e)]+20)),e<r-1&&(a=Math.min(a,i[o(t,e+1)]+20)),t<n-1&&e<r-1&&(a=Math.min(a,i[o(t+1,e+1)]+s)),t>0&&e<r-1&&(a=Math.min(a,i[o(t-1,e+1)]+s)),i[o(t,e)]=a}let c=(e,i)=>{let a=Math.floor((e-t.ox)/20),s=Math.floor((i-t.oz)/20);return a<0||s<0||a>=n||s>=r?-1:o(a,s)};return{distTo(e,t){let n=c(e,t);return n<0?1e9:i[n]},inside(e,t,n=0){let r=c(e,t);if(r<0)return!1;for(let i of a.get(r)||[]){let r=i._nlBox;if(!(e<r[0]-n||e>r[2]+n||t<r[1]-n||t>r[3]+n)){if(vu(i.rings[0],e,t))return!0;if(n>0){for(let[r,a]of[[n,0],[-n,0],[0,n],[0,-n]])if(vu(i.rings[0],e+r,t+a))return!0}}}return!1}}}function bu(e,t,n,r){let i=t.splatTex.image.data,a=(e,n)=>{let r=Math.floor((e-t.ox)/t.cell),a=Math.floor((n-t.oz)/t.cell);return r<0||a<0||r>=t.W||a>=t.H?255:i[a*t.W+r]},o=(e,n)=>e>t.ox+20&&n>t.oz+20&&e<t.ox+t.spanX-20&&n<t.oz+t.spanZ-20,s=r?r.diameterM/2+90:0,c=new Map,l=(e,t)=>`${Math.floor(e/Ql)},${Math.floor(t/Ql)}`,u=(e,t)=>{let n=Math.floor(e/Ql),r=Math.floor(t/Ql);for(let i=-1;i<=1;i++)for(let a=-1;a<=1;a++)for(let o of c.get(`${n+a},${r+i}`)||[])if((o[0]-e)**2+(o[1]-t)**2<169)return!0;return!1},d=[],f={track:0,outOfTown:0,pit:0,building:0,surface:0,crowded:0},p=e.map((e,t)=>t).sort((t,n)=>e[t].klass-e[n].klass);for(let i of p){let p=e[i],m=p.klass;if(m>=3){f.track++;continue}let h=p.np,g=p.pos,_=new Float64Array(h),v=new Float64Array(h),y=new Float64Array(h),b=new Float64Array(h),x=new Float64Array(h);for(let e=0;e<h;e++){let t=g[e*3],n=g[e*3+2],r=g[(h+e)*3],i=g[(h+e)*3+2];_[e]=(t+r)/2,v[e]=(n+i)/2;let a=Math.hypot(t-r,n-i)||1;b[e]=(t-r)/a,x[e]=(n-i)/a,e>0&&(y[e]=y[e-1]+Math.hypot(_[e]-_[e-1],v[e]-v[e-1]))}let S=y[h-1],C=Zl[m];if(m===2&&S<25||S<C*.45)continue;let w=e=>{let t=0;for(;t<h-2&&y[t+1]<e;)t++;let n=fu((e-y[t])/Math.max(y[t+1]-y[t],1e-6)),r=_[t]+(_[t+1]-_[t])*n,i=v[t]+(v[t+1]-v[t])*n,a=_[t+1]-_[t],o=v[t+1]-v[t],s=Math.hypot(a,o)||1;return a/=s,o/=s,{x:r,z:i,ux:a,uz:o,nx:-o,nz:a}},T=w(S/2),E=Math.min(h-1,Math.max(0,Math.round((h-1)/2))),D=T.nx*b[E]+T.nz*x[E]<0?-1:1,O;if(m===0)O=[1,-1];else{let e=0,t=0;for(let r of[.2,.5,.8]){let i=w(S*r),a=p.half+18;e+=n.distTo(i.x+i.nx*D*a,i.z+i.nz*D*a),t+=n.distTo(i.x-i.nx*D*a,i.z-i.nz*D*a)}O=[e<=t?1:-1]}let k=C*(.25+.5*hu(i,3.7)),A=Math.max(1,Math.floor((S-k)/C)+1);for(let e=0;e<O.length;e++){let h=O[e]*D,g=e*C*.5;for(let _=0;_<A;_++){let v=k+g+_*C+(hu(i*7+_,e)-.5)*4;if(S<C&&(v=S/2+g*.3),v<2||v>S-2)continue;let y=w(v),b=p.half+Xl,x=y.x+y.nx*h*b,T=y.z+y.nz*h*b;if(!o(x,T)){f.outOfTown++;continue}if(r&&Math.hypot(x-r.x,T-r.z)<s){f.pit++;continue}if(n.distTo(x,T)>$l[m]){f.outOfTown++;continue}let E=a(x,T);if(E===1||E===2||E===4||E===7){f.surface++;continue}if(n.inside(x,T,.8)){f.building++;continue}if(u(x,T)){f.crowded++;continue}let D=-y.nx*h,O=-y.nz*h;d.push({x,z:T,dx:D,dz:O,ux:y.ux,uz:y.uz,klass:m,y:t.heightAt(x,T)});let A=l(x,T);c.has(A)||c.set(A,[]),c.get(A).push([x,T])}}}return{lamps:d,rejected:f}}function xu(e,t){let n=e.getAttribute(`position`),r=e.getAttribute(`normal`),i=e.getAttribute(`aInfo`);if(!n||!r||!i)return[];let a=[],o=new Set,s=n.count/3;for(let e=0;e<s-1;e++){let s=e*3;if(Math.round(i.getX(s))!==8||Math.round(i.getX(s+3))!==8||n.getX(s)!==n.getX(s+3)||n.getZ(s)!==n.getZ(s+3))continue;let c=1/0,l=-1/0,u=1/0,d=-1/0,f=-1/0;for(let e=0;e<6;e++){let t=n.getX(s+e),r=n.getY(s+e),i=n.getZ(s+e);t<c&&(c=t),t>l&&(l=t),i<u&&(u=i),i>d&&(d=i),r>f&&(f=r)}e++;let p=r.getX(s),m=r.getZ(s),h=(c+l)/2+p*.3,g=(u+d)/2+m*.3,_=`${Math.round(h)},${Math.round(g)}`;if(o.has(_))continue;o.add(_);let v=f+.3,y=t.heightAt(h,g);a.push({x:h,z:g,nx:p,nz:m,y:v,h:Math.max(2.2,v-y)})}return a}var Su=new Set([0,1,2,3,4,5,6]);function Cu(e,t,n,r){let i=1/0,a=1/0,o=-1/0,s=-1/0;for(let e of[...t,...n])e.x<i&&(i=e.x),e.x>o&&(o=e.x),e.z<a&&(a=e.z),e.z>s&&(s=e.z);let c=42.25;i-=c,a-=c,o+=c,s+=c;let l=2,u=7e6;(o-i)/l*((s-a)/l)>u&&(l=Math.sqrt((o-i)*(s-a)/u));let d=Math.ceil((o-i)/l),f=Math.ceil((s-a)/l),p=new Float32Array(d*f),m=new Float32Array(d*f),h=new Float32Array(d*f),g=0;for(let e of r){if(!Su.has(e.klass)||!(e.height>4.5)||(e.levels||0)<1)continue;let t=e.rings?.[0];if(!t||t.length<3)continue;let n=0;for(let e=0;e<t.length;e++){let[r,i]=t[e],[a,o]=t[(e+1)%t.length];n+=r*o-a*i}let r=n>0?1:-1,o=e.height,s=Math.min(2.2*o,60);for(let e=0;e<t.length;e++){let[n,c]=t[e],[u,p]=t[(e+1)%t.length],m=u-n,_=p-c,v=Math.hypot(m,_);if(v<3)continue;let y=m/v,b=_/v,x=b*r,S=-y*r,C=Math.min(n,u)-s,w=Math.max(n,u)+s,T=Math.min(c,p)-s,E=Math.max(c,p)+s,D=Math.max(0,Math.floor((C-i)/l)),O=Math.min(d-1,Math.ceil((w-i)/l)),k=Math.max(0,Math.floor((T-a)/l)),A=Math.min(f-1,Math.ceil((E-a)/l));if(!(O<D||A<k)){g++;for(let e=k;e<=A;e++){let t=a+(e+.5)*l-c,r=e*d;for(let e=D;e<=O;e++){let a=i+(e+.5)*l-n,c=a*x+t*S;if(c<=.3||c>s)continue;let u=a*y+t*b,d=(Math.atan((v-u)/c)+Math.atan(u/c))/Math.PI;if(d<=.002)continue;let f=.5*(1-c/Math.sqrt(c*c+o*o));h[r+e]+=f*d*(1-pu(s*.6,s,c))}}}}}let _=20.25,v=4096,y=e=>{let t=new Float32Array(4097);for(let n=0;n<=v;n++){let r=n/v*_;t[n]=(1/(1+r))**e*(1-pu(3.15,4.5,Math.sqrt(r)))}return t},b=y(1.5),x=y(1.5),S=v/_,C=Jl*Jl,w=Jl*4.5;for(let e of t){let t=e.x+e.dx*Yl,n=e.z+e.dz*Yl,r=Math.max(0,Math.floor((t-w*1.3-i)/l)),o=Math.min(d-1,Math.ceil((t+w*1.3-i)/l)),s=Math.max(0,Math.floor((n-w*1.3-a)/l)),c=Math.min(f-1,Math.ceil((n+w*1.3-a)/l));for(let u=s;u<=c;u++){let s=a+(u+.5)*l-n,c=u*d;for(let n=r;n<=o;n++){let r=i+(n+.5)*l-t,a=r*e.ux+s*e.uz,o=r*e.dx+s*e.dz,u=(a*a*.5917159763313609+o*o*(o>=0?.8264462809917354:1.384083044982699))/C;u>=_||(p[c+n]+=b[u*S|0])}}}for(let e of n){let t=e.h*e.h,n=e.h*4.5,r=Math.max(0,Math.floor((e.x-n-i)/l)),o=Math.min(d-1,Math.ceil((e.x+n-i)/l)),s=Math.max(0,Math.floor((e.z-n-a)/l)),c=Math.min(f-1,Math.ceil((e.z+n-a)/l));for(let n=s;n<=c;n++){let s=a+(n+.5)*l-e.z;for(let a=r;a<=o;a++){let r=i+(a+.5)*l-e.x,o=r*e.nx+s*e.nz;if(o<-1)continue;let c=(r*r+s*s)/t;c>=_||(m[n*d+a]+=x[c*S|0]*pu(-1,.6,o))}}}let T=new Uint8Array(d*f*4);for(let e=0;e<d*f;e++)p[e]>0&&(T[e*4]=Math.round(Math.sqrt(Math.min(p[e]/ou,1))*255)),m[e]>0&&(T[e*4+1]=Math.round(Math.sqrt(Math.min(m[e]/ou,1))*255)),h[e]>0&&(T[e*4+2]=Math.round(Math.sqrt(Math.min(h[e]/ou,1))*255));let E=new e.DataTexture(T,d,f,e.RGBAFormat,e.UnsignedByteType);return E.magFilter=E.minFilter=e.LinearFilter,E.wrapS=E.wrapT=e.ClampToEdgeWrapping,E.unpackAlignment=1,E.generateMipmaps=!1,E.needsUpdate=!0,{tex:E,x0:i,z0:a,spanX:d*l,spanZ:f*l,W:d,H:f,texel:l,R:p,G:m,B:h,nSpill:g}}function wu(e){let t=[],n=[],r=[],i=[],a=[.42,.41,.39],o=[.2,.21,.22],s=[.46,.47,.48],c=(e,a,o,s,c,l=0)=>{let u=[a[0]-e[0],a[1]-e[1],a[2]-e[2]],d=[o[0]-e[0],o[1]-e[1],o[2]-e[2]],f=[u[1]*d[2]-u[2]*d[1],u[2]*d[0]-u[0]*d[2],u[0]*d[1]-u[1]*d[0]],p=Math.hypot(...f)||1;for(let u of[e,a,o,e,o,s])t.push(...u),n.push(f[0]/p,f[1]/p,f[2]/p),r.push(...c),i.push(l)};((e,t,n,r,i,a=!0)=>{let o=(e,t)=>[[e[0]-t,e[1],e[2]-t],[e[0]+t,e[1],e[2]-t],[e[0]+t,e[1],e[2]+t],[e[0]-t,e[1],e[2]+t]],s=o(e,t),l=o(n,r);for(let e=0;e<4;e++){let t=(e+1)%4;c(s[e],l[e],l[t],s[t],i)}a&&c(l[0],l[3],l[2],l[1],i)})([0,-.6,0],.13,[0,8.25,0],.075,a);let l=[0,7.95],u=[1.4,8.62],d=Math.hypot(u[0]-l[0],u[1]-l[1]),f=[-(u[1]-l[1])/d*.035,(u[0]-l[0])/d*.035],p=.035,m=(e,t,n)=>[e[0]+f[0]*t,e[1]+f[1]*t,n];c(m(l,1,-.035),m(u,1,-.035),m(u,1,p),m(l,1,p),o),c(m(l,-1,p),m(u,-1,p),m(u,-1,-.035),m(l,-1,-.035),o),c(m(l,-1,-.035),m(u,-1,-.035),m(u,1,-.035),m(l,1,-.035),o),c(m(l,1,p),m(u,1,p),m(u,-1,p),m(l,-1,p),o);let h=8*Math.PI/180,g=Math.cos(h),_=Math.sin(h),v=[Yl,8.6],y=(e,t,n)=>[v[0]+e*g-t*_,v[1]+e*_+t*g,n],b=.36,x=.17,S=-.07,C=.09;c(y(-.36,C,-.17),y(-.36,C,x),y(b,C,x),y(b,C,-.17),s),c(y(-.36,S,-.17),y(b,S,-.17),y(b,C,-.17),y(-.36,C,-.17),s),c(y(-.36,S,x),y(-.36,C,x),y(b,C,x),y(b,S,x),s),c(y(b,S,-.17),y(b,S,x),y(b,C,x),y(b,C,-.17),s),c(y(-.36,S,-.17),y(-.36,C,-.17),y(-.36,C,x),y(-.36,S,x),s),c(y(-.36,S,-.17),y(-.36,S,x),y(b,S,x),y(b,S,-.17),s);let w=b*.82,T=x*.78;c(y(-.29519999999999996,-.082,-.13260000000000002),y(-.29519999999999996,-.082,T),y(w,-.082,T),y(w,-.082,-.13260000000000002),[1,1,1],1);let E=new e.BufferGeometry;return E.setAttribute(`position`,new e.Float32BufferAttribute(t,3)),E.setAttribute(`normal`,new e.Float32BufferAttribute(n,3)),E.setAttribute(`color`,new e.Float32BufferAttribute(r,3)),E.setAttribute(`aLens`,new e.Float32BufferAttribute(i,1)),E}var Tu={id:`nightlights`,init(e){let{THREE:t,scene:n,terrain:r,camera:i,renderer:a}=e;if(e.query.get(`lamps`)===`0`)return{disabled:!0};let o=performance.now(),s=yu(e.data.allBuildings||e.data.buildings,r),{lamps:c,rejected:l}=bu(e.data.roads,r,s,e.pit),u=xu(e.meshes.buildings.geometry,r),d=performance.now(),f=Cu(t,c,u,e.data.buildings),p=performance.now(),m=Te;m.uLampMap.value=f.tex,m.uLampBox.value.set(f.x0,f.z0,1/f.spanX,1/f.spanZ);let h=new t.Color().setRGB(eu[0]/255,eu[1]/255,eu[2]/255,t.SRGBColorSpace),g=wu(t),_={uLens:{value:new t.Vector3}},v=new t.MeshStandardMaterial({vertexColors:!0,roughness:.82,metalness:0,side:t.DoubleSide});v.onBeforeCompile=e=>{Object.assign(e.uniforms,_,Te),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float aLens; varying float vLens; varying vec2 vLampXZ;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vLens = aLens;`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
vLampXZ = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\nvarying float vLens; uniform vec3 uLens; varying vec2 vLampXZ;\n${Ee}`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
totalEmissiveRadiance += uLens * vLens;`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
reflectedLight.directDiffuse += BRDF_Lambert(diffuseColor.rgb) * lampIrr(vLampXZ) * 0.35;`)},v.customProgramCacheKey=()=>`mirny-lamp-pole`;let y=new t.Group;y.name=`nightlights`;let b=1e3,x=new Map;for(let e of c){let t=`${Math.floor(e.x/b)},${Math.floor(e.z/b)}`;x.has(t)||x.set(t,[]),x.get(t).push(e)}let S=new t.Matrix4,C=new t.Quaternion,w=new t.Vector3(0,1,0),T=new t.Vector3(1,1,1),E=new t.Vector3,D=[];for(let e of x.values()){let n=new t.InstancedMesh(g,v,e.length),r=0,i=0;e.forEach((e,t)=>{C.setFromAxisAngle(w,Math.atan2(-e.dz,e.dx)),S.compose(E.set(e.x,e.y,e.z),C,T),n.setMatrixAt(t,S),r+=e.x,i+=e.z}),n.instanceMatrix.needsUpdate=!0,n.computeBoundingSphere(),n.receiveShadow=!0,n.userData.centre=new t.Vector2(r/e.length,i/e.length),y.add(n),D.push(n)}let O=new Float32Array(c.length*3);c.forEach((e,t)=>{O[t*3]=e.x+e.dx*Yl,O[t*3+1]=e.y+Jl+.02,O[t*3+2]=e.z+e.dz*Yl});let k=new t.BufferGeometry;k.setAttribute(`position`,new t.BufferAttribute(O,3));let A={uCol:{value:new t.Vector3},uScale:{value:1},uPx:{value:a.getPixelRatio()}},j=new t.Points(k,new t.ShaderMaterial({uniforms:A,transparent:!0,depthWrite:!1,blending:t.AdditiveBlending,vertexShader:`
        uniform float uScale; uniform float uPx;
        varying float vA;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float d = max(-mv.z, 1.0);
          // slide the sprite toward the eye along its own ray (screen position
          // unchanged) so the lamp housing does not depth-cut a hole in it
          mv.xyz += normalize(-mv.xyz) * min(0.9, d * 0.5);
          // a glare disc about 2.4 m across near to, never under 2 px far off
          float px = uScale * 2.4 / d;
          vA = clamp(px / 2.5, 0.25, 1.0) * exp(-d / 14000.0);
          gl_PointSize = clamp(px, 2.0 * uPx, 64.0 * uPx);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform vec3 uCol;
        varying float vA;
        void main() {
          vec2 c = gl_PointCoord * 2.0 - 1.0;
          float r2 = dot(c, c);
          if (r2 > 1.0) discard;
          float a = exp(-r2 * 7.0) + 0.18 * exp(-r2 * 1.6);
          // the arc itself reads yellow-white; the halo keeps the sodium orange
          float core = exp(-r2 * 30.0);
          gl_FragColor = vec4((uCol * a + vec3(1.0, 0.78, 0.45) * core * length(uCol) * 0.8) * vA, 1.0);
        }`}));j.frustumCulled=!1,j.renderOrder=2,y.add(j);let M=0,N=0,P=0,F=[...c.map(e=>[e.x,e.z,1]),...u.map(e=>[e.x,e.z,.4])];for(let[e,t,n]of F)M+=e*n,N+=t*n,P+=n;M/=P||1,N/=P||1;let I=0,L=0,R=0;for(let[e,t,n]of F)I+=n*(e-M)**2,L+=n*(t-N)**2,R+=n*(e-M)*(t-N);I/=P||1,L/=P||1,R/=P||1;let z=I+L,B=I*L-R*R,ee=z/2+Math.sqrt(Math.max(z*z/4-B,0)),te=z/2-Math.sqrt(Math.max(z*z/4-B,0)),V=.5*Math.atan2(2*R,I-L),ne=Math.max(400,Math.sqrt(ee)),ie=Math.max(300,Math.sqrt(Math.max(te,0))),ae=c.map(e=>e.y).sort((e,t)=>e-t),H=ae.length?ae[ae.length>>1]:0,oe={uAx:{value:new t.Matrix3},uC:{value:new t.Vector3(M,H,N)},uY0:{value:H},uBack:{value:1},uCol:{value:new t.Vector3},uNormY:{value:1/(.5*Math.sqrt(Math.PI)*220)}},U=new t.Mesh(new t.SphereGeometry(3,48,24),new t.ShaderMaterial({uniforms:oe,transparent:!0,depthWrite:!1,blending:t.AdditiveBlending,side:t.BackSide,vertexShader:`
          varying vec3 vW;
          void main() {
            vec4 w = modelMatrix * vec4(position, 1.0);
            vW = w.xyz;
            gl_Position = projectionMatrix * viewMatrix * w;
          }`,fragmentShader:`
          uniform mat3 uAx; uniform vec3 uC; uniform float uY0; uniform float uBack;
          uniform vec3 uCol; uniform float uNormY;
          varying vec3 vW;
          float erfA(float x) {
            float s = sign(x); x = abs(x);
            float t = 1.0 / (1.0 + 0.3275911 * x);
            float y = 1.0 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t
                      - 0.284496736) * t + 0.254829592) * t * exp(-x * x);
            return s * y;
          }
          void main() {
            vec3 o = cameraPosition;
            vec3 ray = vW - o;
            float tFrag = length(ray);
            vec3 dir = ray / tFrag;
            vec3 po = uAx * (o - uC);
            vec3 dd = uAx * dir;
            float a = dot(dd, dd), b = dot(po, dd), c = dot(po, po) - 9.0;
            float disc = b * b - a * c;
            if (disc <= 0.0) discard;
            float sq = sqrt(disc);
            float tA = max((-b - sq) / a, 0.0);
            float tB = (-b + sq) / a;
            if (uBack > 0.5) tB = min(tB, tFrag);
            if (dir.y < -1e-4) tB = min(tB, (uY0 - o.y) / dir.y);
            if (o.y < uY0) { if (dir.y <= 1e-4) discard; tA = max(tA, (uY0 - o.y) / dir.y); }
            if (tB <= tA) discard;
            float la = sqrt(a);
            float k = b / la;
            float m = max(dot(po, po) - k * k, 0.0);
            float I = 0.886227 / la * exp(-m) * (erfA(la * tB + k) - erfA(la * tA + k));
            float tau = I * uNormY;
            gl_FragColor = vec4(uCol * (1.0 - exp(-tau * 0.25)), 1.0);
          }`}));U.scale.set(ne,220,ie),U.rotation.y=-V,U.position.set(M,H,N),U.updateMatrixWorld(!0),oe.uAx.value.setFromMatrix4(new t.Matrix4().copy(U.matrixWorld).invert()),U.frustumCulled=!1,U.renderOrder=3,y.add(U);let se=c.filter((e,t)=>e.klass===0||hu(t,9.1)<.28),W=new t.InstancedBufferGeometry;W.setAttribute(`position`,new t.Float32BufferAttribute([-1,0,0,1,0,0,1,1,0,-1,0,0,1,1,0,-1,1,0],3));let ce=new Float32Array(se.length*4);se.forEach((e,t)=>{ce[t*4]=e.x+e.dx*Yl,ce[t*4+1]=e.y+Jl+.3,ce[t*4+2]=e.z+e.dz*Yl,ce[t*4+3]=hu(t,4.4)}),W.setAttribute(`aP`,new t.InstancedBufferAttribute(ce,4)),W.instanceCount=se.length;let le={uCol:{value:new t.Vector3}},ue=new t.Mesh(W,new t.ShaderMaterial({uniforms:le,transparent:!0,depthWrite:!1,blending:t.AdditiveBlending,side:t.DoubleSide,vertexShader:`
        attribute vec4 aP;
        varying vec2 vQ; varying float vA;
        void main() {
          vec2 toCam = cameraPosition.xz - aP.xz;
          float d = max(length(toCam), 1.0);
          vec2 side = vec2(-toCam.y, toCam.x) / d;
          // angular size roughly constant near the viewer (about 10 deg of sky),
          // capped at 140 m and faded over ~1 km: uncapped, every lamp in town
          // stood 300 m tall and the opening shot from orbit was a white wall
          float hgt = clamp(d * 0.17, 20.0, 140.0) * (0.75 + 0.5 * aP.w);
          float wid = 0.9 + d * 0.0035;
          vec3 p = vec3(aP.x + side.x * position.x * wid, aP.y + position.y * hgt,
                        aP.z + side.y * position.x * wid);
          vQ = position.xy;
          vA = exp(-d / 900.0) * (0.7 + 0.6 * aP.w) * smoothstep(12.0, 90.0, d)
               // a pillar is what an eye in the fog layer sees; from above the
               // layer the whole town's worth of them is a white wall
               * (1.0 - smoothstep(30.0, 120.0, cameraPosition.y - aP.y));
          gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
        }`,fragmentShader:`
        uniform vec3 uCol;
        varying vec2 vQ; varying float vA;
        void main() {
          float a = exp(-vQ.x * vQ.x * 3.0) * (1.0 - vQ.y) * (1.0 - vQ.y) * smoothstep(0.0, 0.04, vQ.y);
          gl_FragColor = vec4(uCol * a * vA, 1.0);
        }`}));ue.frustumCulled=!1,ue.visible=!1,ue.renderOrder=2,y.add(ue),n.add(y);let G=e.ui.hudSlot(`nightlights`,{parent:`clock`}),de=``,fe={streetLamps:c.length,entranceLamps:u.length,rejected:l,byClass:[0,1,2].map(e=>c.filter(t=>t.klass===e).length),osmStreetLampNodes:0,placeMs:+(d-o).toFixed(1),bakeMs:+(p-d).toFixed(1),map:{W:f.W,H:f.H,texelM:+f.texel.toFixed(2),x0:f.x0,z0:f.z0},glow:{x:M,z:N,y0:H,sigma:[Math.round(ne),Math.round(ie),220],angleDeg:+(V*180/Math.PI).toFixed(1)}};console.info(`nightlights`,JSON.stringify(fe));let pe=0,me=null,he=null,ge=new t.Vector3;return{stats:fe,lamps:c,doors:u,map:f,group:y,glow:U,glare:j,pillars:ue,force(e){he=e==null?null:fu(+e)},wanted:_u,litFraction:gu,update(e){let n=e.sun.altitude,o=re(e.doy,(e.simMin+3)%1440).altitude,s=e.weather||{},l=Math.max(.7*(s.cloud||0),s.fog||0,s.iceFog||0,.8*(s.snowfall||0)),d=+!!_u(n,o>n,l),f=me===null?999:(e.simMin-me+720+1440)%1440-720;me=e.simMin,pe=d?!e.running||Math.abs(f)>20?1:Math.min(1,pe+Math.max(f,0)/uu):0;let p=he??pe,g=p*p,v=gu(e.simMin);m.uLitFrac.value=v,m.uLampCol.value.set(h.r,h.g,h.b).multiplyScalar(nu*ou*g);let y=he??e.night;m.uDoorCol.value.set(...tu).multiplyScalar(ru*ou*y),m.uWinCol.value.set(...au).multiplyScalar(iu*ou*e.night*v),_.uLens.value.set(h.r,h.g,h.b).multiplyScalar(14*g);let b=i.position;for(let e of D)e.visible=Math.hypot(b.x-e.userData.centre.x,b.z-e.userData.centre.y)<2800;j.visible=g>.001,A.uCol.value.set(h.r,h.g,h.b).multiplyScalar(1.6*g),A.uScale.value=a.domElement.height/(2*Math.tan(i.fov*Math.PI/360)),A.uPx.value=a.getPixelRatio();let x=Math.max(s.cloud||0,s.fog||0,s.iceFog||0),S=.14*g*(1+2.2*x)*(.6+.4*e.snow);U.visible=S>1e-4,oe.uCol.value.set(1,.42,.14).multiplyScalar(S);let C=ge.set(b.x-M,b.y-H,b.z-N).applyMatrix3(oe.uAx.value).length()<2.98;U.material.side=C?t.BackSide:t.FrontSide,oe.uBack.value=+!!C;let w=pu(.3,.7,s.iceFog||0)*g;ue.visible=w>.001&&b.y-r.heightAt(b.x,b.z)<80,le.uCol.value.set(h.r,h.g,h.b).multiplyScalar(.3*w),e.lamps={on:p,want:d,level:pe,litFrac:v,street:c.length,entrance:u.length};let T=p>.01?`фонари горят · ${c.length} уличных + ${u.length} у подъездов, расстановка — вывод · свет в ${Math.round(v*100)}% квартир (профиль выдуман)`:`фонари выключены · включатся при солнце ниже ${(su+lu*fu(l)).toFixed(1)}° · свет в ${Math.round(v*100)}% квартир`;T!==de&&(G.textContent=T,de=T)}}}},Eu=9.81,Du=(e,t,n)=>e<t?t:e>n?n:e,Ou=(e,t,n)=>{let r=Du((n-e)/(t-e),0,1);return r*r*(3-2*r)},ku=e=>6.1121*Math.exp((18.678-e/234.5)*(e/(257.14+e))),Au=e=>6.1115*Math.exp((23.036-e/333.7)*(e/(279.82+e)));function ju(e){return e<0?.9*Au(e):.65*ku(e)}function Mu(e){return .004+.032*Ou(2,-30,e)}function Nu(e){return .18+.22*Ou(2,-30,e)}function Pu(e){let t=Du((20-e)/67,0,1);return Math.max(.15,t*Ou(10,6,e))}var Fu={boiler_house:{Tx:130,ex:120,r0:2.3,w0:12,load:Pu,alpha:1},processing_plant:{Tx:22,ex:.9*ku(22),r0:2.5,w0:2.5,load:e=>.35+.65*Pu(e),alpha:.55},power_plant:{Tx:150,ex:110,r0:2,w0:15,load:Pu,alpha:1}};function Iu(e,t){let n=ju(t),r=Ou(-22,-38,t),i=e=>(1-r)*ku(e)+r*Au(e),a=r=>r*e.ex+(1-r)*n-i(t+r*(e.Tx-t)),o=0,s=0;for(let e=0;e<=400;e++){let t=10**(-5+5*e/400);a(t)>0&&(o||=t,s=t)}return o?{dOn:1/s,dOff:1/o}:{dOn:0,dOff:0}}function Lu(e,t,n){return e*(Math.max(t,2)/10)**Nu(n)}function Ru(e,{T:t,u10:n,stackM:r}){let i=Fu[e]||Fu.boiler_house,a=i.load(t),o=i.w0*Math.sqrt(a),s=t+273.15,c=i.Tx+273.15,l=Math.max(.5,Eu*o*i.r0*i.r0*Math.max(1,i.Tx-t)/c),u=Eu/s*Mu(t),d=Math.max(.05,Lu(n,r,t)),f=5*l**.25*u**-.375,p=2.6*Math.cbrt(l/(d*u)),m=Math.min(650,Math.min(f,p)),h=Iu(i,t);return{kind:e,load:a,w0:o,r0:i.r0,F:l,s:u,u:d,u10:n,T:t,stackM:r,rise:m,riseCalm:f,riseWindy:p,dOn:h.dOn,dOff:h.dOff,alpha:i.alpha}}function zu(e,t=360,n=160){let r=new Float32Array(n),i=new Float32Array(n),a=new Float32Array(n),o=new Float32Array(n),s=new Float32Array(n),c=new Float32Array(n),l=new Float32Array(n),u=new Float32Array(n),d=Math.cbrt(Math.PI*e.F),f=1-Ou(.4,1.6,e.u10),p=e.r0*e.r0*Math.max(e.w0,.5),m=e.r0,h=e.r0,g=0,_=0,v=0,y=0,b=0;for(let x=0;x<n;x++){let S=t*(x/(n-1))**2,C=(3.4*d*S)**.75,w=1.6*Math.cbrt(e.F)*e.u**(-1/3)*S**(2/3),T=S===0?0:(C**-4+w**-4+e.rise**-4)**(-1/4),E=S-y,D=Lu(e.u10,e.stackM+T,e.T)*E,O=f*Ou(.7,.97,T/e.rise)*1.1*E*Math.exp(-S/(t*.8)),k=T-_,A=Math.hypot(D,k,O),j=E>0?D/(D+Math.max(k,0)+1e-6):0;m+=Math.max(k,0)*(.15+.4*j)+D*.05+O*.12,h+=Math.max(k,0)*(.15+.3*j)+(D+O)*.004,g+=D,v+=O,b+=A;let M=E>0?A/E:e.w0,N=Math.max(1,m*m*Math.max(M,.6)/p,1+.3*b/e.r0);r[x]=S,i[x]=T,a[x]=g,o[x]=v,s[x]=m,c[x]=Math.min(h,m),l[x]=N;let P=0;e.dOff>1&&(P=(e.dOn>1?Ou(e.dOn*.7,e.dOn*1.3,N):1)*Du(1-Math.log(N)/Math.log(e.dOff),0,1)**.6),u[x]=P,_=T,y=S}return{t:r,z:i,x:a,r:o,b:s,h:c,d:l,vis:u,N:n,life:t}}function Bu(e,t,n){let{t:r,N:i}=e;if(n<=0)return t[0];if(n>=r[i-1])return t[i-1];let a=Math.floor(Math.sqrt(n/e.life)*(i-1));for(a=Du(a,0,i-2);a>0&&r[a]>n;)a--;for(;a<i-2&&r[a+1]<n;)a++;let o=(n-r[a])/Math.max(1e-6,r[a+1]-r[a]);return t[a]+(t[a+1]-t[a])*o}function Vu(e){let t=-1;for(let n=0;n<e.N;n++)e.vis[n]>.02&&(t=n);return t<0?0:Math.hypot(e.x[t],e.z[t],e.r[t])}var Hu=[{life:24,count:36,from:0,to:24},{life:110,count:44,from:10,to:110},{life:360,count:56,from:60,to:360}];function Uu(e,t){return(e.from===0?Ou(0,1.2,t):Ou(e.from,e.from+(e.to-e.from)*.25,t))*(1-Ou(e.to*.72,e.to,t))}function Wu(e){let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)}var Gu=[.7,.55,.42],Ku=`
  attribute vec4 iPos;     // centre xyz, radius
  attribute vec4 iP2;      // alpha, vertical squash, floor y, seed
  varying vec2 vUv;
  varying float vAlpha;
  varying float vSeed;
  varying float vFloor;
  varying float vRadius;
  varying float vViewZ;
  varying vec3 vWorld;
  varying vec3 vRight;
  varying vec3 vUp;
  varying vec3 vBack;
  #include <fog_pars_vertex>
  void main() {
    vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
    vec3 back = vec3(viewMatrix[0][2], viewMatrix[1][2], viewMatrix[2][2]);
    vec3 off = (right * position.x + up * position.y) * iPos.w;
    off.y *= iP2.y;
    vec3 wp = iPos.xyz + off;
    vec4 mvPosition = viewMatrix * vec4(wp, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vUv = position.xy;
    vAlpha = iP2.x;
    vSeed = iP2.w;
    vFloor = iP2.z;
    vRadius = iPos.w;
    vViewZ = -mvPosition.z;
    vWorld = wp;
    vRight = right;
    vUp = up * mix(1.0, 2.2, 1.0 - iP2.y);
    vBack = back;
    #include <fog_vertex>
  }`,qu=`
  uniform sampler2D uNoise;
  uniform vec3 uSunDir;
  uniform vec3 uSunCol;
  uniform float uSunI;
  uniform float uSunAlt;
  uniform vec3 uSkyCol;
  uniform vec3 uGroundCol;
  uniform vec3 uGlowCol;
  uniform float uTime;
  varying vec2 vUv;
  varying float vAlpha;
  varying float vSeed;
  varying float vFloor;
  varying float vRadius;
  varying float vViewZ;
  varying vec3 vWorld;
  varying vec3 vRight;
  varying vec3 vUp;
  varying vec3 vBack;
  #include <fog_pars_fragment>

  void main() {
    float r2 = dot(vUv, vUv);
    if (r2 > 1.0) discard;

    // Wisps: two octaves of a tiling noise in the puff's own frame, turning
    // slowly so a standing column still boils.
    float a = vSeed * 6.2831 + uTime * 0.05 * (vSeed - 0.5);
    mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
    vec2 q = rot * vUv * 0.42 + vec2(vSeed * 7.13, vSeed * 3.71) + vec2(0.0, -uTime * 0.006);
    float n = texture2D(uNoise, q).r * 0.62 + texture2D(uNoise, q * 2.7 + 0.37).r * 0.38;
    float dens = clamp((1.0 - r2) * 1.55 - (1.0 - n) * 0.95, 0.0, 1.0);
    dens = dens * dens * (3.0 - 2.0 * dens);

    // Soft contacts, analytic: fade to nothing towards the floor under the
    // puff (ground, roof or the stack mouth), and when the camera is inside.
    float soft = smoothstep(vFloor, vFloor + 0.45 * vRadius + 1.0, vWorld.y);
    float nearFade = smoothstep(vRadius * 0.3, vRadius * 1.4 + 3.0, vViewZ);
    float alpha = vAlpha * dens * soft * nearFade;
    if (alpha < 0.002) discard;

    // A pseudo-sphere normal per puff: lit side toward the sun, sky on the
    // rest, snow bounce from below.
    float nz = sqrt(max(0.0, 1.0 - r2));
    vec3 N = normalize(vRight * vUv.x + vUp * vUv.y + vBack * nz);
    float ndl = dot(N, uSunDir);
    float lit = clamp(ndl * 0.8 + 0.2, 0.0, 1.0);
    vec3 V = normalize(cameraPosition - vWorld);
    float cosT = dot(-V, uSunDir);
    float g = 0.6;
    float hg = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * cosT, 1.5) * 0.0796;
    float thin = 1.0 - dens;
    // the horizon dips as the plume climbs: a 300 m top keeps the sun ~0.5°
    // longer than the street does
    float dip = degrees(sqrt(2.0 * max(vWorld.y, 0.0) / 6.371e6));
    float sunVis = smoothstep(-1.3 - dip, -0.5 - dip, uSunAlt);
    // x1.3: a dense cloud's lit side outshines a Lambertian sphere (multiple
    // scattering) — a fit by eye, not a derivation
    vec3 sun = uSunCol * uSunI * sunVis * (1.3 * lit + hg * 5.0 * thin);
    vec3 amb = mix(uGroundCol, uSkyCol, N.y * 0.5 + 0.5) * 0.85;
    vec3 glow = uGlowCol * clamp(0.55 - N.y * 0.55, 0.0, 1.0) * exp(-max(vWorld.y, 0.0) / 260.0);
    vec3 col = 0.9 * (sun + amb + glow);
    gl_FragColor = vec4(col, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }`;function Ju(e,t=128){let n=(e,t)=>{let n=new Float32Array(e*e);for(let r=0;r<e*e;r++)n[r]=Wu(r*1.618+t*97.3);return n},r=new Uint8Array(t*t),i=[[4,.5],[8,.27],[16,.15],[32,.08]],a=i.map(([e],t)=>n(e,t+1)),o=e=>e*e*(3-2*e);for(let e=0;e<t;e++)for(let n=0;n<t;n++){let s=0;i.forEach(([r,i],c)=>{let l=a[c],u=n/t*r,d=e/t*r,f=Math.floor(u),p=Math.floor(d),m=o(u-f),h=o(d-p),g=(e,t)=>l[t%r*r+e%r],_=g(f,p),v=g(f+1,p),y=g(f,p+1),b=g(f+1,p+1);s+=i*((_+(v-_)*m)*(1-h)+(y+(b-y)*m)*h)}),r[e*t+n]=Math.max(0,Math.min(255,Math.round(s*255)))}let s=new e.DataTexture(r,t,t,e.RedFormat,e.UnsignedByteType);return s.wrapS=s.wrapT=e.RepeatWrapping,s.magFilter=e.LinearFilter,s.minFilter=e.LinearMipmapLinearFilter,s.generateMipmaps=!0,s.needsUpdate=!0,s}function Yu(e,t,n){let r=!1;for(let i=0,a=e.length-1;i<e.length;a=i++){let[o,s]=e[i],[c,l]=e[a];s>n!=l>n&&t<(c-o)*(n-s)/(l-s)+o&&(r=!r)}return r}function Xu(e,t,n){let r=n*1.55,i=[[0,.45,11093050],[.45,.97,14275786],[.97,1,3880499]],a=[],o=[],s=[],c=[],l=new e.Color,u=(r-n)/t;for(let[d,f,p]of i){l.setHex(p,e.SRGBColorSpace);let i=d*t,m=f*t,h=r+(n-r)*d,g=r+(n-r)*f,_=a.length/3;for(let t=0;t<=20;t++){let n=t/20*Math.PI*2,r=Math.cos(n),c=Math.sin(n),d=new e.Vector3(r,u,c).normalize();a.push(r*h,i,c*h,r*g,m,c*g),o.push(d.x,d.y,d.z,d.x,d.y,d.z),s.push(l.r,l.g,l.b,l.r,l.g,l.b)}for(let e=0;e<20;e++){let t=_+e*2;c.push(t,t+1,t+2,t+1,t+3,t+2)}}l.setHex(1907482,e.SRGBColorSpace);let d=a.length/3;for(let e=0;e<=20;e++){let r=e/20*Math.PI*2,i=Math.cos(r),c=Math.sin(r);a.push(i*n,t,c*n,i*n*.8,t,c*n*.8),o.push(0,1,0,0,1,0),s.push(l.r,l.g,l.b,l.r,l.g,l.b)}for(let e=0;e<20;e++){let t=d+e*2;c.push(t,t+2,t+1,t+1,t+2,t+3)}let f=new e.BufferGeometry;return f.setAttribute(`position`,new e.Float32BufferAttribute(a,3)),f.setAttribute(`normal`,new e.Float32BufferAttribute(o,3)),f.setAttribute(`color`,new e.Float32BufferAttribute(s,3)),f.setIndex(c),f}var Zu={id:`plumes`,init(e){let{THREE:t,scene:n,terrain:r,camera:i}=e,a=e.data.landmarks?.chimneys,o=e.ui.hudSlot(`plumes`,{parent:`clock`});if(!a?.emitters?.length)return o.textContent=`пар: в бандле нет источников`,{};let s=e.data.buildings||[],c=(e,t)=>{let n=null;for(let r of s){let i=r.rings[0];if(!i?.length)continue;if(!r._plumeBox){let e=1/0,t=1/0,n=-1/0,a=-1/0;for(let[r,o]of i)e=Math.min(e,r),t=Math.min(t,o),n=Math.max(n,r),a=Math.max(a,o);r._plumeBox=[e,t,n,a]}let a=r._plumeBox;e<a[0]||t<a[1]||e>a[2]||t>a[3]||Yu(i,e,t)&&(n=Math.max(n??-1/0,r.baseZ+r.height))}return n},l=new t.Group;l.name=`plumes`;let u=new t.MeshStandardMaterial({vertexColors:!0,roughness:.88,metalness:0}),d=[],f=[],p=null;for(let e of a.emitters){let n=(e.stacks||[]).filter(e=>e.heightM);for(let e of n){let[n,i]=e.xz,a=r.heightAt(n,i),o=2.3,s=new t.Mesh(Xu(t,e.heightM,o),u);s.position.set(n,a-.5,i),s.castShadow=!0,s.receiveShadow=!0,l.add(s),e.heightM>45&&d.push(n,a+e.heightM+.6,i,n,a+e.heightM*.5,i+o*1.3)}if(!e.active)continue;let i,a,o;if(n.length){let s=Math.max(...n.map(e=>e.heightM)),[c,l]=e.xz,u=r.heightAt(c,l);i=new t.Vector3(c,u+s,l),a=s,o=i.y-.6}else if(e.vent){let[n,s]=e.hall?.xz||e.xz,l=r.heightAt(n,s),u=c(n,s)??l+8;i=new t.Vector3(n,u+1,s),a=i.y-l,o=u}else continue;f.push({e,kind:e.kind,mouth:i,stackM:a,floor:o,seed:Wu(f.length+3.7)*1e3,state:null,table:null,key:``})}if(d.length){let e=new t.BufferGeometry;e.setAttribute(`position`,new t.Float32BufferAttribute(d,3)),p=new t.Points(e,new t.PointsMaterial({color:new t.Color().setHex(16722458,t.SRGBColorSpace),size:4,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1})),p.frustumCulled=!1,l.add(p)}n.add(l);let m=Hu.reduce((e,t)=>e+t.count,0),h=Math.max(1,f.length*m),g=new t.InstancedBufferGeometry;g.setAttribute(`position`,new t.Float32BufferAttribute([-1,-1,0,1,-1,0,1,1,0,-1,1,0],3)),g.setIndex([0,1,2,0,2,3]);let _=new Float32Array(h*4),v=new Float32Array(h*4),y=new t.InstancedBufferAttribute(_,4).setUsage(t.DynamicDrawUsage),b=new t.InstancedBufferAttribute(v,4).setUsage(t.DynamicDrawUsage);g.setAttribute(`iPos`,y),g.setAttribute(`iP2`,b),g.instanceCount=0;let x=t.UniformsUtils.merge([t.UniformsLib.fog,{uNoise:{value:null},uSunDir:{value:new t.Vector3(0,1,0)},uSunCol:{value:new t.Color(1,1,1)},uSunI:{value:1},uSunAlt:{value:10},uSkyCol:{value:new t.Color},uGroundCol:{value:new t.Color},uGlowCol:{value:new t.Color},uTime:{value:0}}]);x.uNoise.value=Ju(t);let S=new t.ShaderMaterial({uniforms:x,vertexShader:Ku,fragmentShader:qu,transparent:!0,depthWrite:!1,depthTest:!0,fog:!0}),C=new t.Mesh(g,S);C.frustumCulled=!1,C.renderOrder=2,l.add(C);let w=new Float32Array(h),T=Array(h),E=new Float32Array(h*4),D=new Float32Array(h*4),O={T:null,u10:null,dir:null},k={},A=e.query.get(`plumes`)!==`0`,j={sources:f.length,visible:0,columnM:0,lengthM:0,puffs:0},M=new t.Color,N=(e,n)=>e.setRGB(n[0],n[1],n[2],t.SRGBColorSpace),P=e.ui.addGroup(`plumes`,`пар`),F=document.createElement(`button`);F.textContent=`вкл`;let I=()=>{F.classList.toggle(`on`,A),F.textContent=A?`вкл`:`выкл`};F.onclick=()=>{A=!A,I()},I(),P.appendChild(F);let L=0,R=new t.Vector3,z=new t.Vector3;function B(e,t){if(l.visible=A,e.plumes={sources:f.length,visible:0,columnM:0},!A||!f.length){g.instanceCount=0;return}let n=e.weather,a=k.tempC??n.tempC,s=k.windMs??n.windMs,c=k.windDir??n.windDir;if(O.T===null||k.snap||Math.abs(a-O.T)>6||Math.abs(s-O.u10)>4)O.T=a,O.u10=s,O.dir=c,k.snap=!1;else{let e=1-Math.exp(-Math.min(t,.1)/2.5);O.T+=(a-O.T)*e,O.u10+=(s-O.u10)*e;let n=c-O.dir;n=Math.atan2(Math.sin(n),Math.cos(n)),O.dir+=n*e}R.set(Math.cos(O.dir),0,Math.sin(O.dir)),z.set(-R.z,0,R.x);let u=e.t,d=i.position,m=0,h=0,S=0,C=0;for(let e of f){let t=`${O.T.toFixed(2)}|${O.u10.toFixed(2)}`;t!==e.key&&(e.state=Ru(e.kind,{T:O.T,u10:O.u10,stackM:e.stackM}),e.table=zu(e.state,Hu[Hu.length-1].life),e.key=t,e.visLen=Vu(e.table));let n=e.state,i=e.table;e.visLen<=0||(C++,h=Math.max(h,n.rise),S=Math.max(S,e.visLen),Hu.forEach((t,a)=>{for(let o=0;o<t.count;o++){let s=o/t.count+u/t.life+Wu(e.seed+a*31),c=Math.floor(s),l=(s-c)*t.life,f=Uu(t,l);if(f<=0)continue;let p=Bu(i,i.vis,l),h=n.alpha*p*f*Gu[a];if(h<.004)continue;let g=e.seed+a*1e3+o*7.31+c*131.7,y=Wu(g),b=Wu(g+1.3),x=Wu(g+2.7),S=Wu(g+4.1),C=Bu(i,i.z,l),T=Bu(i,i.x,l),E=Bu(i,i.r,l),D=Bu(i,i.b,l),O=Bu(i,i.h,l),k=(y-.5)*.7*D+Math.sin(u*.11+b*40)*.12*D,A=(b-.5)*.5*O+Math.cos(u*.09+x*40)*.08*O,j=S*Math.PI*2,M=e.mouth.x+R.x*T+z.x*k+Math.cos(j)*E,N=e.mouth.z+R.z*T+z.z*k+Math.sin(j)*E,P=e.mouth.y+C+A,F=r.heightAt(M,N),I=Math.max(F+1.5,e.floor);P=Math.max(P,I+.5);let L=D*(.8+.55*x);L=Math.min(L,(P-I)*1.15+1.5);let B=Math.max(.35,Math.min(1,O/Math.max(D,.001))),ee=m*4;_[ee]=M,_[ee+1]=P,_[ee+2]=N,_[ee+3]=L,v[ee]=Math.min(1,h),v[ee+1]=B,v[ee+2]=I,v[ee+3]=y;let te=M-d.x,V=P-d.y,ne=N-d.z;w[m]=te*te+V*V+ne*ne,m++}}))}for(let e=0;e<m;e++)T[e]=e;let P=T.slice(0,m).sort((e,t)=>w[t]-w[e]);for(let e=0;e<m;e++){let t=P[e]*4,n=e*4;E[n]=_[t],E[n+1]=_[t+1],E[n+2]=_[t+2],E[n+3]=_[t+3],D[n]=v[t],D[n+1]=v[t+1],D[n+2]=v[t+2],D[n+3]=v[t+3]}y.array.set(E.subarray(0,m*4)),b.array.set(D.subarray(0,m*4)),y.clearUpdateRanges(),b.clearUpdateRanges(),y.addUpdateRange(0,m*4),b.addUpdateRange(0,m*4),y.needsUpdate=!0,b.needsUpdate=!0,g.instanceCount=m;let F=e.sun.sky,I=e.sun.altitude,B=Math.max(0,Math.min(1,I/30));if(N(x.uSunCol.value,[1,.45+.5*B,.2+.68*B]),x.uSunDir.value.copy(e.sun.vec).normalize(),x.uSunAlt.value=I,x.uSunI.value=(.25+1.05*Math.max(0,Math.min(1,I/14)))*2.2/Math.PI*(n.sunDim??1),F){let e=F.hemiIntensity*1.15/Math.PI;N(x.uSkyCol.value,F.hemiSky).multiplyScalar(e),N(x.uGroundCol.value,F.hemiGround).multiplyScalar(e*.9)}if(N(M,[1,.56,.26]),x.uGlowCol.value.copy(M).multiplyScalar(.05*e.night),x.uTime.value=u,p&&(p.material.opacity=Math.min(1,e.night*1.2)),j.visible=C,j.columnM=h,j.lengthM=S,j.puffs=m,e.plumes={sources:f.length,visible:C,columnM:Math.round(h)},L-=t,L<=0){L=.5;let e=O.u10<1?`штиль`:`ветер ${O.u10.toFixed(0)} м/с`;o.innerHTML=C?`пар: подъём ${Math.round(h)} м · виден на ${Math.round(S)} м · ${Math.round(O.T)} °C, ${e} · модель`:`пар: при ${Math.round(O.T)} °C не виден · модель`}}return{update:B,sources:f,stats:j,env:O,override(e={}){for(let e of[`tempC`,`windMs`,`windDir`])delete k[e];return Object.assign(k,e),k.snap=e.snap??!0,k},setEnabled(e){A=!!e,I()},state:()=>f.map(e=>({id:e.e.id,kind:e.kind,mouthY:+e.mouth.y.toFixed(1),stackM:+e.stackM.toFixed(1),visibleM:Math.round(e.visLen||0),riseM:Math.round(e.state?.rise||0),F:+(e.state?.F||0).toFixed(1),dOff:Math.round(e.state?.dOff||0)})),material:S,mesh:C,group:l}}};function Qu(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function $u(e,t,n,r,i){let a=2*Math.PI*Math.min(r,t*.45)/t,o=Math.cos(a),s=Math.sin(a)/(2*i),c,l,u;n===`lp`?(c=(1-o)/2,l=1-o,u=c):n===`hp`?(c=(1+o)/2,l=-(1+o),u=c):(c=s,l=0,u=-s);let d=1+s,f=-2*o,p=1-s,m=0,h=0,g=0,_=0;for(let t=0;t<e.length;t++){let n=(c*e[t]+l*m+u*h-f*g-p*_)/d;h=m,m=e[t],_=g,g=n,e[t]=n}return e}function ed(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n]*e[n];return Math.sqrt(t/Math.max(1,e.length))}function td(e,t){let n=ed(e);if(n>0)for(let r=0;r<e.length;r++)e[r]*=t/n;return e}function nd(e,t){let n=0;for(let t=0;t<e.length;t++)n=Math.max(n,Math.abs(e[t]));if(n>0)for(let r=0;r<e.length;r++)e[r]*=t/n;return e}function rd(e,t){let n=e.length-t,r=e.slice(0,n);for(let i=0;i<t;i++){let a=(i+.5)/t;r[i]=e[i]*Math.sin(a*Math.PI/2)+e[n+i]*Math.cos(a*Math.PI/2)}return r}function id(e,t,n){let r=new Float32Array(t);if(e===`white`)for(let e=0;e<t;e++)r[e]=n()*2-1;else if(e===`pink`){let e=0,i=0,a=0;for(let o=0;o<t;o++){let t=n()*2-1;e=.99765*e+t*.099046,i=.963*i+t*.2965164,a=.57*a+t*1.0526913,r[o]=e+i+a+t*.1848}}else{let e=0;for(let i=0;i<t;i++)e=.996*e+(n()*2-1)*.06,r[i]=e}return r}function ad(e,t,n,r,i){let a=r||e.sampleRate,o=Math.round(a*.25),s=Math.round(a*n),c=e.createBuffer(2,s,a);for(let e=0;e<2;e++){let n=rd(id(t,s+o,Qu(i+e*7919)),o);c.copyToChannel(td(n,.3),e)}return c}function od(e,t,n,r=.35){let i=3e3,a=null,o=n=>e.createBuffer(1,Math.round(n*t),n);try{a=o(i)}catch{i=22050,a=o(i)}let s=Math.round(i*2),c=a.length+s,l=Qu(n),u=new Float32Array(c),d=new Float32Array(c),f=1-Math.exp(-2*Math.PI*.05/i),p=1-Math.exp(-2*Math.PI*r/i),m=0,h=0,g=0,_=0;for(let e=0;e<c;e++){let t=l()*2-1;m+=f*(t-m),h+=f*(m-h),g+=p*(t-g),_+=p*(g-_),u[e]=h,d[e]=_}td(u,1),td(d,1);let v=new Float32Array(c);for(let e=0;e<c;e++){let t=.65*u[e]+.55*d[e];v[e]=t>0?t*1.25:t*.7}let y=rd(v,s);return nd(y,1),a.copyToChannel(y,0),a}function sd(e,t,n,r,i,a,o){let s=Math.round(n*t),c=Math.max(2,Math.round(r*t)),l=c/3;if(o){let n=2*Math.PI*o/t,r=a()*6.283;for(let t=0;t<c&&s+t<e.length;t++)e[s+t]+=i*Math.exp(-t/l)*Math.sin(n*t+r)}else for(let t=0;t<c&&s+t<e.length;t++)e[s+t]+=i*Math.exp(-t/l)*(a()*2-1)}function cd(e,t,n,r,i,a,o,s,c){let l=Math.round((r+i*5)*t),u=new Float32Array(l);for(let e=0;e<l;e++){let n=e/t,a=n<r?n/r:Math.exp(-(n-r)/i);u[e]=(o()*2-1)*a}s&&$u(u,t,`lp`,s,.7),c&&$u(u,t,`hp`,c,.7);let d=Math.round(n*t);for(let t=0;t<l&&d+t<e.length;t++)e[d+t]+=a*u[t]}function ld(e,t,n,r){return e()<t?Math.abs(e()+e()-1)*.06:n+(e()+e()+e())/3*r}var ud={snowSoft:(e,t,n)=>{cd(e,t,.004,.012,.07,.55,n,380),cd(e,t,.11,.02,.06,.35,n,520);for(let r=0;r<45;r++)sd(e,t,ld(n,.5,.09,.2),.001+n()*.003,n()**2.2*.5,n);return{bp:[1300,.7],lp:5200}},snowCold:(e,t,n)=>{cd(e,t,.004,.008,.05,.4,n,300),cd(e,t,.11,.015,.05,.22,n,420);for(let r=0;r<110;r++)sd(e,t,ld(n,.45,.08,.22),6e-4+n()*.0018,n()**2.6*.9,n);return{bp:[2400,.55],lp:9500}},snowDeep:(e,t,n)=>{cd(e,t,.004,.03,.1,.55,n,300);for(let r=0;r<80;r++)sd(e,t,ld(n,.35,.07,.3),.001+n()*.003,n()**2.4*.7,n);return{bp:[1600,.6],lp:7e3}},packed:(e,t,n)=>{cd(e,t,.003,.004,.03,.5,n,600);for(let r=0;r<55;r++)sd(e,t,ld(n,.55,.09,.12),5e-4+n()*.0012,n()**2.8*.9,n);return{bp:[2800,.6],lp:1e4}},asphalt:(e,t,n)=>{cd(e,t,.002,.002,.012,.9,n,5e3,900),cd(e,t,.01,.015,.03,.18,n,7e3,2e3),cd(e,t,0,.004,.03,.35,n,220),cd(e,t,.115,.002,.01,.5,n,4500,1100);for(let r=0;r<10;r++)sd(e,t,.005+n()*.14,5e-4,n()**3*.3,n);return{lp:9e3}},concrete:(e,t,n)=>(cd(e,t,.002,.002,.01,1,n,6500,1200),cd(e,t,0,.004,.025,.3,n,260),cd(e,t,.11,.002,.01,.55,n,6e3,1400),{lp:11e3}),gravel:(e,t,n)=>{cd(e,t,.004,.01,.05,.45,n,280);for(let r=0;r<38;r++){let r=ld(n,.5,.08,.18);sd(e,t,r,.004+n()*.008,n()**2*.55,n,1400+n()*3600),n()<.6&&sd(e,t,r+.001,.002,n()**2*.35,n)}return{lp:8e3}},grass:(e,t,n)=>(cd(e,t,0,.03,.07,.5,n,6500,1800),cd(e,t,.004,.01,.04,.3,n,200),cd(e,t,.12,.03,.05,.3,n,6e3,2200),{lp:8e3}),litter:(e,t,n)=>{cd(e,t,0,.025,.06,.45,n,4500,900),cd(e,t,.004,.012,.05,.35,n,220);let r=n()<.5?1+Math.floor(n()*3):0;for(let i=0;i<r;i++)sd(e,t,.02+n()*.15,.006,.4+n()*.4,n,900+n()*1800);return{lp:7e3}},dirt:(e,t,n)=>{cd(e,t,.003,.006,.05,.7,n,240),cd(e,t,.01,.01,.04,.15,n,5e3,1500);for(let r=0;r<14;r++)sd(e,t,ld(n,.6,.1,.1),.001+n()*.002,n()**3*.4,n);return cd(e,t,.115,.004,.03,.35,n,300),{lp:7e3}},ice:(e,t,n)=>(sd(e,t,.001,.02,.8,n,3100+n()*900),cd(e,t,0,.002,.012,.6,n,8e3,1500),cd(e,t,.02,.02,.05,.1,n,7e3,2500),sd(e,t,.11,.015,.45,n,3300+n()*900),{lp:11e3}),water:(e,t,n)=>{cd(e,t,0,.02,.1,.6,n,1600,150);for(let r=0;r<7;r++){let r=.03+n()*.25,i=350+n()*900,a=Math.round(.03*t),o=Math.round(r*t),s=n()*6.28;for(let n=0;n<a&&o+n<e.length;n++){let r=n/t;e[o+n]+=.25*Math.exp(-r/.008)*Math.sin(s+2*Math.PI*i*r*(1+r*20))}}return{lp:5e3}}};Object.keys(ud);function dd(e,t,n=6,r=1){let i=e.sampleRate,a=[];for(let o=0;o<n;o++){let n=Qu(r*1009+o*97+t.length*13),s=new Float32Array(Math.round(i*.45)),c=(ud[t]||ud.dirt)(s,i,n);if(c.bp){let e=s.slice();$u(e,i,`bp`,c.bp[0],c.bp[1]);let t=$u(s.slice(),i,`lp`,400,.7);for(let n=0;n<s.length;n++)s[n]=e[n]*1.6+t[n]}c.lp&&$u(s,i,`lp`,c.lp,.7),fd(s,i,.03),nd(s,.9);let l=e.createBuffer(1,s.length,i);l.copyToChannel(s,0),a.push(l)}return a}function fd(e,t,n){let r=Math.min(e.length,Math.round(t*n));for(let t=0;t<r;t++)e[e.length-1-t]*=t/r;e[0]*=0}function pd(e,t=6,n=5){let r=e.sampleRate,i=[];for(let a=0;a<t;a++){let t=Qu(n*7717+a*131),o=new Float32Array(Math.round(r*.32)),s=1+ +(t()<.6);for(let e=0;e<s;e++){let n=e===0?.07+t()*.04:.005+t()*.02,i=e===0?.08+t()*.09:.03+t()*.03,a=520+t()*420,s=(t()-.35)*.45,c=n,l=e===0?1:.55;for(;c<n+i;){let e=(c-n)/i,u=Math.sin(Math.PI*Math.min(1,e*1.1))**.7,d=a*(1+s*e)*(1+(t()-.5)*.06),f=Math.round(c*r);f<o.length&&(o[f]+=l*u*(.6+.4*t())),c+=1/d}}let c=$u(o.slice(),r,`bp`,1500+t()*400,4),l=$u(o.slice(),r,`bp`,3100+t()*600,5);for(let e=0;e<o.length;e++)o[e]=c[e]+.6*l[e];fd(o,r,.02),nd(o,.9);let u=e.createBuffer(1,o.length,r);u.copyToChannel(o,0),i.push(u)}return i}function md(e,t=3,n=11){let r=e.sampleRate,i=[];for(let a=0;a<t;a++){let t=Qu(n*313+a*17),o=new Float32Array(Math.round(r*1.6));for(let e=0;e<o.length;e++){let t=e/r,n=38+34*Math.exp(-t/.08);o[e]+=.9*Math.exp(-t/.22)*Math.sin(2*Math.PI*n*t)*Math.min(1,t/.004)}cd(o,r,0,.012,.16,.9,t,420);for(let[e,t,n]of[[182,.12,.35],[417,.08,.28],[763,.05,.2]])for(let i=0;i<o.length;i++){let a=i/r;o[i]+=t*Math.exp(-a/n)*Math.sin(2*Math.PI*e*a)*Math.min(1,a/.003)}for(let e=0;e<140;e++){let e=.02+t()**1.8*1.3;sd(o,r,e,.004+t()*.01,t()**2*.3*Math.exp(-e/.6),t,350+t()*2200)}fd(o,r,.1),nd(o,.95);let s=e.createBuffer(1,o.length,r);s.copyToChannel(o,0),i.push(s)}return i}function hd(e,t=23){let n=e.sampleRate,r=Qu(t),i=Math.round(n*3.4),a=new Float32Array(i),o=id(`brown`,i,r);$u(o,n,`lp`,260,.7),td(o,.3);let s=e=>e<.9?(e/.9)**1.6:e<1.9?1:Math.exp(-(e-1.9)/.45);for(let e=0;e<i;e++)a[e]=o[e]*s(e/n);for(let e=0;e<900;e++){let e=r()**.9*3.1;sd(a,n,e,.004+r()*.012,r()**2.4*.35*s(e),r,250+r()*2600)}for(let e=0;e<Math.round(n*.8);e++){let t=e/n,r=e+Math.round(n*.55);r<i&&(a[r]+=.6*Math.exp(-t/.25)*Math.sin(2*Math.PI*(34+20*Math.exp(-t/.1))*t)*Math.min(1,t/.01))}fd(a,n,.3),nd(a,.9);let c=e.createBuffer(1,i,n);return c.copyToChannel(a,0),c}function gd(e,t=29){let n=e.sampleRate,r=Qu(t),i=new Float32Array(Math.round(n*.8));cd(i,n,0,.003,.05,.8,r,900);for(let[e,t,r]of[[96,.5,.18],[231,.3,.14],[587,.15,.1],[1290,.06,.06]])for(let a=0;a<i.length;a++){let o=a/n;i[a]+=t*Math.exp(-o/r)*Math.sin(2*Math.PI*e*o)}fd(i,n,.05),nd(i,.9);let a=e.createBuffer(1,i.length,n);return a.copyToChannel(i,0),a}function _d(e,t=41){let n=e.sampleRate,r=Qu(t),i=Math.round(n*1.3),a=e.createBuffer(2,i,n);for(let e=0;e<2;e++){let t=new Float32Array(i);for(let e=0;e<9;e++){let e=12+r()*33,a=2*e/343,o=Math.round(a*n);o<i&&(t[o]+=(.5+.5*r())*12/e*(r()<.5?-1:1))}for(let e=0;e<i;e++){let i=e/n;t[e]+=(r()*2-1)*.35*Math.exp(-i*6.9/.9)*Math.min(1,i/.03)}$u(t,n,`lp`,4500,.7);let o=0;for(let e=0;e<i;e++)o+=t[e]*t[e];let s=.6/Math.sqrt(o||1);for(let e=0;e<i;e++)t[e]*=s;a.copyToChannel(t,e)}return a}function vd(e,t=3){let n=Qu(t),r=new Float32Array(40),i=new Float32Array(40);for(let e=1;e<40;e++){let t=e**-1.05*(1+.7*Math.exp(-(((e-4)/1.8)**2))),a=n()*Math.PI*2;r[e]=t*Math.cos(a),i[e]=t*Math.sin(a)}return e.createPeriodicWave(r,i,{disableNormalization:!1})}function yd(e,t){let n=e.length,r=e[0].length,i=new ArrayBuffer(44+r*n*2),a=new DataView(i),o=(e,t)=>{for(let n=0;n<t.length;n++)a.setUint8(e+n,t.charCodeAt(n))};o(0,`RIFF`),a.setUint32(4,36+r*n*2,!0),o(8,`WAVE`),o(12,`fmt `),a.setUint32(16,16,!0),a.setUint16(20,1,!0),a.setUint16(22,n,!0),a.setUint32(24,t,!0),a.setUint32(28,t*n*2,!0),a.setUint16(32,n*2,!0),a.setUint16(34,16,!0),o(36,`data`),a.setUint32(40,r*n*2,!0);let s=44;for(let t=0;t<r;t++)for(let r=0;r<n;r++){let n=Math.max(-1,Math.min(1,e[r][t]));a.setInt16(s,n<0?n*32768:n*32767,!0),s+=2}return new Uint8Array(i)}var bd=[`wind`,`town`,`plant`,`steps`,`truck`,`life`,`room`],xd=(e,t=0)=>Number.isFinite(e)?e:t;function Sd(e,t=1){let n=e.createBuffer?e:{sampleRate:e.sampleRate,createBuffer:(e,t,n)=>new AudioBuffer({numberOfChannels:e,length:t,sampleRate:n})};return{white:ad(n,`white`,3,null,t+1),pink:ad(n,`pink`,6,24e3,t+2),brown:ad(n,`brown`,8,12e3,t+3),gustA:od(n,53,t+4,.35),gustB:od(n,37,t+5,.9)}}function Cd(e,{destination:t=null,seed:n=1,beds:r=null}={}){let i=Qu(n),a=r||Sd(e,n),o={},s=null,c=null,l=null,u=null,d=(t=1)=>{let n=e.createGain();return n.gain.value=t,n},f=(t,n,r=.707)=>{let i=e.createBiquadFilter();return i.type=t,i.frequency.value=n,i.Q.value=r,i},p=(t,n=1)=>{let r=e.createBufferSource();return r.buffer=t,r.loop=!0,r.playbackRate.value=n,r.start(0,i()*t.duration),r},m=(...e)=>{for(let t=0;t<e.length-1;t++)e[t].connect(e[t+1]);return e[e.length-1]},h=new WeakMap,g=(t,n,r=.25,i=1e-4)=>{n=xd(n,h.get(t)??t.value);let a=h.get(t);a!==void 0&&Math.abs(a-n)<=i*Math.max(1,Math.abs(n))||(h.set(t,n),t.setTargetAtTime(n,e.currentTime,r))},_=d(0),v=e.createDynamicsCompressor();v.threshold.value=-6,v.knee.value=3,v.ratio.value=12,v.attack.value=.004,v.release.value=.25,m(_,v,t||e.destination);let y={};for(let e of bd)y[e]=d(1),y[e].connect(_);let b=e.createConvolver();b.normalize=!1,b.buffer=_d(e,n+40);let x=d(1),S=d(1);m(x,b,y.room);let C=d(1),w=f(`lowpass`,1400);m(S,C,w);let T=[[.93,.42],[1.71,.3],[2.64,.22]].map(([t,n])=>{let r=e.createDelay(4);r.delayTime.value=t;let i=d(n);return m(w,r,i),i.connect(y.room),i.connect(x),{dl:r,g:i}}),E=d(1.2);m(T[2].g,E,C);let D={};D.out=d(1),D.pan=e.createStereoPanner(),m(D.out,D.pan,y.wind),D.gustA=p(a.gustA),D.gustB=p(a.gustB),D.bodyBP=f(`bandpass`,500,.55),D.bodyLP=f(`lowpass`,3e3),D.body=d(0),m(p(a.pink),D.bodyBP,D.bodyLP,D.body,D.out),D.bodyDepth=d(0),m(D.gustA,D.bodyDepth,D.body.gain),D.bodyFDepth=d(0),m(D.gustA,D.bodyFDepth,D.bodyBP.frequency),D.lowLP=f(`lowpass`,140),D.low=d(0),m(p(a.brown),D.lowLP,D.low,y.wind),D.lowDepth=d(0),m(D.gustB,D.lowDepth,D.low.gain),D.wh1=f(`bandpass`,520,11),D.wh2=f(`bandpass`,780,14),D.whistle=d(0);let O=p(a.white);m(O,D.wh1,D.whistle),m(O,D.wh2,D.whistle),D.whistle.connect(D.out),D.whFDepth=d(0),m(D.gustB,D.whFDepth,D.wh1.frequency),D.whFDepth2=d(0),m(D.gustA,D.whFDepth2,D.wh2.frequency),D.whDepth=d(0),m(D.gustB,D.whDepth,D.whistle.gain),D.hissHP=f(`highpass`,3200),D.hissLP=f(`lowpass`,9e3),D.hiss=d(0),m(p(a.white,.97),D.hissHP,D.hissLP,D.hiss,D.out),D.hissDepth=d(0),m(D.gustA,D.hissDepth,D.hiss.gain),D.flakeBP=f(`bandpass`,2600,.5),D.flake=d(0),m(p(a.pink,1.3),D.flakeBP,D.flake,y.wind);let k={};k.lp=f(`lowpass`,320),k.hp=f(`highpass`,30),k.bed=d(0),m(p(a.brown,.8),k.hp,k.lp,k.bed,y.town),k.depth=d(0),m(D.gustB,k.depth,k.bed.gain);let A={};A.panner=new PannerNode(e,{panningModel:`equalpower`,distanceModel:`linear`,rolloffFactor:0,refDistance:1,maxDistance:1e6}),A.air=f(`lowpass`,2e3),A.gain=d(0),A.mix=d(1),m(A.mix,A.air,A.gain,A.panner,y.plant),m(p(a.brown,.6),f(`lowpass`,190),d(.9),A.mix);for(let[t,n]of[[100,.22],[200,.1],[300,.05],[400,.02]]){let r=e.createOscillator();r.frequency.value=t*(1+(i()-.5)*.002),m(r,d(n),A.mix),r.start()}let j=e.createOscillator();j.frequency.value=.27,m(j,d(.18),A.mix.gain),j.start();let M=d(0),N=d(0);m(y.steps,M,x),m(y.steps,N,S);let P=null;y.truck.gain.value=.26;let F=d(.06),I=d(0);y.truck.connect(F),F.connect(x),y.truck.connect(I),I.connect(S);function L(){let t={};t.panner=new PannerNode(e,{panningModel:`equalpower`,distanceModel:`inverse`,refDistance:16,rolloffFactor:1,maxDistance:2e4}),t.out=d(0),m(t.out,t.panner,y.truck),t.fire=e.createConstantSource(),t.fire.offset.value=60,t.osc=e.createOscillator(),t.osc.setPeriodicWave(vd(e,n+7)),t.osc.frequency.value=0,t.fire.connect(t.osc.frequency),t.lump=e.createOscillator(),t.lump.frequency.value=0,m(t.fire,d(1/12),t.lump.frequency),t.fireG=d(.5),t.lumpDepth=d(.1),m(t.lump,t.lumpDepth,t.fireG.gain),t.engLP=f(`lowpass`,600,1.1),t.eng=d(1),m(t.osc,t.fireG,t.engLP,t.eng,t.out),t.sub=e.createOscillator(),t.sub.type=`triangle`,t.sub.frequency.value=0,m(t.fire,d(.5),t.sub.frequency),t.subG=d(.4),m(t.sub,t.subG,t.fireG),t.osc2=e.createOscillator(),t.osc2.frequency.value=0,t.fire.connect(t.osc2.frequency),t.clkBP=f(`bandpass`,1900,.9),t.clkAM=d(.1),t.clkDepth=d(.1),m(t.osc2,t.clkDepth,t.clkAM.gain),m(p(a.white),t.clkBP,t.clkAM,t.out),t.exhLP=f(`lowpass`,200),t.exh=d(0),m(p(a.brown,1.4),t.exhLP,t.exh,t.out),t.whine=e.createOscillator(),t.whine.type=`sawtooth`,t.whine.frequency.value=300,t.whBP=f(`bandpass`,300,7),t.wh=d(0),m(t.whine,t.whBP,t.wh,t.out),t.churnBP=f(`bandpass`,900,1.5),t.churn=d(0),m(p(a.pink,1.1),t.churnBP,t.churn,t.out),t.tyreBP=f(`bandpass`,300,.6),t.tyre=d(0),m(p(a.pink,.9),t.tyreBP,t.tyre,t.out),t.hoist=e.createOscillator(),t.hoist.type=`sawtooth`,t.hoist.frequency.value=250,t.hoBP=f(`bandpass`,250,5),t.ho=d(0),m(t.hoist,t.hoBP,t.ho,t.out),t.ev=d(1),t.ev.connect(t.panner);for(let e of[t.fire,t.osc,t.sub,t.lump,t.osc2,t.whine,t.hoist])e.start();return t}function R(e,t){g(e.out.gain,0,.3);let n=t+2;for(let t of[e.fire,e.osc,e.sub,e.lump,e.osc2,e.whine,e.hoist])try{t.stop(n)}catch{}z(()=>{try{e.panner.disconnect()}catch{}},2200)}let z=(t,n)=>{typeof setTimeout==`function`&&!(e instanceof OfflineAudioContext)&&setTimeout(t,n)};function B(t,n,r,i,a,o=1){let s=e.createBufferSource();s.buffer=t,s.playbackRate.value=o;let c=d(r);if(i!=null){let t=e.createStereoPanner();t.pan.value=Math.max(-1,Math.min(1,i)),m(s,c,t,a)}else m(s,c,a);return s.start(n),s}return{ac:e,bus:y,master:_,limiter:v,get truckOn(){return!!P},warm(t){t===`squeak`?s||=pd(e,6,n+200):t===`ore`?c||=md(e,3,n+300):t===`slide`?l||=hd(e,n+301):t===`clank`?u||=gd(e,n+302):o[t]=o[t]||dd(e,t,6,n+100)},setMaster(e,t=.06){g(_.gain,e,t)},apply(e){g(D.body.gain,e.windBody,.6),g(D.bodyDepth.gain,e.windBody*e.windGust,.6),g(D.bodyBP.frequency,e.windBodyF,.8),g(D.bodyFDepth.gain,e.windBodyF*.35*e.windGust,.8),g(D.bodyLP.frequency,e.windLP,.6),g(D.low.gain,e.windLow,.6),g(D.lowDepth.gain,e.windLow*.8,.6),g(D.whistle.gain,e.windWhistle,.8),g(D.whDepth.gain,e.windWhistle*.9,.8),g(D.wh1.frequency,e.windWhistleF,1),g(D.wh2.frequency,e.windWhistleF*1.47,1),g(D.whFDepth.gain,e.windWhistleF*.3,1),g(D.whFDepth2.gain,e.windWhistleF*.4,1),g(D.hiss.gain,e.windHiss,.6),g(D.hissDepth.gain,e.windHiss*.9,.6),g(D.flake.gain,e.flakes,1.5),g(D.pan.pan,Math.max(-.6,Math.min(.6,e.windPan)),.25,.01),g(k.bed.gain,e.traffic,1.2),g(k.depth.gain,e.traffic*.35,1.2),g(k.lp.frequency,e.trafficLP,1),g(A.gain.gain,e.plant,.8),g(A.air.frequency,e.plantLP,.8),g(M.gain,e.yardSend,.4),g(N.gain,e.pitSend*.6,.6),g(I.gain,e.pitSend*.15,.6)},placePlant(t,n,r){let i=e.currentTime;A.panner.positionX.setValueAtTime(t,i),A.panner.positionY.setValueAtTime(n,i),A.panner.positionZ.setValueAtTime(r,i)},listen(t,n,r,i,a,o,s,c,l){let u=e.listener,d=e.currentTime,f=.03;u.positionX?(u.positionX.setTargetAtTime(xd(t),d,f),u.positionY.setTargetAtTime(xd(n),d,f),u.positionZ.setTargetAtTime(xd(r),d,f),u.forwardX.setTargetAtTime(xd(i),d,f),u.forwardY.setTargetAtTime(xd(a),d,f),u.forwardZ.setTargetAtTime(xd(o,-1),d,f),u.upX.setTargetAtTime(xd(s),d,f),u.upY.setTargetAtTime(xd(c,1),d,f),u.upZ.setTargetAtTime(xd(l),d,f)):(u.setPosition(xd(t),xd(n),xd(r)),u.setOrientation(xd(i),xd(a),xd(o,-1),xd(s),xd(c,1),xd(l)))},step(t,r,{level:a=.5,pan:c=0,squeak:l=0,squeakRate:u=1,rate:d=1}={}){o[t]||(o[t]=dd(e,t,6,n+100));let f=o[t][i()*o[t].length|0];if(B(f,r,a*(.85+.3*i()),c,y.steps,d*(.94+.12*i())),l>.02){s||=pd(e,6,n+200);let t=s[i()*s.length|0];B(t,r+.005,a*l*(.45+.35*i()),c,y.steps,u*(.92+.16*i()))}},truck(t){let n=e.currentTime;if(t&&!P)P=L(),P.fire.offset.setValueAtTime(12,n),P.fire.offset.linearRampToValueAtTime(18,n+.7),P.fire.offset.setTargetAtTime(95,n+.75,.12),P.fire.offset.setTargetAtTime(60,n+1.3,.35),P.out.gain.setValueAtTime(0,n),P.out.gain.linearRampToValueAtTime(.5,n+.15),P.out.gain.setTargetAtTime(1,n+.8,.2),h.set(P.out.gain,1),P.startT=n+1.8;else if(!t&&P){let e=P;P=null,R(e,n)}},drive(t){let n=P;if(!n)return;let r=e.currentTime;r>n.startT&&g(n.fire.offset,t.rpm/10,.12,.002);let i=t.load,a=t.retard;g(n.fireG.gain,(.3+.7*i)*(1-.75*a),.12),g(n.lumpDepth.gain,.06*(1-.5*i),.3),g(n.engLP.frequency,220+1600*i+t.rpm*.35,.12),g(n.eng.gain,.8+.25*t.cargo,.3),g(n.subG.gain,.3+.35*i+.15*t.cargo,.2),g(n.clkAM.gain,.03+.07*i,.12),g(n.clkDepth.gain,.03+.07*i,.12),g(n.exh.gain,.05+.32*i+.2*a,.15),g(n.exhLP.frequency,140+260*i+220*a,.15);let o=Math.abs(t.speed)/t.scale;g(n.whine.frequency,180+60*o,.2),g(n.whBP.frequency,180+60*o,.2),g(n.wh.gain,.05*a,.25),g(n.churnBP.frequency,500+70*o,.3),g(n.churn.gain,.09*a,.25);let s=Math.min(1,Math.abs(t.speed)/32);g(n.tyre.gain,.16*s**1.3,.2),g(n.tyreBP.frequency,220+500*s,.2),g(n.hoist.frequency,t.rpm/60*9,.1),g(n.hoBP.frequency,t.rpm/60*9,.1),g(n.ho.gain,t.hoist*.1,.15);let c=n.panner;c.positionX.setTargetAtTime(xd(t.x),r,.03),c.positionY.setTargetAtTime(xd(t.y),r,.03),c.positionZ.setTargetAtTime(xd(t.z),r,.03)},truckEvent(t,r){let a=P;a&&(t===`drop`?(c||=md(e,3,n+300),B(c[i()*c.length|0],r,1.2,null,a.ev,.92+.16*i())):t===`slide`?(l||=hd(e,n+301),B(l,r,2,null,a.ev)):t===`clank`&&(u||=gd(e,n+302),B(u,r,1,null,a.ev)))},pass(t,{level:n=.1,dur:r=5,from:o=-.8,to:s=.8,f:c=400}={}){let l=e.createBufferSource();l.buffer=a.pink,l.loop=!0;let u=f(`bandpass`,c,.7),p=d(0),h=e.createStereoPanner();m(l,u,p,h,y.town),p.gain.setValueAtTime(0,t),p.gain.setTargetAtTime(n,t,r*.25),p.gain.setTargetAtTime(0,t+r*.55,r*.18),h.pan.setValueAtTime(o,t),h.pan.linearRampToValueAtTime(s,t+r),u.frequency.setValueAtTime(c*1.15,t),u.frequency.linearRampToValueAtTime(c*.85,t+r),l.start(t,i()*5),l.stop(t+r*1.4)},bird(t,{level:n=.05,pan:r=0,kind:a=0,dist:o=30}={}){let s=d(n*Math.min(1,20/o)),c=f(`lowpass`,12e3/(1+o/150)),l=e.createStereoPanner();l.pan.value=Math.max(-1,Math.min(1,r)),m(s,c,l,y.life);let u=a===0?[[0,.16,5200,6900,5600]]:Array.from({length:4+(i()*4|0)},(e,t)=>{let n=5200-t*260+i()*300;return[t*.11,.07,n*1.1,n*.85,n*.9]}),p=t;for(let[n,r,i,a,o]of u){let c=t+n,l=e.createOscillator(),u=d(0);l.frequency.setValueAtTime(i,c),l.frequency.linearRampToValueAtTime(a,c+r*.45),l.frequency.linearRampToValueAtTime(o,c+r),u.gain.setValueAtTime(0,c),u.gain.linearRampToValueAtTime(1,c+r*.2),u.gain.setTargetAtTime(0,c+r*.6,r*.12),m(l,u,s),l.start(c),l.stop(c+r+.1),p=c+r}return p},mosquito(t,{level:n=.04,f:r=450,dur:a=3,from:o=-1,to:s=1}={}){let c=e.createOscillator();c.type=`sawtooth`;let l=f(`lowpass`,2600,.8),u=d(0),p=e.createStereoPanner(),h=e.createOscillator();h.frequency.value=5+i()*4;let g=d(r*.012);m(h,g,c.frequency),m(c,l,u,p,y.life),c.frequency.setValueAtTime(r*1.025,t),c.frequency.linearRampToValueAtTime(r*.975,t+a),u.gain.setValueAtTime(0,t),u.gain.linearRampToValueAtTime(n*.3,t+a*.3),u.gain.linearRampToValueAtTime(n,t+a*.5),u.gain.linearRampToValueAtTime(0,t+a),p.pan.setValueAtTime(o,t),p.pan.linearRampToValueAtTime(s,t+a),c.start(t),h.start(t),c.stop(t+a+.05),h.stop(t+a+.05)}}}var wd={OPEN:0,WATER:1,ROAD:2,TAIGA:3,PIT:4,SPOIL:5,GRAVEL:6,RUNWAY:7,PAD:8,YARD:9},Td=[1,.28,.05,.02],Ed=10,Dd=100,Od=2200;function kd(e){let{terrain:t,pit:n}=e,r=performance.now(),i=t.ox,a=t.oz,o=t.W*t.cell,s=t.H*t.cell,c=t.splatTex?.image?.data||null,l=Math.ceil(o/Ed),u=Math.ceil(s/Ed),d=new Uint8Array(l*u),f=e.data?.allBuildings||e.data?.buildings||[],p=0;for(let e of f){let t=e.rings?.[0];if(!t||t.length<3)continue;let n=Math.min(255,Math.max(3,e.height||3*(e.levels||1))),r=1/0,o=-1/0,s=1/0,c=-1/0;for(let[e,n]of t)r=Math.min(r,e),o=Math.max(o,e),s=Math.min(s,n),c=Math.max(c,n);let f=Math.max(0,Math.floor((r-i)/Ed)),m=Math.min(l-1,Math.floor((o-i)/Ed)),h=Math.max(0,Math.floor((s-a)/Ed)),g=Math.min(u-1,Math.floor((c-a)/Ed)),_=!1;for(let e=h;e<=g;e++){let r=a+(e+.5)*Ed;for(let a=f;a<=m;a++){if(!Ad(t,i+(a+.5)*Ed,r))continue;let o=e*l+a;n>d[o]&&(d[o]=n),_=!0}}if(!_){let e=Math.floor(((r+o)/2-i)/Ed),t=Math.floor(((s+c)/2-a)/Ed);e>=0&&t>=0&&e<l&&t<u&&(d[t*l+e]=Math.max(d[t*l+e],n))}p++}let m=(e,t)=>{let n=Math.floor((e-i)/Ed),r=Math.floor((t-a)/Ed);return n<0||r<0||n>=l||r>=u?0:d[r*l+n]},h=Math.ceil(o/Dd),g=Math.ceil(s/Dd),_=new Float32Array(h*g);for(let t of e.data?.roads||[]){let e=Td[t.klass]??.05,n=t.np,r=t.pos;for(let t=1;t<n;t++){let o=(r[(t-1)*3]+r[(n+t-1)*3])/2,s=(r[(t-1)*3+2]+r[(n+t-1)*3+2])/2,c=(r[t*3]+r[(n+t)*3])/2,l=(r[t*3+2]+r[(n+t)*3+2])/2,u=Math.hypot(c-o,l-s),d=Math.floor(((o+c)/2-i)/Dd),f=Math.floor(((s+l)/2-a)/Dd);d>=0&&f>=0&&d<h&&f<g&&(_[f*h+d]+=e*u)}}let v=new Float32Array(h*g),y=Math.ceil(Od/Dd),b=[];for(let e=0;e<_.length;e++)_[e]>0&&b.push(e);for(let e of b){let t=e%h,n=e/h|0,r=_[e];for(let e=Math.max(0,n-y);e<=Math.min(g-1,n+y);e++)for(let i=Math.max(0,t-y);i<=Math.min(h-1,t+y);i++){let a=Math.hypot(i-t,e-n)*Dd;a>Od||(v[e*h+i]+=r/Math.max(60,a))}}let x=0;for(let e=0;e<v.length;e++)x=Math.max(x,v[e]);for(let e=0;e<v.length;e++)v[e]=x>0?v[e]/x:0;let S=(e,t)=>{let n=(e-i)/Dd-.5,r=(t-a)/Dd-.5,o=Math.max(0,Math.min(h-2,Math.floor(n))),s=Math.max(0,Math.min(g-2,Math.floor(r))),c=Math.max(0,Math.min(1,n-o)),l=Math.max(0,Math.min(1,r-s)),u=v[s*h+o],d=v[s*h+o+1],f=v[(s+1)*h+o],p=v[(s+1)*h+o+1];return(u+(d-u)*c)*(1-l)+(f+(p-f)*c)*l},C=(e,n)=>{if(!c)return wd.OPEN;let r=Math.floor((e-i)/t.cell),o=Math.floor((n-a)/t.cell);return r<0||o<0||r>=t.W||o>=t.H?wd.OPEN:c[o*t.W+r]},w=Array.from({length:12},(e,t)=>[Math.cos(t/12*2*Math.PI),Math.sin(t/12*2*Math.PI)]),T=n?.rimM??null,E=n?n.diameterM/2:0,D={buildMs:0,buildings:p,classAt:C,trafficAt:S,hAt:m,shelter(e,t,n,r){let i=0;for(let[a,o]of w)for(let s=8;s<=90;s+=8){let c=m(e+a*s,t+o*s);if(c<4)continue;let l=c-Math.max(0,n-r);if(l<=0)break;i+=Math.min(1,l/12)*Math.max(0,1.2-s/75);break}return Math.min(1,i/12*1.25)},lift(e,n,r){let i=0;for(let[r,a]of w)i+=t.heightAt(e+r*160,n+a*160);return Math.max(-1,Math.min(1,(r-i/12)/25))},pitDepth(e,t,r){return!n||T===null||Math.hypot(e-n.x,r-n.z)>E*1.02?0:Math.max(0,Math.min(1,(T-t)/n.depthM))},near(e,t,n,r=15){let i=0;for(let a=-3;a<=3;a++)for(let o=-3;o<=3;o++)C(e+o*r,t+a*r)===n&&i++;return i/49},flatness(e,n){let r=t.heightAt(e+2,n)-t.heightAt(e-2,n),i=t.heightAt(e,n+2)-t.heightAt(e,n-2);return 1/Math.sqrt(1+(r/4)**2+(i/4)**2)}};return D.buildMs=performance.now()-r,D}function Ad(e,t,n){let r=!1;for(let i=0,a=e.length-1;i<e.length;a=i++){let[o,s]=e[i],[c,l]=e[a];s>n!=l>n&&t<(c-o)*(n-s)/(l-s)+o&&(r=!r)}return r}var jd=[.12,.08,.06,.05,.06,.12,.3,.65,1,.8,.7,.72,.8,.75,.72,.75,.85,1,.9,.65,.5,.38,.26,.18];function Md(e){let t=(e/60%24+24)%24,n=Math.floor(t),r=t-n;return jd[n]*(1-r)+jd[(n+1)%24]*r}function Nd(e,t,n,r,i){let a=t*Math.max(0,Math.min(1,(r-.62)/.28));e===wd.WATER&&(a=0);let o=i<a*1.15;if(e===wd.WATER)return t>.5?`ice`:`water`;if(o)return e===wd.ROAD||e===wd.RUNWAY?`packed`:e===wd.TAIGA?`snowDeep`:n<-4?`snowCold`:`snowSoft`;switch(e){case wd.ROAD:case wd.RUNWAY:return`asphalt`;case wd.TAIGA:return`litter`;case wd.PIT:case wd.SPOIL:case wd.GRAVEL:return`gravel`;case wd.PAD:return`concrete`;case wd.YARD:return`dirt`;default:return t>.3?`dirt`:`grass`}}function Pd(e){return Math.max(0,Math.min(1,(-7-e)/8))}var Fd=`
class Tap extends AudioWorkletProcessor {
  constructor(o) {
    super();
    this.n = o.numberOfInputs; this.on = false;
    this.port.onmessage = (e) => {
      const m = e.data;
      if (m.cmd === 'start') {
        this.on = true; this.cnt = 0; this.left = m.frames;
        this.sq = new Float64Array(this.n); this.pk = new Float64Array(this.n);
        this.rec = m.record ? [[], []] : null;
      }
    };
  }
  process(inputs) {
    if (!this.on) return true;
    let len = 128;
    for (let k = 0; k < this.n; k++) {
      const inp = inputs[k];
      if (!inp || !inp.length) continue;
      len = inp[0].length;
      let s = 0, p = this.pk[k];
      for (let c = 0; c < inp.length; c++) {
        const ch = inp[c];
        for (let i = 0; i < ch.length; i++) { const v = ch[i]; s += v * v; const a = v < 0 ? -v : v; if (a > p) p = a; }
      }
      this.sq[k] += s / inp.length; this.pk[k] = p;
    }
    if (this.rec) {
      const m = inputs[0];
      const l = m && m[0] ? m[0] : new Float32Array(len);
      const r = m && m[1] ? m[1] : l;
      this.rec[0].push(l.slice()); this.rec[1].push(r.slice());
    }
    this.cnt += len;
    if (this.cnt >= this.left) {
      this.on = false;
      this.port.postMessage({ sq: Array.from(this.sq), pk: Array.from(this.pk), n: this.cnt, rec: this.rec });
      this.rec = null;
    }
    return true;
  }
}
registerProcessor('mirny-tap', Tap);
`,Id=null;async function Ld(e,t=3,{record:n=!1,rate:r=32e3}={}){let i=e.ac;if(!Id){let e=URL.createObjectURL(new Blob([Fd],{type:`text/javascript`}));Id=i.audioWorklet.addModule(e)}await Id;let a=[`master`,...bd],o=new AudioWorkletNode(i,`mirny-tap`,{numberOfInputs:a.length,numberOfOutputs:1,outputChannelCount:[1]}),s=i.createGain();s.gain.value=0,o.connect(s),s.connect(i.destination),e.limiter.connect(o,0,0),bd.forEach((t,n)=>e.bus[t].connect(o,0,n+1));let c=new Promise(e=>{o.port.onmessage=t=>e(t.data)});o.port.postMessage({cmd:`start`,frames:Math.round(t*i.sampleRate),record:n});let l=await c;e.limiter.disconnect(o);for(let t of bd)e.bus[t].disconnect(o);o.disconnect(),s.disconnect();let u=e=>e>0?+(10*Math.log10(e)).toFixed(1):-1/0,d={sec:+(l.n/i.sampleRate).toFixed(2),sampleRate:i.sampleRate,dbfs:{},peak:{}};if(a.forEach((e,t)=>{d.dbfs[e]=u(l.sq[t]/l.n),d.peak[e]=l.pk[t]>0?+(20*Math.log10(l.pk[t])).toFixed(1):-1/0}),n&&l.rec){let e=e=>{let t=e.reduce((e,t)=>e+t.length,0),n=new Float32Array(t),r=0;for(let t of e)n.set(t,r),r+=t.length;return n},t=e(l.rec[0]),n=e(l.rec[1]);r&&r!==i.sampleRate&&(t=Rd(t,i.sampleRate,r),n=Rd(n,i.sampleRate,r)),d.wav=yd([t,n],r||i.sampleRate)}return d}function Rd(e,t,n){let r=e.slice(),i=Math.tan(Math.PI*Math.min(.45*n,.49*t)/t),a=Math.SQRT1_2,o=1/(1+i/a+i*i),s=i*i*o,c=2*s,l=2*(i*i-1)*o,u=(1-i/a+i*i)*o,d=0,f=0,p=0,m=0;for(let e=0;e<r.length;e++){let t=s*r[e]+c*d+s*f-l*p-u*m;f=d,d=r[e],m=p,p=t,r[e]=t}let h=Math.floor(r.length*n/t),g=new Float32Array(h);for(let e=0;e<h;e++){let i=e*t/n,a=Math.floor(i),o=i-a;g[e]=r[a]*(1-o)+(r[a+1]??r[a])*o}return g}function zd(e){let t=``;for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode.apply(null,e.subarray(n,n+32768));return btoa(t)}var Bd=`mirny.audio.muted`,Vd=.1,Hd=2.5,Ud=600,Wd=2100,Gd=2250,Kd=[5.4,9.1,15.3],qd=(e,t,n)=>e<t?t:e>n?n:e,Jd=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-r/Math.max(.001,n)));function Yd(){try{return localStorage.getItem(Bd)===`1`}catch{return!1}}function Xd(e){try{localStorage.setItem(Bd,e?`1`:`0`)}catch{}}var Zd={id:`audio`,init(e){let{world:t,camera:n}=e;t.audio.muted=Yd(),t.audio.started=!1,t.audio.surface=null;let r=null,i=null,a=null,o=null,s=null,c=null,l=0,u=0,d={},f={rpm:Ud,load:0,retard:0,speed:0,cargo:0,hoist:0,scale:Hd,x:0,y:0,z:0},p={nextStep:null,foot:1,pitE:0,shelter:0,blizz:0,snowfall:0,v:0,y:null,acc:0,vy:0,gear:0,busy:``,truckWanted:!1,tr:0,hour:0,tree:0,water:0,agl:0,birdsOK:!1,mosq:0,mosqF:450,passRate:0},m={n:0,sum:0,max:0,ring:new Float32Array(600),k:0},h=e.ui.addGroup(`sound`,`звук`),g=document.createElement(`button`);h.appendChild(g);let _=e.ui.hudSlot(`audio`,{parent:`clock`}),v=()=>{let e=!t.audio.muted;g.textContent=e?`вкл`:`выкл`,g.classList.toggle(`on`,e),g.title=`m — звук ${e?`выключить`:`включить`} · весь звук синтезирован, это не записи`,(!e||!i)&&(_.textContent=``)},y=()=>{t.audio.muted=!t.audio.muted,Xd(t.audio.muted),v()};g.onclick=()=>y(),v(),addEventListener(`keydown`,e=>{e.target instanceof HTMLElement&&e.target.tagName===`INPUT`||e.ctrlKey||e.metaKey||e.altKey||e.repeat||(e.key.toLowerCase()===`m`||e.key.toLowerCase()===`ь`)&&y()});let b=e=>window.requestIdleCallback?requestIdleCallback(e,{timeout:3e3}):setTimeout(e,200);function x(){if(i||c)return i;try{r=new(window.AudioContext||window.webkitAudioContext)({latencyHint:`interactive`});let n=performance.now();a||=kd(e),i=Cd(r,{beds:o});let c=e.drive?.ramp?.plant;c&&i.placePlant(c.x,e.terrain.heightAt(c.x,c.z)+25,c.z),A.startMs=+(performance.now()-n).toFixed(1),t.audio.started=!0,s=null,l=0;let u=[`snowCold`,`packed`,`squeak`,`snowDeep`,`snowSoft`,`asphalt`,`gravel`,`dirt`,`grass`,`litter`,`concrete`,`ice`,`water`,`clank`,`slide`,`ore`],d=()=>{let e=u.shift();if(e){try{i.warm(e)}catch(t){console.error(`audio warm`,e,t)}b(d)}};b(d)}catch(e){c=String(e),A.error=c,console.error(`audio failed to start`,e)}return i}let S=()=>{x(),r&&r.state===`suspended`&&!document.hidden&&r.resume().catch(()=>{})};b(()=>{try{a||=kd(e)}catch(e){console.error(`audio probe`,e)}}),b(()=>{try{!o&&!i&&(o=Sd({sampleRate:48e3}))}catch{}}),addEventListener(`pointerdown`,S,{capture:!0}),addEventListener(`keydown`,S,{capture:!0}),document.addEventListener(`visibilitychange`,()=>{r&&(document.hidden?(i.setMaster(0,.02),setTimeout(()=>{document.hidden&&r.suspend().catch(()=>{})},120)):(r.resume().catch(()=>{}),s=null))});let C=new e.THREE.Vector3,w=new e.THREE.Vector3;function T(r){let i=n.position,o=t.weather,s=e.terrain.heightAt(i.x,i.z),c=Math.max(0,i.y-s);p.agl=c;let l=qd(1-(c-4)/220,0,1),u=a.pitDepth(i.x,i.y,i.z);p.pitE=u;let f=c<45?a.shelter(i.x,i.z,i.y,s):0;p.shelter=Jd(p.shelter,f,.6,Vd);let m=c<45?a.lift(i.x,i.z,s):0;p.blizz=Jd(p.blizz,+(o.resolved===`blizzard`),1.5,Vd),p.snowfall=Jd(p.snowfall,qd(o.snowfall||0,0,1),1.5,Vd);let h=p.snowfall*(1-p.blizz),g=(1-.72*p.shelter)*(1+.4*Math.max(0,m))*(1-.85*u),_=qd(o.windMs||0,0,40)*g*(1+.5*(1-l)),v=qd(_/16,0,1.6);p.windEff=_,d.windBody=.02+.55*v**1.4,d.windBodyF=260+650*v,d.windLP=(1300+4200*Math.min(v,1.2))*(1-.45*p.shelter)*(1-.3*h),d.windGust=.25+.5*l,d.windLow=.5*Math.max(0,v-.3)**1.5,d.windWhistle=.05*p.blizz*Math.min(v,1.3)+.02*p.shelter*Math.max(0,v-.45),d.windWhistleF=470+170*Math.min(v,1.3),d.windHiss=(.05*t.snow*Math.max(0,v-.45)+.07*p.blizz*Math.min(v,1.3))*l,d.flakes=.04*h*l;let y=o.windDir||0,b=-C.z,x=C.x,S=Math.hypot(b,x)||1;d.windPan=.45*((-Math.cos(y)*b-Math.sin(y)*x)/S)*(1-.7*p.shelter)*l;let w=a.trafficAt(i.x,i.z),T=Md(t.simMin)*(o.tempC<-40?.7:1);p.tr=w,p.hour=T;let E=1/(1+c/250),D=1-.93*u;d.traffic=(.006+.22*Math.sqrt(w*T))*E*D*(1-.45*h),d.trafficLP=(180+260*w)*(1-.35*h),p.passRate=.07*w*T*l*D;let O=e.drive?.ramp?.plant;if(O){let t=Math.hypot(i.x-O.x,i.y-e.terrain.heightAt(O.x,O.z)-25,i.z-O.z);d.plant=.13*Math.min(1,160/Math.max(t,80))*(1-.9*u)*(1-.3*h),d.plantLP=150+3200/(1+t/500),p.plantD=t}else d.plant=0,d.plantLP=500;d.yardSend=t.mode===`walk`?.04+.45*p.shelter:.04,d.pitSend=.9*qd((u-.12)/.45,0,1);let k=t.snow<.1;p.tree=c<80?a.near(i.x,i.z,wd.TAIGA,15):0,p.water=c<80?a.near(i.x,i.z,wd.WATER,20):0;let A=t.lake?.level;A!=null&&u>0&&i.y-A<60&&(p.water=Math.max(p.water,.5)),p.birdsOK=k&&t.sun.altitude>-5&&_<9&&p.blizz<.1&&u<.3&&c<80&&t.mode!==`drive`,p.birdRate=p.birdsOK?.015+.16*p.tree:0;let j=Math.exp(-(((t.doy-195)/22)**2));p.mosq=t.mode===`walk`&&k&&o.tempC>9&&_<3.5?j*qd(p.water*2+p.tree*.4,0,1):0,p.mosqF=qd(380+10*(o.tempC-12),330,620)}function E(t){let n=e.drive.state,a=n.speed||0;p.y===null&&(p.y=n.y,p.v=a);let o=t>0?(a-p.v)/t:0,s=t>0?(n.y-p.y)/t:0;p.v=a,p.y=n.y,p.acc=Jd(p.acc,qd(o,-15,15),.3,t),p.vy=Jd(p.vy,qd(s,-20,20),.3,t);let c=e.walk?.keys,l=!!c&&(c.has(`KeyW`)||c.has(`KeyS`)&&a<.5),u=p.acc*a+9.81*p.vy+.22*Math.abs(a),d=qd(u/14,0,1);l&&(d=Math.max(d,.35));let m=!l&&Math.abs(a)>3&&u<-2?qd(-u/12,0,1):0,h=0;n.busy===`tip`&&n.busyT<2&&(h=1,d=Math.max(d,.55)),n.busy&&(m=0),f.load=Jd(f.load,d,.18,t),f.retard=Jd(f.retard,m,.35,t),f.hoist=h;let g=Math.abs(a)/Hd,_=Wd*g/Kd[p.gear];_>1980&&p.gear<2?p.gear++:p.gear>0&&Wd*g/Kd[p.gear-1]<1500&&p.gear--,_=Wd*g/Kd[p.gear];let v=Ud+950*f.load*(1-Math.min(1,g/Kd[0])),y=Math.max(Ud,_+480*f.load,v);if(h&&(y=Math.max(y,1750)),y=Math.min(Gd,y),f.rpm=Jd(f.rpm,y,y>f.rpm?.22:.4,t),f.speed=a,f.cargo=n.cargo||0,f.x=n.x+Math.sin(n.yaw)*2.6,f.y=n.y+2.2,f.z=n.z+Math.cos(n.yaw)*2.6,f.gear=p.gear+1,n.busy!==p.busy){let e=r.currentTime,t=n.busyT||0;if(n.busy===`load`)for(let n of[.05,.62,1.18])i.truckEvent(`drop`,e+Math.max(0,n-t));n.busy===`tip`&&(i.truckEvent(`slide`,e+Math.max(0,1.95-t)),i.truckEvent(`clank`,e+Math.max(0,3.95-t))),p.busy=n.busy}}function D(){let n=(t.walkSpeed||0)/(e.walk?.speed||18),o=r.currentTime;if(t.mode!==`walk`||n<.05){p.nextStep=null;return}let s=n<=1?1.3+.6*n:1.9+1*Math.min(1,(n-1)/5);for((p.nextStep===null||p.nextStep<o)&&(p.nextStep=o+.04);p.nextStep<o+.12;){let r=e.walk.pos,o=Nd(a.classAt(r.x,r.z),t.snow,t.weather.tempC,a.flatness(r.x,r.z),Math.random());t.audio.surface=o;let c=o===`snowCold`||o===`packed`||o===`snowDeep`?Pd(t.weather.tempC):0;p.foot=-p.foot;let l=n>1.5;i.step(o,p.nextStep,{level:(l?.62:.48)*(1+.25*c),pan:p.foot*.14,squeak:c,squeakRate:1+.25*qd((-15-t.weather.tempC)/25,0,1),rate:l?1.08:1}),p.nextStep+=1/s*(.97+.06*Math.random())}}function O(){let e=r.currentTime;if(p.birdsOK&&Math.random()<p.birdRate*Vd){let t=15+Math.random()*80;i.bird(e+Math.random()*.1,{level:.05,pan:Math.random()*1.6-.8,dist:t,kind:Math.random()<.6?0:1})}if(p.mosq>0&&Math.random()<.25*p.mosq*Vd){let t=Math.random()<.5?-1:1;i.mosquito(e+.05,{level:.012+.02*Math.random(),f:p.mosqF*(.95+.1*Math.random()),dur:2+Math.random()*3,from:t,to:-t*(.3+.7*Math.random())})}if(Math.random()<p.passRate*Vd){let t=Math.random()*2-1;i.pass(e+.05,{level:.02+.07*Math.sqrt(p.tr*p.hour),dur:4+Math.random()*5,from:t,to:qd(-t+(Math.random()-.5)*.4,-1,1),f:260+Math.random()*380})}}function k(){if(t.audio.muted||!i){_.textContent=``;return}if(r.state!==`running`){_.textContent=`звук: нажмите, чтобы включить`;return}let e=`звук · синтез`;if(t.mode===`walk`&&t.audio.surface){let n={snowCold:`снег`,snowSoft:`мокрый снег`,snowDeep:`глубокий снег`,packed:`накат`,asphalt:`асфальт`,concrete:`бетон`,gravel:`щебень`,grass:`трава`,litter:`мох`,dirt:`грунт`,ice:`лёд`,water:`вода`},r=Pd(t.weather.tempC)>.3&&/snow|packed/i.test(t.audio.surface);e+=` · шаги: ${n[t.audio.surface]||t.audio.surface}${r?`, скрип`:``}`}else t.mode===`drive`&&(e+=` · ЯМЗ-240 ~${Math.round(f.rpm/50)*50} об/мин`);p.pitE>.4&&(e+=` · эхо карьера`),_.textContent=e}let A={get ac(){return r},get engine(){return i},get probe(){return a},params:d,truck:f,state:p,error:null,startMs:null,update(a,o){if(!i)return;let c=performance.now(),h=!!t.audio.muted;if(s!==h&&(i.setMaster(+!h,.06),s=h,v()),r.state!==`running`){u+=o,u>.5&&(u=0,k());return}n.getWorldDirection(C),w.set(0,1,0).applyQuaternion(n.quaternion);let g=n.position;i.listen(g.x,g.y,g.z,C.x,C.y,C.z,w.x,w.y,w.z),l+=o,l>=Vd&&(l=0,T(o),i.apply(d),O());let _=t.mode===`drive`&&e.drive?.active;_!==p.truckWanted&&(p.truckWanted=_,i.truck(_),p.y=null,p.busy=e.drive?.state?.busy||``),_&&(E(o),i.drive(f)),D(),t.mode!==`walk`&&(t.audio.surface=null),u+=o,u>.5&&(u=0,k());let y=performance.now()-c;m.n++,m.sum+=y,m.max=Math.max(m.max,y),m.ring[m.k++%m.ring.length]=y},start(){return x(),r?r.resume().then(()=>r.state):Promise.resolve(c)},perf(){let e=Math.min(m.n,m.ring.length),t=Array.from(m.ring.subarray(0,e)).sort((e,t)=>e-t);return{frames:m.n,mean:+(m.sum/Math.max(1,m.n)).toFixed(4),p95:+(t[Math.floor(e*.95)]||0).toFixed(4),max:+m.max.toFixed(3)}},resetPerf(){m.n=0,m.sum=0,m.max=0,m.k=0,m.ring.fill(0)},async levels(e=3){if(!i)throw Error(`audio not started`);return Ld(i,e)},async record(e=5,t=32e3){if(!i)throw Error(`audio not started`);let n=await Ld(i,e,{record:!0,rate:t});return n.wav=zd(n.wav),n},async bench(i=10,{truck:a=t.mode===`drive`,steps:o=t.mode===`walk`}={}){let s=r?r.sampleRate:48e3,c=new OfflineAudioContext(2,Math.round(s*i),s),l=Cd(c);l.setMaster(1,.01),l.apply(d);let u=e.drive?.ramp?.plant;u&&l.placePlant(u.x,e.terrain.heightAt(u.x,u.z)+25,u.z);let p=n.position;if(l.listen(p.x,p.y,p.z,0,0,-1,0,1,0),a&&(l.truck(!0),l.drive(f)),o)for(let e=.2;e<i;e+=.52)l.step(t.audio.surface||`snowCold`,e,{level:.5,squeak:.8});let m=performance.now();await c.startRendering();let h=performance.now()-m;return{sec:i,renderMs:+h.toFixed(1),load:+(h/(i*1e3)).toFixed(4),sampleRate:s}},layers:bd};return A}},Qd={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},$d=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},ef=new l(-1,1,1,-1,0,1),tf=new class extends v{constructor(){super(),this.setAttribute(`position`,new V([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new V([0,2,0,0,2,0],2))}},nf=class{constructor(e){this._mesh=new b(tf,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ef)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},rf=class extends $d{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof O?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=I.clone(e.uniforms),this.material=new O({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new nf(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},af=class extends $d{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},of=class extends $d{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},sf=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new H);this._width=n.width,this._height=n.height,t=new E(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:h}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new rf(Qd),this.copyPass.material.blending=0,this.timer=new N}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}af!==void 0&&(r instanceof af?n=!0:r instanceof of&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new H);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},cf=class extends $d{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ve}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},lf=2.2,uf={strengthDay:.35,strengthNight:.9,fogGain:.8,radius:.62,radiusFog:.22,thresholdK:1.5,thresholdFloor:.6,knee:.5,superGain:10,nightLift:lf,vignette:.12,dither:1,strength:null},df=[.59719,.076,.0284,.35458,.90834,.13383,.04823,.01566,.83777],ff=[1.60475,-.10208,-.00327,-.53108,1.10813,-.07276,-.07367,-.00605,1.07602];function pf(e){let[t,n,r,i,a,o,s,c,l]=e,u=a*l-o*c,d=-(n*l-r*c),f=n*o-r*a,p=t*u+i*d+s*f;return[u,d,f,-(i*l-s*o),t*l-s*r,-(t*o-i*r),i*c-s*a,-(t*c-s*n),t*a-i*n].map(e=>e/p)}var mf=e=>`mat3(${e.map(e=>e.toFixed(8)).join(`, `)})`,hf=`
uniform float uExp;
const mat3 PP_IN = ${mf(df)};
const mat3 PP_OUT = ${mf(ff)};
const mat3 PP_IN_INV = ${mf(pf(df))};
const mat3 PP_OUT_INV = ${mf(pf(ff))};
vec3 ppT( vec3 c ) {
  vec3 v = PP_IN * ( max( c, 0.0 ) * ( uExp / 0.6 ) );
  vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
  vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
  vec3 d = clamp( PP_OUT * ( a / b ), 0.0, 1.0 );
  return mix( pow( d, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), d * 12.92,
              vec3( lessThanEqual( d, vec3( 0.0031308 ) ) ) );
}
vec3 ppTinv( vec3 y, float xmax ) {
  y = clamp( y, 0.0, 1.0 );
  vec3 d = mix( pow( y * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), y * 0.0773993808,
                vec3( lessThanEqual( y, vec3( 0.04045 ) ) ) );
  vec3 x = clamp( PP_OUT_INV * d, 0.0, xmax );
  vec3 A = 0.983729 * x - 1.0;
  vec3 B = 0.4329510 * x - 0.0245786;
  vec3 C = 0.238081 * x + 0.000090537;
  vec3 v = ( -B - sqrt( max( B * B - 4.0 * A * C, 0.0 ) ) ) / ( 2.0 * A );
  return max( PP_IN_INV * v, 0.0 ) * ( 0.6 / uExp );
}`;function gf(e){let t=e?.mesh?.material;if(!t?.isShaderMaterial)return{status:()=>`sky material not found`,uniform:null};let n=`pending first compile`,r={value:0};t.uniforms.uPostMask=r;let i=t.onBeforeCompile;return t.onBeforeCompile=(e,r)=>{i?.call(t,e,r);let a=/void\s+main\s*\(\s*\)/;if(!a.test(e.fragmentShader)||!/\bvDir\b/.test(e.fragmentShader)||!/\buSun\b/.test(e.fragmentShader)){n=`sky shader changed shape; stars may bloom`;return}e.fragmentShader=`uniform float uPostMask;
`+e.fragmentShader.replace(a,`void ppSkyMain()`)+`
void main() {
  ppSkyMain();
  if ( uPostMask > 0.5 ) {
    vec3 ppC = gl_FragColor.rgb;
    float ppDisc = smoothstep( 0.9990, 0.99985, dot( normalize( vDir ), uSun ) );
    float ppOver = max( max( ppC.r, max( ppC.g, ppC.b ) ) - 1.0, 0.0 );
    gl_FragColor = vec4( min( ppC, vec3( 1.0 ) ), ppDisc * ( 1.0 + ppOver ) );
  }
}`,n=`ok`},t.needsUpdate=!0,{status:()=>n,uniform:r}}var _f=`
precision highp float;
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4( position.xy, 0.0, 1.0 ); }`,vf=`
precision highp float;
uniform sampler2D tSrc;
uniform vec2 uTexel;
uniform float uThreshold, uKnee, uSuper;
varying vec2 vUv;
${hf}
vec3 tap( vec2 o ) {
  vec4 t = texture2D( tSrc, vUv + uTexel * o );
  float a = min( t.a, 1.0 ); a *= a; a *= a; a *= a;
  vec3 y = min( t.rgb, vec3( 1.0 ) );
  vec3 c = ( ppTinv( y, 0.98 ) + max( t.rgb - 1.0, 0.0 ) * uSuper ) * a
         + y * max( t.a - 1.0, 0.0 ) * uSuper;
  c = min( c, vec3( 3.0e4 ) );
  float br = max( c.r, max( c.g, c.b ) );
  float rq = clamp( br - uThreshold + uKnee, 0.0, 2.0 * uKnee );
  rq = rq * rq / ( 4.0 * uKnee + 1e-5 );
  return c * ( max( rq, br - uThreshold ) / max( br, 1e-5 ) );
}
// The four taps sit on the centres of the four full-res pixels under this
// half-res pixel, so each is thresholded alone: a bilinear tap between pixels
// would average a one-pixel window (the overview) to a quarter and lose it.
void main() {
  vec3 s = tap( vec2( -0.5, -0.5 ) ) + tap( vec2( 0.5, -0.5 ) )
         + tap( vec2( -0.5,  0.5 ) ) + tap( vec2( 0.5,  0.5 ) );
  gl_FragColor = vec4( s * 0.25, 1.0 );
}`,yf=`
precision highp float;
uniform sampler2D tSrc;
uniform vec2 uTexel;
varying vec2 vUv;
vec3 s( float x, float y ) { return texture2D( tSrc, vUv + uTexel * vec2( x, y ) ).rgb; }
void main() {
  vec3 c = ( s( -1.0, -1.0 ) + s( 1.0, -1.0 ) + s( -1.0, 1.0 ) + s( 1.0, 1.0 ) ) * 0.125
         + ( s( -2.0, -2.0 ) + s( 2.0, -2.0 ) + s( -2.0, 2.0 ) + s( 2.0, 2.0 ) ) * 0.03125
         + ( s( 0.0, -2.0 ) + s( -2.0, 0.0 ) + s( 2.0, 0.0 ) + s( 0.0, 2.0 ) ) * 0.0625
         + s( 0.0, 0.0 ) * 0.125;
  gl_FragColor = vec4( c, 1.0 );
}`,bf=`
precision highp float;
uniform sampler2D tCoarse, tFine;
uniform vec2 uTexel;
uniform float uRadius;
varying vec2 vUv;
vec3 s( float x, float y ) { return texture2D( tCoarse, vUv + uTexel * vec2( x, y ) ).rgb; }
void main() {
  vec3 up = ( s( -1.0, -1.0 ) + s( 1.0, -1.0 ) + s( -1.0, 1.0 ) + s( 1.0, 1.0 )
            + 2.0 * ( s( 0.0, -1.0 ) + s( -1.0, 0.0 ) + s( 1.0, 0.0 ) + s( 0.0, 1.0 ) )
            + 4.0 * s( 0.0, 0.0 ) ) / 16.0;
  gl_FragColor = vec4( mix( texture2D( tFine, vUv ).rgb, up, uRadius ), 1.0 );
}`,xf=`
precision highp float;
uniform sampler2D tDiffuse, tBloom;
uniform float uBloom, uLift, uVignette, uDither, uAspect;
varying vec2 vUv;
${hf}
float ppHash( vec2 p ) { return fract( sin( dot( p, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 ); }
void main() {
  vec3 y = clamp( texture2D( tDiffuse, vUv ).rgb, 0.0, 1.0 );   // what the canvas shows
  float k = uLift;
  if ( uVignette > 0.0 ) {
    vec2 q = ( vUv - 0.5 ) * vec2( uAspect, 1.0 );
    k *= 1.0 - uVignette * smoothstep( 0.35, 1.05, length( q ) / length( vec2( uAspect, 1.0 ) * 0.5 ) );
  }
  vec3 b = uBloom > 0.0 ? texture2D( tBloom, vUv ).rgb * uBloom : vec3( 0.0 );
  if ( k != 1.0 || uBloom > 0.0 ) {
    vec3 l = ppTinv( y, 0.999 );
    y = clamp( y + ppT( l * k + b ) - ppT( l ), 0.0, 1.0 );
  }
  if ( uDither > 0.0 ) {
    vec2 p = gl_FragCoord.xy;
    y += uDither * ( ppHash( p ) + ppHash( p + 17.13 ) - 1.0 ) / 255.0;   // triangular
  }
  gl_FragColor = vec4( y, 1.0 );
}`;function Sf(e,t,n){return new e.RawShaderMaterial({vertexShader:_f,fragmentShader:t,uniforms:n,depthTest:!1,depthWrite:!1,blending:e.NoBlending})}var Cf=class extends $d{constructor(e,t,n){super(),this.THREE=e,this.draw=t,this.needsSwap=!1,this.strength=0,this.threshold=1,this.knee=.5,this.radius=.6,this.superGain=10,this.down=[],this.up=[],this.texture=null,this.prefilter=Sf(e,vf,{tSrc:{value:null},uTexel:{value:new e.Vector2},uExp:n,uThreshold:{value:1},uKnee:{value:.5},uSuper:{value:10}}),this.downMat=Sf(e,yf,{tSrc:{value:null},uTexel:{value:new e.Vector2}}),this.upMat=Sf(e,bf,{tCoarse:{value:null},tFine:{value:null},uTexel:{value:new e.Vector2},uRadius:{value:.6}}),this.quad=new nf(null)}setSize(e,t){let n=this.THREE;for(let e of[...this.down,...this.up])e.dispose();this.down=[],this.up=[];let r=Math.max(1,Math.round(e/2)),i=Math.max(1,Math.round(t/2));for(let e=0;e<6&&Math.min(r,i)>=4;e++){let e={type:n.HalfFloatType,depthBuffer:!1,magFilter:n.LinearFilter,minFilter:n.LinearFilter};this.down.push(new n.WebGLRenderTarget(r,i,e)),this.up.push(new n.WebGLRenderTarget(r,i,e)),r=Math.max(1,Math.round(r/2)),i=Math.max(1,Math.round(i/2))}this.srcW=e,this.srcH=t,this.texture=this.up.length>1?this.up[0].texture:this.down[0]?.texture??null}render(e,t,n){if(!(this.strength>0)||!this.down.length)return;let r=this.down.length,i=this.prefilter.uniforms;i.tSrc.value=n.texture,i.uTexel.value.set(1/this.srcW,1/this.srcH),i.uThreshold.value=this.threshold,i.uKnee.value=Math.max(.001,this.threshold*this.knee),i.uSuper.value=this.superGain,this.pass(e,this.prefilter,this.down[0]);for(let t=1;t<r;t++){let n=this.downMat.uniforms,r=this.down[t-1];n.tSrc.value=r.texture,n.uTexel.value.set(1/r.width,1/r.height),this.pass(e,this.downMat,this.down[t])}let a=this.down[r-1];for(let t=r-2;t>=0;t--){let n=this.upMat.uniforms;n.tCoarse.value=a.texture,n.tFine.value=this.down[t].texture,n.uTexel.value.set(1/a.width,1/a.height),n.uRadius.value=this.radius,this.pass(e,this.upMat,this.up[t]),a=this.up[t]}}pass(e,t,n){e.setRenderTarget(n),this.quad.material=t,this.draw(this.quad)}dispose(){for(let e of[...this.down,...this.up])e.dispose();this.prefilter.dispose(),this.downMat.dispose(),this.upMat.dispose(),this.quad.dispose()}},wf=class extends $d{constructor(e,t,n,r){super(),this.draw=t,this.bloom=n,this.uniforms={tDiffuse:{value:null},tBloom:{value:null},uExp:r,uBloom:{value:0},uLift:{value:1},uVignette:{value:0},uDither:{value:0},uAspect:{value:1}},this.material=Sf(e,xf,this.uniforms),this.quad=new nf(this.material)}render(e,t,n){let r=this.uniforms;r.tDiffuse.value=n.texture,r.tBloom.value=this.bloom.texture,r.uBloom.value=this.bloom.texture?Math.max(0,this.bloom.strength):0,r.uAspect.value=n.width/Math.max(1,n.height),e.setRenderTarget(this.renderToScreen?null:t),this.draw(this.quad)}dispose(){this.material.dispose(),this.quad.dispose()}},Tf=[wl,ql,Tu,Zu,Zd,{id:`post`,init(e){let{THREE:t,renderer:n,scene:r,camera:i,world:a,query:o}=e;if(o.get(`post`)===`0`)return{enabled:!1,reason:`?post=0`};if(!n.extensions.has(`EXT_color_buffer_float`)&&!n.extensions.has(`EXT_color_buffer_half_float`))return{enabled:!1,reason:`no renderable half-float colour buffer`};let s=()=>n.toneMapping===t.ACESFilmicToneMapping&&n.outputColorSpace===t.SRGBColorSpace;if(!s())return{enabled:!1,reason:`renderer output is not ACES + sRGB`};let c={...uf};for(let e of Object.keys(uf)){let t=o.get(`post.${e}`);t!==null&&t!==``&&(c[e]=+t)}let l=gf(e.sky),u=n.render,d={render:(e,t)=>u.call(n,e,t)},f=e=>e.render(d),p=Math.min(Math.max(0,+(o.get(`msaa`)??4)),n.capabilities.maxSamples||4),m=n.getDrawingBufferSize(new t.Vector2),h=new t.WebGLRenderTarget(m.x,m.y,{type:t.HalfFloatType,samples:p});h.texture.name=`post.scene`,h.texture.colorSpace=t.SRGBColorSpace;let g=new sf(n,h);for(let e of[g.renderTarget1,g.renderTarget2])e.isXRRenderTarget=!0;let _={value:n.toneMappingExposure},v=new cf(r,i),y=new Cf(t,f,_),b=new wf(t,f,y,_);g.addPass(v),g.addPass(y),g.addPass(b);let x=``,S=()=>{let e=n.getSize(new t.Vector2),r=n.getPixelRatio(),i=`${e.x}x${e.y}@${r}`;i!==x&&(x=i,g.setPixelRatio(r),g.setSize(e.x,e.y))};S();let C=e=>.2126*e.r+.7152*e.g+.0722*e.b,w={lift:1,strength:0,threshold:1,radius:c.radius,wd:0,fog:0},T={enabled:!0,knobs:c,state:w,composer:g,get sky(){return l.status()},passes:{render:v,bloom:y,output:b},NIGHT_LIFT:lf,update(t){let{sun:n,hemi:r,fill:i}=e.lights,a=(n.intensity*C(n.color)+r.intensity*C(r.color)+i.intensity*C(i.color))/Math.PI,o=Math.max(t.weather?.fog||0,t.weather?.iceFog||0),s=t.night||0;w.wd=a,w.fog=o,w.strength=c.strength??c.strengthDay+(c.strengthNight-c.strengthDay)*s+c.fogGain*o,w.threshold=Math.max(c.thresholdFloor,c.thresholdK*a),w.radius=Math.min(.92,c.radius+c.radiusFog*o),w.lift=c.nightLift**+s,y.strength=w.strength,y.threshold=w.threshold,y.knee=c.knee,y.radius=w.radius,y.superGain=c.superGain;let l=b.uniforms;l.uLift.value=w.lift,l.uVignette.value=c.vignette,l.uDither.value=c.dither,t.exposureLift=w.lift},render(){if(!T.enabled||!s())return!1;S(),_.value=n.toneMappingExposure;let e=n.info,t=e.render.frame;e.reset(),e.autoReset=!1,l.uniform&&(l.uniform.value=1);try{g.render(a.dt)}finally{l.uniform&&(l.uniform.value=0),e.autoReset=!0,e.render.frame=t+1}return!0},resize(){S()},sample(e,r){let i=new Uint16Array(4),a=g.readBuffer;return n.readRenderTargetPixels(a,e,a.height-1-r,1,1,i),Array.from(i,e=>t.DataUtils.fromHalfFloat(e))}};return T}}];function Ef(e){let t={},n=[];for(let r of Tf)try{let i=r.init(e)||{};t[r.id]=i,n.push(i)}catch(e){console.error(`feature ${r.id} failed to init`,e),t[r.id]={error:String(e)}}return{apis:t,update(e,t){for(let r of n)if(r.update)try{r.update(e,t)}catch(e){console.error(`feature update failed`,e),r.update=null}},render(){for(let e of n)if(e.render&&e.render())return!0;return!1},resize(e,t){for(let r of n)r.resize?.(e,t)}}}var Df=[`auto`,`clear`,`overcast`,`snow`,`blizzard`,`icefog`],Of=[`orbit`,`walk`,`drive`],kf=e=>{if(e==null||e===``)return null;let t=Number(e);return Number.isFinite(t)?t:null},Af=(e,t)=>{if(!e)return null;let n=e.split(`,`).map(kf);return n.length===t&&n.every(e=>e!==null)?n:null},jf=(e,t)=>String(+e.toFixed(t));function Mf(e){if(e===`dry`)return`dry`;let t=kf(e);return t!==null&&Number.isInteger(t)&&t>=2e3&&t<=2100?t:null}function Nf(e,{dates:t=8}={}){let n=new URLSearchParams(String(e||``).replace(/^#/,``)),r={},i=n.get(`m`);i&&/^[a-z0-9-]{1,32}$/.test(i)&&(r.m=i);let a=kf(n.get(`d`));a!==null&&Number.isInteger(a)&&a>=0&&a<t&&(r.d=a);let o=kf(n.get(`t`));o!==null&&o>=0&&o<1440&&(r.t=o);let s=n.get(`play`);(s===`1`||s===`0`)&&(r.play=s===`1`);let c=kf(n.get(`rate`));c!==null&&c>0&&c<=3600&&(r.rate=c);let l=n.get(`mode`);Of.includes(l)&&(r.mode=l);let u=n.get(`cam`),d=Af(u,6),f=Af(u,4),p=r.mode||(d?`orbit`:f?`walk`:null);if(p===`orbit`&&d)r.cam={pos:d.slice(0,3),target:d.slice(3)},r.mode=`orbit`;else if(p===`walk`&&f){let[e,t,n,i]=f;r.cam={x:e,z:t,yaw:n,pitch:Math.max(-1.4,Math.min(1.4,i))},r.mode=`walk`}let m=n.get(`wx`);Df.includes(m)&&(r.wx=m);let h=Mf(n.get(`lake`));return h!==null&&(r.lake=h),r}function Pf(e){let t=[];if(e.m&&t.push(`m=${e.m}`),e.d!==void 0&&t.push(`d=${e.d}`),e.t!==void 0&&t.push(`t=${Math.round(e.t)%1440}`),e.play!==void 0&&t.push(`play=${+!!e.play}`),e.rate!==void 0&&t.push(`rate=${jf(e.rate,1)}`),e.mode&&t.push(`mode=${e.mode}`),e.cam&&e.mode===`orbit`)t.push(`cam=${[...e.cam.pos,...e.cam.target].map(e=>jf(e,1)).join(`,`)}`);else if(e.cam&&e.mode===`walk`){let{x:n,z:r,yaw:i,pitch:a}=e.cam;t.push(`cam=${jf(n,1)},${jf(r,1)},${jf(i,3)},${jf(a,3)}`)}return e.wx&&t.push(`wx=${e.wx}`),e.lake!==void 0&&e.lake!==null&&t.push(`lake=${e.lake}`),t.join(`&`)}var Ff=e=>Object.keys(e).length>0,If=[{id:`voskhod`,name:`Восход над трубкой`,d:0,t:650,play:!0,rate:120,wx:`clear`,lake:2024,orbit:{target:`pit`,y:-170,az:327,dist:900,h:230}},{id:`noch`,name:`Полярная ночь`,d:0,t:555,play:!0,rate:60,wx:`clear`,orbit:{target:[-250,0,-250],az:305,dist:1600,h:300}},{id:`tuman`,name:`Морозный туман`,d:0,t:700,play:!0,rate:60,wx:`icefog`,lake:2024,orbit:{target:`pit`,y:-260,az:318,dist:1250,h:420}},{id:`dvor`,name:`Двор в 17:30`,d:0,t:1050,play:!1,rate:60,wx:`auto`,walk:{eye:[260,-1180],at:[100,32,-1100]}},{id:`belaya`,name:`Белая ночь`,d:4,t:1410,play:!0,rate:60,wx:`clear`,lake:2024,orbit:{target:[-450,0,-900],az:154,dist:1500,h:230}},{id:`vesna`,name:`Весна`,d:3,t:1246,play:!0,rate:60,wx:`clear`,lake:2024,orbit:{target:[-600,0,-300],az:110,dist:1500,h:280}},{id:`sneg`,name:`Первый снег`,d:6,t:1050,play:!0,rate:60,wx:`snow`,lake:2024,orbit:{target:[-400,0,0],az:62,dist:1500,h:210}},{id:`belaz`,name:`За рулём БелАЗа`,d:1,t:780,play:!0,rate:60,wx:`clear`,lake:2024,drive:!0}],Lf=Math.PI/180;function Rf({target:e,y:t=0,az:n,dist:r,h:i},a=null,o=1){let[s,c,l]=e===`pit`?[a?a.x:0,t,a?a.z:0]:e,u=r*o;return{pos:[s+u*Math.sin(n*Lf),c+i*o,l-u*Math.cos(n*Lf)],target:[s,c,l]}}var zf=e=>Math.max(1,Math.sqrt(1.6/e));function Bf({eye:e,at:t},n){let[r,i]=e,[a,o,s]=t,c=n+1.72,l=a-r,u=s-i;return{x:r,z:i,yaw:Math.atan2(l,u),pitch:Math.atan2(o-c,Math.hypot(l,u))}}function Vf(e,{heightAt:t=()=>0,pit:n=null,aspect:r=1.6}={}){let i={d:e.d,t:e.t,play:e.play,rate:e.rate,wx:e.wx};return e.lake!==void 0&&(i.lake=e.lake),e.orbit?(i.mode=`orbit`,i.cam=Rf(e.orbit,n,zf(r))):e.walk?(i.mode=`walk`,i.cam=Bf(e.walk,t(...e.walk.eye))):e.drive&&(i.mode=`drive`),i}var Hf={d:0,t:630,play:!0,rate:300,orbit:{target:`pit`,y:-60,az:325,dist:1500,h:230}},Uf=180,Wf=15,Gf=.16,Kf=.22;function qf({camera:e,controls:t,target:n,az:r,dist:i,h:a,scale:o=()=>1,enabled:s=!0}){let c=new B(...n),l=new B,u=new B,d=[],f={active:!!s,placed:!1,reason:s?null:`disabled`,t0:null};function p(n){let s=2*Math.PI*n/Uf,d=(r+Wf*Math.sin(s))*(Math.PI/180),p=(1-Math.cos(s))/2,m=o(),h=i*m*(1-Gf*p),g=a*m*(1-Kf*p);t.target.copy(c),e.position.set(c.x+h*Math.sin(d),c.y+g,c.z-h*Math.cos(d)),e.lookAt(c),l.copy(e.position),u.copy(t.target),f.placed=!0}function m(e=`input`){if(f.active){f.active=!1,f.reason=e;for(let[e,t]of d)removeEventListener(e,t,!0);d.length=0}}let h=e=>e.metaKey||e.ctrlKey||e.altKey||/^(Meta|Control|Alt|Shift|CapsLock|Tab|Escape|F\d{1,2})$/.test(e.key||``);if(f.active)for(let e of[`pointerdown`,`wheel`,`keydown`,`touchstart`]){let t=t=>{(e!==`keydown`||!h(t))&&m(e)};d.push([e,t]),addEventListener(e,t,{capture:!0,passive:!0})}return{get active(){return f.active},get reason(){return f.reason},cancel:m,home(){p(0)},step(n){return f.active?f.placed&&(e.position.distanceToSquared(l)>.25||t.target.distanceToSquared(u)>.25)?(m(`camera moved`),!1):(f.t0===null&&(f.t0=n),p(n-f.t0),!0):!1}}}var Jf=`ui-monospace, SFMono-Regular, Menlo, monospace`;function Yf(e,t,n,r){let i=n/900,a=Math.round(22*i),o=[15,12,10].map(e=>Math.round(e*i)),s=o.map(e=>Math.round(e*1.55)),c=s.slice(0,r.length).reduce((e,t)=>e+t,0),l=c+a*2.4,u=e.createLinearGradient(0,n-l,0,n);u.addColorStop(0,`rgba(6,9,14,0)`),u.addColorStop(1,`rgba(6,9,14,0.55)`),e.fillStyle=u,e.fillRect(0,n-l,t,l),e.textBaseline=`alphabetic`,e.shadowColor=`rgba(0,0,0,0.7)`,e.shadowBlur=6*i;let d=n-a-c;r.forEach((t,n)=>{d+=s[n],e.font=`${n===0?600:400} ${o[n]}px ${Jf}`,e.fillStyle=n===0?`rgba(238,242,247,0.96)`:n===1?`rgba(238,242,247,0.86)`:`rgba(170,182,198,0.8)`,`letterSpacing`in e&&(e.letterSpacing=`${(n===0?.16:.06)*o[n]}px`),e.fillText(n===0?t.toUpperCase():t,a,d)})}function Xf(e){let t=document.createElement(`canvas`);t.width=32,t.height=20;let n=t.getContext(`2d`,{willReadFrequently:!0});n.drawImage(e,0,0,32,20);let r=n.getImageData(0,0,32,20).data,i=0;for(let e=0;e<r.length;e+=4)i+=.2126*r[e]+.7152*r[e+1]+.0722*r[e+2];return i/(r.length/4)}function Zf({canvas:e,render:t,lines:n,filename:r,download:i=!0}){t();let a=document.createElement(`canvas`);a.width=e.width,a.height=e.height;let o=a.getContext(`2d`);o.drawImage(e,0,0);let s=Xf(a);return Yf(o,a.width,a.height,n),new Promise(e=>{a.toBlob(t=>{if(t&&i){let e=document.createElement(`a`);e.href=URL.createObjectURL(t),e.download=r,document.body.appendChild(e),e.click(),e.remove(),setTimeout(()=>URL.revokeObjectURL(e.href),4e3)}e({blob:t,filename:r,width:a.width,height:a.height,luma:+s.toFixed(1)})},`image/png`)})}function Qf(e){let t=document.documentElement,n=()=>t.style.setProperty(`--bar-h`,`${Math.ceil(e.getBoundingClientRect().height)}px`);return n(),typeof ResizeObserver<`u`&&new ResizeObserver(n).observe(e),addEventListener(`resize`,n),n}function $f(e){let t=0;return(n,{ms:r=1800,selectable:i=!1}={})=>{e.textContent=n,e.classList.toggle(`sel`,i),e.classList.add(`show`),clearTimeout(t),t=setTimeout(()=>e.classList.remove(`show`),r)}}function ep(e,t){return document.body.classList.toggle(e,t)}async function tp(e){try{if(navigator.clipboard&&window.isSecureContext&&await Promise.race([navigator.clipboard.writeText(e).then(()=>!0,()=>!1),new Promise(e=>{setTimeout(()=>e(!1),1e3)})]))return!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.cssText=`position:fixed;left:-9999px;top:0;opacity:0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}var np=[[11,21,`зимнее солнцестояние`],[1,21,`конец февраля`],[2,21,`равноденствие`],[4,3,`сход снега`],[5,21,`летнее солнцестояние`],[7,20,`конец лета`],[8,25,`первый снег`],[9,20,`ледостав`]],rp=e=>document.getElementById(e),ip=(e,t=1)=>e.toFixed(t).replace(`.`,`,`).replace(`-`,`−`),ap=rp(`stats`),op=rp(`clock`).querySelector(`b`),sp=rp(`sunstate`),cp=rp(`pit`),lp=rp(`keys`),up=rp(`building`),dp=`/mirny/`;async function fp(e,t){let n=e.endsWith(`.bin`),r=await fetch(`${dp}real/${e}${n?`.gz`:``}`,{cache:n?`default`:`no-store`});if(!r.ok)throw Error(`${e}: ${r.status}`);let i=n?r.body.pipeThrough(new DecompressionStream(`gzip`)):null;return i?new Response(i).arrayBuffer():t===`json`?r.json():r.arrayBuffer()}function pp(e,t,n){let r=!1;for(let i=0,a=e.length-1;i<e.length;a=i++){let[o,s]=e[i],[c,l]=e[a];s>n!=l>n&&t<(c-o)*(n-s)/(l-s)+o&&(r=!r)}return r}function mp(e,t,n){for(let r of e){let e=r.rings[0];if(!e?.length)continue;r._inspectBounds||=[Math.min(...e.map(e=>e[0])),Math.min(...e.map(e=>e[1])),Math.max(...e.map(e=>e[0])),Math.max(...e.map(e=>e[1]))];let i=r._inspectBounds;if(!(t<i[0]||n<i[1]||t>i[2]||n>i[3])&&pp(e,t,n)&&!r.rings.slice(1).some(e=>pp(e,t,n)))return r}return null}function hp(e){let t=e?.catalog;if(!t)return`building catalog unavailable`;let n=t.attributes||{},r=e=>{let t=n[e];return t?`${Array.isArray(t.value)?t.value.join(`, `):t.value} · ${t.source} · c${Number(t.confidence).toFixed(2)}`:`—`},i=t.address?`${t.address.street} ${t.address.number}`:`no address`,a=t.issues?.length?`\nissues  ${t.issues.map(e=>e.code).join(`, `)}`:``;return`${t.id}\n${i}${t.name?` · ${t.name}`:``}\ntype     ${t.buildingType||`—`}\nheight   ${r(`heightM`)}\nlevels   ${r(`levels`)}\nclass    ${r(`renderClass`)}\nmaterial ${r(`wallMaterial`)}\nfinish   ${r(`finish`)}\nwall     ${r(`wallTint`)}\nroof     ${r(`roofShape`)} / ${r(`roofTint`)}\nsections ${r(`registerEntranceSections`)} / ${r(`inferredEntranceSections`)}\ndoors    ${r(`mappedDoorCount`)} · ${t.rendered?.porches??0} rendered porches\nparts    ${t.parts?.length||0}${a}`}var gp=new URLSearchParams(location.search),_p=(e,t)=>gp.has(e)?+gp.get(e):t;async function vp(){if(!M(ap))return;ap.textContent=`загрузка рельефа…`;let e=await fp(`manifest.json`,`json`),[t,n,r,i,a,s,c,l,u,d]=await Promise.all([fp(`meta.json`),fp(`ground.bin`),fp(`splat.bin`),fp(`ao.bin`),fp(`buildings.bin`),fp(`roads.bin`),fp(`trees.bin`),fp(`infra.bin`),fp(`landmarks.json`),gp.has(`inspect`)?fp(`buildings.json`):Promise.resolve(null)]),h={"meta.json":t,"ground.bin":n,"splat.bin":r,"ao.bin":i,"buildings.bin":a,"roads.bin":s,"trees.bin":c,"infra.bin":l,"landmarks.json":u};d&&(h[`buildings.json`]=d),await Wc(e,h);let g=e=>JSON.parse(new TextDecoder().decode(e)),_=g(t),v=d?g(d):null,y=g(u),x=new te,S=new T({antialias:!0,powerPreference:`high-performance`});S.setSize(innerWidth,innerHeight),S.setPixelRatio(_p(`px`,Math.min(devicePixelRatio,1.5))),S.toneMapping=4,S.toneMappingExposure=_p(`exp`,1.05),S.shadowMap.enabled=_p(`shadow`,1)!==0,S.shadowMap.type=new URLSearchParams(location.search).get(`stype`)===`pcf`?2:3,document.body.appendChild(S.domElement);let w=new ke(_,new Int16Array(n),new Uint8Array(r),new Uint8Array(i));x.add(w.group),w.startWorkers(Math.min(8,Math.max(2,(navigator.hardwareConcurrency||4)-2)));let E=Mc(),O=new b(jc(w.ground,w.W,w.H,w.cxN,w.cyN,128,w.cell,w.ox,w.oz),E);O.receiveShadow=!0,x.add(O);let k=is({THREE:_e,terrain:w,meta:_,data:y});x.add(k.group);let j=It(a);if(v?.records)for(let e=0;e<j.length;e++)j[e].catalog=v.records[e]||null;let N=j.filter(e=>{if(!k.claims.length)return!0;let t=e.rings[0],n=0,r=0;for(let[e,i]of t)n+=e,r+=i;return n/=t.length,r/=t.length,!k.claims.some(e=>n>=e.x0&&n<=e.x1&&r>=e.z0&&r<=e.z1)}),F=Wt(),I=Lt(N),L=new b(I.geometry,F);L.castShadow=!0,L.receiveShadow=!0,x.add(L);let R=qt(),z=Gt(s),V=Kt(z),ne=new b(V.geometry,R);ne.receiveShadow=!0,x.add(ne);let ie=gn(),ae=hn(sn(l)),U=new b(ae.geometry,ie);U.castShadow=!0,U.receiveShadow=!0,x.add(U);let W=nn(),le=new tn(en(c),W);x.add(le.group);let ue=new Uc;x.add(ue.mesh),x.fog=new f(2240580,3e3,46e3);let pe=new m(16777215,1);pe.castShadow=S.shadowMap.enabled;let me=_p(`smap`,2048);pe.shadow.mapSize.set(me,me),pe.shadow.camera.near=20,pe.shadow.camera.far=3e4,pe.shadow.bias=-4e-4,pe.shadow.radius=_p(`srad`,4),pe.shadow.blurSamples=8,pe.shadow.intensity=_p(`sint`,.88),x.add(pe,pe.target);let ge=new o(12571882,9077624,.6);x.add(ge);let ve=new m(13623551,.25);x.add(ve,ve.target);let K=new C(52,innerWidth/innerHeight,1.2,9e4);K.position.set(-3400,3900,6300);let q=new ce(K,S.domElement);q.enableDamping=!0,q.maxPolarAngle=Math.PI*.71,q.maxDistance=26e3,q.target.set(0,-60,0),q.mouseButtons.RIGHT=-1;let ye=_.pit,J=ye?Sc({THREE:_e,scene:x,terrain:w,camera:K,meta:_,buildings:N}):{group:new p,active:!1,state:{unavailable:`pit not found`},ramp:[],enter(){},exit(){},look(){},update(){},step(){},selfTest:()=>({ok:!1,reason:`pit not found`}),physics:()=>`unavailable`,warp:()=>!1};x.add(J.group);let be=ye?w.ox+ye.centreCell[0]*w.cell:0,xe=ye?w.oz+ye.centreCell[1]*w.cell:0,Ce=document.createElement(`div`);cp.textContent=``,cp.appendChild(Ce),ye?Ce.innerHTML=`${ye.name}<br>глубина&nbsp;<em>${Math.round(ye.depthM)}&nbsp;м</em> · диаметр&nbsp;<em>${Math.round(ye.diameterM)}&nbsp;м</em><br>рельеф ArcticDEM — карьер до затопления`:Ce.textContent=`в этом наборе данных нет геометрии карьера`;let we=null;addEventListener(`resize`,()=>{K.aspect=innerWidth/innerHeight,K.updateProjectionMatrix(),S.setSize(innerWidth,innerHeight),we?.resize(innerWidth,innerHeight)});let Y={on:!1,yaw:2.4,pitch:-.05,speed:18,keys:new Set,pos:new B(0,0,0)},X=kc({onChange:()=>De()}),Te={orbit:[`мышь — вращать · ПКМ — тащить карту · колесо — ближе · 2×щелчок — идти туда<br>V — пешком / БелАЗ · P — карьер · [ ] — дата · , . — время · 1–5 — час · пробел — пуск<br>H — скрыть интерфейс · C — снимок · L — ссылка`+(v?`<br>shift+щелчок — паспорт здания`:``),`геймпад: options — режим: пешком → БелАЗ · крестовина — дата и время · □ пуск / стоп`],walk:[`WASD — идти · shift — бегом · колесо — скорость<br>мышь — смотреть · G — выйти · H — скрыть интерфейс · C — снимок · L — ссылка`,`геймпад: L-стик идти · R-стик смотреть · R2 быстрее · L1 бегом<br>options — сесть в БелАЗ · ○ выйти в орбиту`],drive:[`WASD — ехать · shift — быстрее · F — грузить / сыпать · R — на колёса<br>мышь — камера · V — выйти · H — скрыть интерфейс · C — снимок · L — ссылка`,`геймпад: R2 газ · L2 тормоз · L-стик руль · R-стик камера<br>✕ грузить / сыпать · △ на колёса · L1 поторопиться · ○ выйти`]},Ee=`orbit`,De=(e=Ee)=>{Ee=e;let[t,n]=Te[e];lp.innerHTML=X.on?`${t}<br>${n}`:t},Oe=()=>{let e=S.domElement.requestPointerLock?.();e&&typeof e.catch==`function`&&e.catch(()=>{})},Ae=()=>{Y.on=!0;let e=q.target;Y.pos.set(e.x,0,e.z),Y.yaw=Math.atan2(K.position.x-e.x,K.position.z-e.z),Y.pitch=-.03,q.enabled=!1,Oe(),De(`walk`)},je=(e=!0)=>{Y.on=!1,q.enabled=!0,e&&(document.exitPointerLock?.(),K.position.set(-3400,3900,6300),q.target.set(0,-60,0),De(`orbit`))};De(`orbit`);let Me=null,Ne=null,Pe=()=>{!Me||J.active||(Ne=Me.lake.year,Me.lake.year=`dry`)},Fe=()=>{Me&&Ne!==null&&(Me.lake.year=Ne),Ne=null},Ie=()=>{if(!ye)return;Pe();let e=Y.on?{x:Y.pos.x,z:Y.pos.z,yaw:Y.yaw}:null;Y.on&&je(!1),q.enabled=!1,J.enter(e),Oe(),De(`drive`)},Le=()=>{J.exit(),Fe(),q.enabled=!0,document.exitPointerLock?.(),K.position.set(-3400,3900,6300),q.target.set(0,-60,0),De(`orbit`)},Re=()=>{J.active?Le():Y.on&&ye?Ie():Y.on?je():Ae()},ze=()=>{J.active&&(J.exit(),Fe()),Y.on=!1,Y.keys.clear(),q.enabled=!0,document.pointerLockElement&&document.exitPointerLock?.(),De(`orbit`)};S.domElement.addEventListener(`click`,()=>{(Y.on||J.active)&&document.pointerLockElement!==S.domElement&&Oe()});let Be=new P,Z=e=>{K.updateMatrixWorld(),Be.setFromCamera(new H(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),K)};S.domElement.addEventListener(`dblclick`,e=>{if(e.shiftKey||Y.on||J.active)return;Z(e);let t=Be.intersectObject(w.group,!0)[0];t&&(Ae(),Y.pos.set(t.point.x,0,t.point.z))}),v&&S.domElement.addEventListener(`click`,e=>{if(!e.shiftKey||e.button!==0||Y.on||J.active)return;Z(e);let t=Be.intersectObject(L,!1)[0],n=null;if(t){let e=t.point.clone().addScaledVector(Be.ray.direction,.08);n=mp(j,e.x,e.z)}if(!n){let e=Be.intersectObject(k.group,!0)[0];if(e){let t=e.point.clone().addScaledVector(Be.ray.direction,.08);n=mp(j,t.x,t.z)}}if(!n){let e=Be.intersectObject(w.group,!0)[0];e&&(n=mp(j,e.point.x,e.point.z))}up.style.display=n?`block`:`none`,up.textContent=n?hp(n):``});let Ve={on:!1,p:new B};S.domElement.addEventListener(`pointerdown`,e=>{if(e.button!==2||Y.on||J.active)return;Z(e);let t=Be.intersectObject(w.group,!0)[0];t&&(Ve.on=!0,Ve.p.copy(t.point))}),addEventListener(`pointermove`,e=>{if(!Ve.on)return;Z(e);let t=Be.ray.direction;if(Math.abs(t.y)<.02)return;let n=(Ve.p.y-Be.ray.origin.y)/t.y;if(n<0||n>6e4)return;let r=Be.ray.origin.x+t.x*n,i=Be.ray.origin.z+t.z*n,a=Ve.p.x-r,o=Ve.p.z-i;K.position.x+=a,K.position.z+=o,q.target.x+=a,q.target.z+=o}),addEventListener(`pointerup`,e=>{e.button===2&&(Ve.on=!1)}),addEventListener(`blur`,()=>{Ve.on=!1,Y.keys.clear()}),addEventListener(`mousemove`,e=>{if(document.pointerLockElement===S.domElement){if(J.active){J.look(e.movementX,e.movementY);return}Y.on&&(Y.yaw-=e.movementX*.0022,Y.pitch=Math.max(-1.4,Math.min(1.4,Y.pitch-e.movementY*.0022)))}}),addEventListener(`keydown`,e=>Y.keys.add(e.code)),addEventListener(`keyup`,e=>Y.keys.delete(e.code)),addEventListener(`wheel`,e=>{Y.on&&(Y.speed=Math.max(2,Math.min(220,Y.speed*(e.deltaY>0?.85:1.18))))},{passive:!0});let He=Hf.d,Ue=ee(np[He][0],np[He][1]),We=D(Ue),Ge=Hf.t,Ke=Hf.play,qe=Hf.rate,Je=0,Ye=(e=!1)=>{Ue=ee(np[He][0],np[He][1]),We=D(Ue),e||(Ge=We.rise===null?780:(We.rise+We.set)/2%1440);let t=Se(Ue);Je=t,w.setSnow(t),F.userData.uniforms.uSnow.value=t,R.userData.uniforms.uSnow.value=t,W.userData.uniforms.uSnow.value=t,ie.userData.uniforms.uSnow.value=t;for(let e of k.materials)e.userData.uniforms&&e.userData.uniforms.uSnow&&(e.userData.uniforms.uSnow.value=t);it()},Xe=()=>{let e=We.rise,t=We.set,n=e===null?780:(e+t)/2%1440;return[[`ночь`,(n+720)%1440],[`рассвет`,e===null?300:(e-40+1440)%1440],[`полдень`,n],[`золотой час`,t===null?1020:(t-45+1440)%1440],[`сумерки`,t===null?1140:(t+25)%1440]]},Ze=document.getElementById(`bar`),Qe=Ze.querySelector(`#seasons`),$e=Ze.querySelector(`#marks`),et=Ze.querySelector(`#scrub`),tt=Ze.querySelector(`#play`),nt=Ze.querySelector(`#rate`);np.forEach(([e,t,n],r)=>{let i=document.createElement(`button`);i.textContent=oe(ee(e,t)),i.title=n,i.onclick=()=>{He=r,Ye()},Qe.appendChild(i)}),Xe().forEach(([e],t)=>{let n=document.createElement(`button`);n.textContent=e,n.onclick=()=>{Ge=Xe()[t][1],Ke=!1,it()},$e.appendChild(n)}),et.oninput=()=>{Ge=+et.value,Ke=!1,it()},tt.onclick=()=>{Ke=!Ke,it()};let rt=[60,180,300,600,1800];nt.onclick=()=>{qe=rt[(rt.indexOf(qe)+1)%rt.length],it()};function it(){[...Qe.children].forEach((e,t)=>e.classList.toggle(`on`,t===He)),tt.textContent=Ke?`❙❙`:`▶`,nt.textContent=`${qe}×`,et.value=String(Math.round(Ge))}Ye(!0);let at=e=>{He=(He+e+np.length)%np.length,Ye()},ot=e=>{Ge=(Ge+e+1440)%1440,Ke=!1,it()},st={h(){},c(){},l(){},"`"(){}},ct=new Set([`[`,`]`,`,`,`.`,`1`,`2`,`3`,`4`,`5`,`v`,`g`,`p`,`h`,`c`,`l`,"`"]),lt={BracketLeft:`[`,BracketRight:`]`,Comma:`,`,Period:`.`,Backquote:"`",Digit1:`1`,Digit2:`2`,Digit3:`3`,Digit4:`4`,Digit5:`5`,KeyV:`v`,KeyG:`g`,KeyP:`p`,KeyH:`h`,KeyC:`c`,KeyL:`l`},ut=e=>{let t=(e.key||``).toLowerCase();return ct.has(t)?t:lt[e.code]||t},dt=!1;addEventListener(`keydown`,e=>{let t=e.target;if(t instanceof HTMLElement&&(t.tagName===`TEXTAREA`||t.tagName===`INPUT`&&t.type!==`range`)||e.metaKey||e.ctrlKey||e.altKey)return;let n=ut(e);Object.hasOwn(st,n)?e.repeat||st[n]():n===`[`||n===`]`?at(n===`]`?1:-1):n===`,`||n===`.`?ot(n===`.`?15:-15):n>=`1`&&n<=`5`?(Ge=Xe()[n-1][1],Ke=!1,it()):n===`v`?Re():n===`g`?J.active?Le():Y.on?je():Ae():n===`p`&&ye&&!Y.on&&!J.active?(dt=!dt,dt?(q.target.set(be,-200,xe),K.position.set(be-1e3,620,xe+1500)):(q.target.set(0,-60,0),K.position.set(-3400,3900,6300))):e.code===`Space`&&(Ke=!Ke,it(),e.preventDefault())});let ft=performance.now(),pt=setInterval(()=>{ap.innerHTML=`строим рельеф · <em>${w.built}</em>/${w.chunks.length} фрагментов`},120);await w.primeFromPit(ye?ye.centreCell:[w.W/2,w.H/2]),clearInterval(pt);let mt=performance.now()-ft,ht=Gc();Me=ht;let gt=rp(`row-x`),_t=rp(`grp-frame`),vt={THREE:_e,scene:x,camera:K,renderer:S,controls:q,terrain:w,meta:_,world:ht,ui:{addGroup(e,t){let n=document.createElement(`div`);if(n.className=`grp`,n.id=`grp-${e}`,t){let e=document.createElement(`span`);e.className=`lbl`,e.textContent=t,n.appendChild(e)}return gt.insertBefore(n,_t),n},hudSlot(e,{parent:t=`pit`,interactive:n=!1}={}){let r=document.createElement(`div`);return r.id=`slot-${e}`,n&&(r.style.pointerEvents=`auto`),(t===`clock`?rp(`clock`):cp).appendChild(r),r}},query:gp,QN:_p,pit:ye?{...ye,x:be,z:xe}:null,lights:{sun:pe,hemi:ge,fill:ve},sky:ue,materials:{buildings:F,roads:R,trees:W,infra:ie,slab:E,terrain:w.material,landmarks:k.materials},meshes:{buildings:L,roads:ne,infra:U,slab:O,forest:le.group,landmarks:k.group},data:{roads:z,buildings:N,allBuildings:j,landmarks:y},drive:J,walk:Y,renderNow:()=>{we.render()||S.render(x,K)}};we=Ef(vt);let yt=$f(rp(`toast`));Qf(Ze);let bt=()=>J.active?`drive`:Y.on?`walk`:`orbit`,xt=e=>Math.atan2(Math.sin(e),Math.cos(e)),St=()=>{let e=bt(),t={d:He,t:Ge,play:Ke,rate:qe,mode:e,wx:ht.weather.kind,lake:J.active&&Ne!==null?Ne:ht.lake.year};return e===`orbit`?t.cam={pos:K.position.toArray(),target:q.target.toArray()}:e===`walk`&&(t.cam={x:Y.pos.x,z:Y.pos.z,yaw:xt(Y.yaw),pitch:Y.pitch}),t},Ct=[],wt=e=>{for(let t of Ct)t.classList.toggle(`on`,t.dataset.id===e)},Tt=null,Et=e=>{let t=e;if(t.m){let e=If.find(e=>e.id===t.m),n={...t};delete n.m,t=e?{...Vf(e,{heightAt:(e,t)=>w.heightAt(e,t),pit:vt.pit,aspect:K.aspect}),...n}:n}Tt?.cancel(`state`),t.d!==void 0&&t.d!==He&&(He=t.d,Ye(!0)),t.t!==void 0&&(Ge=t.t),t.play!==void 0&&(Ke=t.play),t.rate!==void 0&&(qe=t.rate),t.wx&&(ht.weather.kind=t.wx),t.lake!==void 0&&(ht.lake.year=t.lake),t.mode===`drive`&&ye?(Y.on&&ze(),Ie(),J.warp()):t.mode===`walk`&&t.cam?(J.active&&ze(),Y.on||Ae(),Y.pos.set(t.cam.x,0,t.cam.z),Y.yaw=t.cam.yaw,Y.pitch=Math.max(-1.4,Math.min(1.4,t.cam.pitch))):t.cam&&t.cam.pos?(ze(),dt=!1,q.target.set(...t.cam.target),K.position.set(...t.cam.pos),K.lookAt(q.target),q.update()):t.mode===`orbit`&&bt()!==`orbit`&&(J.active?Le():je()),it()};for(let e of If){let t=document.createElement(`a`);t.className=`mo`,t.href=`#m=${e.id}`,t.dataset.id=e.id,t.textContent=e.name,t.title=`${oe(ee(np[e.d][0],np[e.d][1]))} · ${se(e.t)}`+(e.wx&&e.wx!==`auto`&&e.wx!==`clear`?` · погода: сценарий`:``),t.onclick=t=>{t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||(t.preventDefault(),Et({m:e.id}),wt(e.id))},rp(`moments`).appendChild(t),Ct.push(t)}addEventListener(`pointerdown`,e=>{e.target.closest?.(`#row-moments, #grp-frame, #unhide`)||wt(null)},!0);let Dt=0,Ot=location.hash.replace(/^#/,``),kt=()=>`${location.href.split(`#`)[0]}#${Pf(St())}`,At=(e,t=!1)=>{if(Tt?.active||!t&&e-Dt<1e3)return;Dt=e;let n=Pf(St());n!==Ot&&(history.replaceState(null,``,`#${n}`),Ot=n)};addEventListener(`hashchange`,()=>{let e=location.hash.replace(/^#/,``);if(e===Ot)return;Ot=e;let t=Nf(e,{dates:np.length});Ff(t)&&Et(t)});let jt=async()=>{At(performance.now(),!0);let e=kt();return await tp(e)?yt(`ссылка на этот вид скопирована`):yt(e,{ms:9e3,selectable:!0}),e},Mt=()=>{let e=[G(Ue),se(Ge),`солнце ${ip(ht.sun.altitude)}°`];return ht.weather.label&&e.push(ht.weather.label),[`Мирный · Якутия`,e.join(` · `),`рельеф ArcticDEM · здания © участники OpenStreetMap`]},Nt=()=>{let[e,t]=fe(Ue),n=e=>String(e).padStart(2,`0`);return`mirny-${n(e+1)}-${n(t)}-${se(Ge).replace(`:`,``)}.png`},Pt=async({download:e=!0}={})=>{let t=await Zf({canvas:S.domElement,render:vt.renderNow,lines:Mt(),filename:Nt(),download:e});return e&&yt(t.luma<1?`снимок пустой — кадр не отрисован`:`снимок сохранён · ${t.filename}`),t},Ft=e=>ep(`clean`,e),Rt=e=>ep(`dev`,e);rp(`link`).onclick=()=>jt(),rp(`snap`).onclick=()=>Pt(),rp(`hide`).onclick=()=>Ft(!0),rp(`unhide`).onclick=()=>Ft(!1),st.h=()=>Ft(),st.c=()=>Pt(),st.l=()=>jt(),st["`"]=()=>Rt(),gp.has(`dev`)&&gp.get(`dev`)!==`0`&&Rt(!0);let zt=Rf(Hf.orbit,vt.pit),Bt=Nf(location.hash,{dates:np.length}),Vt=Ff(Bt);Tt=qf({camera:K,controls:q,target:zt.target,az:Hf.orbit.az,dist:Hf.orbit.dist,h:Hf.orbit.h,scale:()=>zf(K.aspect),enabled:!Vt&&gp.get(`attract`)!==`0`}),Tt.home(),Vt&&(Et(Bt),Bt.m&&wt(Bt.m)),window.DBG={world:ht,ctx:vt,fx:we.apis,scene:x,camera:K,controls:q,terrain:w,renderer:S,THREE:_e,lm:k,pad:X,buildings:{records:j,renderedRecords:N,catalog:v,mesh:L,material:F,built:I,at:(e,t)=>mp(j,e,t)?.catalog||null,byId:e=>j.find(t=>t.catalog?.id===e)?.catalog||null},pose:(e,t=He)=>{He=t,Ye(),Ge=e,Ke=!1,it()},walk:(e,t,n,r)=>{Ae(),Y.pos.set(e,0,t),Y.yaw=n??Y.yaw,r!=null&&(Y.pitch=Math.max(-1.4,Math.min(1.4,r)))},drive:{enter:Ie,exit:Le,state:J.state,ramp:J.ramp,step:J.step,selfTest:J.selfTest,physics:J.physics,warp:e=>(Ie(),J.warp(e)),keys:Y.keys}};for(let e of[window.DBG,window.DBG.drive,window.DBG.buildings])for(let t of Object.keys(e)){let n=e[t];typeof n==`function`&&(e[t]=(...e)=>(Tt.cancel(`DBG`),n(...e)))}window.DBG.ui={state:St,apply:Et,link:kt,share:jt,snapshot:Pt,moments:If,attract:Tt,moment:e=>{Et({m:e}),wt(e)},clean:Ft,dev:Rt,toast:yt};let Ht=new B,Ut=new B,Jt=0,Yt=performance.now(),Xt=0,Zt=performance.now(),Qt=0,$t=0,rn=!0;S.setAnimationLoop(()=>{let e=performance.now(),t=Math.min(.1,(e-Zt)/1e3);if(Zt=e,$t+=t,X.poll()&&(Tt.active&&(X.debug().held.length||X.lt||X.rt||Math.hypot(X.lx,X.ly,X.rx,X.ry)>0)&&Tt.cancel(`pad`),X.hit(`options`)&&Re(),X.hit(`circle`)&&(J.active?Le():Y.on&&je()),X.hit(`left`)&&at(-1),X.hit(`right`)&&at(1),X.hit(`up`)&&ot(15),X.hit(`down`)&&ot(-15),X.hit(`square`)&&(Ke=!Ke,it())),J.active)J.update(t,Y.keys,X);else if(Y.on){let e=0,n=0;Y.keys.has(`KeyW`)&&(e+=1),Y.keys.has(`KeyS`)&&--e,Y.keys.has(`KeyD`)&&(n+=1),Y.keys.has(`KeyA`)&&--n,X.on&&(e-=X.ly,n+=X.lx);let r=Math.hypot(n,e),i=Y.keys.has(`ShiftLeft`)||Y.keys.has(`ShiftRight`)||X.down(`l1`)?6:1+5*X.rt,a=Y.speed*i*t;if(Ht.set(Math.sin(Y.yaw),0,Math.cos(Y.yaw)),Ut.set(-Ht.z,0,Ht.x),ht.walkSpeed=0,r>.001){let i=a*Math.min(1,r)/r;Y.pos.addScaledVector(Ht,e*i),Y.pos.addScaledVector(Ut,n*i),ht.walkSpeed=t>0?a*Math.min(1,r)/t:0}(X.rx||X.ry)&&(Y.yaw-=X.rx*Math.abs(X.rx)*2.6*t,Y.pitch=Math.max(-1.4,Math.min(1.4,Y.pitch-X.ry*Math.abs(X.ry)*1.8*t))),Y.pos.x=Math.max(w.ox+4,Math.min(w.ox+w.spanX-4,Y.pos.x)),Y.pos.z=Math.max(w.oz+4,Math.min(w.oz+w.spanZ-4,Y.pos.z));let o=w.heightAt(Y.pos.x,Y.pos.z);K.position.set(Y.pos.x,o+1.72,Y.pos.z),K.rotation.set(0,0,0),K.rotateY(Y.yaw+Math.PI),K.rotateX(Y.pitch)}else Tt.step($t),q.update();Ke&&(Ge=(Ge+t*qe/60)%1440,et.value=String(Math.round(Ge)));let n=re(Ue,Ge),r=he(n.altitude,n.azimuth),i=A(n.altitude),a=Y.on||J.active?K.position:q.target;pe.target.position.copy(a),pe.position.copy(a).add(new B(r.x,Math.max(r.y,.02),r.z).multiplyScalar(9e3)),pe.color.setRGB(...i.sunColor,de),pe.intensity=i.sunIntensity*2.2;let o=J.active?420:Y.on?320:Math.max(700,Math.min(9e3,K.position.distanceTo(q.target)*.62)),s=pe.shadow.camera;s.right!==o&&(s.left=-o,s.right=o,s.top=o,s.bottom=-o,s.updateProjectionMatrix()),pe.shadow.normalBias=Math.max(.05,2*o/me*1.1),ve.position.copy(a).add(new B(-r.x,.4,-r.z).multiplyScalar(9e3)),ve.target.position.copy(a),ve.intensity=i.fillIntensity,ge.intensity=i.hemiIntensity*1.15,ge.color.setRGB(...i.hemiSky,de),ge.groundColor.setRGB(...i.hemiGround,de);let c=ue.update(i,r,n.altitude);x.fog.color.copy(c),x.fog.near=J.active?120:Y.on?60:3e3,x.fog.far=J.active?15e3:Y.on?9e3:46e3,ue.mesh.position.copy(K.position),F.userData.uniforms.uNight.value=Math.max(0,1-i.day*1.25);for(let e of k.materials)e.userData.uniforms&&e.userData.uniforms.uNight&&(e.userData.uniforms.uNight.value=Math.max(0,1-i.day*1.25));e-Qt>220&&(Qt=e,w.update(K.position),le.update(K.position)),ht.t+=t,ht.dt=t,ht.dateIdx=He,ht.doy=Ue,ht.simMin=Ge,ht.running=Ke,ht.rate=qe,ht.sun.altitude=n.altitude,ht.sun.azimuth=n.azimuth,ht.sun.vec.set(r.x,r.y,r.z),ht.sun.sky=i,ht.sun.day=i.day,ht.snow=Je,ht.night=Math.max(0,1-i.day*1.25),ht.mode=J.active?`drive`:Y.on?`walk`:`orbit`,Y.on||(ht.walkSpeed=0),ht.focus.copy(a),we.update(ht,t),op.textContent=se(Ge),sp.innerHTML=`${oe(Ue).replace(` `,`&nbsp;`)}<span class="nm"> · ${np[He][2]}</span> · солнце&nbsp;${ip(n.altitude)}°<span class="l2"><br>`+(We.rise===null?n.altitude>0?`солнце не заходит`:`солнце не восходит`:`восход ${se(We.rise)} · закат ${se(We.set)} · день ${ip(We.minutesUp/60)} ч`)+`</span>`,we.render()||S.render(x,K),rn&&(rn=!1,document.body.classList.remove(`loading`)),At(e),Jt++,e-Yt>500&&(Xt=Math.round(Jt*1e3/(e-Yt)),Jt=0,Yt=e,ap.innerHTML=`<em>${w.built}</em>/${w.chunks.length} фрагм. · <em>${(w.tris/1e6).toFixed(2)}M</em> треуг. рельефа · <em>${N.length}</em> зданий · <em>${ae.pipes}</em> теплотрасс · деревьев <em>${(le.drawn??0)/1e3|0}k</em>/${le.count/1e3|0}k · сетка <em>${mt.toFixed(0)} мс</em> · <em>${Xt}</em> fps`)})}vp().catch(e=>{ap.textContent=`error: ${e.message}`,document.body.classList.add(`failed`),console.error(e)});