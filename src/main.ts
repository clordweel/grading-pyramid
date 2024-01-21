import "./style.css";

import GradingPyramid from "./GradingPyramid";

const gp = new GradingPyramid("#app", {
  render: false,
  height: 500,
  width: 400,
  gradesNumber: 5,
  gap: 10,
  perspective: 1500,
  toolbar: true,
  hideSides: ["top"],
  onClick(e) {
    console.log(e);
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