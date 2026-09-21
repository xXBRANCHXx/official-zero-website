import"./modulepreload-polyfill-B5Qt9EMX.js";import{l as C,a as S,Z as k,i as E}from"./index-DfkkDF5h.js";import{Z as L}from"./product-galleries-C_psQNvT.js";const a=L.mapleTopping,P=e=>{var r;const o=(r=a[0])==null?void 0:r.src;return o?{...e,heroImage:o,options:e.options.map(s=>({...s,image:o}))}:e},x=()=>{var v,w;const e=document.querySelector(".syrup-visual-shell"),o=document.getElementById("selected-maple-image");if(!e||!o||a.length<2)return;let r=0,s=1,l=1,n=0,i=null,p=null;const c=[a[a.length-1],...a,a[0]],u=()=>{e.style.setProperty("--syrup-carousel-position",s)},m=()=>{e.querySelectorAll(".syrup-carousel-slide").forEach((t,d)=>{const b=Number(t.dataset.realIndex),A=d===Math.round(s)&&b===r;t.setAttribute("aria-hidden",A?"false":"true")})},f=()=>{l===c.length-1?(s=1,l=1):l===0&&(s=a.length,l=a.length),n=0,u(),m()},g=()=>{const t=l-s;if(n+=t*.2,n*=.72,s+=n,u(),Math.abs(t)<.003&&Math.abs(n)<.003){s=l,i=null,f();return}i=window.requestAnimationFrame(g)},h=t=>{l===c.length-1?(s=1,l=1):l===0&&(s=a.length,l=a.length),r=(r+t+a.length)%a.length,l+=t,n+=t*.12,m(),i||(i=window.requestAnimationFrame(g))},I=()=>{window.clearInterval(p),p=window.setInterval(()=>{h(1)},3200)},y=t=>{h(t),I()};e.classList.add("syrup-carousel-shell"),o.classList.add("syrup-carousel-source-image"),o.setAttribute("aria-hidden","true"),e.insertAdjacentHTML("beforeend",`
        <div class="syrup-carousel-track" aria-live="polite">
            ${c.map((t,d)=>`
                <div class="syrup-carousel-slide" data-real-index="${(d+a.length-1)%a.length}" aria-hidden="${d===1?"false":"true"}">
                    <img class="syrup-carousel-image" src="${t.src}" alt="${t.alt}">
                </div>
            `).join("")}
        </div>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-prev" aria-label="Previous maple topping image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6"></path>
            </svg>
        </button>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-next" aria-label="Next maple topping image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
            </svg>
        </button>
    `),(v=e.querySelector(".syrup-carousel-prev"))==null||v.addEventListener("click",()=>y(-1)),(w=e.querySelector(".syrup-carousel-next"))==null||w.addEventListener("click",()=>y(1)),u(),I()};document.addEventListener("DOMContentLoaded",async()=>{const e=window.zeroCartApi,o=await C(),r=P(S(k.mapleTopping,o));E({product:r,dom:{optionGridId:"maple-flavor-grid",sizeSelectorId:"maple-size-selector",selectedNameId:"selected-maple-name",selectedDescriptionId:"selected-maple-description",selectedImageId:"selected-maple-image",selectedGroupId:"selected-maple-group",selectedPriceId:"selected-maple-price",selectedSizeNoteId:"selected-maple-size-note",addButtonId:"add-maple-to-cart"},defaultOptionId:"classic-maple",defaultSizeId:"550ml",onAdd:s=>{e==null||e.store.addItem(s),e==null||e.openDrawer()}}),x()});
