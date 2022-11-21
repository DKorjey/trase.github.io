// TODO:
// Add saving
// Add autoimport
// Add saving two skins

function get2dimensional(array, limit) {
  const array2 = [];
  let section;

  for (const [index, element] of array.entries()) {
    if (index % limit === 0) array2.push((section = []));
    section.push(element);
  }

  return array2;
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b, a = "") =>
  "#" +
  componentToHex(r) +
  componentToHex(g) +
  componentToHex(b) +
  componentToHex(a);

/**
 * @param {string} rgbString
 * @returns {number[]}
 */
const rgbToArray = (rgbString) =>
  rgbString
    .replace(/rgba?/i, "")
    .replace(/[()]/gi, "")
    .split(/, ?/)
    .splice(0, 4)
    .map((e) => +e);
function hexToCssHsl(hex, valuesOnly = false) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  var cssString = "";
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  cssString = h + "," + s + "%," + l + "%";
  cssString = !valuesOnly ? "hsl(" + cssString + ")" : cssString;

  return cssString;
}
/**
 * @param {number} charsLength
 * @returns {string[]}
 */
String.prototype.splitByCharsNumber = function (charsLength = 1) {
  return this.match(new RegExp(`.{1,${charsLength}}`, "g"));
};
/**
 *
 * @param {string} hsl
 * @returns {number[]}
 */
const unpackHsl = (hsl) =>
  hsl
    .replace(/hsl/i, "")
    .replace(/[()]/g, "")
    .replace(/%/g, "")
    .split(/, ?/)
    .map((el) => +el);
/**
 *
 * @param {number | string} h
 * @param {number | string} s
 * @param {number | string} l
 * @returns {string}
 */
const packHsl = (h, s, l) => "hsl(" + h + "," + s + "%," + l + "%)";
/**
 *
 * @param {string} hsl
 * @param {number} percent
 * @returns {string}
 */
function hslDark(hsl, percent) {
  hsl = unpackHsl(hsl);
  hsl[2] -= Math.floor(hsl[2] * 0.32);
  return packHsl(...hsl);
}
let musC;
let { width: scrWidth, height: scrHeight } = window.screen;
window.onresize = function () {
  scrWidth = this.screen.width;
  scrHeight = this.screen.height;
};

