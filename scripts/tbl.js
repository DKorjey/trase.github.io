/**
 * @param {any[]} array
 * @param {number} limit
 * @returns {any[][]}
 */
function get2dimensional(array, limit) {
  const array2 = [];
  let section;

  for (const [index, element] of array.entries()) {
    if (index % limit === 0) array2.push((section = []));
    section.push(element);
  }

  return array2;
}
function doRGBA(r, g, b, a) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    Math.floor(60 * h < 0 ? 60 * h + 360 : 60 * h),
    Math.floor(
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
    ),
    Math.floor((100 * (2 * l - s)) / 2),
  ];
};
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
    h = s = 0;
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
/**
 * @param {JQuery<HTMLElement>} jqThis
 * @param {number} percents
 */
function doDarker(jqThis, percents) {
  const color = RGBToHSL(rgbToArray(jqThis.css("background-color")));
  if (color[2] - percents < 0) color[2] = 0;
  jqThis.css("background-color", "hsl(" + color[0] + ", " + color[1] + ", ");
}

/**
 * @param {JQuery<HTMLElement>} jqThis
 * @param {number} percents
 */
function doLighter(jqThis, percents) {}

let musC;
let { width: scrWidth, height: scrHeight } = window.screen;
window.onresize = function () {
  scrWidth = this.screen.width;
  scrHeight = this.screen.height;
};

