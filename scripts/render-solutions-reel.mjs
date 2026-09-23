// Regenerate the 12-second portfolio videos with Node, Playwright, Chrome and FFmpeg.
// Optional paths: REEL_PLAYWRIGHT_PATH, REEL_BROWSER_PATH, REEL_FFMPEG_PATH.
// Run from the repository: node scripts/render-solutions-reel.mjs [--preview]
// This build tool has no effect on the site's runtime dependencies.
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { projects } from '../src/data/projects.js'

const root = resolve(import.meta.dirname, '..')
const { chromium } = await import(process.env.REEL_PLAYWRIGHT_PATH
  ? pathToFileURL(resolve(process.env.REEL_PLAYWRIGHT_PATH)).href : 'playwright')
const videoDir = join(root, 'public/videos')
const imageDir = join(root, 'public/images/solutions')
await mkdir(videoDir, { recursive: true })
await mkdir(imageDir, { recursive: true })
const assets = new Map(projects.map(p => [p.image, join(root, 'public', p.image)]))
assets.set('/theme.css', join(root, 'src/index.css'))
const server = createServer(async (req, res) => {
  const file = assets.get(req.url)
  if (!file) { res.writeHead(404); res.end(); return }
  try {
    res.setHeader('Content-Type', file.endsWith('.css') ? 'text/css' : 'image/png')
    res.end(await readFile(file))
  } catch { res.writeHead(404); res.end() }
})
server.listen(0, '127.0.0.1')
await once(server, 'listening')
const origin = 'http://127.0.0.1:' + server.address().port
let browser
try {
browser = await chromium.launch({
  ...(process.env.REEL_BROWSER_PATH ? { executablePath: process.env.REEL_BROWSER_PATH } : {}),
  headless: true,
})
} catch (error) { server.close(); throw error }
function composition(width, height) {
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${origin}/theme.css">
  <style>
  html,body{width:${width}px;height:${height}px;overflow:hidden}
  body{margin:0;font-family:Manrope,Arial,sans-serif}
  .film{position:relative;width:100%;height:100%;overflow:hidden;background:var(--color-page)}
  .scene{position:absolute;inset:0;perspective:2200px}
  .window{position:absolute;left:0;top:0;overflow:hidden;border-radius:22px;padding:9px;background:var(--color-page);border:1px solid color-mix(in srgb,var(--color-border) 70%,transparent);transform-origin:50% 50%}
  .chrome{display:flex;align-items:center;height:44px;padding:0 14px;gap:7px}
  .dot{width:7px;height:7px;border-radius:50%;background:var(--color-border)}
  .address{margin:0 auto;padding-right:37px;font-size:14px;color:var(--color-muted)}
  .screen{overflow:hidden;border-radius:10px;height:calc(100% - 98px);background:var(--color-surface)}
  .screen img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center}
  .caption{display:flex;justify-content:space-between;align-items:center;height:54px;padding:0 14px;gap:12px}
  .client{font-size:19px;font-weight:700;letter-spacing:-.5px;white-space:nowrap}
  .tech{font-size:12px;color:var(--color-muted)}
  .badge{position:absolute;display:flex;align-items:center;gap:15px;padding:18px 24px;border-radius:18px;background:var(--color-page);border:1px solid var(--color-border)}
  .badge-mark{width:38px;height:38px;display:grid;place-items:center;border-radius:12px;background:var(--color-accent-soft);color:var(--color-accent);font-size:23px}
  .badge-copy{font-size:19px;font-weight:600;letter-spacing:-.5px}
  .badge-sub{display:block;margin-top:3px;font-size:12px;font-weight:400;color:var(--color-muted);letter-spacing:0}
  .film,.window,.badge{background:var(--color-page)}
  .window,.badge{box-shadow:none}
  </style></head><body class="theme-light"><div class="film ${width < height ? 'portrait' : ''}">
  <div class="scene"></div>
  <div class="badge"><span class="badge-mark">↗</span><span class="badge-copy"></span></div>
  </div><script>
  const projects=${JSON.stringify(projects).replaceAll('<', '\\u003c')};
  const width=${width},height=${height},portrait=width<height;
  const scene=document.querySelector('.scene');
  const techs=['Framer','WooCommerce','WordPress · Elementor','WordPress · ACF','Elementor Pro','WordPress · WPML','Elementor','WordPress'];
  const cards=projects.map((project,index)=>{
    const card=document.createElement('div');card.className='window';
    const chrome=document.createElement('div');chrome.className='chrome';
    for(let i=0;i<3;i++){const dot=document.createElement('i');dot.className='dot';chrome.append(dot)}
    const address=document.createElement('span');address.className='address';address.textContent=new URL(project.href).hostname.replace(/^www\\./,'');chrome.append(address);
    const screen=document.createElement('div');screen.className='screen';
    const image=document.createElement('img');image.src='${origin}'+project.image;screen.append(image);
    const caption=document.createElement('div');caption.className='caption';
    const client=document.createElement('span');client.className='client';client.textContent=project.client;
    const tech=document.createElement('span');tech.className='tech';tech.textContent=techs[index];caption.append(client,tech);
    card.append(chrome,screen,caption);scene.append(card);return card;
  });
  const ease=t=>{t=Math.max(0,Math.min(1,t));return t*t*t*(t*(t*6-15)+10)};
  const mix=(a,b,t)=>a+(b-a)*t;
  function layout(mode,i){
    const focus=mode===0?0:mode===1?2:mode===2?1:-1;
    if(mode===3){
      if(portrait)return{x:53+(i%2)*448,y:159+Math.floor(i/2)*225,w:406,h:207,r:0,ry:0,o:1,z:1};
      return{x:110+(i%4)*434,y:206+Math.floor(i/4)*356,w:398,h:312,r:0,ry:0,o:1,z:1};
    }
    if(i===focus){
      const w=portrait?(focus===0?820:650):(focus===0?1130:780),h=portrait?(focus===0?670:720):(focus===0?720:740);
      return{x:(width-w)/2,y:(height-h)/2,w,h,r:0,ry:0,o:1,z:10};
    }
    const order=[0,2,1,5,7,3,4,6].filter(n=>n!==focus),slot=order.indexOf(i),left=slot%2===0,row=Math.floor(slot/2);
    if(portrait)return{x:left?-145:655,y:(height-390)/2+row*50,w:450,h:390,r:left?-9:9,ry:0,o:slot<2?.75:0,z:2};
    return{x:left?90+row*20:1415-row*20,y:(height-440)/2+row*50,w:415,h:440,r:left?-8-row*2:8+row*2,ry:left?9:-9,o:slot<2?.94:slot<4?.36:0,z:5-slot};
  }
  const stops=[{t:0,mode:0},{t:2.4,mode:0},{t:3.35,mode:1},{t:5.15,mode:1},{t:6.1,mode:2},{t:7.8,mode:2},{t:8.8,mode:3},{t:10.6,mode:3},{t:12,mode:0}];
  window.renderFrame=time=>{
    let index=0;while(index<stops.length-2&&time>stops[index+1].t)index++;
    const a=stops[index],b=stops[index+1],p=ease((time-a.t)/(b.t-a.t));
    cards.forEach((card,i)=>{
      const from=layout(a.mode,i),to=layout(b.mode,i),v={};
      for(const key of ['x','y','w','h','r','ry','o'])v[key]=mix(from[key],to[key],p);
      const drift=0;
      card.style.width=v.w+'px';card.style.height=v.h+'px';card.style.opacity=v.o;card.style.zIndex=p<.5?from.z:to.z;
      card.style.transform='translate3d('+v.x+'px,'+(v.y+drift)+'px,0) rotate('+v.r+'deg) rotateY('+v.ry+'deg)';
      const grid=mix(a.mode===3?1:0,b.mode===3?1:0,p);card.querySelector('.tech').style.opacity=1-grid;
      card.querySelector('.screen img').style.objectPosition='center '+((a.mode===1&&b.mode===1)?Math.sin((time-a.t)*Math.PI/(b.t-a.t))*9:0)+'%';
    });
    const mode=p<.5?a.mode:b.mode,labels=['Seleqt','ClearCRM','Joss Home','Maria Semenenko'],sub=['Framer','WordPress · Elementor','WooCommerce','Framer · WordPress · WooCommerce'];
    const badge=document.querySelector('.badge'),copy=badge.querySelector('.badge-copy');copy.textContent=labels[mode];
    const small=document.createElement('span');small.className='badge-sub';small.textContent=sub[mode];copy.append(small);
    badge.style.left=(width/2)+'px';
    badge.style.transform='translateX(-50%)';const featured=layout(mode,mode===0?0:mode===1?2:1);badge.style.top=(mode===3?height-120:featured.y+featured.h+20)+'px';badge.style.opacity=mode===3?0:a.mode!==b.mode?Math.abs(p-.5)*2:1;
  };
  window.ready=Promise.all([...document.images].map(image=>image.decode())).then(()=>document.fonts.ready);
  window.renderFrame(0);
  </script></body></html>`
}
async function encode(args, input) {
  const process = spawn(processEnvFfmpeg(), ['-y','-loglevel','error',...args], { windowsHide:true, stdio:['pipe','inherit','inherit'] })
  const completion = once(process, 'close')
  process.stdin.end(input)
  const [code] = await completion
  if (code !== 0) throw new Error('Encoding failed: ' + code)
}
function processEnvFfmpeg() { return process.env.REEL_FFMPEG_PATH || 'ffmpeg' }
try {
  for (const {width,height,suffix} of [{width:1920,height:1080,suffix:''},{width:960,height:1200,suffix:'-mobile'}]) {
    const page = await browser.newPage({viewport:{width,height},deviceScaleFactor:1})
    await page.setContent(composition(width,height), {waitUntil:'networkidle'})
    await page.evaluate(()=>window.ready)

    const review = await page.evaluate(({width,height}) => {
      const samples = []
      for (const [time,index] of [[0,0],[1,0],[4,2],[7,1]]) {
        window.renderFrame(time)
        const card = document.querySelectorAll('.window')[index]
        const bounds = card.getBoundingClientRect()
        samples.push({time,centerX:bounds.x+bounds.width/2,centerY:bounds.y+bounds.height/2,shadow:getComputedStyle(card).boxShadow})
      }
      const edgesHidden = !document.querySelector('.identity,.edition,.platforms,.wash')
      return {width,height,samples,edgesHidden,background:getComputedStyle(document.querySelector('.film')).backgroundColor}
    },{width,height})
    if(!review.edgesHidden || review.background !== 'rgb(255, 255, 255)' ||
      review.samples.some(sample=>Math.abs(sample.centerX-width/2)>.01 || Math.abs(sample.centerY-height/2)>.01 || sample.shadow!=='none')) {
      throw new Error('Clean composition validation failed: '+JSON.stringify(review))
    }
    console.log('Verified clean composition: '+JSON.stringify(review))
    await page.evaluate(()=>window.renderFrame(1))
    await encode(['-f','image2pipe','-i','pipe:0','-frames:v','1','-c:v','libwebp','-quality','92',join(imageDir,'portfolio-reel'+suffix+'-clean.webp')],await page.screenshot())
    if(process.argv.includes('--preview')) {
      for(const time of [0,4,7,10]) {
        await page.evaluate(t=>window.renderFrame(t),time)
        await writeFile(join(process.env.TEMP || videoDir,'reel-clean-storyboard'+suffix+'-'+time+'.png'),await page.screenshot())
      }
    } else {
      const encoder=spawn(processEnvFfmpeg(),['-y','-loglevel','error','-f','image2pipe','-framerate','30','-vcodec','mjpeg','-i','pipe:0','-an','-c:v','libx264','-preset','medium','-threads','4','-crf','18','-vf','scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p','-pix_fmt','yuv420p','-color_range','tv','-colorspace','bt709','-color_trc','bt709','-color_primaries','bt709','-movflags','+faststart',join(videoDir,'solutions-portfolio'+suffix+'-clean.mp4')],{windowsHide:true,stdio:['pipe','inherit','inherit']})
      const completion=once(encoder,'close')
      encoder.stdin.on('error',error=>console.error(error.message))
      for(let frame=0;frame<360;frame++) {
        await page.evaluate(t=>window.renderFrame(t),frame/30)
        const buffer=await page.screenshot({type:'jpeg',quality:100})
        if(!encoder.stdin.write(buffer))await Promise.race([once(encoder.stdin,'drain'),completion.then(([code])=>{throw new Error('Encoder closed early: '+code)})])
        if(frame%90===0)console.log(width+'x'+height+': '+frame+'/360 frames')
      }
      encoder.stdin.end()
      const [code]=await completion
      if(code!==0)throw new Error('Video encoding failed: '+code)
      console.log('Rendered solutions-portfolio'+suffix+'-clean.mp4')
    }
    await page.close()
  }
} finally { await browser.close(); server.close() }
