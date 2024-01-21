import "./style.css";

import GradingPyramid from "./GradingPyramid";

const gp = new GradingPyramid("#app", {
  render: false,
  height: 500,
  width: 400,
  gradesNumber: 5,
  gap: 10,
  perspective: 2000,
  toolbar: true,
  onClick(e) {
    console.log(e);
  },
});

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
