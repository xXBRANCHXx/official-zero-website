// Run against npm run dev. All API calls and the WhatsApp handoff are intercepted.
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.ZERO_TEST_URL || 'http://127.0.0.1:4182';
const row = (option,size,price,extra={}) => ({item_key:`syrup:${option}:${size}`,product_slug:'syrup',product_name:'ZERO Syrup',option_id:option,option_name:option==='plain'?'Plain':option==='hazelnut'?'Hazelnut':'New flavor',size_id:size,size_label:size,price,sale_price:price*.9,sku_code:`SKU-${option}-${size}`,sku_linked:true,status:'active',available:true,stock:10,discount:{type:'percent',amount:10},...extra});
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH || undefined,args:['--no-sandbox']});
 try {
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 await context.addInitScript(()=>{localStorage.setItem('zero_language_v1','en');localStorage.setItem('zero_language_manual_v1','true');window.ZERO_ORDER_API_URL='/api/test-orders';window.open=()=>({opener:null,location:{set href(value){window.__checkoutUrl=value;}},close(){}});});
 let rows=[row('plain','50ml',10000),row('plain','250ml',45000),row('hazelnut','250ml',46000),row('new-flavor','750ml',80000,{option_name:'New flavor',image_url:'/ZERO Media/ZERO Syrup Renders/Plain.png'})];
 let failure=false, orderFailure=false, requests=[];
 await context.route('**/api/**',async route=>{
  const url=new URL(route.request().url());
  if(url.pathname==='/api/catalog')return route.fulfill(failure?{status:503,json:{error:'test outage'}}:{json:{data:rows}});
  if(url.searchParams.get('action')==='validate_voucher')return route.fulfill({json:{voucher:{applied:true,discount_percent:15,stacking_mode:'compound'},pricing:{total:34425,discount:6075}}});
  if(url.pathname==='/api/test-orders'){
   requests.push(route.request().postDataJSON());
   if(orderFailure)return route.fulfill({status:503,json:{error:'Test order service unavailable'}});
   return route.fulfill({json:{order:{order_id:'TEST-ZERO-001',net_revenue:34425,voucher:{applied:true,discount_percent:15,stacking_mode:'compound'},items:[{item_key:'syrup:plain:250ml',unit_gross_price:45000,unit_net_price:34425}]}}});
  }
  return route.fulfill({json:{data:[],visibility:'hidden'}});
 });
 const page=await context.newPage(), errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`${base}/catalog/`);
 await page.locator('[data-product=syrup]:not([disabled])').waitFor();
 const models=await page.evaluate(async()=>{
  const m=await import('/zero-products.js');
  const source={product_slug:'syrup',option_id:'new-flavor',option_name:'Added in dashboard',size_id:'750ml',size_label:'750ml',price:80000,sale_price:0,status:'active',available:true};
  const p=m.applyCatalogToProduct(m.ZERO_PRODUCTS.syrup,[source]);
  return {options:p.options.map(i=>i.id),sizes:p.sizes.map(i=>i.id),zero:m.catalogSelectionPrice(source),fallback:m.catalogSelectionPrice({price:123}),hidden:m.applyCatalogToProduct(m.ZERO_PRODUCTS.syrup,[{...source,status:'inactive'}]).options.length,offline:m.applyCatalogToProduct(m.ZERO_PRODUCTS.syrup,null).catalogUnavailable};
 });
 assert.deepEqual(models,{options:['new-flavor'],sizes:['750ml'],zero:0,fallback:123,hidden:0,offline:true});
 await page.locator('[data-product=syrup]').click();
 await page.locator('[data-option-id=new-flavor]').click();
 assert.equal(await page.locator('[data-size-id="750ml"]').getAttribute('aria-pressed'),'true');
 assert.match(await page.locator('#qa-price').innerText(),/72.000/);
 await page.locator('[data-option-id=plain]').click();await page.locator('[data-size-id="250ml"]').click();
 assert.match(await page.locator('#qa-price').innerText(),/40.500/);
 await page.locator('#qa-add-btn').click();await page.locator('.quick-add-close').click();
 assert.equal(await page.evaluate(()=>document.activeElement.dataset.product),'syrup');
 await page.reload();await page.locator('[data-product=syrup]:not([disabled])').waitFor();await page.locator('#syrup-cart-bubble').click();
 await page.waitForFunction(()=>document.querySelector('#zero-cart-refresh-status').textContent==='');
 assert.match(await page.locator('#zero-cart-total').innerText(),/40.500/);
 await page.locator('[data-cart-action=increase]').click();assert.match(await page.locator('#zero-cart-total').innerText(),/81.000/);
 await page.locator('[data-cart-action=decrease]').click();
 await page.locator('#zero-cart-voucher-code').fill('TEST15');await page.locator('#zero-cart-voucher-apply').click();
 await page.waitForFunction(()=>document.querySelector('#zero-cart-total').textContent.includes('34.425'));
 await page.locator('#zero-cart-checkout').click();await page.locator('#zero-checkout-dialog[open]').waitFor();
 assert.equal(await page.locator('#zero-commerce-contact-fields').isVisible(),false);assert.equal(await page.locator('#zero-commerce-rates').isVisible(),false);
 assert.match(await page.locator('#zero-checkout-review-total').innerText(),/34.425/);
 await page.locator('#zero-checkout-form button[type=submit]').click();assert.equal(requests.length,0);
 await page.locator('#zero-cart-full-name').fill('Catalog Test');await page.locator('#zero-cart-address').fill('Test address, Yogyakarta');
 orderFailure=true;await page.locator('#zero-checkout-form button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('#zero-cart-customer-error').textContent.includes('unavailable'));
 assert.equal(await page.locator('#zero-checkout-dialog').getAttribute('open'),'');
 orderFailure=false;await page.locator('#zero-checkout-form button[type=submit]').click();await page.waitForFunction(()=>window.__checkoutUrl);
 assert.equal(requests[0].idempotency_key,requests[1].idempotency_key,'retry must keep order idempotency');
 assert.equal(requests[1].voucher_code,'TEST15');assert.deepEqual(requests[1].items,[{item_key:'syrup:plain:250ml',sku:'SKU-plain-250ml',quantity:1}]);
 const handoff=decodeURIComponent(await page.evaluate(()=>window.__checkoutUrl));assert.match(handoff,/api.whatsapp.com/);assert.match(handoff,/TEST-ZERO-001/);assert.match(handoff,/34.425/);assert.match(handoff,/Catalog Test/);
 // A fresh SKU price must replace a stored cart price before the next checkout.
 rows=rows.map(r=>r.item_key==='syrup:plain:250ml'?{...r,price:50000,sale_price:45000}:r);
 await page.locator('#zero-cart-checkout').click();await page.locator('#zero-checkout-dialog[open]').waitFor();assert.match(await page.locator('#zero-checkout-review-total').innerText(),/45.000/);
 await page.locator('#zero-checkout-close').click();
 rows=rows.map(r=>r.item_key==='syrup:plain:250ml'?{...r,stock:1}:r);
 await page.locator('[data-cart-action=increase]').click();await page.locator('#zero-cart-checkout').click();await page.waitForFunction(()=>document.querySelector('.zero-cart-unavailable'));
 assert.equal(await page.locator('#zero-cart-checkout').getAttribute('aria-disabled'),'true');await page.locator('[data-cart-action=decrease]').click();assert.equal(await page.locator('#zero-cart-checkout').getAttribute('aria-disabled'),null);
 await page.locator('#zero-cart-close').click();
 // Every viewport keeps the action reachable and has no horizontal overflow.
 for(const width of [360,390,768,1440]){
  await page.setViewportSize({width,height:844});await page.locator('[data-product=syrup]').click();
  const bounds=await page.locator('.quick-add-footer').boundingBox();assert(bounds.y>=0&&bounds.y+bounds.height<=845,`footer at ${width}`);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await page.keyboard.press('Escape');
 }
 // Campaign pages retain their URLs and use the same live selector and checkout.
 assert.equal(await page.locator('.catalog-product-link[href="/zero-syrup/"]').count(),1);
 assert.equal(await page.locator('.catalog-product-link[href="/zero-drops/"]').count(),1);
 rows.push(row('plain','30ml',49000,{product_slug:'drops',product_name:'ZERO Drops',item_key:'drops:plain:30ml'}),row('new-flavor','5ml',20000,{product_slug:'drops',product_name:'ZERO Drops',item_key:'drops:new-flavor:5ml'}));
 for(const product of [{slug:'syrup',width:1440,price:'72.000',priceId:'selected-syrup-price'},{slug:'drops',width:390,price:'18.000',priceId:'selected-drops-price'}]) {
  await page.setViewportSize({width:product.width,height:900});
  await page.goto(`${base}/zero-${product.slug}/?utm_source=campaign-test&utm_campaign=product-test`);
  assert.equal(new URL(page.url()).pathname,`/zero-${product.slug}/`);
  assert.equal(new URL(page.url()).searchParams.get('utm_campaign'),'product-test');
  await page.locator('[data-option-id="new-flavor"]').click();
  assert.match(await page.locator(`#${product.priceId}`).innerText(),new RegExp(product.price));
  await page.locator(`#add-${product.slug}-to-cart`).click();
  await page.locator('#zero-cart-drawer.active').waitFor();
  await page.waitForFunction(()=>document.querySelector('#zero-cart-refresh-status').textContent==='');
  assert.equal(await page.evaluate(slug=>window.zeroCartApi.store.getCart().some(item=>item.productSlug===slug&&item.optionId==='new-flavor'),product.slug),true);
  await page.locator('#zero-cart-checkout').click();await page.locator('#zero-checkout-dialog[open]').waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 }
 await page.goto(`${base}/catalog/`);
 rows=rows.map(r=>({...r,status:'inactive',available:false}));await page.reload();await page.locator('.catalog-availability').first().waitFor();assert.equal(await page.locator('[data-product=syrup]').isDisabled(),true);
 failure=true;await page.reload();await page.locator('.catalog-availability').first().waitFor();assert.match(await page.locator('.catalog-availability').first().innerText(),/Unable to load/);
 assert.deepEqual(errors,[]);
 console.log('Catalog / checkout browser checks passed: dynamic flavors, sizes, pricing, zero-price sale, hidden items, cart persistence, quantity, voucher, retry idempotency, WhatsApp handoff, refreshed prices, stock limits, API failure, focus restoration, four viewport sizes, dedicated campaign pages.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
