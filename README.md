# 3D Grading Pyramid

> A simple 3D pyramid shape only use vanilla js & css.

[![npm](https://img.shields.io/npm/v/grading-pyramid)](https://www.npmjs.com/package/grading-pyramid)

## Features

- [ ] dynamic height & width
- [x] customizable styles: color, text
- [x] customizable number of grades
- [x] customizable gap between grades
- [x] animation speed & control
- [x] some mouse interactions
- [x] simple toolbar
- [ ] more styles dynamically

## Preview

[https://clordweel.github.io/grading-pyramid/example](https://clordweel.github.io/grading-pyramid/example)

https://github.com/clordweel/grading-pyramid/assets/95267940/23736c82-da05-4752-b903-8e690de0450c

## Usage

**Install**

```sh
# install by pnpm
pnpm add grading-pyramid

# install by npm
npm install grading-pyramid
```

**ES Import**

```js
// import package
import GradingPyramid from "grading-pyramid";

// create a one grade pyramid
new GradingPyramid("#app");
```

**CDN Import**

```html
<body>
  <!-- ... -->
  <div id="app"></div>

  <script src="https://unpkg.com/grading-pyramid@0.2.6/dist/index.umd.cjs"></script>
  <script>
    new GradingPyramid("#app");
  </script>
</body>
```

## Example

```ts
import GradingPyramid from "grading-pyramid";

// create a pyramid have five grades and gap is 10px
const gp = new GradingPyramid(
  // target parent container selector
  // or document.querySelector("#app")
  "#app",
  // optional, type: GradingPyramidOptions
  {
    // should be unique, if need multiple pyramid, use this to distinguish
    scope: "another-one",

    height: 500,
    width: 400,

    gradesNumber: 5,
    gap: 10,

    // show toolbar
    toolbar: true,

    // @param data { level: number, side: string }
    // @param event MouseEvent
    onClick(data, event) {
      alert(`clicked: ${data.level}-${data.side}`); // such as: clicked: 2-front
    },
  }
);

// render custom grades
gp.render([
  {},
  {},
  {
    front: { text: "Front" },
    back: { text: "Back" },
    left: { text: "Left" },
    right: { text: "Right" },
  },
]);
```

## Typing

```ts
export type SideEventData = {
  // which one level grade is clicked
  level: number;

  // clicked side name
  side: Side;
};

type Side = "top" | "bottom" | "left" | "right" | "front" | "back";

export type Grade = Partial<
  Record<
    Side,
    {
      // text on the side
      text?: string;
      textColor?: string;

      // the side's color
      color?: string;

      // whether hide the side or not
      hide?: boolean;
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

  // hide unnecessary sides
  hideSides?: Side[];

  // whether show toolbar or not, default false
  toolbar?: boolean;

  // handle click event with each grade
  onClick?: (event: MouseEvent) => void;
};
```

## Build

```bash
# install dependencies
pnpm install

# for development
pnpm dev

# for build
pnpm build
```

## Dependencies

[nanostores: A tiny (298 bytes) state manager.](https://github.com/nanostores/nanostores)
