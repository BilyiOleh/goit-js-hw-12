import{S as v,a as P,i as a}from"./assets/vendor-Bh5aM5FA.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const u=document.querySelector(".gallery"),f=document.querySelector(".loader"),m=document.querySelector(".load-more"),S=new v(".gallery a",{captionsData:"alt",captionDelay:250});function p(r){const e=r.map(o=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${o.largeImageURL}">
          <img
            class="gallery-image"
            src="${o.webformatURL}"
            alt="${o.tags}"
          />
        </a>

        <div class="info">
          <p><b>Likes</b><br>${o.likes}</p>
          <p><b>Views</b><br>${o.views}</p>
          <p><b>Comments</b><br>${o.comments}</p>
          <p><b>Downloads</b><br>${o.downloads}</p>
        </div>

      </li>
    `).join("");u.insertAdjacentHTML("beforeend",e),S.refresh()}function q(){u.innerHTML=""}function h(){f.classList.remove("hidden")}function g(){f.classList.add("hidden")}function M(){m.classList.remove("hidden")}function y(){m.classList.add("hidden")}const R="56466329-080e28ba0c43f88c01656e1cc";async function b(r,e){return(await P.get("https://pixabay.com/api/",{params:{key:R,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}})).data}const L=document.querySelector(".form"),$=document.querySelector(".load-more");let c="",n=1;const w=15;let d=0;L.addEventListener("submit",B);async function B(r){if(r.preventDefault(),c=r.target.elements["search-text"].value.trim(),!c){a.warning({message:"Please fill in the search field!",position:"topRight"});return}n=1,q(),y(),h();try{const e=await b(c,n);if(d=e.totalHits,e.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}p(e.hits),d>w&&M()}catch(e){a.error({message:e.message,position:"topRight"})}finally{g()}L.reset()}$.addEventListener("click",E);async function E(){n++,h();try{const r=await b(c,n);p(r.hits);const e=Math.ceil(d/w);n>=e&&(y(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const i=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}catch(r){a.error({message:r.message,position:"topRight"})}finally{g()}}
//# sourceMappingURL=index.js.map
