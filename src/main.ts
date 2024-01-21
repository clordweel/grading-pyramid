import "./style.css";

import GradingPyramid from "./GradingPyramid";

const gp = new GradingPyramid(document.querySelector<HTMLElement>("#app")!, {
  render: false,
  height: 500,
  width: 400,
  gradesNumber: 5,
  gap: 10,
  perspective: 1500,
  toolbar: true,
  hideSides: ["top"],
  speed: 8000,
  onClick(data, event) {
    console.log(data, event);
  },
});

gp.render([
  {},
  {},
  {
    front: { text: "Front", hide: true },
    back: { text: "Back" },
    left: { text: "Left" },
    right: { text: "Right" },
    bottom: { text: "Bottom" },
    top: { text: "Top" },
  },
]);

// setTimeout(() => {
//   gp.mutate('hideSides', ['bottom', 'top'])
// }, 2000);
