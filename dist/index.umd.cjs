(function(o,h){typeof exports=="object"&&typeof module<"u"?module.exports=h():typeof define=="function"&&define.amd?define(h):(o=typeof globalThis<"u"?globalThis:o||self,o.GradingPyramid=h())})(this,function(){"use strict";var E=Object.defineProperty;var k=(o,h,y)=>h in o?E(o,h,{enumerable:!0,configurable:!0,writable:!0,value:y}):o[h]=y;var f=(o,h,y)=>(k(o,typeof h!="symbol"?h+"":h,y),y);let o=[],h=(b,t)=>{let e=[],r={get(){return r.lc||r.listen(()=>{})(),r.value},l:t||0,lc:0,listen(i,a){return r.lc=e.push(i,a||r.l)/2,()=>{let s=e.indexOf(i);~s&&(e.splice(s,2),--r.lc||r.off())}},notify(i){let a=!o.length;for(let s=0;s<e.length;s+=2)o.push(e[s],e[s+1],r.value,i);if(a){for(let s=0;s<o.length;s+=4){let n;for(let l=s+1;!n&&(l+=4)<o.length;)o[l]<o[s+1]&&(n=o.push(o[s],o[s+1],o[s+2],o[s+3]));n||o[s](o[s+2],o[s+3])}o.length=0}},off(){},set(i){r.value!==i&&(r.value=i,r.notify())},subscribe(i,a){let s=r.listen(i,a);return i(r.value),s},value:b};return r};function y(b,t,e){let r=new Set([...t,void 0]);return b.listen((i,a)=>{r.has(a)&&e(i,a)})}let x=(b={})=>{let t=h(b);return t.setKey=function(e,r){typeof r>"u"?e in t.value&&(t.value={...t.value},delete t.value[e],t.notify(e)):t.value[e]!==r&&(t.value={...t.value,[e]:r},t.notify(e))},t};class ${constructor(t,e){f(this,"container");f(this,"store",x());f(this,"defaultOptions",{render:!0,baseGrade:{front:{color:"rgba(120, 120, 120, 0.35)"},back:{color:"rgba(120, 120, 120, 0.35)"},left:{color:"rgba(220, 220, 220, 0.35)"},right:{color:"rgba(220, 220, 220, 0.35)"},top:{color:"rgba(20, 0, 250, 0.55)"},bottom:{color:"rgba(20, 0, 250, 0.55)"}},hideSides:[],running:!0,speed:6e3,scope:"default",gap:10,height:300,width:200,gradesNumber:1,perspective:1500,toolbar:!1,onClick:()=>{}});f(this,"baseGrade");f(this,"scope");f(this,"running");f(this,"onClick");const r=typeof t=="string"?document.querySelector(t):t;if(!r)throw new Error("Target not found");this.container=r;const{render:i,running:a,speed:s,baseGrade:n,scope:l,height:c,width:u,gap:p,gradesNumber:g,perspective:d,hideSides:m,toolbar:v,onClick:w}={...this.defaultOptions,...e};this.scope=l,this.baseGrade=n,this.running=a,this.onClick=w,this.store.set(Object.assign({},this.store.get(),{paused:!a,speed:s,perspective:d,height:c,width:u,gap:p,gradesNumber:g,hideSides:m,toolbar:v})),i&&this.render(),y(this.store,["paused"],({paused:z})=>{z?this.pause(!1):this.play(!1)}),y(this.store,["gradesNumber","gap","height","width","hideSides"],()=>this.rerender())}play(t=!0){document.querySelectorAll(this.cls("grade",!0)).forEach(e=>{const r=e;r.style.animationPlayState="running"}),t&&this.store.setKey("paused",!1)}pause(t=!0){document.querySelectorAll(this.cls("grade",!0)).forEach(e=>{const r=e;r.style.animationPlayState="paused"}),t&&this.store.setKey("paused",!0)}mutate(t,e){this.store.setKey(t,e)}prune(){var t;(t=this.container.querySelector(this.cls("shape",!0)))==null||t.remove()}rerender(){this.prune(),this.render()}render(t){t&&this.store.setKey("grades",t);const{gradesNumber:e,height:r,width:i,gap:a,toolbar:s,grades:n=[]}=this.store.get(),l=Array(e).fill({}).map((p,g)=>n[g]??{}),c=document.createElement("article");c.classList.add(this.cls("shape"));const u=[];for(let p=0;p<l.length;p++){const g=l[p],d={height:r*((p+1)/l.length),width:i*((p+1)/l.length)-a},m={height:d.height/(1+p),margin:p?a:0};u.push(this.computeGrade({pyramid:d,trapezoidal:m},this.gradeDom(g,p)))}c.append(...u),s&&c.append(this.toolbarDom()),this.container.append(c),document.head.querySelector(`style[data-pyramid="${this.scope}"]`)||document.head.append(this.style())}toolbarDom(){const{paused:t}=this.store.get(),e=document.createElement("nav");e.classList.add(this.cls("toolbar"));const r=document.createElement("button");r.innerText=t?"▶️":"⏸️",y(this.store,["paused"],({paused:a})=>{r.innerText=a?"▶️":"⏸️"}),r.addEventListener("click",()=>{this.store.setKey("paused",!this.store.get().paused)});const i=document.createElement("input");return i.type="number",i.value=this.store.get().gradesNumber.toString(),i.min="1",i.addEventListener("change",a=>{var n;const s=(n=a.target)==null?void 0:n.value;this.mutate("gradesNumber",parseInt(s,10))},!1),e.append(r,i),e}hoverGrade(t){const{paused:e}=this.store.get();!e&&this.store.setKey("paused",!0),t.target.classList.add(this.cls("-hover"))}leaveGrade(t){this.running&&this.store.setKey("paused",!1),t.target.classList.remove(this.cls("-hover"))}clickGrade(t,e){this.onClick(t,e)}gradeDom(t,e){const{gradesNumber:r,hideSides:i}=this.store.get(),a=document.createElement("section");a.classList.add(this.cls("grade")),a.style.zIndex=`${r-e}`,a.style.animationPlayState=this.running?"running":"paused",a.addEventListener("mouseenter",this.hoverGrade.bind(this)),a.addEventListener("mouseleave",this.leaveGrade.bind(this));const s=["front","back","left","right","top","bottom"].map(n=>{const{color:l,text:c,textColor:u,hide:p}={...this.baseGrade[n],...t[n]};if(typeof p=="boolean"&&p||i.includes(n))return"";const g=["top","bottom"].includes(n),d=document.createElement("aside");d.addEventListener("click",this.clickGrade.bind(this,{side:n,level:e+1})),d.classList.add(this.cls(g?"base":"face")),d.classList.add(this.cls("side")),d.classList.add(this.cls(n)),g?l&&(d.style.backgroundColor=l):l&&(d.style.borderBottomColor=l);const m=document.createElement("span");return m.classList.add(this.cls("text")),c&&(m.textContent=c),u&&(m.style.color=u),d.append(m),d});return a.append(...s),a}computeGrade(t,e){function r(d,m){var v=Math.atan(d/m),w=v*(180/Math.PI);return w}function i(d,m){var v=Math.sqrt(Math.pow(d,2)+Math.pow(m,2));return v}const a={height:400,width:200,...t.pyramid},s=i(a.height,a.width/2),n=i(s,a.width/2),l=90-r(s,a.width/2),c={height:40,margin:5,...t.trapezoidal},u=c.height/a.height,p=a.width/2*(1-u)-s*u,g=s*u+c.margin;return e.style.setProperty("--pyramid-trapezoidal-top-offset",`${p}`),e.style.setProperty("--pyramid-degrees",`${l}`),e.style.setProperty("--pyramid-width",`${a.width}`),e.style.setProperty("--pyramid-hypotenuse-length",`${n*u}`),e.style.setProperty("--pyramid-height",`${a.height}`),e.style.setProperty("--pyramid-slant-height",`${s}`),e.style.setProperty("--pyramid-trapezoidal-slant-height",`${g}`),e.style.setProperty("--pyramid-trapezoidal-height",`${c.height}`),e}cls(t,e){return`${e?".":""}pyramid-${t}-${this.scope}`}style(){const{perspective:t,speed:e}=this.store.get(),r=document.createElement("style");return r.dataset.pyramid=this.scope,r.innerHTML=`
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
