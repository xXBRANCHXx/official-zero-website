import{i as p,Z as v}from"./index-CZvLEIgn.js";document.addEventListener("DOMContentLoaded",()=>{const t=window.zeroCartApi,s=document.getElementById("quick-add-modal"),o=document.getElementById("quick-add-container"),n=document.querySelector(".quick-add-close"),c=document.querySelector(".quick-add-backdrop");if(!s)return;const a=()=>{s.classList.remove("open"),setTimeout(()=>{o.innerHTML=""},300)};n.addEventListener("click",a),c.addEventListener("click",a),document.querySelectorAll(".quick-add-trigger").forEach(i=>{i.addEventListener("click",()=>{const r=i.dataset.product,e=v[r];e&&(o.innerHTML=`
                <div class="syrup-configurator">
                    <div class="showcase-panel">
                        <div class="showcase-header">
                            <div>
                                <span class="showcase-badge" id="qa-group"></span>
                                <h3 id="qa-name"></h3>
                            </div>
                            <strong id="qa-price"></strong>
                        </div>
                        <p class="syrup-selection-copy" id="qa-desc"></p>
                        <div class="syrup-visual-shell">
                            <img id="qa-img" src="" alt="">
                        </div>
                        <div class="syrup-size-summary" id="qa-size-note"></div>
                    </div>

                    <div class="feature-wireframe syrup-chooser-panel">
                        <div>
                            <strong class="syrup-panel-label">Choose A Flavor</strong>
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
            `,p({product:e,dom:{optionGridId:"qa-flavor-grid",sizeSelectorId:"qa-size-selector",selectedNameId:"qa-name",selectedDescriptionId:"qa-desc",selectedImageId:"qa-img",selectedGroupId:"qa-group",selectedPriceId:"qa-price",selectedSizeNoteId:"qa-size-note",addButtonId:"qa-add-btn"},defaultOptionId:e.options[0].id,defaultSizeId:e.sizes[0].id,onAdd:l=>{t==null||t.store.addItem(l);const d=document.getElementById("qa-add-btn");if(d){const u=d.textContent;d.textContent="Added!",setTimeout(()=>{d.textContent=u},1e3)}}}),s.classList.add("open"))})})});