let settings = localStorage.getItem("settings");
let tds;
$(() => {
  if (!settings) {
    settings = {
      savedSkin: "trSkin17cYhAQAACMCwSvf074WgBGJTqzOJiIiIiIj8yAI=",
    };
  } else settings = JSON.parse(settings);
  const root = $(":root");

  const looperLayer = [
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "rgb(173, 173, 173)",
      "rgb(173, 173, 173)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "rgb(173, 173, 173)",
      "rgb(173, 173, 173)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "",
      "",
    ],
    [
      "",
      "",
      "rgb(173, 173, 173)",
      "rgb(173, 173, 173)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "",
      "",
    ],
    [
      "",
      "",
      "rgb(173, 173, 173)",
      "rgb(173, 173, 173)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "",
      "",
    ],
    [
      "",
      "",
      "rgb(173, 173, 173)",
      "rgb(173, 173, 173)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "",
      "",
    ],
    [
      "",
      "",
      "rgb(173, 173, 173)",
      "rgb(173, 173, 173)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "",
      "",
    ],
    [
      "",
      "",
      "rgb(173, 173, 173)",
      "rgb(173, 173, 173)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "",
      "",
    ],
    [
      "",
      "",
      "rgb(173, 173, 173)",
      "rgb(173, 173, 173)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "",
      "",
    ],
    [
      "",
      "",
      "rgb(173, 173, 173)",
      "rgb(173, 173, 173)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "",
      "",
    ],
    [
      "",
      "",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "",
      "",
    ],
    [
      "",
      "",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "",
      "",
    ],
    [
      "",
      "",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "",
      "",
    ],
    [
      "",
      "",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "",
      "",
      "",
      "",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "",
      "",
      "",
      "",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "",
      "",
      "",
      "",
    ],
  ];
  const clr = $("#clr");
  const clr2 = $("#clr2");
  const clr1help = $("#clrHelp");
  const clr2help = $("#clr2Help");
  const table = $("#tblLooper");
  const rangeInput = $("#brushRange");
  const jquiSort = $(".jquiSort");

  const switchCols = $("button#switchCols");

  const [x, y] = [$("#x"), $("#y")];

  let starCount = 0;

  const minStars = 100;
  const maxStars = 7;
  const ticksBetweenChecks = 50;
  const tickCount = 0;

  const minStarSize = 10;
  const maxStarSize = 30;

  const canvas = document.getElementById("bgCanvas");
  canvas.width = scrWidth;
  canvas.height = scrHeight;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const srces = [
    "../imgs/StarSpriteSheetPink.png",
    "../imgs/StarSpriteSheetYellow.png",
    "../imgs/StarSpriteSheetBlue.png",
  ];
  const starSheets = [new Image(), new Image(), new Image()];
  for (let i = 0; i < 3; i++) starSheets[i].src = srces[i];

  const brng = $("#brng");

  /**
   * @type {"brush" | "ereaser" | "pippet" | "fill" | "select"}
   */
  let mode = "brush";

  const brush = $("#brush");
  const ereaser = $("#ereaser");
  const pippet = $("#pippet");
  const filler = $("#fill");
  const selecter = $("#select");

  const instruments = [brush, ereaser, pippet, filler, selecter];

  instruments.forEach((el) =>
    el.on("click", () => {
      instruments.forEach((e) =>
        e[(e == el ? "add" : "remove") + "Class"]("active")
      );
      mode = el.attr("id");
      brng.css(
        "display",
        ["brush", "ereaser"].includes(mode) ? "block" : "none"
      );
    })
  );

  let isClicked = false;

  let [val, val2] = [clr.val(), clr2.val()];
  const clrs = [clr, clr2];
  clrs.forEach((e, i) =>
    e.on("input", () => {
      if (i == 0) {
        val = clr.val();
        clr1help.val(val);
      } else {
        val2 = clr2.val();
        clr2help.val(val2);
      }
      clr1help.val(val);
      root.css("--clr", val + "aa");
    })
  );
  switchCols.on("click", function () {
    let promezhClr = clr.val(),
      promezhText = clr1help.val();
    clr1help.val(clr2help.val());
    clr.val(clr2.val());
    clr2help.val(promezhText);
    clr2.val(promezhClr);
    val = clr.val();
    root.css("--clr", `${val}aa`);
    promezhClr = null;
  });

  window.onmousedown = (e) => {
    if (e.button == 0) isClicked = true;
  };
  window.onmouseup = (e) => {
    if (e.button == 0) isClicked = false;
  };
  const bRangeVal = $("#bRangeVal");
  rangeInput.on("input", function () {
    bRangeVal.text($(this).val());
  });
  const nativeTBL = document.querySelector("#tbl");

  function createField(tbl = table, arrayForImportLayer, isMain) {
    for (let i = 0; i < 18; i++) {
      const tr = $("<tr></tr>");

      for (let j = 0; j < 20; j++) {
        const td = $(`<td draggable="false"></td>`);
        td.css("background", arrayForImportLayer[i][j]);

        if (!isMain) {
          td.attr("data-x", j)
            .attr("data-y", i)
            .attr("data-bg", "#000000")
            .addClass("notMain")
            .on("mouseover", function () {
              x.text(td.attr("data-x"));
              y.text(td.attr("data-y"));
              if (isClicked) {
                $(this).css(
                  "background",
                  mode == "brush" ? val : "transparent"
                );
                document
                  .querySelectorAll(".neighbour")
                  .forEach(
                    (el) =>
                      (el.style.background =
                        mode == "brush" ? val : "transparent")
                  );
              }
            });

          td.on("mousedown", function (e) {
            if (e.button == 0)
              if (!["pippet", "fill"].includes(mode)) {
                $(this)
                  .css("background", mode == "brush" ? val : "transparent")
                  .attr("data-bg", mode == "brush" ? val : "transparent");
                document
                  .querySelectorAll(".neighbour")
                  .forEach(
                    (el) =>
                      (el.style.background =
                        mode == "brush" ? val : "transparent")
                  );
              } else if (mode != "fill") {
                let valu = rgbToHex(
                  ...rgbToArray(
                    td
                      .css("background-color")
                      .replace(/rgba\(.+\)/i, "rgb(0, 0, 0)")
                  )
                );
                console.log(valu);
                clr.val(valu);
                clr1help.val(valu);
              }
          });
          td.on("mouseup", function (e) {
            if (e.button == 0)
              if (mode != "pippet") {
                $(this).css(
                  "background",
                  mode == "brush" ? val : "transparent"
                );
                document
                  .querySelectorAll(".neighbour")
                  .forEach(
                    (el) =>
                      (el.style.background =
                        mode == "brush" ? val : "transparent")
                  );
              }
          });
        } else {
          if (arrayForImportLayer[i][j] == "rgb(0, 0, 0)") {
            td.addClass("legs");
          } else if (arrayForImportLayer[i][j] == "rgb(255, 255, 255)") {
            td.addClass("head");
          } else if (arrayForImportLayer[i][j] == "rgb(173, 173, 173)") {
            td.addClass("darkhead");
          }
          td.addClass("mainLooper");
        }

        tr.append(td);
      }
      tbl.append(tr);
    }
  }
  createField(table, looperLayer, true);
  createField($("#tbl"), new Array(18).fill(new Array(20).fill("")));
  window.createField = createField;

  nativeTBL.addEventListener("mousemove", onMove);
  nativeTBL.addEventListener("mouseleave", clean);

  function clean() {
    const $actives = nativeTBL.querySelectorAll(".mouseEnter");
    const $neighbours = nativeTBL.querySelectorAll(".neighbour");

    $actives.forEach(($active) => $active.classList.remove("mouseEnter"));
    $neighbours.forEach(($neighbour) =>
      $neighbour.classList.remove("neighbour")
    );
  }

  function indexOf($element) {
    return Array.prototype.slice
      .call($element.parentElement.children)
      .indexOf($element);
  }

  function onMove(event) {
    const $target = event.target;

    if ($target.tagName !== "TD" || $target.classList.contains("mouseEnter")) {
      return;
    }

    const far = parseInt(rangeInput.val());
    const neighbours = getNeighbors($target, far);

    clean();

    if (mode !== "pippet") $target.classList.add("mouseEnter");
    neighbours.forEach((neighbour) => neighbour.classList.add("neighbour"));
  }

  /**
   * Получить соседей ячейки
   * @param {HTMLTableCellElement} $cell Исходня ячейка
   * @param {Number} far На сколько далёких соседей нужно получить
   * @return {HTMLTableCellElement[]}
   */
  function getNeighbors($cell, far = 1) {
    far--;
    // выбираем строку ячейки
    const $row = $cell.parentElement;
    // выбираем элемент, который держит все строки (обычно это <table> или <tbody>)
    const $wrapper = $row.parentElement;

    // находим индекс исходной ячеки
    const index = [
      indexOf($row), // индекс строки
      indexOf($cell), // индекс ячейки
    ];

    // вычисляем ограничивающий "ящик"
    const bbox = [
      Math.max(index[0] - far, 0), // индекс минимальной строки
      Math.max(index[1] - far, 0), // индекс минимальной ячейки
      Math.min(index[0] + far, $wrapper.children.length - 1), // индекс максимальной строки
      Math.min(index[1] + far, $row.children.length - 1), // индекс максимальной ячейки
    ];

    // массив с результатом
    const list = [];

    // перебираем все строки из bbox
    for (let i = bbox[0]; i < bbox[2] + 1; i++) {
      const $sRow = $wrapper.children.item(i);

      // в рамках каждой строки, перебираем все ячейки из bbox
      for (let j = bbox[1]; j < bbox[3] + 1; j++) {
        // если сейчас ячейка является исходной, пропускаем её
        if (i === index[0] && j === index[1]) {
          continue;
        }

        const $sCell = $sRow.children.item(j);

        list.push($sCell);
      }
    }

    return list;
  }

  tds = $("table tbody td.notMain").on("click", function (e) {
    if (mode == "fill") {
      console.log(true)
      const picture = $(this);
      console.log(tds)

      let pic_size = [20, 18]; // ее размер

      function draw_pic() {
        // ну тут все понятно
        for (const elem of picture) console.log(...elem);
      }

      function filling(stx, sty, newcolor) {
        let fill = [stx, sty]; // начинаем с клетки, куда тыкают
        let color = picture.css("background"); // запоминаем цвет, который надо залить

        while (fill.length) {
          // пока есть что заливать

          let fill1 = []; // ь

          for (const cell of fill) {
            // смотрим выбранные в прошлый шаг клетки и ищем новые

            let [x, y] = cell;
            picture.css("background", newcolor); // заливаем

            // чекаем соседей, если они того же начального цвета, то выбираем для следующего шага
            if (x > 0 && picture.prev().css("background") == color) fill1.push(picture.prev());
            if (y > 0 && picture.parent().prev().children()[picture.index()].style.background == color) fill1.push([x, y - 1]);
            if (x < pic_size[1] - 1 && picture.next().css("background") == color)
              fill1.push([x + 1, y]);
            if (y < pic_size[0] - 1 && picture.parent().prev().children()[picture.index()].style.background == color)
              fill1.push([x, y + 1]);

            filler.css("background", "#65abcf") // ъ
          }
        }
      }
        console.log($(this), e.target)
        console.log("\n\n\nТыкаем на центральную клетку\n\n");
        filling(e.target.dataset.x, e.target.dataset.y, "#65abcf");
        console.log($(this), e.target);
    }
  });

  const looper = $("td.mainLooper");
  const looperDisabler = $("#disblL");
  looperDisabler.on("change", () =>
    looper[(looperDisabler.prop("checked") ? "remove" : "add") + "Class"](
      "hided"
    )
  );

  $("#reset").click(() => {
    tds.css("background", "transparent");
    settings.savedSkin = "trSkin17cYhAQAACMCwSvf074WgBGJTqzOJiIiIiIj8yAI=";
    unreload();
  });

  const allTds = $("td");
  let gridM = document.querySelector("#gridManager");
  gridM.onchange = function () {
    allTds.css(
      "border-color",
      gridM.checked ? "var(--accent)" : allTds.css("background-color")
    );
  };

  function forClrHelper() {
    if (clr1help.val().length === 7) {
      if (/#[0-9a-f]{6,6}/i.test(clr1help.val())) {
        clr.val(clr1help.val());
        val = clr1help.val();
        root.css("--clr", clr1help.val() + "aa");
      } else {
        clr1help.val("#ffffff");
        clr.val("#ffffff");
        val = clr1help.val();
        root.css("--clr", clr1help.val() + "aa");
      }
    }
  }
  function forClrHelper2() {
    if (clr2help.val().length === 7) {
      if (/#[0-9a-f]{6,6}/i.test(clr2help.val())) {
        clr2.val(clr2help.val());
        val = clr2help.val();
      } else {
        clr2help.val("#ffffff");
        clr2.val("#ffffff");
        val = clr1help.val();
      }
    }
  }
  clr1help.on("input", forClrHelper);
  clr1help.on("paste", forClrHelper);
  clr2help.on("input", forClrHelper2);
  clr2help.on("paste", forClrHelper2);

  $("#noClr").on("click", function () {
    clr.val("#ffffff");
    clr1help.val("#ffffff");
    val = "#ffffff";
    root.css("--clr", `${val}aa`);
  });

  const legsPixels = $(".legs");
  const head = $(".head");
  const darkhead = $(".darkhead");

  const adadad = "rgb(173, 173, 173)";

  $("#lgclr").on("click", () => legsPixels.css("background", val));
  $("#bdclr").on("click", () => {
    const meow = hexToCssHsl(val);
    head.css("background", val);
    darkhead.css("background", hslDark(meow, 68));
  });

  // Import/Export
  const imprt = $("#importBtn");
  const exprt = $("#exportBtn");

  const balckscreen = $("#blackscreen");

  imprt.on("click", function () {
    navigator.clipboard.readText().then((text) => {
      try {
        const strdata = atob(text.replace("trSkin1", "").trim());

        const charData = strdata.split("").map(function (x) {
          return x.charCodeAt(0);
        });

        const binData = new Uint8Array(charData);

        const data = window.pako.inflateRaw(binData);

        const result = String.fromCharCode.apply(null, new Uint16Array(data));
        const arrr = result.split(";").map((e) => "#" + e);
        tds.each(function (ind, el) {
          el.style.backgroundColor = arrr[ind];
        });
      } catch (_) {
        alert("Somethig went wrong!");
      }
    });
  });
  function imprtSkinFromSave() {
    const strdata = atob(settings.savedSkin.replace("trSkin1", "").trim());

    const charData = strdata.split("").map(function (x) {
      return x.charCodeAt(0);
    });

    const binData = new Uint8Array(charData);

    const data = window.pako.inflateRaw(binData);

    const result = String.fromCharCode.apply(null, new Uint16Array(data));
    const arrr = result.split(";").map((e) => "#" + e);
    tds.each(function (ind, el) {
      el.style.backgroundColor = arrr[ind];
    });
  }
  imprtSkinFromSave();
  exprt.on("click", function () {
    let csses = [];
    tds.each(function () {
      csses.push(
        rgbToHex(...rgbToArray($(this).css("background-color")))
          .toUpperCase()
          .replace("#", "")
      );
    });
    csses.push("");
    csses = csses.join(";");
    const lel = btoa(window.pako.deflateRaw(csses, { to: "string" }));
    navigator.clipboard.writeText("trSkin1" + lel);
    exprt.val("Copied").css({ color: "#0f0", borderColor: "#0f0" });
    balckscreen.css("display", "block");
    setTimeout(() => {
      balckscreen.css("display", "none");
      exprt.val("Export").css({ color: "#65abcf", borderColor: "#65abcf" });
    }, 1500);
  });
  $("#resBdyClr").on("click", function () {
    head.css("background", "#ffffff");
    darkhead.css("background", "#adadad");
  });
  $("#resLgsClr").on("click", function () {
    legsPixels.css("background", "#000");
  });
  $("#resetEvr").on("click", function () {
    head.css("background", "#ffffff");
    darkhead.css("background", "#adadad");
    legsPixels.css("background", "#000");
    clr1help.val("#ffffff");
    clr2help.val("#000000");
    clr.val("#ffffff");
    clr2.val("#000000");
    val = clr1help.val();
    val2 = clr2help.val();
    tds.css("background", "#00000000");
    root.css("--clr", `${val}aa`);
    unreload();
  });

  const fromRepl = $("#fromRepl");
  const fromReplHelp = $("#fromReplHelp");
  const toRepl = $("#toRepl");
  const toReplHelp = $("#toReplHelp");

  const repls = [fromRepl, toRepl];
  repls.forEach(function (e, i) {
    e.on("input", function () {
      i == 0 ? fromReplHelp.val(e.val()) : toReplHelp.val(e.val());
    });
  });
  $("#replSwitch").on("click", function () {
    let promezhClr = fromRepl.val(),
      promezhText = fromReplHelp.val();
    fromReplHelp.val(toReplHelp.val());
    fromRepl.val(toRepl.val());
    toReplHelp.val(promezhText);
    toRepl.val(promezhClr);
    promezhClr, (promezhText = null);
  });

  $("#replClr").on("click", function () {
    console.log(
      tds.each(function () {
        if (
          rgbToHex(...rgbToArray($(this).css("background-color"))) ==
          fromRepl.val()
        ) {
          $(this).css("background-color", toRepl.val());
        }
      })
    );
  });

  function forFromReplHelper() {
    if (fromReplHelp.val().length === 7) {
      if (/#[0-9a-f]{6}/i.test(fromReplHelp.val())) {
        fromRepl.val(fromReplHelp.val());
        val = fromReplHelp.val();
      } else {
        fromReplHelp.val("#ffffff");
        fromRepl.val("#ffffff");
        val = clr1help.val();
      }
    }
  }
  function forToReplHelper() {
    if (toReplHelp.val().length === 7) {
      if (/#[0-9a-f]{6,6}/i.test(toReplHelp.val())) {
        toRepl.val(toReplHelp.val());
        val = toReplHelp.val();
      } else {
        toReplHelp.val("#ffffff");
        toRepl.val("#ffffff");
        val = clr1help.val();
      }
    }
  }
  fromReplHelp.on("input", forFromReplHelper);
  fromReplHelp.on("paste", forFromReplHelper);
  toReplHelp.on("input", forToReplHelper);
  toReplHelp.on("paste", forToReplHelper);

  musC = $("#mus");
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

  jquiSort.each(function () {
    $(this).sortable({
      start: function (_, ui) {
        ui.item.first().css("background-color", "#0008");
      },
      stop: function (_, ui) {
        ui.item.first().css("background-color", "#0000");
      },
    });
  });

  window.onkeydown = function (e) {
    if (
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.type !== "text"
    ) {
      switch (e.code) {
        case "KeyX":
          switchCols.click();
          break;
        case "KeyS":
        case "Digit0":
        case "Numpad0":
          looperDisabler.click();
          break;
        case "KeyA":
        case "Digit9":
        case "Numpad9":
          gridM.click();
          break;
        case "KeyM":
          musC.click();
          break;

        // instruments
        case "KeyB":
        case "Digit1":
          brush.click();
          break;
        case "KeyE":
        case "Digit2":
          ereaser.click();
          break;
        case "KeyP":
        case "Digit3":
          pippet.click();
          break;
        case "KeyF":
        case "Digit4":
          filler.click();
          break;
        case "KeyQ":
        case "Digit5":
          selecter.click();
          break;

        // Brush range
        case "Equal":
        case "NumpadAdd":
          rangeInput.val(parseInt(rangeInput.val()) + 1);
          bRangeVal.text(rangeInput.val());
          break;
        case "Minus":
        case "NumpadSubtract":
          rangeInput.val(rangeInput.val() - 1);
          bRangeVal.text(rangeInput.val());
          break;
      }
    }
  };

  const acsnt = $("#acsntClr");
  const acsntClrHelp = $("#acsntClrHelp");

  acsnt.on("change", function () {
    const hsl = hexToCssHsl(acsnt.val(), true).split(",");

    root.css({
      "--accent-h": hsl[0],
      "--accent-s": hsl[1],
      "--accent-l": hsl[2],
    });
    acsntClrHelp.val(acsnt.val());
  });
  function forAcsntHelper() {
    if (acsntClrHelp.val().length === 7) {
      if (/#[0-9a-f]{6,6}/i.test(acsntClrHelp.val())) {
        acsnt.val(acsntClrHelp.val());
        val = acsntClrHelp.val();
        const hsl = hexToCssHsl(acsnt.val(), true).split(",");

        root.css({
          "--accent-h": hsl[0],
          "--accent-s": hsl[1],
          "--accent-l": hsl[2],
        });
      } else {
        acsntClrHelp.val("#ffffff");
        acsnt.val("#ffffff");
        val = clr1help.val();
      }
    }
  }
  acsntClrHelp.on("keyup", forAcsntHelper);
  acsntClrHelp.on("paste", forAcsntHelper);

  $("#resAcsnt").on("click", function () {
    const hsl = hexToCssHsl("#65abcf", true).split(",");

    root.css({
      "--accent-h": hsl[0],
      "--accent-s": hsl[1],
      "--accent-l": hsl[2],
    });
    acsntClrHelp.val("#65abcf");
    acsnt.val("#65abcf");
  });

  class Star {
    constructor(options) {
      this.ctx = options.ctx;

      this.image = options.image;

      this.width = options.width;
      this.height = options.height;

      this.starSize = Math.floor(
        Math.random() * (maxStarSize - minStarSize) + minStarSize
      );

      this.frameIndex = 0;
      this.tickCount = 0;
      this.ticksPerFrame = options.ticksPerFrame || 0;
      this.numberOfFrames = options.numberOfFrames || 1;
      this.x = Math.floor(Math.random() * scrWidth);
      this.y = Math.floor(Math.random() * scrHeight);

      this.rgb = options.rgb;

      this.start();
    }

    render() {
      this.ctx.drawImage(
        this.image,
        this.frameIndex * (this.width / this.numberOfFrames),
        0,
        10,
        10,
        this.x,
        this.y,
        this.starSize,
        this.starSize
      );
    }

    update() {
      this.tickCount++;

      if (this.tickCount > this.ticksPerFrame) {
        this.ctx.clearRect(this.x, this.y, 30, 30);
        this.tickCount = 0;
        this.frameIndex++;
      }
    }
    start() {
      const loop = () => {
        this.update();
        this.render();

        if (this.frameIndex < this.numberOfFrames)
          window.requestAnimationFrame(loop);
        else {
          starCount--;
        }
      };

      window.requestAnimationFrame(loop);
    }
  }

  setInterval(() => {
    if (starCount < minStars && starCount < maxStars) {
      new Star({
        ctx: canvas.getContext("2d"),
        image: starSheets[Math.floor(Math.random() * 3)],
        width: 50,
        height: 10,
        numberOfFrames: 5,
        ticksPerFrame: 20,
      });
      starCount++;
    }
  }, 100);

  $('#input[type="color"]').on("change", (e) => e.target.blur());
});
function unreload() {
  let csses = [];
  tds.each(function () {
    csses.push(
      rgbToHex(...rgbToArray($(this).css("background-color")))
        .toUpperCase()
        .replace("#", "")
    );
  });
  csses.push("");
  csses = csses.join(";");
  settings.savedSkin =
    "trSkin1" + btoa(window.pako.deflateRaw(csses, { to: "string" }));
  localStorage.setItem("settings", JSON.stringify(settings));
}
