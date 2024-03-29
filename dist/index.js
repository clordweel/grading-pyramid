var x = Object.defineProperty;
var $ = (c, e, t) => e in c ? x(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var g = (c, e, t) => ($(c, typeof e != "symbol" ? e + "" : e, t), t);
let d = [], z = (c, e) => {
  let t = [], r = {
    get() {
      return r.lc || r.listen(() => {
      })(), r.value;
    },
    l: e || 0,
    lc: 0,
    listen(i, s) {
      return r.lc = t.push(i, s || r.l) / 2, () => {
        let a = t.indexOf(i);
        ~a && (t.splice(a, 2), --r.lc || r.off());
      };
    },
    notify(i) {
      let s = !d.length;
      for (let a = 0; a < t.length; a += 2)
        d.push(
          t[a],
          t[a + 1],
          r.value,
          i
        );
      if (s) {
        for (let a = 0; a < d.length; a += 4) {
          let o;
          for (let l = a + 1; !o && (l += 4) < d.length; )
            d[l] < d[a + 1] && (o = d.push(
              d[a],
              d[a + 1],
              d[a + 2],
              d[a + 3]
            ));
          o || d[a](d[a + 2], d[a + 3]);
        }
        d.length = 0;
      }
    },
    off() {
    },
    /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */
    set(i) {
      r.value !== i && (r.value = i, r.notify());
    },
    subscribe(i, s) {
      let a = r.listen(i, s);
      return i(r.value), a;
    },
    value: c
  };
  return r;
};
function v(c, e, t) {
  let r = /* @__PURE__ */ new Set([...e, void 0]);
  return c.listen((i, s) => {
    r.has(s) && t(i, s);
  });
}
let E = (c = {}) => {
  let e = z(c);
  return e.setKey = function(t, r) {
    typeof r > "u" ? t in e.value && (e.value = { ...e.value }, delete e.value[t], e.notify(t)) : e.value[t] !== r && (e.value = {
      ...e.value,
      [t]: r
    }, e.notify(t));
  }, e;
};
class G {
  constructor(e, t) {
    // only set once on first mount
    g(this, "mounted");
    // target parent container element
    g(this, "container");
    // component's state management
    g(this, "store", E());
    g(this, "defaultOptions", {
      immediate: !0,
      baseGrade: {
        front: { color: "rgba(120, 120, 120, 0.35)" },
        back: { color: "rgba(120, 120, 120, 0.35)" },
        left: { color: "rgba(220, 220, 220, 0.35)" },
        right: { color: "rgba(220, 220, 220, 0.35)" },
        top: { color: "rgba(20, 0, 250, 0.55)" },
        bottom: { color: "rgba(20, 0, 250, 0.55)" }
      },
      hideSides: [],
      running: !0,
      speed: 6e3,
      scope: "default",
      gap: 10,
      height: 300,
      width: 200,
      gradesNumber: 1,
      perspective: 1500,
      toolbar: !1,
      onClick: () => {
      }
    });
    g(this, "baseGrade");
    g(this, "scope");
    g(this, "running");
    g(this, "onClick");
    const r = typeof e == "string" ? document.querySelector(e) : e;
    if (!r)
      throw new Error("Target not found");
    this.container = r;
    const {
      immediate: i,
      running: s,
      speed: a,
      baseGrade: o,
      scope: l,
      height: n,
      width: p,
      gap: m,
      gradesNumber: y,
      perspective: h,
      hideSides: u,
      toolbar: f,
      onClick: b
    } = {
      ...this.defaultOptions,
      ...t
    };
    this.scope = l, this.baseGrade = o, this.running = s, this.onClick = b, this.store.set(
      Object.assign({}, this.store.get(), {
        paused: !s,
        speed: a,
        perspective: h,
        height: n,
        width: p,
        gap: m,
        gradesNumber: y,
        hideSides: u,
        toolbar: f
      })
    ), i && this.mount(), v(this.store, ["paused"], ({ paused: w }) => {
      w ? this.pause(!1) : this.play(!1);
    }), v(
      this.store,
      ["gradesNumber", "gap", "grades", "height", "width", "hideSides"],
      () => {
        this.mounted = this.mounted || !!document.querySelector(this.cls("shape", !0)), this.mounted ? (this.prune(), this.mount()) : this.render();
      }
    );
  }
  play(e = !0) {
    document.querySelectorAll(this.cls("grade", !0)).forEach((t) => {
      const r = t;
      r.style.animationPlayState = "running";
    }), e && this.store.setKey("paused", !1);
  }
  pause(e = !0) {
    document.querySelectorAll(this.cls("grade", !0)).forEach((t) => {
      const r = t;
      r.style.animationPlayState = "paused";
    }), e && this.store.setKey("paused", !0);
  }
  mutate(e, t) {
    this.store.setKey(e, t);
  }
  setGrades(e) {
    this.store.setKey("grades", e);
  }
  setGradesNumber(e) {
    this.store.setKey("gradesNumber", e);
  }
  prune() {
    var e;
    (e = this.container.querySelector(this.cls("shape", !0))) == null || e.remove();
  }
  mount() {
    const { toolbar: e } = this.store.get(), t = this.render();
    e && t.append(this.toolbarDom()), this.container.append(t), document.head.querySelector(`style[data-pyramid="${this.scope}"]`) || document.head.append(this.style());
  }
  render() {
    const {
      gradesNumber: e,
      height: t,
      width: r,
      gap: i,
      grades: s = []
    } = this.store.get(), a = Array(e).fill({}).map((n, p) => s[p] ?? {}), o = document.createElement("article");
    o.classList.add(this.cls("shape"));
    const l = [];
    for (let n = 0; n < a.length; n++) {
      const p = a[n], m = {
        height: t * ((n + 1) / a.length),
        width: r * ((n + 1) / a.length) - i
      }, y = {
        height: m.height / (1 + n),
        margin: n ? i : 0
      };
      l.push(
        this.computeGrade({ pyramid: m, trapezoidal: y }, this.gradeDom(p, n))
      );
    }
    return o.append(...l), o;
  }
  toolbarDom() {
    const { paused: e } = this.store.get(), t = document.createElement("nav");
    t.classList.add(this.cls("toolbar"));
    const r = document.createElement("button");
    r.innerText = e ? "▶️" : "⏸️", v(this.store, ["paused"], ({ paused: s }) => {
      r.innerText = s ? "▶️" : "⏸️";
    }), r.addEventListener("click", () => {
      this.store.setKey("paused", !this.store.get().paused);
    });
    const i = document.createElement("input");
    return i.type = "number", i.value = this.store.get().gradesNumber.toString(), i.min = "1", i.addEventListener(
      "change",
      (s) => {
        var o;
        const a = (o = s.target) == null ? void 0 : o.value;
        this.mutate("gradesNumber", parseInt(a, 10));
      },
      !1
    ), t.append(r, i), t;
  }
  hoverGrade(e) {
    const { paused: t } = this.store.get();
    !t && this.store.setKey("paused", !0), e.target.classList.add(this.cls("-hover"));
  }
  leaveGrade(e) {
    this.running && this.store.setKey("paused", !1), e.target.classList.remove(this.cls("-hover"));
  }
  clickGrade(e, t) {
    this.onClick(e, t);
  }
  gradeDom(e, t) {
    const { gradesNumber: r, hideSides: i } = this.store.get(), s = document.createElement("section");
    s.classList.add(this.cls("grade")), s.style.zIndex = `${r - t}`, s.style.animationPlayState = this.running ? "running" : "paused", s.addEventListener("mouseenter", this.hoverGrade.bind(this)), s.addEventListener("mouseleave", this.leaveGrade.bind(this));
    const a = ["front", "back", "left", "right", "top", "bottom"].map((o) => {
      const { color: l, text: n, textColor: p, hide: m } = {
        ...this.baseGrade[o],
        ...e[o]
      };
      if (typeof m == "boolean" && m || i.includes(o))
        return "";
      const y = ["top", "bottom"].includes(o), h = document.createElement("aside");
      h.addEventListener(
        "click",
        this.clickGrade.bind(this, { side: o, level: t + 1 })
      ), h.classList.add(this.cls(y ? "base" : "face")), h.classList.add(this.cls("side")), h.classList.add(this.cls(o)), y ? l && (h.style.backgroundColor = l) : l && (h.style.borderBottomColor = l);
      const u = document.createElement("span");
      return u.classList.add(this.cls("text")), n && (u.textContent = n), p && (u.style.color = p), h.append(u), h;
    });
    return s.append(...a), s;
  }
  computeGrade(e, t) {
    function r(h, u) {
      var f = Math.atan(h / u), b = f * (180 / Math.PI);
      return b;
    }
    function i(h, u) {
      var f = Math.sqrt(Math.pow(h, 2) + Math.pow(u, 2));
      return f;
    }
    const s = {
      height: 400,
      width: 200,
      ...e.pyramid
    }, a = i(s.height, s.width / 2), o = i(
      a,
      s.width / 2
    ), l = 90 - r(a, s.width / 2), n = {
      height: 40,
      margin: 5,
      ...e.trapezoidal
    }, p = n.height / s.height, m = s.width / 2 * (1 - p) - a * p, y = a * p + n.margin;
    return t.style.setProperty(
      "--pyramid-trapezoidal-top-offset",
      `${m}`
    ), t.style.setProperty("--pyramid-degrees", `${l}`), t.style.setProperty("--pyramid-width", `${s.width}`), t.style.setProperty(
      "--pyramid-hypotenuse-length",
      `${o * p}`
    ), t.style.setProperty("--pyramid-height", `${s.height}`), t.style.setProperty("--pyramid-slant-height", `${a}`), t.style.setProperty(
      "--pyramid-trapezoidal-slant-height",
      `${y}`
    ), t.style.setProperty(
      "--pyramid-trapezoidal-height",
      `${n.height}`
    ), t;
  }
  cls(e, t) {
    return `${t ? "." : ""}pyramid-${e}-${this.scope}`;
  }
  style() {
    const { perspective: e, speed: t } = this.store.get(), r = document.createElement("style");
    return r.dataset.pyramid = this.scope, r.innerHTML = `
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
  animation: ${this.cls("spinning")} ${t / 1e3}s infinite linear;
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
`, r;
  }
}
export {
  G as default
};
