export type Grade = {
  label?: string;
  color?: string;
};

export type GradingPyramidOptions = {
  gradesNumber?: number;
  perspective?: number;
  height?: number;
  width?: number;
  gap?: number;
};

export default class GradingPyramid {
  constructor(
    selectorOrTarget: string | Element,
    options?: GradingPyramidOptions
  ) {
    const target =
      typeof selectorOrTarget === "string"
        ? document.querySelector(selectorOrTarget)
        : selectorOrTarget;

    if (!target) {
      throw new Error("Target not found");
    }

    this.target = target;

    const { height, width, gap, gradesNumber, perspective } = {
      ...this.defaultOptions,
      ...options,
    };

    this.grades = Array(gradesNumber).fill({});

    this.perspective = perspective;
    this.height = height;
    this.width = width;
    this.gap = gap;
  }

  defaultOptions: Required<GradingPyramidOptions> = {
    gap: 10,
    height: 300,
    width: 200,
    gradesNumber: 1,
    perspective: 1000,
  };

  private target: Element;

  public readonly perspective: number;
  public readonly height: number;
  public readonly width: number;
  public readonly gap: number;

  private grades: Grade[] = [];

  public render(custom?: Grade[]): void {
    const grades = this.grades.map((grade, i) =>
      Object.assign({}, grade, custom?.[i] ?? {})
    );

    const wrapper = document.createElement("article");
    wrapper.classList.add(this.cls("wrapper"));

    for (let i = 0; i < grades.length; i++) {
      const grade = grades[i];

      const pyramid = {
        height: this.height * ((i + 1) / grades.length),
        width: this.width * ((i + 1) / grades.length) - this.gap,
      };

      const trapezoidal = {
        height: pyramid.height / (1 + i),
        margin: i ? this.gap : 0,
      };

      wrapper.append(
        this.computeGrade({ ...grade, pyramid, trapezoidal }, this.gradeDom())
      );
    }

    this.target.append(wrapper);

    if (!document.head.querySelector("style[data-pyramid]")) {
      document.head.append(this.style());
    }
  }

  private gradeDom(): HTMLElement {
    const wrap = document.createElement("section");
    wrap.classList.add(this.cls("grade"));

    const face = document.createElement("div");
    face.classList.add(this.cls("face"));

    const base = document.createElement("aside");
    base.classList.add(this.cls("base"));

    const front = face.cloneNode(true) as Element;
    front.classList.add(this.cls("front"));

    const back = face.cloneNode(true) as Element;
    back.classList.add(this.cls("back"));

    const left = face.cloneNode(true) as Element;
    left.classList.add(this.cls("left"));

    const right = face.cloneNode(true) as Element;
    right.classList.add(this.cls("right"));

    const top = base.cloneNode(true) as Element;
    top.classList.add(this.cls("top"));

    const bottom = base.cloneNode(true) as Element;
    bottom.classList.add(this.cls("bottom"));

    wrap.append(front, back, left, right, top, bottom);

    return wrap;
  }

  private computeGrade(
    grade: Grade & {
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
      ...grade.pyramid,
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
      ...grade.trapezoidal,
    };

    // 高度比例
    const ratio = trapezoidal.height / pyramid.height;

    const calcHypotenuseLength = hypotenuseLength * ratio;

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
      `${calcHypotenuseLength}`
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

  private cls(name: string): string {
    return `pyramid-${name}`;
  }

  private style(): Element {
    const style = document.createElement("style");

    style.dataset.pyramid = "";

    style.innerHTML = `
.${this.cls("wrapper")} {
  perspective: ${this.perspective}px;
  perspective-origin: 50% 50%;
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
.${this.cls("left")} {
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
.${this.cls("right")} {
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

.${this.cls("grade")} {
  animation: spinning 6s infinite linear;
}
@keyframes spinning {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
`;

    return style;
  }
}
