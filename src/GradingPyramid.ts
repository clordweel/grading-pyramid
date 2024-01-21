import { listenKeys, map } from "nanostores";

type Store = {
  paused: boolean;
  speed: number;
  perspective: number;

  grades: Grade[];

  gradesNumber: number;
  height: number;
  width: number;
  gap: number;

  toolbar: boolean;
};

type Side = "top" | "bottom" | "left" | "right" | "front" | "back";

export type Grade = Partial<
  Record<
    Side,
    {
      text?: string;
      color?: string;
      textColor?: string;
    }
  >
>;

export type GradingPyramidOptions = {
  // style's working scope, for multiple instances
  scope?: string;

  // auto render, default true
  render?: boolean;

  // how many grades need, default 1
  gradesNumber?: number;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/perspective
  perspective?: number;

  // whole height & width
  height?: number;
  width?: number;

  // gap of each grade
  gap?: number;

  // base grade style options
  baseGrade?: Grade;

  // auto play animation, default true
  running?: boolean;
  // animation speed: ms
  speed?: number;

  // whether show toolbar or not, default false
  toolbar?: boolean;

  // handle click event with each grade
  onClick?: (event: MouseEvent) => void;
};

export default class GradingPyramid {
  constructor(
    selectorOrTarget: string | HTMLElement,
    options?: GradingPyramidOptions
  ) {
    const container =
      typeof selectorOrTarget === "string"
        ? document.querySelector<HTMLElement>(selectorOrTarget)
        : selectorOrTarget;

    if (!container) {
      throw new Error("Target not found");
    }

    this.container = container;

    const {
      render,
      running,
      speed,
      baseGrade,
      scope,
      height,
      width,
      gap,
      gradesNumber,
      perspective,
      toolbar,
      onClick,
    } = {
      ...this.defaultOptions,
      ...options,
    };

    this.scope = scope;
    this.baseGrade = baseGrade;
    this.running = running;
    this.onClick = onClick;

    this.store.set(
      Object.assign({}, this.store.get(), {
        paused: !running,
        speed,
        perspective,
        height,
        width,
        gap,
        gradesNumber,
        toolbar,
      })
    );

    if (render) this.render();
  }

  // target parent container element
  private readonly container: HTMLElement;

  // component's state management
  private store = map<Store>();

  defaultOptions: Required<GradingPyramidOptions> = {
    render: true,
    baseGrade: {
      front: { color: "rgba(120, 120, 120, 0.35)" },
      back: { color: "rgba(120, 120, 120, 0.35)" },
      left: { color: "rgba(220, 220, 220, 0.35)" },
      right: { color: "rgba(220, 220, 220, 0.35)" },
      top: { color: "rgba(20, 0, 250, 0.55)" },
      bottom: { color: "rgba(20, 0, 250, 0.55)" },
    },
    running: true,
    speed: 6000,
    scope: "default",
    gap: 10,
    height: 300,
    width: 200,
    gradesNumber: 1,
    perspective: 2000,
    toolbar: false,
    onClick: () => {},
  };

  private readonly baseGrade: Grade;
  private readonly scope: string;
  private readonly running: boolean;
  private readonly onClick: (e: MouseEvent) => void;

  public play(updateState: boolean = true): void {
    document.querySelectorAll(this.cls("grade", true)).forEach((el) => {
      const target = el as HTMLElement;
      target.style.animationPlayState = "running";
    });

    updateState && this.store.setKey("paused", false);
  }

  public pause(updateState: boolean = true): void {
    document.querySelectorAll(this.cls("grade", true)).forEach((el) => {
      const target = el as HTMLElement;
      target.style.animationPlayState = "paused";
    });

    updateState && this.store.setKey("paused", true);
  }

  public mutate<K extends keyof Store>(key: K, value: Store[K]) {
    this.store.setKey(key, value);
  }

  public prune() {
    this.container.querySelector(this.cls("shape", true))?.remove();
  }

  public rerender() {
    this.prune();
    this.render();
  }

  public render(grades?: Grade[]): void {
    if (grades) {
      this.store.setKey("grades", grades);
    }

    const {
      gradesNumber,
      height,
      width,
      gap,
      toolbar,
      grades: customGrades = [],
    } = this.store.get();

    listenKeys(this.store, ["gradesNumber", "gap", "height", "width"], () =>
      this.rerender()
    );

    const items = Array(gradesNumber)
      .fill({})
      .map((_, i) => customGrades[i] ?? {});

    const wrapper = document.createElement("article");
    wrapper.classList.add(this.cls("shape"));

    const elements: HTMLElement[] = [];

    for (let i = 0; i < items.length; i++) {
      const grade = items[i];

      const pyramid = {
        height: height * ((i + 1) / items.length),
        width: width * ((i + 1) / items.length) - gap,
      };

      const trapezoidal = {
        height: pyramid.height / (1 + i),
        margin: i ? gap : 0,
      };

      elements.push(
        this.computeGrade({ pyramid, trapezoidal }, this.gradeDom(grade, i))
      );
    }

    wrapper.append(...elements);

    toolbar && wrapper.append(this.toolbarDom());

    this.container.append(wrapper);

    if (!document.head.querySelector(`style[data-pyramid="${this.scope}"]`)) {
      document.head.append(this.style());
    }
  }

