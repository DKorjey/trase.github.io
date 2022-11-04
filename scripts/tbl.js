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

const rgbToHex = (r, g, b, a = "FF") =>
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
$(() => {
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
  const inp = $("#clrHelp");
  const table = $("#tblLooper");
  const rangeInput = $("#brushRange");

  const [x, y] = [$("#x"), $("#y")];

  /**
   * @type {"brush" | "ereaser" | "pippet" | "select"}
   */
  let mode = "brush";
  const brush = $("#brush");
  const ereaser = $("#ereaser");
  const pippet = $("#pippet");
  const selecter = $("#select");

  const instruments = [brush, ereaser, pippet, selecter];

  instruments.forEach((el) =>
    el.on("click", () => {
      instruments.forEach((e) =>
        e[(e == el ? "add" : "remove") + "Class"]("active")
      );
      mode = el.text().toLowerCase();
    })
  );

  let isClicked = false;

  let val = clr.val();

  clr.on("input", () => {
    val = clr.val();
    inp.val(clr.val());
    root.css("--clr", val + "aa");
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
        const td = $("<td></td>");
        td.prop("draggable", false);
        td.css("background", arrayForImportLayer[i][j]);

        if (!isMain) {
          td.attr("data-x", j).attr("data-y", i);
          td.addClass("notMain");
          td.on("mouseover", function () {
            x.text(td.attr("data-x"));
            y.text(td.attr("data-y"));
            if (isClicked) {
              $(this).css("background", mode == "brush" ? val : "transparent");
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
              } else {
                let valu = $(this).css("background");
                // valu = ['transparent', 'unset'].includes(valu) ? arrayForImportLayer[table.children] : ;
                clr.val(rgbToHex(valu));
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

    $target.classList.add("mouseEnter");
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

  let tds = $("table tbody td.notMain");

  const looper = $("td.mainLooper");
  const looperDisabler = $("#disblL");
  looperDisabler.on("change", () =>
    looper[(looperDisabler.prop("checked") ? "remove" : "add") + "Class"](
      "hided"
    )
  );

  $("#reset").click(() => {
    tds.css("background", "unset");
  });

  const allTds = $("td");
  let gridM = document.querySelector("#gridManager");
  gridM.onchange = function () {
    allTds.css(
      "border-color",
      gridM.checked ? "#65abcf" : allTds.css("background-color")
    );
  };

  function forClrHelper() {
    if (inp.val().length === 7) {
      if (/#[0-9a-f]{6,6}/i.test(inp.val())) {
        clr.val(inp.val());
        val = inp.val();
        root.css("--clr", inp.val() + "aa");
      } else {
        inp.val("#ffffff");
        clr.val("#ffffff");
        val = inp.val();
        root.css("--clr", inp.val() + "aa");
      }
    }
  }
  inp.on("input", forClrHelper);
  inp.on("paste", forClrHelper);

  $("#noClr").on("click", function () {
    clr.val("#ffffff");
    inp.val("#ffffff");
    val = "#ffffff";
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
        const strdata = atob(text.replace("trSkin1", ""));

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
    inp.val("#ffffff");
    clr.val("#ffffff");
    val = inp.val();
    tds.css("background", "#00000000");
  });
});
