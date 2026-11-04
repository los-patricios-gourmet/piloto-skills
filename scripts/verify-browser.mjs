import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { Browser, sleep } from 'file:///C:/Users/Administrador/.codex/skills/design-taste-frontend/scripts/lib/cdp.mjs';
const base='http://127.0.0.1:3100';
const results=[];const check=(name,value)=>{assert.ok(value,name);results.push({name,passed:true})};
const browser=await Browser.launch();
mkdirSync('.impeccable/review',{recursive:true});
try {
 const p=await browser.newPage({width:1440,height:900});
 const go=async route=>{await p.goto(base+route,{settleMs:500});await p.eval('document.fonts.ready.then(()=>true)');await p.eval(async()=>{await Promise.all([...document.images].map(async i=>{i.loading='eager';try{await i.decode()}catch{}}))});};
 const click=async selector=>{await p.eval(s=>{const el=document.querySelector(s);if(!el)throw Error('Missing '+s);el.click()},selector);await sleep(160)};
 const text=()=>p.eval(()=>document.body.innerText);
 const select=async(selector,value)=>{await p.eval(({selector,value})=>{const el=document.querySelector(selector);el.value=value;el.dispatchEvent(new Event('change',{bubbles:true}))},{selector,value:String(value)});await sleep(100)};
 const fill=async(selector,value)=>{await p.eval(({selector,value})=>{const el=document.querySelector(selector);Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,value);el.dispatchEvent(new Event('input',{bubbles:true}))},{selector,value});};
 await go('/pe/');await p.eval(()=>localStorage.clear());await go('/pe/');
 check('Peru has exactly caviar and truffles',await p.eval(()=>[...document.querySelectorAll('.ingredient-switcher button')].map(b=>b.innerText.trim()).join(',')==='Caviar,Trufas'));
 check('Fonts loaded',await p.eval(()=>document.fonts.check('16px "Bebas Neue"')&&document.fonts.check('16px Montserrat')));
 await click('.ingredient-switcher button:nth-child(2)');
 check('Ingredient changes to truffles',await p.eval(()=>document.querySelector('.ingredient-name').textContent==='Trufas'));
 await select('#vitrine-weight',1);check('Weight changes to 50g',await p.eval(()=>document.querySelector('#vitrine-weight').selectedOptions[0].textContent.includes('50 g')));
 await click('.vitrine-buy button');
 await go('/pe/carrito/');check('Selected 50g variant reaches cart',(await text()).includes('50 g')&&(await text()).includes('270'));
 await click('.qty-control button:nth-of-type(2)');
 check('Cart quantity updates subtotal',(await text()).includes('540'));
 for(let i=0;i<12;i++)await click('.qty-control button:nth-of-type(2)');
 check('Cart respects demo stock 7',await p.eval(()=>document.querySelector('.qty-control span').textContent==='7'));
 await go('/cl/carrito/');check('Chile cart remains independent',(await text()).includes('Tu próxima selección'));
 await go('/cl/');check('Chile has four categories',await p.eval(()=>document.querySelectorAll('.ingredient-switcher button').length===4));
 await click('.ingredient-switcher button:nth-child(3)');
 check('Wagyu switch is functional',await p.eval(()=>document.querySelector('.ingredient-name').textContent==='Wagyu'));
 await select('#vitrine-weight',1);await click('.vitrine-buy button');await go('/cl/carrito/');check('Chilean peso total and weight',(await text()).includes('95.000')&&(await text()).includes('500 g'));
 await go('/cl/catalogo/');await click('.catalog-filters button:nth-child(4)');check('Category filter selects Wagyu',await p.eval(()=>document.querySelectorAll('.product-card').length===1&&document.querySelector('.product-card').innerText.includes('Wagyu')));
 await fill('input[type=search]','inexistente');await sleep(200);check('Search has meaningful empty state',(await text()).includes('No hay productos'));
 await click('.catalog-empty button');check('Reset restores all four products',await p.eval(()=>document.querySelectorAll('.product-card').length===4));
 await go('/cl/checkout/');
 check('Checkout blocks empty form',await p.eval(()=>{document.querySelector('button[type=submit]').click();return document.querySelectorAll('.checkout-stage input').length===3&&!document.querySelector('.review-line')}));
 const fields=[['input[autocomplete=name]','Persona Demo'],['input[type=email]','demo@example.com'],['input[type=tel]','999999999']];for(const [s,v]of fields)await fill(s,v);
 await click('button[type=submit]');check('Contact form progresses to delivery',(await text()).includes('DÓNDE ENTREGAMOS'));
 const inputs=await p.eval(()=>document.querySelectorAll('.checkout-stage input').length);check('Delivery fields visible',inputs===3);
 await fill('.checkout-stage input:nth-of-type(1)','Santiago');
 await p.eval(()=>{const inputs=document.querySelectorAll('.checkout-stage input');const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;setter.call(inputs[0],'Santiago');inputs[0].dispatchEvent(new Event('input',{bubbles:true}));setter.call(inputs[1],'Dirección de muestra');inputs[1].dispatchEvent(new Event('input',{bubbles:true}));});
 await sleep(120);await click('button[type=submit]');check('Review states unknown delivery fee',(await text()).includes('Revisa tu selección')&&(await text()).includes('Por definir'));
 await click('button[type=submit]');check('Simulation confirms no actual transaction',(await text()).includes('No se ha creado')&&(await text()).includes('ningún pedido'));
 await go('/cl/carrito/');check('Completion clears only Chile cart',(await text()).includes('Tu próxima selección'));
 await go('/pe/carrito/');check('Peru cart preserved after Chile completion',await p.eval(()=>document.querySelector('.qty-control span')?.textContent==='7'));
 await go('/admin-demo/');await click('.admin-sidebar nav button:nth-child(3)');
 const initial=await p.eval(()=>document.querySelector('tbody tr td:nth-child(4)').innerText);
 await click('tbody tr .admin-adjust button:nth-child(2)');check('Inventory demo adjusts stock',await p.eval(()=>document.querySelector('tbody tr td:nth-child(4)').innerText)!==initial);
 await click('.admin-sidebar nav button:nth-child(4)');await select('select.order-status','En reparto');check('Order status can change',await p.eval(()=>document.querySelector('select.order-status').value==='En reparto'));
 await click('.admin-sidebar nav button:first-child');await p.screenshot({path:'.impeccable/review/admin-desktop.png',format:'png',fullPage:true});
 for (const route of ['/','/pe/','/cl/','/pe/catalogo/','/cl/catalogo/','/pe/producto/caviar-seleccion/','/pe/producto/trufa-seleccion/','/cl/producto/wagyu-seleccion/','/cl/producto/foie-gras-seleccion/','/pe/carrito/','/cl/checkout/','/admin-demo/']) {
  for (const width of [1440,768,390]) {
   await p.setViewport({width,height:width===390?844:900,mobile:width===390});await go(route);
   check('No horizontal overflow '+route+' @'+width,await p.eval(()=>document.documentElement.scrollWidth<=innerWidth+1));
   check('No broken images '+route+' @'+width,await p.eval(()=>[...document.images].filter(i=>getComputedStyle(i).display!=='none').every(i=>i.complete&&i.naturalWidth>0)));
   if(width===390&&route==='/pe/') {
    await click('.menu-toggle');check('Mobile menu opens',await p.eval(()=>document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true'));
    await p.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await p.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    check('Escape closes menu and restores focus',await p.eval(()=>document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false'&&document.activeElement===document.querySelector('.menu-toggle')));
   }
   if((width===1440||width===390)&&['/','/cl/','/pe/producto/caviar-seleccion/','/cl/catalogo/','/admin-demo/'].includes(route)) {
    await p.eval(()=>document.getAnimations().forEach(a=>a.cancel()));await p.screenshot({path:'.impeccable/review/'+(route==='/'?'entry':route.replaceAll('/','-').slice(1,-1))+'-'+width+'.png',format:'png',fullPage:true});
   }
  }
 }
 const reduced=await browser.newPage({width:390,height:844,mobile:true,reducedMotion:true});await reduced.goto(base+'/pe/');check('Reduced motion removes travel',await reduced.eval(()=>document.getAnimations().filter(a=>a.effect?.getComputedTiming().duration>1).length===0));
 check('No uncaught browser errors',p.consoleErrors.length===0);
 writeFileSync('.impeccable/review/functional-checks.json',JSON.stringify({passed:results.length,results,errors:p.consoleErrors},null,2));console.log('PASS: '+results.length+' browser checks');
} catch(e){writeFileSync('.impeccable/review/functional-checks.json',JSON.stringify({passed:results.length,results,error:e.stack},null,2));throw e} finally{await browser.close()}