  private toolbarDom(): HTMLElement {
    const { paused } = this.store.get();

    const wrap = document.createElement("nav");
    wrap.classList.add(this.cls("toolbar"));

    const playOrPause = document.createElement("button");
    playOrPause.innerText = paused ? "▶️" : "⏸️";

    listenKeys(this.store, ["paused"], ({ paused }) => {
      paused ? this.pause(false) : this.play(false);
      playOrPause.innerText = paused ? "▶️" : "⏸️";
    });

    playOrPause.addEventListener("click", () => {
      this.store.setKey("paused", !this.store.get().paused);
    });

    const gradesNumberInput = document.createElement("input");
    gradesNumberInput.type = "number";
    gradesNumberInput.value = this.store.get().gradesNumber.toString();
    gradesNumberInput.min = "1";

    gradesNumberInput.addEventListener(
      "change",
      (event) => {
        const num = (event.target as HTMLInputElement)?.value;
        this.mutate("gradesNumber", parseInt(num, 10));
      },
      false
    );

    wrap.append(playOrPause, gradesNumberInput);

    return wrap;
  }

  private hoverGrade(event: MouseEvent) {
    const { paused } = this.store.get();

    !paused && this.store.setKey("paused", true);

    const target = event.target as HTMLElement;
    target.classList.add(this.cls("-hover"));
  }

  private leaveGrade(event: MouseEvent) {
    this.running && this.store.setKey("paused", false);

    const target = event.target as HTMLElement;
    target.classList.remove(this.cls("-hover"));
  }

  private clickGrade(event: MouseEvent) {
    this.onClick(event);
  }

  private gradeDom(grade: Grade, index: number): HTMLElement {
    const { gradesNumber } = this.store.get();

    const wrap = document.createElement("section");
    wrap.classList.add(this.cls("grade"));
    wrap.style.zIndex = `${gradesNumber - index}`;
    wrap.style.animationPlayState = this.running ? "running" : "paused";

    // TODO: maybe should do this on parent container for better performence
    wrap.addEventListener("mouseenter", this.hoverGrade.bind(this));
    wrap.addEventListener("mouseleave", this.leaveGrade.bind(this));

    wrap.addEventListener("click", this.clickGrade.bind(this));

    const sides = (
      ["front", "back", "left", "right", "top", "bottom"] as const
    ).map((type) => {
      const isBase = ["top", "bottom"].includes(type);

      const side = document.createElement("aside");

      side.classList.add(this.cls(isBase ? "base" : "face"));
      side.classList.add(this.cls("side"));
      side.classList.add(this.cls(type));

      const { color, text, textColor } = {
        ...this.baseGrade[type],
        ...grade[type],
      };

      if (isBase) {
        !!color && (side.style.backgroundColor = color);
      } else {
        !!color && (side.style.borderBottomColor = color);
      }

      const span = document.createElement("span");
      span.classList.add(this.cls("text"));

      !!text && (span.textContent = text);
      !!textColor && (span.style.color = textColor);

      side.append(span);

      return side;
    });

    wrap.append(...sides);

    return wrap;
  }

  private computeGrade(
    options: {
      pyramid?: { height?: number; width?: number };
      trapezoidal?: { height?: number; margin?: number };
    },
    target: HTMLElement
  ): HTMLElement {
    function calculateAngle(
      oppositeSideLength: number,
      adjacentSideLength: number
    ) {
      // 使用 Math.atan 计算反正切值（以弧度为单位）
      var angleInRadians = Math.atan(oppositeSideLength / adjacentSideLength);

      // 将弧度转换为角度
      var angleInDegrees = angleInRadians * (180 / Math.PI);

      return angleInDegrees;
    }

    function calculateHypotenuse(height: number, bottom: number) {
      // 使用勾股定理计算斜边长度
      var hypotenuse = Math.sqrt(Math.pow(height, 2) + Math.pow(bottom, 2));

      return hypotenuse;
    }

    // 金字塔形
    const pyramid = {
      height: 400,
      width: 200,
      ...options.pyramid,
    };

    // 斜面高度
    const slantHeight = calculateHypotenuse(pyramid.height, pyramid.width / 2);
    // 斜面斜边长度
    const hypotenuseLength = calculateHypotenuse(
      slantHeight,
      pyramid.width / 2
    );
    // 倾斜角度
    const slantDegrees = 90 - calculateAngle(slantHeight, pyramid.width / 2);

    // 梯形
    const trapezoidal = {
      height: 40,
      margin: 5,
      ...options.trapezoidal,
    };

    // 高度比例
    const ratio = trapezoidal.height / pyramid.height;

    const trapezoidalTopOffset =
      (pyramid.width / 2) * (1 - ratio) - slantHeight * ratio;
    const trapezoidalSlantHeight = slantHeight * ratio + trapezoidal.margin;

    target.style.setProperty(
      "--pyramid-trapezoidal-top-offset",
      `${trapezoidalTopOffset}`
    );
    target.style.setProperty("--pyramid-degrees", `${slantDegrees}`);
    target.style.setProperty("--pyramid-width", `${pyramid.width}`);
    target.style.setProperty(
      "--pyramid-hypotenuse-length",
      `${hypotenuseLength * ratio}`
    );
    target.style.setProperty("--pyramid-height", `${pyramid.height}`);
    target.style.setProperty("--pyramid-slant-height", `${slantHeight}`);
    target.style.setProperty(
      "--pyramid-trapezoidal-slant-height",
      `${trapezoidalSlantHeight}`
    );
    target.style.setProperty(
      "--pyramid-trapezoidal-height",
      `${trapezoidal.height}`
    );

    return target;
  }

  private cls(name: string, dot?: boolean): string {
    return `${dot ? "." : ""}pyramid-${name}-${this.scope}`;
  }

  private style(): Element {
    const { perspective, speed } = this.store.get();

    const style = document.createElement("style");

    style.dataset.pyramid = this.scope;

    style.innerHTML = `
.${this.cls("shape")} {
  perspective: ${perspective}px;
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
  animation: ${this.cls("spinning")} ${speed / 1000}s infinite linear;
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
`;

    return style;
  }
}
