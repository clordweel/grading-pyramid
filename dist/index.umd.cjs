(function(o,p){typeof exports=="object"&&typeof module<"u"?module.exports=p():typeof define=="function"&&define.amd?define(p):(o=typeof globalThis<"u"?globalThis:o||self,o.GradingPyramid=p())})(this,function(){"use strict";var E=Object.defineProperty;var G=(o,p,m)=>p in o?E(o,p,{enumerable:!0,configurable:!0,writable:!0,value:m}):o[p]=m;var y=(o,p,m)=>(G(o,typeof p!="symbol"?p+"":p,m),m);let o=[],p=(b,t)=>{let e=[],r={get(){return r.lc||r.listen(()=>{})(),r.value},l:t||0,lc:0,listen(i,s){return r.lc=e.push(i,s||r.l)/2,()=>{let a=e.indexOf(i);~a&&(e.splice(a,2),--r.lc||r.off())}},notify(i){let s=!o.length;for(let a=0;a<e.length;a+=2)o.push(e[a],e[a+1],r.value,i);if(s){for(let a=0;a<o.length;a+=4){let n;for(let l=a+1;!n&&(l+=4)<o.length;)o[l]<o[a+1]&&(n=o.push(o[a],o[a+1],o[a+2],o[a+3]));n||o[a](o[a+2],o[a+3])}o.length=0}},off(){},set(i){r.value!==i&&(r.value=i,r.notify())},subscribe(i,s){let a=r.listen(i,s);return i(r.value),a},value:b};return r};function m(b,t,e){let r=new Set([...t,void 0]);return b.listen((i,s)=>{r.has(s)&&e(i,s)})}let x=(b={})=>{let t=p(b);return t.setKey=function(e,r){typeof r>"u"?e in t.value&&(t.value={...t.value},delete t.value[e],t.notify(e)):t.value[e]!==r&&(t.value={...t.value,[e]:r},t.notify(e))},t};class ${constructor(t,e){y(this,"mounted");y(this,"container");y(this,"store",x());y(this,"defaultOptions",{immediate:!0,baseGrade:{front:{color:"rgba(120, 120, 120, 0.35)"},back:{color:"rgba(120, 120, 120, 0.35)"},left:{color:"rgba(220, 220, 220, 0.35)"},right:{color:"rgba(220, 220, 220, 0.35)"},top:{color:"rgba(20, 0, 250, 0.55)"},bottom:{color:"rgba(20, 0, 250, 0.55)"}},hideSides:[],running:!0,speed:6e3,scope:"default",gap:10,height:300,width:200,gradesNumber:1,perspective:1500,toolbar:!1,onClick:()=>{}});y(this,"baseGrade");y(this,"scope");y(this,"running");y(this,"onClick");const r=typeof t=="string"?document.querySelector(t):t;if(!r)throw new Error("Target not found");this.container=r;const{immediate:i,running:s,speed:a,baseGrade:n,scope:l,height:d,width:c,gap:g,gradesNumber:f,perspective:h,hideSides:u,toolbar:v,onClick:w}={...this.defaultOptions,...e};this.scope=l,this.baseGrade=n,this.running=s,this.onClick=w,this.store.set(Object.assign({},this.store.get(),{paused:!s,speed:a,perspective:h,height:d,width:c,gap:g,gradesNumber:f,hideSides:u,toolbar:v})),i&&this.mount(),m(this.store,["paused"],({paused:z})=>{z?this.pause(!1):this.play(!1)}),m(this.store,["gradesNumber","gap","grades","height","width","hideSides"],()=>{this.mounted=this.mounted||!!document.querySelector(this.cls("shape",!0)),this.mounted?(this.prune(),this.mount()):this.render()})}play(t=!0){document.querySelectorAll(this.cls("grade",!0)).forEach(e=>{const r=e;r.style.animationPlayState="running"}),t&&this.store.setKey("paused",!1)}pause(t=!0){document.querySelectorAll(this.cls("grade",!0)).forEach(e=>{const r=e;r.style.animationPlayState="paused"}),t&&this.store.setKey("paused",!0)}mutate(t,e){this.store.setKey(t,e)}setGrades(t){this.store.setKey("grades",t)}setGradesNumber(t){this.store.setKey("gradesNumber",t)}prune(){var t;(t=this.container.querySelector(this.cls("shape",!0)))==null||t.remove()}mount(){const{toolbar:t}=this.store.get(),e=this.render();t&&e.append(this.toolbarDom()),this.container.append(e),document.head.querySelector(`style[data-pyramid="${this.scope}"]`)||document.head.append(this.style())}render(){const{gradesNumber:t,height:e,width:r,gap:i,grades:s=[]}=this.store.get(),a=Array(t).fill({}).map((d,c)=>s[c]??{}),n=document.createElement("article");n.classList.add(this.cls("shape"));const l=[];for(let d=0;d<a.length;d++){const c=a[d],g={height:e*((d+1)/a.length),width:r*((d+1)/a.length)-i},f={height:g.height/(1+d),margin:d?i:0};l.push(this.computeGrade({pyramid:g,trapezoidal:f},this.gradeDom(c,d)))}return n.append(...l),n}toolbarDom(){const{paused:t}=this.store.get(),e=document.createElement("nav");e.classList.add(this.cls("toolbar"));const r=document.createElement("button");r.innerText=t?"▶️":"⏸️",m(this.store,["paused"],({paused:s})=>{r.innerText=s?"▶️":"⏸️"}),r.addEventListener("click",()=>{this.store.setKey("paused",!this.store.get().paused)});const i=document.createElement("input");return i.type="number",i.value=this.store.get().gradesNumber.toString(),i.min="1",i.addEventListener("change",s=>{var n;const a=(n=s.target)==null?void 0:n.value;this.mutate("gradesNumber",parseInt(a,10))},!1),e.append(r,i),e}hoverGrade(t){const{paused:e}=this.store.get();!e&&this.store.setKey("paused",!0),t.target.classList.add(this.cls("-hover"))}leaveGrade(t){this.running&&this.store.setKey("paused",!1),t.target.classList.remove(this.cls("-hover"))}clickGrade(t,e){this.onClick(t,e)}gradeDom(t,e){const{gradesNumber:r,hideSides:i}=this.store.get(),s=document.createElement("section");s.classList.add(this.cls("grade")),s.style.zIndex=`${r-e}`,s.style.animationPlayState=this.running?"running":"paused",s.addEventListener("mouseenter",this.hoverGrade.bind(this)),s.addEventListener("mouseleave",this.leaveGrade.bind(this));const a=["front","back","left","right","top","bottom"].map(n=>{const{color:l,text:d,textColor:c,hide:g}={...this.baseGrade[n],...t[n]};if(typeof g=="boolean"&&g||i.includes(n))return"";const f=["top","bottom"].includes(n),h=document.createElement("aside");h.addEventListener("click",this.clickGrade.bind(this,{side:n,level:e+1})),h.classList.add(this.cls(f?"base":"face")),h.classList.add(this.cls("side")),h.classList.add(this.cls(n)),f?l&&(h.style.backgroundColor=l):l&&(h.style.borderBottomColor=l);const u=document.createElement("span");return u.classList.add(this.cls("text")),d&&(u.textContent=d),c&&(u.style.color=c),h.append(u),h});return s.append(...a),s}computeGrade(t,e){function r(h,u){var v=Math.atan(h/u),w=v*(180/Math.PI);return w}function i(h,u){var v=Math.sqrt(Math.pow(h,2)+Math.pow(u,2));return v}const s={height:400,width:200,...t.pyramid},a=i(s.height,s.width/2),n=i(a,s.width/2),l=90-r(a,s.width/2),d={height:40,margin:5,...t.trapezoidal},c=d.height/s.height,g=s.width/2*(1-c)-a*c,f=a*c+d.margin;return e.style.setProperty("--pyramid-trapezoidal-top-offset",`${g}`),e.style.setProperty("--pyramid-degrees",`${l}`),e.style.setProperty("--pyramid-width",`${s.width}`),e.style.setProperty("--pyramid-hypotenuse-length",`${n*c}`),e.style.setProperty("--pyramid-height",`${s.height}`),e.style.setProperty("--pyramid-slant-height",`${a}`),e.style.setProperty("--pyramid-trapezoidal-slant-height",`${f}`),e.style.setProperty("--pyramid-trapezoidal-height",`${d.height}`),e}cls(t,e){return`${e?".":""}pyramid-${t}-${this.scope}`}style(){const{perspective:t,speed:e}=this.store.get(),r=document.createElement("style");return r.dataset.pyramid=this.scope,r.innerHTML=`
.${this.cls("shape")} {
  perspective: ${t}px;
  perspective-origin: 50% 50%;
  position: relative;
}
.${this.cls("grade")} {
  /* 倾斜角度 */
  --pyramid-degrees: 30;
  /* 底边长度 */
  --pyramid-width: 200;
  /* 斜边长度 */
  --pyramid-hypotenuse-length: 200;

  /* 金字塔高度 */
  --pyramid-height: 200;
  /* 梯形金字塔高度，低于金字塔高度时显示 */
  --pyramid-trapezoidal-height: 200;

  --pyramid-trapezoidal-ratio: calc(
    var(--pyramid-trapezoidal-height) / var(--pyramid-height)
  );

  --pyramid-trapezoidal-width: calc(
    (1 - var(--pyramid-trapezoidal-ratio)) * var(--pyramid-width)
  );

  --pyramid-use-width: calc(var(--pyramid-width) * 1px);
  --pyramid-use-height: calc(var(--pyramid-height) * 1px);

  --pyramid-use-trapezoidal-width: calc(
    var(--pyramid-trapezoidal-width) * 1px
  );
  --pyramid-use-trapezoidal-height: calc(
    var(--pyramid-trapezoidal-height) * 1px
  );
  --pyramid-use-hypotenuse-length: calc(
    var(--pyramid-hypotenuse-length) * 1px
  );

  --pyramid-use-border-side-width: calc(
    (var(--pyramid-trapezoidal-ratio) * var(--pyramid-width) / 2) * 1px
  );
  --pyramid-use-offset: calc(var(--pyramid-width) / 2 * 1px);
  --pyramid-use-rotate: calc(1deg * var(--pyramid-degrees));

  position: relative;
  width: var(--pyramid-use-width);
  height: calc(var(--pyramid-trapezoidal-slant-height) * 1px);
  margin: 0 auto;
  transform-style: preserve-3d;
  transform: rotateY(70deg);
}
.${this.cls("face")} {
  position: absolute;
  bottom: 0;
  width: var(--pyramid-use-width);
  height: 0;
  border-left: var(--pyramid-use-border-side-width) solid transparent;
  border-right: var(--pyramid-use-border-side-width) solid transparent;
  text-align: center;
  line-height: var(--pyramid-use-hypotenuse-length);
  transform-origin: 50% 100%;
  box-sizing: border-box;
}
.${this.cls("front")} {
  transform: translateZ(var(--pyramid-use-offset))
    rotateX(var(--pyramid-use-rotate));
  border-bottom: var(--pyramid-use-hypotenuse-length) solid
    rgba(255, 0, 0, 0.5);
}
.${this.cls("right")} {
  transform: rotateY(90deg) translateZ(var(--pyramid-use-offset))
    rotateX(var(--pyramid-use-rotate));
  border-bottom: var(--pyramid-use-hypotenuse-length) solid
    rgba(0, 255, 0, 0.5);
}
.${this.cls("back")} {
  transform: rotateY(180deg) translateZ(var(--pyramid-use-offset))
    rotateX(var(--pyramid-use-rotate));
  border-bottom: var(--pyramid-use-hypotenuse-length) solid
    rgba(0, 0, 255, 0.5);
}
.${this.cls("left")} {
  transform: rotateY(-90deg) translateZ(var(--pyramid-use-offset))
    rotateX(var(--pyramid-use-rotate));
  border-bottom: var(--pyramid-use-hypotenuse-length) solid
    rgba(255, 255, 0, 0.5);
}

.${this.cls("base")} {
  transform: rotateX(-90deg) translateZ(var(--pyramid-use-offset));
  position: absolute;
  background: rgba(255, 0, 0, 0.5);
  text-align: center;
  width: var(--pyramid-use-width);
  height: var(--pyramid-use-width);
  bottom: 0;
}
.${this.cls("bottom")} {
  background: rgba(255, 0, 0, 0.5);
  line-height: var(--pyramid-use-width);
}
.${this.cls("top")} {
  left: 50%;
  margin-left: calc(var(--pyramid-use-trapezoidal-width) / 2 * -1);
  transform: rotateX(-90deg) translateZ(calc((var(--pyramid-trapezoidal-top-offset)) * 1px));
  background: rgba(255, 0, 0, 0.5);
  width: var(--pyramid-use-trapezoidal-width);
  height: var(--pyramid-use-trapezoidal-width);
  line-height: var(--pyramid-use-trapezoidal-width);
  overflow: hidden;
}

.${this.cls("text")} {
  display: block;
  opacity: 1;
  user-select: none;
}

.${this.cls("grade")}.${this.cls("-hover")} .${this.cls("side")} {
  opacity: .65;
}

.${this.cls("grade")} {
  animation: ${this.cls("spinning")} ${e/1e3}s infinite linear;
}

@keyframes ${this.cls("spinning")} {
  from {
    transform: rotateY(45deg);
  }
  to {
    transform: rotateY(405deg);
  }
}

.${this.cls("toolbar")} {
  position: absolute;
  bottom: -124px;
  left: 0;
  right: 0;
  margin: auto;
  background: #f1f1f1;
  border: 1px solid #d1d1d1;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  padding: 8px 16px;
  border-radius: 990px;
  width: 140px;
  height: 42px;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
}
.${this.cls("toolbar")} input {
  border: none;
  border-radius: 2px;
  padding: 4px 8px;
  padding-right: 4px;
  cursor: pointer;
  line-height: 1;
  scale: 1.4;
  width: 3em;
  text-align: center;
  border-radius: 999px;
}
.${this.cls("toolbar")} button {
  background: transparent;
  border: none;
  border-radius: 2px;
  padding: 4px 8px;
  cursor: pointer;
  line-height: 1;
  scale: 1.4;
}
`,r}}return $});
