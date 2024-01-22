import "./style.css";

import GradingPyramid from "./GradingPyramid";

const gp = new GradingPyramid(document.querySelector<HTMLElement>("#app")!, {
  immediate: false,
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

gp.setGrades([
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

gp.mount();

gp.setGradesNumber(2);

// setTimeout(() => {
//   gp.mutate('hideSides', ['bottom', 'top'])
// }, 2000);
