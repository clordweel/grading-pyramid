type Grade = {
  color?: string;
  text?: string;
};

type Options = {
  width?: number;
  height?: number;
  duration?: number;
  gap?: number;
};

export default class GradingPyramid {
  constructor(container: string | HTMLElement, options?: Options) {
    const {
      width = 200,
      height = 540,
      gap = 0,
      duration = 15,
    } = { ...options };

    this.container =
      typeof container === "string"
        ? document.querySelector(container)
        : container;

    this.width = width;
    this.height = height;
    this.gap = gap;
    this.duration = duration;
  }

  width = 0;
  height = 0;
  gap = 0;

  container: null | HTMLElement = null;
  duration = 0;

  render(grades: Grade[]) {
    let target = this.container;

    if (!target) {
      return;
    }

    if (!document.head.querySelector(`#${this.__styleId}`)) {
      document.head.appendChild(this.style());
    }

    const wrapper = document.createElement("div");
    wrapper.classList.add(`${this.__styleId}-wrapper`);

    for (let i = 0; i < grades.length; i++) {
      const grade = grades[i];

      const [width, height] = this.calcSize(grades, i);

      const { color, text } = grade;

      wrapper.appendChild(
        this.grade({
          height,
          width,
          top: (this.height / grades.length - height + this.gap) * i,
          color,
          text,
        })
      );
    }

    target.appendChild(wrapper);
  }

  private calcSize(grades: Grade[], index: number): [number, number] {
    if (grades.length === 1) {
      return [this.width, this.height];
    } else if (index >= 0) {
      const h = this.height / grades.length;
      return [h * (index + 1), h];
    } else {
      return [this.width, this.height];
    }
  }

  grade({
    width = 0,
    height = 0,
    top = 0,
  }: Grade & { width?: number; height?: number; top?: number }) {
    const grade = document.createElement("div");
    grade.classList.add(`${this.__styleId}-grade`);

    grade.style.width = `${width}px`;
    grade.style.top = `${top}px`;

    const side = document.createElement("div");
    side.classList.add(`${this.__styleId}-side`);

    side.style.borderWidth = `${height / 4}px`;
    side.style.borderBottomWidth = `${height}px`;
    side.style.width = `${width}px`;
    side.style.height = `${height}px`;

    const one = side.cloneNode() as HTMLElement;

    const two = side.cloneNode() as HTMLElement;
    // two.style.transformOrigin = `${width / 2}px 0`;

    const three = side.cloneNode() as HTMLElement;
    // three.style.transformOrigin = `${width / 2}px 0`;

    const four = side.cloneNode() as HTMLElement;
    // four.style.transformOrigin = `${width / 2}px 0`;

    const lid = document.createElement("div");
    const tray = document.createElement("div");
    tray.classList.add(`${this.__styleId}-tray`);

    [one, two, three, four, lid, tray].forEach((el) => {
      grade.appendChild(el);
    });

    return grade;
  }

  __styleId = "__grading_pyramid";

  style() {
    const style = document.createElement("style");

    style.id = this.__styleId;

    // const wrapperSize = Math.max(this.width, this.height)

    style.innerHTML = `
.__grading_pyramid-wrapper {
    position: relative;
    height: ${this.height}px;
    width: ${this.width}px;
}
.__grading_pyramid-grade {
    display: flex;
    margin: auto;
    width: auto;
    height: inherit;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateY(326deg) rotateX(2deg) rotateZ(329deg);
}
.__grading_pyramid-tray {
    position: absolute;
    display: flex;
    width: ${this.width}px;
    height: ${this.width}px;
    background: black;
    bottom: 0;
    transform: rotateX(90deg);
}
.__grading_pyramid-side {
    width: 100px;
    height: 0;
    position: absolute;
    opacity: 0.7;
    border-style: solid;
    border-width: 100px;
    border-color: transparent;
    border-bottom-width: 200px;
    border-top: 0px;
    box-sizing: border-box;
}
.__grading_pyramid-side:nth-child(1) {
    transform: rotateY(0deg) rotateX(30deg);
    transform-origin: bottom;
    border-bottom-color: green;
}
.__grading_pyramid-side:nth-child(2) {
    transform-origin: bottom;
    transform: rotateY(90deg) rotateX(-30deg);
    border-bottom-color: purple;
}
.__grading_pyramid-side:nth-child(3) {
    transform-origin: bottom;
    transform: rotateY(270deg) rotateX(-30deg);
    border-bottom-color: hotpink;
}
.__grading_pyramid-side:nth-child(4) {
    transform-origin: bottom;
    transform: rotateY(0deg) rotateX(-30deg);
    border-bottom-color: yellow;
}
@keyframes rotate {
    from {
        transform: rotateY(0) rotateX(0deg) rotateZ(0deg);
    }
    to {
        transform: rotateY(360deg) rotateX(0deg) rotateZ(0deg);
    }
}

.__grading_pyramid-grade {
    animation: rotate_ ${this.duration}s linear infinite;
}
`;

    return style;
  }
}
