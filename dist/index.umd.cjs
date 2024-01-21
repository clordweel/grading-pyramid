(function(o,p){typeof exports=="object"&&typeof module<"u"?module.exports=p():typeof define=="function"&&define.amd?define(p):(o=typeof globalThis<"u"?globalThis:o||self,o.GradingPyramid=p())})(this,function(){"use strict";var k=Object.defineProperty;var L=(o,p,y)=>p in o?k(o,p,{enumerable:!0,configurable:!0,writable:!0,value:y}):o[p]=y;var f=(o,p,y)=>(L(o,typeof p!="symbol"?p+"":p,y),y);let o=[],p=(b,e)=>{let t=[],r={get(){return r.lc||r.listen(()=>{})(),r.value},l:e||0,lc:0,listen(i,a){return r.lc=t.push(i,a||r.l)/2,()=>{let s=t.indexOf(i);~s&&(t.splice(s,2),--r.lc||r.off())}},notify(i){let a=!o.length;for(let s=0;s<t.length;s+=2)o.push(t[s],t[s+1],r.value,i);if(a){for(let s=0;s<o.length;s+=4){let n;for(let d=s+1;!n&&(d+=4)<o.length;)o[d]<o[s+1]&&(n=o.push(o[s],o[s+1],o[s+2],o[s+3]));n||o[s](o[s+2],o[s+3])}o.length=0}},off(){},set(i){r.value!==i&&(r.value=i,r.notify())},subscribe(i,a){let s=r.listen(i,a);return i(r.value),s},value:b};return r};function y(b,e,t){let r=new Set([...e,void 0]);return b.listen((i,a)=>{r.has(a)&&t(i,a)})}let x=(b={})=>{let e=p(b);return e.setKey=function(t,r){typeof r>"u"?t in e.value&&(e.value={...e.value},delete e.value[t],e.notify(t)):e.value[t]!==r&&(e.value={...e.value,[t]:r},e.notify(t))},e};class ${constructor(e,t){f(this,"container");f(this,"store",x());f(this,"defaultOptions",{render:!0,baseGrade:{front:{color:"rgba(120, 120, 120, 0.35)"},back:{color:"rgba(120, 120, 120, 0.35)"},left:{color:"rgba(220, 220, 220, 0.35)"},right:{color:"rgba(220, 220, 220, 0.35)"},top:{color:"rgba(20, 0, 250, 0.55)"},bottom:{color:"rgba(20, 0, 250, 0.55)"}},hideSides:[],running:!0,speed:6e3,scope:"default",gap:10,height:300,width:200,gradesNumber:1,perspective:1500,toolbar:!1,onClick:()=>{}});f(this,"baseGrade");f(this,"scope");f(this,"running");f(this,"onClick");const r=typeof e=="string"?document.querySelector(e):e;if(!r)throw new Error("Target not found");this.container=r;const{render:i,running:a,speed:s,baseGrade:n,scope:d,height:c,width:u,gap:l,gradesNumber:m,perspective:h,hideSides:g,toolbar:v,onClick:w}={...this.defaultOptions,...t};this.scope=d,this.baseGrade=n,this.running=a,this.onClick=w,this.store.set(Object.assign({},this.store.get(),{paused:!a,speed:s,perspective:h,height:c,width:u,gap:l,gradesNumber:m,hideSides:g,toolbar:v})),i&&this.render(),y(this.store,["paused"],({paused:z})=>{z?this.pause(!1):this.play(!1)}),y(this.store,["gradesNumber","gap","height","width","hideSides"],()=>this.rerender())}play(e=!0){document.querySelectorAll(this.cls("grade",!0)).forEach(t=>{const r=t;r.style.animationPlayState="running"}),e&&this.store.setKey("paused",!1)}pause(e=!0){document.querySelectorAll(this.cls("grade",!0)).forEach(t=>{const r=t;r.style.animationPlayState="paused"}),e&&this.store.setKey("paused",!0)}mutate(e,t){this.store.setKey(e,t)}prune(){var e;(e=this.container.querySelector(this.cls("shape",!0)))==null||e.remove()}rerender(){this.prune(),this.render()}render(e){e&&this.store.setKey("grades",e);const{gradesNumber:t,height:r,width:i,gap:a,toolbar:s,grades:n=[]}=this.store.get(),d=Array(t).fill({}).map((l,m)=>n[m]??{}),c=document.createElement("article");c.classList.add(this.cls("shape"));const u=[];for(let l=0;l<d.length;l++){const m=d[l],h={height:r*((l+1)/d.length),width:i*((l+1)/d.length)-a},g={height:h.height/(1+l),margin:l?a:0};u.push(this.computeGrade({pyramid:h,trapezoidal:g},this.gradeDom(m,l)))}c.append(...u),s&&c.append(this.toolbarDom()),this.container.append(c),document.head.querySelector(`style[data-pyramid="${this.scope}"]`)||document.head.append(this.style())}toolbarDom(){const{paused:e}=this.store.get(),t=document.createElement("nav");t.classList.add(this.cls("toolbar"));const r=document.createElement("button");r.innerText=e?"▶️":"⏸️",y(this.store,["paused"],({paused:a})=>{r.innerText=a?"▶️":"⏸️"}),r.addEventListener("click",()=>{this.store.setKey("paused",!this.store.get().paused)});const i=document.createElement("input");return i.type="number",i.value=this.store.get().gradesNumber.toString(),i.min="1",i.addEventListener("change",a=>{var n;const s=(n=a.target)==null?void 0:n.value;this.mutate("gradesNumber",parseInt(s,10))},!1),t.append(r,i),t}hoverGrade(e){const{paused:t}=this.store.get();!t&&this.store.setKey("paused",!0),e.target.classList.add(this.cls("-hover"))}leaveGrade(e){this.running&&this.store.setKey("paused",!1),e.target.classList.remove(this.cls("-hover"))}clickGrade(e){this.onClick(e)}gradeDom(e,t){const{gradesNumber:r,hideSides:i}=this.store.get(),a=document.createElement("section");a.classList.add(this.cls("grade")),a.style.zIndex=`${r-t}`,a.style.animationPlayState=this.running?"running":"paused",a.addEventListener("mouseenter",this.hoverGrade.bind(this)),a.addEventListener("mouseleave",this.leaveGrade.bind(this)),a.addEventListener("click",this.clickGrade.bind(this));const s=["front","back","left","right","top","bottom"].map(n=>{const{color:d,text:c,textColor:u,hide:l}={...this.baseGrade[n],...e[n]};if(typeof l=="boolean"&&l||i.includes(n))return"";const m=["top","bottom"].includes(n),h=document.createElement("aside");h.classList.add(this.cls(m?"base":"face")),h.classList.add(this.cls("side")),h.classList.add(this.cls(n)),m?d&&(h.style.backgroundColor=d):d&&(h.style.borderBottomColor=d);const g=document.createElement("span");return g.classList.add(this.cls("text")),c&&(g.textContent=c),u&&(g.style.color=u),h.append(g),h});return a.append(...s),a}computeGrade(e,t){function r(h,g){var v=Math.atan(h/g),w=v*(180/Math.PI);return w}function i(h,g){var v=Math.sqrt(Math.pow(h,2)+Math.pow(g,2));return v}const a={height:400,width:200,...e.pyramid},s=i(a.height,a.width/2),n=i(s,a.width/2),d=90-r(s,a.width/2),c={height:40,margin:5,...e.trapezoidal},u=c.height/a.height,l=a.width/2*(1-u)-s*u,m=s*u+c.margin;return t.style.setProperty("--pyramid-trapezoidal-top-offset",`${l}`),t.style.setProperty("--pyramid-degrees",`${d}`),t.style.setProperty("--pyramid-width",`${a.width}`),t.style.setProperty("--pyramid-hypotenuse-length",`${n*u}`),t.style.setProperty("--pyramid-height",`${a.height}`),t.style.setProperty("--pyramid-slant-height",`${s}`),t.style.setProperty("--pyramid-trapezoidal-slant-height",`${m}`),t.style.setProperty("--pyramid-trapezoidal-height",`${c.height}`),t}cls(e,t){return`${t?".":""}pyramid-${e}-${this.scope}`}style(){const{perspective:e,speed:t}=this.store.get(),r=document.createElement("style");return r.dataset.pyramid=this.scope,r.innerHTML=`
.${this.cls("shape")} {
  perspective: ${e}px;
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
  animation: ${this.cls("spinning")} ${t/1e3}s infinite linear;
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
