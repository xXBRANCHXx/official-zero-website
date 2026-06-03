import{l as m,Z as u,a as g,i as y}from"./index-DTBto6Il.js";document.addEventListener("DOMContentLoaded",async()=>{const a=window.zeroCartApi,e=document.getElementById("quick-add-modal"),r=document.getElementById("quick-add-container"),i=e==null?void 0:e.querySelector(".quick-add-close"),o=e==null?void 0:e.querySelector(".quick-add-backdrop");let n=null;const p=await m();if(!e)return;const c=()=>{e.classList.contains("open")&&(e.classList.remove("open"),e.setAttribute("aria-hidden","true"),document.body.classList.remove("quick-add-open","locked"),window.clearTimeout(n),n=window.setTimeout(()=>{r.innerHTML=""},300))};i==null||i.addEventListener("click",c),o==null||o.addEventListener("click",c),document.addEventListener("keydown",t=>{t.key==="Escape"&&c()}),document.querySelectorAll(".quick-add-trigger").forEach(t=>{t.addEventListener("click",()=>{const l=t.dataset.product;if(!u[l])return;const d=g(u[l],p);window.clearTimeout(n),r.innerHTML=`
                <div class="quick-add-configurator">
                    <div class="quick-add-summary">
                        <div class="showcase-header quick-add-heading">
                            <div>
                                <span class="showcase-badge" id="qa-group"></span>
                                <h3>${d.name}</h3>
                            </div>
                            <strong id="qa-price"></strong>
                        </div>
                        <div class="quick-add-selected">
                            <span>Selected Variant</span>
                            <strong id="qa-name"></strong>
                            <p class="syrup-selection-copy" id="qa-desc"></p>
                        </div>
                        <div class="syrup-size-summary" id="qa-size-note"></div>
                    </div>

                    <div class="quick-add-options syrup-chooser-panel">
                        <div>
                            <strong class="syrup-panel-label">${d.options.length>1?"Choose A Variant":"Variant"}</strong>
                            <div id="qa-flavor-grid" class="syrup-flavor-grid"></div>
                        </div>
                        <div>
                            <strong class="syrup-panel-label">Choose A Size</strong>
                            <div id="qa-size-selector" class="syrup-size-selector"></div>
                        </div>
                        <div class="btn-cluster">
                            <button type="button" id="qa-add-btn" class="n-btn primary">Add To Cart</button>
                        </div>
                    </div>
                </div>
            `,y({product:d,dom:{optionGridId:"qa-flavor-grid",sizeSelectorId:"qa-size-selector",selectedNameId:"qa-name",selectedDescriptionId:"qa-desc",selectedGroupId:"qa-group",selectedPriceId:"qa-price",selectedSizeNoteId:"qa-size-note",addButtonId:"qa-add-btn"},defaultOptionId:d.options[0].id,defaultSizeId:d.sizes[0].id,onAdd:v=>{a==null||a.store.addItem(v);const s=document.getElementById("qa-add-btn");if(s){const q=s.textContent;s.textContent="Added!",setTimeout(()=>{s.textContent=q},1e3)}}}),e.classList.add("open"),e.setAttribute("aria-hidden","false"),document.body.classList.add("quick-add-open","locked")})})});
