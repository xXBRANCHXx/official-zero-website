import"./modulepreload-polyfill-B5Qt9EMX.js";import{l as f,a as b,Z as O,i as T}from"./index-Do4wigxx.js";const a=[{src:"/ZERO Media/ZERO Maple Topping Images/Carousel/Maple Topping Carousel 1.jpg",alt:"ZERO Maple Topping product image"},{src:"/ZERO Media/ZERO Maple Topping Images/Carousel/Maple Topping Carousel 2.jpg",alt:"ZERO Maple Topping pour image"},{src:"/ZERO Media/ZERO Maple Topping Images/Carousel/Maple Topping Carousel 3.jpg",alt:"ZERO Maple Topping online product image"}],A=e=>{var r;const s=(r=a[0])==null?void 0:r.src;return s?{...e,heroImage:s,options:e.options.map(l=>({...l,image:s}))}:e},k=()=>{var v,w;const e=document.querySelector(".syrup-visual-shell"),s=document.getElementById("selected-maple-image");if(!e||!s||a.length<2)return;let r=0,l=1,o=1,i=0,n=null,u=null;const p=[a[a.length-1],...a,a[0]],c=()=>{e.style.setProperty("--syrup-carousel-position",l)},g=()=>{e.querySelectorAll(".syrup-carousel-slide").forEach((t,d)=>{const C=Number(t.dataset.realIndex),E=d===Math.round(l)&&C===r;t.setAttribute("aria-hidden",E?"false":"true")})},M=()=>{o===p.length-1?(l=1,o=1):o===0&&(l=a.length,o=a.length),i=0,c(),g()},m=()=>{const t=o-l;if(i+=t*.2,i*=.72,l+=i,c(),Math.abs(t)<.003&&Math.abs(i)<.003){l=o,n=null,M();return}n=window.requestAnimationFrame(m)},h=t=>{o===p.length-1?(l=1,o=1):o===0&&(l=a.length,o=a.length),r=(r+t+a.length)%a.length,o+=t,i+=t*.12,g(),n||(n=window.requestAnimationFrame(m))},I=()=>{window.clearInterval(u),u=window.setInterval(()=>{h(1)},3200)},y=t=>{h(t),I()};e.classList.add("syrup-carousel-shell"),s.classList.add("syrup-carousel-source-image"),s.setAttribute("aria-hidden","true"),e.insertAdjacentHTML("beforeend",`
        <div class="syrup-carousel-track" aria-live="polite">
            ${p.map((t,d)=>`
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
    `),(v=e.querySelector(".syrup-carousel-prev"))==null||v.addEventListener("click",()=>y(-1)),(w=e.querySelector(".syrup-carousel-next"))==null||w.addEventListener("click",()=>y(1)),c(),I()};document.addEventListener("DOMContentLoaded",async()=>{const e=window.zeroCartApi,s=await f(),r=A(b(O.mapleTopping,s));T({product:r,dom:{optionGridId:"maple-flavor-grid",sizeSelectorId:"maple-size-selector",selectedNameId:"selected-maple-name",selectedDescriptionId:"selected-maple-description",selectedImageId:"selected-maple-image",selectedGroupId:"selected-maple-group",selectedPriceId:"selected-maple-price",selectedSizeNoteId:"selected-maple-size-note",addButtonId:"add-maple-to-cart"},defaultOptionId:"classic-maple",defaultSizeId:"550ml",onAdd:l=>{e==null||e.store.addItem(l),e==null||e.openDrawer()}}),k()});
