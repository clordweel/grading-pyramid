import "./style.css";

import GradingPyramid from "./GradingPyramid";

const gp = new GradingPyramid("#app", {
  height: 500,
  width: 400,
  gradesNumber: 5,
  gap: 10,
  perspective: 2000,
});

gp.render([{}]);
