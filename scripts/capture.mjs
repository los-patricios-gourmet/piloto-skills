import { Browser, sleep } from 'file:///C:/Users/Administrador/.codex/skills/design-taste-frontend/scripts/lib/cdp.mjs';
const browser = await Browser.launch();
try {
 const page = await browser.newPage({width:1440,height:900});
 await page.goto('http://127.0.0.1:3100/pe/');
 await page.screenshot({path:'.impeccable/review/desktop-fold.png',format:'png'});
 await page.eval(()=>{document.getAnimations().forEach(a=>{try{a.finish()}catch{a.cancel()}});});
 await page.screenshot({path:'.impeccable/review/desktop.png',format:'png',fullPage:true});
 await page.setViewport({width:390,height:844,mobile:true});
 await page.goto('http://127.0.0.1:3100/pe/');
 await page.screenshot({path:'.impeccable/review/mobile-fold.png',format:'png'});
 await page.eval(()=>{document.getAnimations().forEach(a=>{try{a.finish()}catch{a.cancel()}});});
 await page.screenshot({path:'.impeccable/review/mobile.png',format:'png',fullPage:true});
 console.log(JSON.stringify({errors:page.consoleErrors}));
} finally {await browser.close()}

