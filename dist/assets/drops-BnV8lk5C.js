import{l as f,a as D,Z as R,i as Z}from"./index-D0x9zaBy.js";const s=[{src:"/ZERO Media/ZERO Drops Images/Carousel/ZERO Drops Carousel 1.jpg",alt:"ZERO Drops product image"},{src:"/ZERO Media/ZERO Drops Images/Carousel/ZERO Drops Carousel 2.jpg",alt:"ZERO Drops flavor drops image"},{src:"/ZERO Media/ZERO Drops Images/Carousel/ZERO Drops Carousel 3.jpg",alt:"ZERO Drops compact product page image"}],b=e=>{var l;const a=(l=s[0])==null?void 0:l.src;return a?{...e,heroImage:a,options:e.options.map(r=>({...r,image:a}))}:e},S=()=>{var y,w;const e=document.querySelector(".syrup-visual-shell"),a=document.getElementById("selected-drops-image");if(!e||!a||s.length<2)return;let l=0,r=1,o=1,n=0,d=null,p=null;const c=[s[s.length-1],...s,s[0]],u=()=>{e.style.setProperty("--syrup-carousel-position",r)},g=()=>{e.querySelectorAll(".syrup-carousel-slide").forEach((t,i)=>{const C=Number(t.dataset.realIndex),O=i===Math.round(r)&&C===l;t.setAttribute("aria-hidden",O?"false":"true")})},E=()=>{o===c.length-1?(r=1,o=1):o===0&&(r=s.length,o=s.length),n=0,u(),g()},m=()=>{const t=o-r;if(n+=t*.2,n*=.72,r+=n,u(),Math.abs(t)<.003&&Math.abs(n)<.003){r=o,d=null,E();return}d=window.requestAnimationFrame(m)},h=t=>{o===c.length-1?(r=1,o=1):o===0&&(r=s.length,o=s.length),l=(l+t+s.length)%s.length,o+=t,n+=t*.12,g(),d||(d=window.requestAnimationFrame(m))},I=()=>{window.clearInterval(p),p=window.setInterval(()=>{h(1)},3200)},v=t=>{h(t),I()};e.classList.add("syrup-carousel-shell"),a.classList.add("syrup-carousel-source-image"),a.setAttribute("aria-hidden","true"),e.insertAdjacentHTML("beforeend",`
        <div class="syrup-carousel-track" aria-live="polite">
            ${c.map((t,i)=>`
                <div class="syrup-carousel-slide" data-real-index="${(i+s.length-1)%s.length}" aria-hidden="${i===1?"false":"true"}">
                    <img class="syrup-carousel-image" src="${t.src}" alt="${t.alt}">
                </div>
            `).join("")}
        </div>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-prev" aria-label="Previous drops image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6"></path>
            </svg>
        </button>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-next" aria-label="Next drops image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
            </svg>
        </button>
    `),(y=e.querySelector(".syrup-carousel-prev"))==null||y.addEventListener("click",()=>v(-1)),(w=e.querySelector(".syrup-carousel-next"))==null||w.addEventListener("click",()=>v(1)),u(),I()};document.addEventListener("DOMContentLoaded",async()=>{const e=window.zeroCartApi,a=await f(),l=b(D(R.drops,a));Z({product:l,dom:{optionGridId:"drops-flavor-grid",sizeSelectorId:"drops-size-selector",selectedNameId:"selected-drops-name",selectedDescriptionId:"selected-drops-description",selectedImageId:"selected-drops-image",selectedGroupId:"selected-drops-group",selectedPriceId:"selected-drops-price",selectedSizeNoteId:"selected-drops-size-note",addButtonId:"add-drops-to-cart"},defaultOptionId:"plain",defaultSizeId:"30ml",onAdd:r=>{e==null||e.store.addItem(r),e==null||e.openDrawer()}}),S()});
