(function(o,h){typeof exports=="object"&&typeof module<"u"?module.exports=h():typeof define=="function"&&define.amd?define(h):(o=typeof globalThis<"u"?globalThis:o||self,o.GradingPyramid=h())})(this,function(){"use strict";var z=Object.defineProperty;var k=(o,h,g)=>h in o?z(o,h,{enumerable:!0,configurable:!0,writable:!0,value:g}):o[h]=g;var y=(o,h,g)=>(k(o,typeof h!="symbol"?h+"":h,g),g);let o=[],h=(b,e)=>{let t=[],r={get(){return r.lc||r.listen(()=>{})(),r.value},l:e||0,lc:0,listen(s,i){return r.lc=t.push(s,i||r.l)/2,()=>{let a=t.indexOf(s);~a&&(t.splice(a,2),--r.lc||r.off())}},notify(s){let i=!o.length;for(let a=0;a<t.length;a+=2)o.push(t[a],t[a+1],r.value,s);if(i){for(let a=0;a<o.length;a+=4){let l;for(let n=a+1;!l&&(n+=4)<o.length;)o[n]<o[a+1]&&(l=o.push(o[a],o[a+1],o[a+2],o[a+3]));l||o[a](o[a+2],o[a+3])}o.length=0}},off(){},set(s){r.value!==s&&(r.value=s,r.notify())},subscribe(s,i){let a=r.listen(s,i);return s(r.value),a},value:b};return r};function g(b,e,t){let r=new Set([...e,void 0]);return b.listen((s,i)=>{r.has(i)&&t(s,i)})}let x=(b={})=>{let e=h(b);return e.setKey=function(t,r){typeof r>"u"?t in e.value&&(e.value={...e.value},delete e.value[t],e.notify(t)):e.value[t]!==r&&(e.value={...e.value,[t]:r},e.notify(t))},e};class ${constructor(e,t){y(this,"container");y(this,"store",x());y(this,"defaultOptions",{render:!0,baseGrade:{front:{color:"rgba(120, 120, 120, 0.35)"},back:{color:"rgba(120, 120, 120, 0.35)"},left:{color:"rgba(220, 220, 220, 0.35)"},right:{color:"rgba(220, 220, 220, 0.35)"},top:{color:"rgba(20, 0, 250, 0.55)"},bottom:{color:"rgba(20, 0, 250, 0.55)"}},running:!0,speed:6e3,scope:"default",gap:10,height:300,width:200,gradesNumber:1,perspective:2e3,toolbar:!1,onClick:()=>{}});y(this,"baseGrade");y(this,"scope");y(this,"running");y(this,"onClick");const r=typeof e=="string"?document.querySelector(e):e;if(!r)throw new Error("Target not found");this.container=r;const{render:s,running:i,speed:a,baseGrade:l,scope:n,height:p,width:c,gap:d,gradesNumber:u,perspective:m,toolbar:f,onClick:v}={...this.defaultOptions,...t};this.scope=n,this.baseGrade=l,this.running=i,this.onClick=v,this.store.set(Object.assign({},this.store.get(),{paused:!i,speed:a,perspective:m,height:p,width:c,gap:d,gradesNumber:u,toolbar:f})),s&&this.render(),g(this.store,["paused"],({paused:w})=>{w?this.pause(!1):this.play(!1)}),g(this.store,["gradesNumber","gap","height","width"],()=>this.rerender())}play(e=!0){document.querySelectorAll(this.cls("grade",!0)).forEach(t=>{const r=t;r.style.animationPlayState="running"}),e&&this.store.setKey("paused",!1)}pause(e=!0){document.querySelectorAll(this.cls("grade",!0)).forEach(t=>{const r=t;r.style.animationPlayState="paused"}),e&&this.store.setKey("paused",!0)}mutate(e,t){this.store.setKey(e,t)}prune(){var e;(e=this.container.querySelector(this.cls("shape",!0)))==null||e.remove()}rerender(){this.prune(),this.render()}render(e){e&&this.store.setKey("grades",e);const{gradesNumber:t,height:r,width:s,gap:i,toolbar:a,grades:l=[]}=this.store.get(),n=Array(t).fill({}).map((d,u)=>l[u]??{}),p=document.createElement("article");p.classList.add(this.cls("shape"));const c=[];for(let d=0;d<n.length;d++){const u=n[d],m={height:r*((d+1)/n.length),width:s*((d+1)/n.length)-i},f={height:m.height/(1+d),margin:d?i:0};c.push(this.computeGrade({pyramid:m,trapezoidal:f},this.gradeDom(u,d)))}p.append(...c),a&&p.append(this.toolbarDom()),this.container.append(p),document.head.querySelector(`style[data-pyramid="${this.scope}"]`)||document.head.append(this.style())}toolbarDom(){const{paused:e}=this.store.get(),t=document.createElement("nav");t.classList.add(this.cls("toolbar"));const r=document.createElement("button");r.innerText=e?"▶️":"⏸️",g(this.store,["paused"],({paused:i})=>{r.innerText=i?"▶️":"⏸️"}),r.addEventListener("click",()=>{this.store.setKey("paused",!this.store.get().paused)});const s=document.createElement("input");return s.type="number",s.value=this.store.get().gradesNumber.toString(),s.min="1",s.addEventListener("change",i=>{var l;const a=(l=i.target)==null?void 0:l.value;this.mutate("gradesNumber",parseInt(a,10))},!1),t.append(r,s),t}hoverGrade(e){const{paused:t}=this.store.get();!t&&this.store.setKey("paused",!0),e.target.classList.add(this.cls("-hover"))}leaveGrade(e){this.running&&this.store.setKey("paused",!1),e.target.classList.remove(this.cls("-hover"))}clickGrade(e){this.onClick(e)}gradeDom(e,t){const{gradesNumber:r}=this.store.get(),s=document.createElement("section");s.classList.add(this.cls("grade")),s.style.zIndex=`${r-t}`,s.style.animationPlayState=this.running?"running":"paused",s.addEventListener("mouseenter",this.hoverGrade.bind(this)),s.addEventListener("mouseleave",this.leaveGrade.bind(this)),s.addEventListener("click",this.clickGrade.bind(this));const i=["front","back","left","right","top","bottom"].map(a=>{const l=["top","bottom"].includes(a),n=document.createElement("aside");n.classList.add(this.cls(l?"base":"face")),n.classList.add(this.cls("side")),n.classList.add(this.cls(a));const{color:p,text:c,textColor:d}={...this.baseGrade[a],...e[a]};l?p&&(n.style.backgroundColor=p):p&&(n.style.borderBottomColor=p);const u=document.createElement("span");return u.classList.add(this.cls("text")),c&&(u.textContent=c),d&&(u.style.color=d),n.append(u),n});return s.append(...i),s}computeGrade(e,t){function r(m,f){var v=Math.atan(m/f),w=v*(180/Math.PI);return w}function s(m,f){var v=Math.sqrt(Math.pow(m,2)+Math.pow(f,2));return v}const i={height:400,width:200,...e.pyramid},a=s(i.height,i.width/2),l=s(a,i.width/2),n=90-r(a,i.width/2),p={height:40,margin:5,...e.trapezoidal},c=p.height/i.height,d=i.width/2*(1-c)-a*c,u=a*c+p.margin;return t.style.setProperty("--pyramid-trapezoidal-top-offset",`${d}`),t.style.setProperty("--pyramid-degrees",`${n}`),t.style.setProperty("--pyramid-width",`${i.width}`),t.style.setProperty("--pyramid-hypotenuse-length",`${l*c}`),t.style.setProperty("--pyramid-height",`${i.height}`),t.style.setProperty("--pyramid-slant-height",`${a}`),t.style.setProperty("--pyramid-trapezoidal-slant-height",`${u}`),t.style.setProperty("--pyramid-trapezoidal-height",`${p.height}`),t}cls(e,t){return`${t?".":""}pyramid-${e}-${this.scope}`}style(){const{perspective:e,speed:t}=this.store.get(),r=document.createElement("style");return r.dataset.pyramid=this.scope,r.innerHTML=`
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
  line-height: var(--pyramid-use-width);
  width: var(--pyramid-use-width);
  height: var(--pyramid-use-width);
  bottom: 0;
}
.${this.cls("bottom")} {
  background: rgba(255, 0, 0, 0.5);
}
.${this.cls("top")} {
  left: 50%;
  margin-left: calc(var(--pyramid-use-trapezoidal-width) / 2 * -1);
  transform: rotateX(-90deg)
    translateZ(calc((var(--pyramid-trapezoidal-top-offset)) * 1px));
  background: rgba(255, 0, 0, 0.5);
  width: var(--pyramid-use-trapezoidal-width);
  height: var(--pyramid-use-trapezoidal-width);
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
