let musC;
$(() => {
  musC = $("#mus");
  const canvas = $("#bgcanvas");
  let mus;
  musC.on("change", async () => {
    if (musC.prop("checked")) {
      const rand = Math.random();
      mus = new Audio("../music/menu.wav");
      mus.loop = true;
      console.log(rand);
      mus.play();
    } else {
      mus.pause();
      mus = null;
    }
  });
});

// $table.addEventListener("mousemove", onMove);
// $input.addEventListener("change", onChange);

// function clean() {
//   const $actives = $table.querySelectorAll(".active");
//   const $neighbours = $table.querySelectorAll(".neighbour");

//   $actives.forEach(($active) => $active.classList.remove("active"));
//   $neighbours.forEach(($neighbour) => $neighbour.classList.remove("neighbour"));
// }

// function indexOf($element) {
//   return Array.prototype.slice
//     .call($element.parentElement.children)
//     .indexOf($element);
// }

// function onChange() {
//   $span.innerHTML = $input.value;
// }

// onChange();

// function onMove(event) {
//   const $target = event.target;

//   if ($target.tagName !== "TD" || $target.classList.contains("active")) {
//     return;
//   }

//   const far = parseInt($input.value);
//   const neighbours = getNeighbors($target, far);

//   clean();

//   $target.classList.add("active");
//   neighbours.forEach((neighbour) => neighbour.classList.add("neighbour"));
// }

// /**
//  * Получить соседей ячейки
//  * @param {HTMLTableCellElement} $cell Исходня ячейка
//  * @param {Number} far На сколько далёких соседей нужно получить
//  * @return {HTMLTableCellElement[]}
//  */
// function getNeighbors($cell, far = 1) {
//   const $row = $cell.parentElement;
//   const $wrapper = $row.parentElement;

//   const index = [indexOf($row), indexOf($cell)];

//   const bbox = [
//     Math.max(index[0] - far, 0),
//     Math.max(index[1] - far, 0),
//     Math.min(index[0] + far, $wrapper.children.length - 1),
//     Math.min(index[1] + far, $row.children.length - 1),
//   ];

//   const list = [];

//   for (let i = bbox[0]; i < bbox[2] + 1; i++) {
//     const $sRow = $wrapper.children.item(i);

//     for (let j = bbox[1]; j < bbox[3] + 1; j++) {
//       if (i === index[0] && j === index[1]) {
//         continue;
//       }

//       const $sCell = $sRow.children.item(j);

//       list.push($sCell);
//     }
//   }

//   return list;
// }