let acsnt;
let settings = localStorage.getItem("settings");
$(() => {
  if (new MobileDetect(window.navigator.userAgent).mobile()) {
    $("#mobileSmall").addClass("yesMobileSmall");
    $(document.body).css({
      overflow: "hidden !important",
      width: "1vh !important",
    });
  }

  const undoArr = ["7cYhAQAACMCwSvf074WgBGJTqzOJiIiIiIj8yAI="];

  if (!settings) {
    settings = {
      savedSkin: "trSkin17cYhAQAACMCwSvf074WgBGJTqzOJiIiIiIj8yAI=",
      accent: undefined,
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

  const acsnt = $("#acsntClr");

  const allowerToCombine = $("#allowCombine");

  const deepLDark = $("#deepLDark");

  const switchCols = $("button#switchCols");

  const [x, y] = [$("#x"), $("#y")];

  let starCount = 0;

  const minStars = 100;
  const maxStars = 7;
  const ticksBetweenChecks = 50;
  const tickCount = 0;

  const minStarSize = 10;
  const maxStarSize = 30;

  const starsCanv = document.getElementById("bgCanvas");
  starsCanv.width = scrWidth;
  starsCanv.height = scrHeight;
  const starsCtx = starsCanv.getContext("2d");
  starsCtx.imageSmoothingEnabled = false;

  const srces = [
    "../imgs/StarSpriteSheetPink.png",
    "../imgs/StarSpriteSheetYellow.png",
    "../imgs/StarSpriteSheetBlue.png",
  ];
  const starSheets = [new Image(), new Image(), new Image()];
  for (let i = 0; i < 3; i++) starSheets[i].src = srces[i];

  const brng = $("#brng");

  const brush = $("#brush");
  const ereaser = $("#ereaser");
  const pippet = $("#pippet");
  const filler = $("#fill");
  const selecter = $("#select");
  const wand = $("#wand");

  /**
   * @type { "brush" | "ereaser" | "pippet" | "fill" | "darker" | "wand"}}
   */
  let mode = "brush";

  const instruments = [brush, ereaser, pippet, filler, selecter, wand];

  /**@type {JQuery<HTMLElement>} */
  let targetTD;
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
      if (["brush", "ereaser"].includes(mode)) {
        rangeInput.val(1);
      }
      if (mode == "fill") {
        targetTD.hasClass("mouseEnter") && targetTD.removeClass("mouseEnter");
      }
    })
  );

  let isClicked = false;

  let [val, val2] = [clr.val(), clr2.val()];
  val = clr.val();
  val2 = clr2.val();
  clr1help.val(val.slice(1));
  clr2help.val(val2.slice(1));
  root.css("--clr", `${val}aa`);

  switchCols.on("click", function () {
    let tmpClr = clr.val(),
      tmpText = clr1help.val();
    clr1help.val(clr2help.val());
    clr.val(clr2.val());
    clr2help.val(tmpText);
    clr2.val(tmpClr);
    val = clr.val();
    root.css("--clr", `${val}aa`);
    [tmpClr, tmpText] = [null, null];
  });

  const currClrSpan = $("#currClr");

  window.onmousedown = (e) => e.button == 0 && (isClicked = true);
  window.onmouseup = (e) => e.button == 0 && (isClicked = false);

  const bRangeVal = $("#bRangeVal");
  rangeInput.on("input", function () {
    bRangeVal.text($(this).val());
  });
  let activeTd;
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
              targetTD = td;
              if (isClicked && mode != "fill") {
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
            })
            .on("mousedown", function (e) {
              if (e.button == 0)
                if (!["pippet", "fill"].includes(mode)) {
                  $(this).css(
                    "background",
                    mode == "brush" ? val : "transparent"
                  );
                  document
                    .querySelectorAll(".neighbour")
                    .forEach(
                      (el) =>
                        (el.style.background =
                          mode == "brush"
                            ? val
                            : mode == "ereaser"
                            ? "transparent"
                            : "#000cba")
                    );
                } else if (mode != "fill") {
                  let valu = chroma($(this).css("background-color"))
                    .hex()
                    .slice(0, 7);
                  console.log(valu);
                  clr.val(valu);
                  clr1help.val(valu.slice(1));
                  val = clr.val();
                  root.css("--clr", val);
                }
            })
            .on("mouseup", function (e) {
              if (e.button == 0)
                if (mode != "pippet") {
                  if (mode != "fill") {
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
                  const lel = btoa(
                    window.pako.deflateRaw(csses, { to: "string" })
                  );
                  if (lel != undoArr.at(-1)) {
                    undoArr.splice(undoArr.indexOf(lel) + 1, Infinity);
                  } else undoArr.push(lel);
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
  function exprtSkin(returnRes = false) {
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
    if (returnRes) return lel;
    undoArr.push(lel);
    console.log(undoArr);
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

    if (mode !== "pippet")
      if (mode !== "fill") {
        currClrSpan.text(
          !$target.style.backgroundColor ||
            $target.style.backgroundColor === "rgba(0, 0, 0, 0)"
            ? "None"
            : rgbToHex(...rgbToArray($target.style.backgroundColor))
        );
        $target.classList.add("mouseEnter");
      }
    activeTd = $(event.target);
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
    const $row = $cell.parentElement;
    const $wrapper = $row.parentElement;

    const index = [indexOf($row), indexOf($cell)];

    const bbox = [
      Math.max(index[0] - far, 0),
      Math.max(index[1] - far, 0),
      Math.min(index[0] + far, $wrapper.children.length - 1),
      Math.min(index[1] + far, $row.children.length - 1),
    ];

    const list = [];

    for (let i = bbox[0]; i < bbox[2] + 1; i++) {
      const $sRow = $wrapper.children.item(i);

      for (let j = bbox[1]; j < bbox[3] + 1; j++) {
        if (i === index[0] && j === index[1]) {
          continue;
        }

        const $sCell = $sRow.children.item(j);

        list.push($sCell);
      }
    }

    return list;
  }

  const tds = $("#tbl tbody td.notMain");
  const trs = $("#tbl tbody tr");
  const test = [];
  tds.each(function () {
    test.push(rgbToHex(...rgbToArray($(this).css("background-color"))));
  });
  tds.each(function () {
    $(this).on("click", function () {
      if (mode == "fill") {
        function fill(data, x, y, newValue) {
          // get target value
          var target = data[x][y];

          function flow(x, y) {
            // bounds check what we were passed
            if (x >= 0 && x < data.length && y >= 0 && y < data[x].length) {
              if (data[x][y] === target) {
                data[x][y] = newValue;
                flow(x - 1, y); // check up
                flow(x + 1, y); // check down
                flow(x, y - 1); // check left
                flow(x, y + 1); // check right
              }
            }
          }

          flow(x, y);
        }

        const onedclrs = [];
        tds.each(function () {
          onedclrs.push(
            rgbToHex(...rgbToArray($(this).css("background-color")))
          );
        });
        const clrs = get2dimensional(onedclrs, 20);
        fill(clrs, $(this).attr("data-y"), $(this).attr("data-x"), clr.val());
        const res = clrs.flat();
        tds.each(function (i) {
          $(this).css("background-color", res[i] + " !important");
        });
      }
      console.log();
    });
  });

  const looper = $("td.mainLooper");
  const looperDisabler = $("#disblL");
  looperDisabler.on("change", () =>
    looper[(looperDisabler.prop("checked") ? "remove" : "add") + "Class"](
      "hided"
    )
  );

  $("#reset").click(() => {
    tds.css("background", "#00000000");
    settings.savedSkin = "trSkin17cYhAQAACMCwSvf074WgBGJTqzOJiIiIiIj8yAI=";
    unreload(acsnt);
  });

  const allTds = $("td");
  let gridM = document.querySelector("#gridManager");
  gridM.onchange = function () {
    allTds.css(
      "border-color",
      gridM.checked ? "var(--accent)" : allTds.css("background-color")
    );
  };
  clr1help.on("keydown", function (e) {
    if (!/[0-9a-f]/i.test(e.key)) {
      return false;
    }
  });
  function forClrHelper() {
    if (clr1help.val().length === 6) {
      clr.val("#" + clr1help.val());
      val = "#" + clr1help.val();
      root.css("--clr", "#" + clr1help.val() + "aa");
    }
    if (clr1help.val().length === 3) {
      const tmp = "#" + [...clr1help.val()].map((e) => e + e).join("");
      clr.val(tmp);
      val = tmp;
    }
  }
  function forClrHelper2() {
    if (clr2help.val().length === 6 && /[0-9a-f]{6,6}/i.test(clr2help.val())) {
      clr2.val("#" + clr2help.val());
    }
    if (clr2help.val().length === 3 && /[0-9a-f]{3,3}/i.test(clr2help.val())) {
      clr2.val("#" + [...clr2help.val()].map((e) => e + e).join(""));
    }
  }

  function clrHelpBlur() {
    if ($(this).val().length === 3) {
      $(this).val([...$(this).val()].map((e) => e + e).join(""));
    }
  }

  clr1help.on("input", forClrHelper);
  clr1help.on("paste", forClrHelper);
  clr1help.on("blur", clrHelpBlur);
  clr2help.on("input", forClrHelper2);
  clr2help.on("paste", forClrHelper2);
  clr2help.on("blur", clrHelpBlur);

  $("#noClr").on("click", function () {
    clr.val("#ffffff");
    clr1help.val("ffffff");
    val = "ffffff";
    root.css("--clr", `${val}aa`);
    clr2.val("#000000");
    clr2help.val("000000");
  });

  const legsPixels = $(".legs");
  const head = $(".head");
  const darkhead = $(".darkhead");

  $("#lgclr").on("click", () => legsPixels.css("background", val));
  $("#bdclr").on("click", () => {
    const hslval = hexToCssHsl(val);
    head.css("background", val);
    darkhead.css("background", hslDark(hslval, 68));
  });

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
        tds.each(function (i) {
          if (
            allowerToCombine.prop("checked") &&
            /#?[0-9a-f]{4}00/i.test(arrr[i])
          )
            return;
          $(this).css("background-color", arrr[i]);
        });
      } catch (e) {
        alert("Somethig went wrong!");
        console.error(e);
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
      exprt
        .val("Export as text")
        .css({ color: "#65abcf", borderColor: "#65abcf" });
    }, 500);
  });
  $("#resBdyClr").on("click", function () {
    head.css("background", "#ffffff");
    darkhead.css("background", "#adadad");
  });
  $("#resLgsClr").on("click", function () {
    legsPixels.css("background", "#000000");
  });
  $("#resetEvr").on("click", function () {
    if (confirm("This will reset absolutely everything! ARE YOU SURE?!")) {
      head.css("background", "#ffffff");
      darkhead.css("background", "#adadad");
      legsPixels.css("background", "#000000");
      clr1help.val("ffffff");
      clr2help.val("000000");
      clr.val("#ffffff");
      clr2.val("#000000");
      val = "#" + clr1help.val();
      val2 = "#" + clr2help.val();
      tds.css("background", "#00000000");
      root.css("--clr", `${val}aa`);
      unreload(acsnt);
    }
  });

  musC = $("#mus");
  let mus;
  musC.on("change", () => {
    if (musC.prop("checked")) {
      mus = new Audio("../music/menu.wav");
      mus.loop = true;
      mus.play();
    } else {
      mus.pause();
      mus = null;
    }
  });

  jquiSort.each(function () {
    $(this).sortable({
      start: function (_, ui) {
        ui.item.first().addClass("jqsortActive");
      },
      stop: function (_, ui) {
        ui.item.first().removeClass("jqsortActive");
      },
    });
  });

  window.onkeydown = function (e) {
    if (
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.type !== "text"
    ) {
      activeTd?.mousemove();
      $("#tbl").mousemove();
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
        case "KeyK":
        case "Digit6":
          wand.click();
          break;

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
        val = "#" + clr1help.val();
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

  $("#paddingTbl").on("input", function () {
    allTds.css("padding", $(this).val());
  });

  const notMainTable = $("#tbl");
  const notMainTbody = notMainTable.children(":first");
  $("#flipH").on("click", function () {
    trs.each(function () {
      $(this).append($(this).children("td").get().reverse());
    });
  });
  $("#flipV").on("click", function () {
    notMainTbody.append(notMainTbody.children("tr").get().reverse());
  });

  $("#undo").on("click", function () {
    if (undoArr.length >= 1) {
      const strdata = atob(undoArr[undoArr.length - 2].trim());
      const charData = strdata.split("").map(function (x) {
        return x.charCodeAt(0);
      });
      const binData = new Uint8Array(charData);
      const data = window.pako.inflateRaw(binData);
      const result = String.fromCharCode.apply(null, new Uint16Array(data));
      const arrr = result.split(";").map((e) => "#" + e.slice(0, 9));
      tds.each(function (ind) {
        console.log(arrr[ind]);
        $(this).css("background-color", arrr[ind] + "!important");
      });
    }
  });

  $("#redo");

  let isApply = true;
  $("#applRes").on("click", function () {
    const container = $(this).closest("div").find("#closest");
    $(this).text(isApply ? "Reset" : "Apply");
    if (isApply) {
      container.children(":last").css("display", "block");
      container.children(":first").css("display", "none");
      $(this).parent().addClass("Res").removeClass("appl");
      $(this).addClass("Res").removeClass("appl");
    } else {
      container.children(":last").css("display", "none");
      container.children(":first").css("display", "block");
      $(this).parent().addClass("appl").removeClass("Res");
      $(this).addClass("appl").removeClass("Res");
    }
    isApply = !isApply;
  });

  /**@type {HTMLCanvasElement} */
  const imgCanv = document.querySelector("#canvSkin");
  const cx = imgCanv.getContext("2d");

  const importImg = $("#importImg");
  $("#btnImImg").on("click", () => importImg.click());

  importImg.on("change", function (e) {
    const img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = function () {
      if (img.naturalWidth != 20 || img.naturalHeight != 18) {
        return alert("The image must be 20x18 px");
      }
      cx.drawImage(img, 0, 0, 20, 18);
      const data = get2dimensional(cx.getImageData(0, 0, 20, 18).data, 4);
      const rgba = data.map((e) => doRGBA(...e));
      cx.clearRect(0, 0, 20, 18);
      tds.each(function (i) {
        if (allowerToCombine.prop("checked") && rgba[i].endsWith("0)")) return;
        $(this).css("background-color", rgba[i]);
      });
      console.log(rgba);
    };
  });

  $("#exportImg").on("click", function () {
    try {
      cx.clearRect(0, 0, 20, 18);
      const twodmarr = [];
      tds.each(function () {
        twodmarr.push(rgbToArray($(this).css("background-color")));
      });
      const editedArr = new Uint8ClampedArray(
        twodmarr.map((e) => (e.length == 3 ? e.concat(255) : e)).flat()
      );
      const imgData = new ImageData(editedArr, 20, 18);
      for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i + 0] = editedArr[i + 0];
        imgData.data[i + 1] = editedArr[i + 1];
        imgData.data[i + 2] = editedArr[i + 2];
        imgData.data[i + 3] = editedArr[i + 3];
      }
      cx.putImageData(imgData, 0, 0);
      link = document.createElement("a");
      link.download = "skin.png";
      link.href = imgCanv.toDataURL();
      link.click();
    } catch (e) {
      alert("SkinError: " + e.message);
    }
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
        ctx: starsCanv.getContext("2d"),
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
  window.onbeforeunload = () => unreload(acsnt);

  $("#mixClrs").on("click", function () {
    const res = chroma.mix(clr.val(), clr2.val()).hex().replace("#", "");
    clr.val("#" + res);
    clr1help.val(res);
    val = res;
  });
});
function unreload(acsnt) {
  let csses = [];
  const tds = $("#tbl tbody td.notMain");
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
  settings.accent = hexToCssHsl(acsnt.val(), true).split(",");
  localStorage.setItem("settings", JSON.stringify(settings));
}
