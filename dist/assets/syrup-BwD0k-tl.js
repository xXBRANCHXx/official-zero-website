import{l as E,a as b,Z as O,i as R}from"./index-C7PwiP3J.js";const r=[{src:"/ZERO Media/ZERO Syrup Images/Carousel/Syrup Carousel 1.jpg",alt:"ZERO Syrup product lineup"},{src:"/ZERO Media/ZERO Syrup Images/Carousel/Syrup Carousel 2.jpg",alt:"ZERO Syrup product bottles"},{src:"/ZERO Media/ZERO Syrup Images/Carousel/Syrup Carousel 3.jpg",alt:"ZERO Syrup bottle selection"}],k=e=>{var l;const o=(l=r[0])==null?void 0:l.src;return o?{...e,heroImage:o,options:e.options.map(s=>({...s,image:o}))}:e},A=()=>{var I,S;const e=document.querySelector(".syrup-visual-shell"),o=document.getElementById("selected-flavor-image");if(!e||!o||r.length<2)return;let l=0,s=1,a=1,n=0,i=null,p=null;const d=[r[r.length-1],...r,r[0]],c=()=>{e.style.setProperty("--syrup-carousel-position",s)},y=()=>{e.querySelectorAll(".syrup-carousel-slide").forEach((t,u)=>{const w=Number(t.dataset.realIndex),C=u===Math.round(s)&&w===l;t.setAttribute("aria-hidden",C?"false":"true")})},f=()=>{a===d.length-1?(s=1,a=1):a===0&&(s=r.length,a=r.length),n=0,c(),y()},g=()=>{const t=a-s;if(n+=t*.28,n*=.64,s+=n,c(),Math.abs(t)<.003&&Math.abs(n)<.003){s=a,i=null,f();return}i=window.requestAnimationFrame(g)},m=t=>{a===d.length-1?(s=1,a=1):a===0&&(s=r.length,a=r.length),l=(l+t+r.length)%r.length,a+=t,n+=t*.18,y(),i||(i=window.requestAnimationFrame(g))},h=()=>{window.clearInterval(p),p=window.setInterval(()=>{m(1)},3200)},v=t=>{m(t),h()};e.classList.add("syrup-carousel-shell"),o.classList.add("syrup-carousel-source-image"),o.setAttribute("aria-hidden","true"),e.insertAdjacentHTML("beforeend",`
        <div class="syrup-carousel-track" aria-live="polite">
            ${d.map((t,u)=>`
                <div class="syrup-carousel-slide" data-real-index="${(u+r.length-1)%r.length}" aria-hidden="${u===1?"false":"true"}">
                    <img class="syrup-carousel-image" src="${t.src}" alt="${t.alt}">
                </div>
            `).join("")}
        </div>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-prev" aria-label="Previous syrup image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6"></path>
            </svg>
        </button>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-next" aria-label="Next syrup image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
            </svg>
        </button>
    `),(I=e.querySelector(".syrup-carousel-prev"))==null||I.addEventListener("click",()=>v(-1)),(S=e.querySelector(".syrup-carousel-next"))==null||S.addEventListener("click",()=>v(1)),c(),h()};document.addEventListener("DOMContentLoaded",async()=>{const e=window.zeroCartApi,o=await E(),l=k(b(O.syrup,o));R({product:l,dom:{optionGridId:"syrup-flavor-grid",sizeSelectorId:"syrup-size-selector",selectedNameId:"selected-flavor-name",selectedDescriptionId:"selected-flavor-description",selectedImageId:"selected-flavor-image",selectedGroupId:"selected-flavor-group",selectedPriceId:"selected-syrup-price",selectedSizeNoteId:"selected-size-note",addButtonId:"add-syrup-to-cart"},defaultOptionId:"plain",defaultSizeId:"250ml",onAdd:s=>{e==null||e.store.addItem(s),e==null||e.openDrawer()}}),A()});
