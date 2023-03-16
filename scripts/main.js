function defaultModal(width, height, additionalObjects = {}) {
  return {
    width: width,
    height: height,
    autoOpen: false,
    modal: true,
    dialogClass: "mixClrs",
    resizable: false,
    buttons: {
      Close: function () {
        $(this).dialog("close");
      },
    },
    ...additionalObjects,
  };
}
try {
  //#region
  function doRGBA(r, g, b, a) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  /**
   * @param {[number, number, number]}
   * @returns {string}
   */
  const doRGB = (arr) => `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
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
    const hex = c.toString(16);
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
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    let cssString = "";
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;
    if (max == min) {
      h = s = 0;
    } else {
      const d = max - min;
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
   * @param {string} skin
   * @returns {string[][]}
   */
  function arrFromSkin(skin, twoDimensional = true) {
    const strdata = atob(skin.replace("trSkin1", "").trim());
    const charData = strdata.split("").map((x) => x.charCodeAt(0));
    const binData = new Uint8Array(charData);
    const data = window.pako.inflateRaw(binData);
    const result = String.fromCharCode
      .apply(null, new Uint16Array(data))
      .split(";")
      .map((e) => "#" + e);
    result.pop();
    return twoDimensional ? _.chunk(result, 20) : result;
  }
  /**
   * @param {string} str
   * @returns {string}
   */
  function fromUpper(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }
  //#endregion
  let musC;
  /**@type {JQuery<HTMLElement>} */
  // let acsnt;
  /**@type {JQuery<HTMLElement>} */
  let autoclose;

  /**@type {{savedSkin: string, accent: string, autoclose: boolean} | string | null} */
  const defaultSettings = {
    savedSkin: "trSkin17cYhAQAACMCwSvf074WgBGJTqzOJiIiIiIj8yAI=",
    accent: "#65abcf",
    autoclose: true,
    bodyColor: "#ffffff",
    legsColor: "#000000",
  };
  let settings = localStorage.getItem("settings");
  /**@type {JQuery<HTMLElement>} */
  let looper;

  class SkinError extends Error {
    name = "SkinError";
    /**
     * @constructor
     * @param {string | undefined} message
     */
    constructor(message = "") {
      super(message);
    }
  }

  class TRSSError extends Error {
    name = "SkinError";
    /**
     * @constructor
     * @param {string | undefined} message
     */
    constructor(message = "") {
      super(message);
    }
  }

  const trssErrors = {
    0: "Invalid user or password",
    1: "The user could not be found in the Team Run database",
    2: "Failed to generate unique token",
    3: "User already registered",
    4: "User or skin not found",
    5: "Exactly the same skin from the same author is already in the database",
    6: "Skin not found",
    7: "Skin creator ID does not match user ID",
    "-1": "Unknown error",
  };

  class ResolutionError extends Error {
    name = "ResolutionError";
    /**
     * @constructor
     * @param {string | undefined} message
     */
    constructor(message = "") {
      super(message);
    }
  }

  class RequestError extends Error {
    name = "RequestError";
    /**
     * @constructor
     * @param {string | undefined} message
     */
    constructor(message = "") {
      super(message);
    }
  }

  function isJson(item) {
    item = typeof item !== "string" ? JSON.stringify(item) : item;
    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }
    if (typeof item === "object" && item !== null) {
      return true;
    }
    return false;
  }

  /**
   * @template T
   * @param {T[]} arr
   * @returns {T}
   */
  const choice = (arr) => arr[Math.floor(Math.random() * arr.length)];

  $(() => {
    const flashbang = $("#flashbang");
    flashbang.hide();
    if (new MobileDetect(window.navigator.userAgent).mobile()) {
      $("#mobileSmall").addClass("yesMobileSmall");
      $(document.body).css({
        overflow: "hidden !important",
        width: "1vh !impo`#${clr1help.val()}`;rtant",
      });
      return;
    }

    const clack = new Audio("../src/music/clack.wav");
    const bonk = new Audio("../src/music/error.wav");

    $(
      "button:not(.filler), input[type=button], input[type=color], input[type=checkbox], .ui-button"
    ).on("click", () => clack.play());

    const boo = new Audio("../src/music/reset.wav");

    const camelSplit = [/([a-z0-9])([A-Z])/g, "$1 $2"];

    if (!settings) {
      settings = _.cloneDeep(defaultSettings);
    } else settings = JSON.parse(settings);

    const root = $(":root");

    $("input[type=checkbox]").checkboxradio();
    const pippetApply = $("input[type=radio]").checkboxradio();
    const cpchoice = $("#cpchoice");

    const clr = $("#clr");
    const clr2 = $("#clr2");
    const clr1help = $("#clrHelp");
    const clr2help = $("#clr2Help");
    const table = $("#tblLooper");
    const rangeInput = $("#brushRange");
    const jquiSort = $(".jquiSort");

    const fatalErrD = $("#fatalErrDialog").dialog({
      width: 500,
      height: 550,
      autoOpen: false,
      modal: true,
      dialogClass: "mixClrs",
      resizable: false,
    });

    const acsnt = $("#acsntClr");
    const acsntClrHelp = $("#acsntClrHelp");

    const bParamsHeader = $("#bParams");

    autoclose = $("#autocloser").prop("checked", settings.autoclose);

    const switchCols = $("button#switchCols");

    const [linex1, liney1, linex2, liney2] = [
      $("#linex1"),
      $("#liney1"),
      $("#linex2"),
      $("#liney2"),
    ];

    const forline = $(".forline");

    const bdlgClr = $("input[name=bdlgClr]");

    const crtline = $("#crtline")
      .prop("disabled", true)
      .on("click", function () {
        try {
          cx.clearRect(0, 0, 20, 18);
          tds.removeClass("point1Line points1Line point2Line points2Line");
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

          cx.beginPath();
          cx.strokeStyle = val;
          cx.lineWidth = 0.5;
          cx.moveTo(+linex1.val() + 0.5, +liney1.val() + 0.5);
          cx.lineTo(+linex2.val() + 0.5, +liney2.val() + 0.5);
          cx.stroke();

          const data = _.chunk(cx.getImageData(0, 0, 20, 18).data, 4);
          const rgba = data.map((e) => doRGBA(...e));
          tds.each(function (i) {
            $(this).css("background-color", rgba[i]);
          });
        } catch (e) {
          errDialogOpen(e);
        }
      });

    const moveUp = $("#mov_rax").on("click", () => {
      const hexes = _.chunk(
        tds.map(function () {
          return chroma(this.style.backgroundColor).hex();
        }),
        20
      );
      hexes.push(hexes.shift());
      const flatten = hexes.flat();
      tds.each(function (i) {
        $(this).css("background-color", flatten[i]);
      });
    });
    const moveDown = $("#mov_rbx").on("click", () => {
      const hexes = _.chunk(
        tds.map(function () {
          return chroma(this.style.backgroundColor).hex();
        }),
        20
      );
      hexes.unshift(hexes.pop());
      const flatten = hexes.flat();
      tds.each(function (i) {
        $(this).css("background-color", flatten[i]);
      });
    });
    const moveLeft = $("#mov_eax").on("click", () => {
      const hexes = _.chunk(
        tds.map(function () {
          return chroma(this.style.backgroundColor).hex();
        }),
        20
      );
      hexes.forEach((e) => e.push(e.shift()));
      const flatten = hexes.flat();
      tds.each(function (i) {
        $(this).css("background-color", flatten[i]);
      });
    });
    const moveRight = $("#mov_ebx").on("click", () => {
      const hexes = _.chunk(
        tds.map(function () {
          return chroma(this.style.backgroundColor).hex();
        }),
        20
      );
      hexes.forEach((e) => e.unshift(e.pop()));
      const flatten = hexes.flat();
      tds.each(function (i) {
        $(this).css("background-color", flatten[i]);
      });
    });

    const movBtns = [moveUp, moveDown, moveLeft, moveRight];

    $("#mov_rndm").on("click", () => {
      choice(movBtns).trigger("click");
    });

    const [x, y] = [$("#x"), $("#y")];

    const brng = $("#brng");
    const lineCr = $("#lineCr");
    const applCr = $("#applCr");
    const moverctrl = $("#moverctrl");

    const brush = $("#brush");
    const ereaser = $("#ereaser");
    const pippet = $("#pippet");
    const filler = $("#fill");
    const line = $("#line");
    const bdlg = $("#bdlg");
    const mover = $("#mover");

    const theresNothingHere = $("#nthngHere");

    /**@type {[JQuery<HTMLElement>, JQuery<HTMLElement>]} */
    const linePoints = [];

    /**
     * @type { "brush" | "ereaser" | "pippet" | "fill" | "line" | "bdlg" | "mover" }
     */
    let mode = "brush";

    const instruments = [brush, ereaser, pippet, filler, line, bdlg, mover];

    /**@type {JQuery<HTMLElement>} */
    let targetTD;
    instruments.forEach((el) => {
      el.on("click", () => {
        instruments.forEach((e) =>
          e[(e == el ? "add" : "remove") + "Class"]("active")
        );
        if (mode == "line") {
          tds.removeClass("point1Line points1Line point2Line points2Line");
          crtline.prop("disabled", true);
          forline.val("");
        }
        mode = el.attr("id");
        brng.css(
          "display",
          ["brush", "ereaser"].includes(mode) ? "block" : "none"
        );
        cpchoice.css("display", mode == "pippet" ? "block" : "none");
        lineCr.css("display", mode == "line" ? "block" : "none");
        moverctrl.css("display", mode == "mover" ? "block" : "none");
        if (!["brush", "ereaser"].includes(mode)) {
          rangeInput.val(1);
          bRangeVal.text(1);
        }
        if (mode == "fill") {
          targetTD?.removeClass("mouseEnter");
        }
        applCr.css("display", mode == "bdlg" ? "block" : "none");
        theresNothingHere.css("display", mode == "fill" ? "block" : "none");
        bParamsHeader.text(
          mode == "pippet"
            ? "Eyedropper"
            : mode == "bdlg"
            ? "Applyer"
            : fromUpper(mode)
        );
      });
    });

    let isClicked = false;

    let [val, val2] = [clr.val(), clr2.val()];
    val = clr.val();
    val2 = clr2.val();
    clr1help.val(clr.val().slice(1));
    clr2help.val(clr2.val().slice(1));
    root.css({ "--clr": `${val}88`, "--hl": val });

    [clr, clr2].forEach((e, i) =>
      e.on("input", () => {
        if (i == 0) {
          val = clr.val();
          clr1help.val(val.slice(1));
        } else {
          val2 = clr2.val();
          clr2help.val(val2.slice(1));
        }
        root.css({ "--clr": `${val}88`, "--hl": val });
      })
    );

    switchCols.on("click", function () {
      let tmpClr = clr.val(),
        tmpText = clr1help.val();
      clr1help.val(clr2help.val());
      clr.val(clr2.val());
      clr2help.val(tmpText);
      clr2.val(tmpClr);
      val = clr.val();
      root.css({ "--clr": `${val}88`, "--hl": val });
      [tmpClr, tmpText] = [null, null];
    });

    const currClrSpan = $("#currClr");

    window.onmousedown = (e) => e.button == 0 && (isClicked = true);
    window.onmouseup = (e) => e.button == 0 && (isClicked = false);

    const bRangeVal = $("#bRangeVal");
    rangeInput.on("input", function () {
      bRangeVal.text($(this).val());
    });

    const nativeTBL = document.querySelector("#tbl");
    function createField(tbl = table, arrayForImportLayer, isMain) {
      for (let i = 0; i < 18; i++) {
        const tr = $("<tr></tr>").addClass(isMain ? "main" : "notM");

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
                if (isClicked && ["brush", "ereaser"].includes(mode)) {
                  $(this).css(
                    "background",
                    mode == "brush" ? val : "#00000000"
                  );
                  document
                    .querySelectorAll(".neighbour")
                    .forEach(
                      (el) =>
                        (el.style.background =
                          mode == "brush" ? val : "#00000000")
                    );
                }
              })
              .on("mousedown", function (e) {
                if (e.button == 0) {
                  if (["brush", "ereaser"].includes(mode)) {
                    $(this).css(
                      "background",
                      mode == "brush" ? val : "#00000000"
                    );
                    document
                      .querySelectorAll(".neighbour")
                      .forEach(
                        (el) =>
                          (el.style.background =
                            mode == "brush"
                              ? val
                              : mode == "ereaser"
                              ? "#00000000"
                              : "#000cba")
                      );
                  } else if (mode == "pippet") {
                    let valu = chroma($(this).css("background-color")).hex();
                    if (valu == "#00000000") {
                      valu = chroma(
                        _.chunk(looper.toArray(), 20)[$(this).attr("data-y")][
                          $(this).attr("data-x")
                        ].style.backgroundColor
                      )
                        .hex()
                        .slice(0, 7);
                    } else valu = valu.slice(0, 7);
                    if (pippetApply.filter(":checked").val() == "forclr1") {
                      clr.val(valu);
                      clr1help.val(valu.slice(1));
                      val = clr.val();
                      root.css({ "--clr": `${val}88`, "--hl": val });
                    } else {
                      clr2.val(valu);
                      clr2help.val(valu.slice(1));
                    }
                  }
                }
              })
              .on("mouseup", function (e) {
                if (e.button == 0) {
                  if (mode != "pippet") {
                    if (mode != "fill") {
                      $(this).css(
                        "background",
                        mode == "brush" ? val : "#00000000"
                      );
                      document
                        .querySelectorAll(".neighbour")
                        .forEach(
                          (el) =>
                            (el.style.background =
                              mode == "brush" ? val : "#00000000")
                        );
                    }
                  }

                  if (mode == "line") {
                    tds.removeClass("points1Line point1Line");
                    linePoints[0] = td;
                    td.addClass("point1Line");
                    $(`td.notMain[data-x="${j}"], td.notMain[data-y="${i}"]`)
                      .not(td)
                      .addClass("points1Line");
                    linex1.val(j);
                    liney1.val(i);
                    crtline.prop(
                      "disabled",
                      forline.toArray().some((e) => !e.value.trim())
                    );
                  }
                }
              })
              .on("contextmenu", (e) => {
                if (mode == "line") {
                  e.preventDefault();
                  tds.removeClass("points2Line point2Line");
                  linePoints[1] = td;
                  td.addClass("point2Line");
                  $(`td.notMain[data-x="${j}"], td.notMain[data-y="${i}"]`)
                    .not(td)
                    .addClass("points2Line");
                  linex2.val(j);
                  liney2.val(i);
                  crtline.prop(
                    "disabled",
                    forline.toArray().some((e) => !e.value.trim())
                  );
                }
              });
          } else {
            const elemRgba = arrayForImportLayer[i][j].toUpperCase();
            if (elemRgba == "#000000") {
              td.addClass("legs");
            } else if (elemRgba == "#FFFFFF") {
              td.addClass("head");
            } else if (elemRgba == "#ADADAD") {
              td.addClass("darkhead");
            } else if (elemRgba == "#000CBA") {
              td.addClass("darklegs").css("background", "#000000");
            }
            td.addClass("mainLooper");
          }

          tr.append(td);
        }
        tbl.append(tr);
      }
    }
    createField(
      table,
      arrFromSkin(
        "trSkin1MzCAAGuDUcYAMRxdQBBGuYEBdalB5hzSHTcs3IRiAOlKRt006iZqUkPVTUDs7OSIRCGFOu2oUTcNYzfR13FUZ5BtC32cNyDuBAA="
      ),
      true
    );
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
          chroma($(this).css("background-color"))
            .hex()
            .toUpperCase()
            .replace("#", "")
        );
      });
      csses.push("");
      csses = csses.join(";");
      const lel = btoa(window.pako.deflateRaw(csses, { to: "string" }));
      if (returnRes) return lel;
    }

    function indexOf($element) {
      return Array.prototype.slice
        .call($element.parentElement.children)
        .indexOf($element);
    }

    const clrFromLooper = $("#clrFromLooper");

    function onMove(event) {
      try {
        const $target = event.target;

        if (
          $target.tagName !== "TD" ||
          $target.classList.contains("mouseEnter")
        ) {
          return;
        }

        const far = parseInt(rangeInput.val());
        const neighbours = getNeighbors($target, far);

        clean();

        if (mode !== "pippet") {
          if (mode !== "fill") {
            clrFromLooper.text(
              $target.style.backgroundColor !== "rgba(0, 0, 0, 0)"
                ? "no"
                : "yes"
            );
            if (mode !== "line") {
              $target.classList.add("mouseEnter");
            }
          }
        }
        if ($target.style.backgroundColor !== "rgba(0, 0, 0, 0)") {
          currClrSpan.text(
            $target.style.backgroundColor
              ? rgbToHex(...rgbToArray($target.style.backgroundColor))
              : "None"
          );
        } else {
          const loopr = _.chunk(looper.toArray(), 20)[
            $($target).attr("data-y")
          ][$($target).attr("data-x")];
          const sbc = loopr.style.backgroundColor;
          currClrSpan.text(
            sbc || chroma(sbc).hex() !== "#00000000"
              ? chroma(sbc).hex().slice(0, 7)
              : "None"
          );
        }
        neighbours.forEach((neighbour) => neighbour.classList.add("neighbour"));
      } catch (_) {
        return;
      }
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
    const trs = $("#tbl tbody tr.notM");
    const test = [];
    tds.each(function () {
      test.push(rgbToHex(...rgbToArray($(this).css("background-color"))));
    });
    tds.each(function () {
      $(this).on({
        click: function () {
          if (mode == "fill") {
            function fill(data, x, y, newValue) {
              const target = data[x][y];

              function flow(x, y) {
                if (x >= 0 && x < data.length && y >= 0 && y < data[x].length) {
                  if (data[x][y] === target) {
                    data[x][y] = newValue;
                    flow(x - 1, y);
                    flow(x + 1, y);
                    flow(x, y - 1);
                    flow(x, y + 1);
                  }
                }
              }
              flow(x, y);
            }

            const onedclrs = [];
            tds.each(function () {
              onedclrs.push(chroma($(this).css("background-color")).hex());
            });
            const clrs = _.chunk(onedclrs, 20);
            fill(
              clrs,
              $(this).attr("data-y"),
              $(this).attr("data-x"),
              clr.val()
            );
            const res = clrs.flat();
            tds.each(function (i) {
              $(this).css("background-color", res[i] + " !important");
            });
          }
        },
        mousedown: function (e) {
          if (mode == "bdlg" && !e.button) {
            const hslval = hexToCssHsl(
              "#" +
                (bdlgClr.filter(":checked").val() == "yesclr1"
                  ? clr1help.val()
                  : clr2help.val())
            );
            head.css("background", hslval);
            darkhead.css("background", hslDark(hslval, 68));
          }
        },
        contextmenu: (e) => {
          e.preventDefault();
          if (mode == "bdlg") {
            const hslval = hexToCssHsl(
              "#" +
                (bdlgClr.filter(":checked").val() == "yesclr1"
                  ? clr1help.val()
                  : clr2help.val())
            );
            legs.css("background", hslval);
            darklegs.css("background", hslDark(hslval, 68));
          }
        },
      });
    });

    looper = $("td.mainLooper");
    const looperDisabler = $("#disblL");
    looperDisabler.on("change", () =>
      looper[(looperDisabler.prop("checked") ? "remove" : "add") + "Class"](
        "hided"
      )
    );

    $("#reset").on("click", () => {
      tds.css("background", "#00000000");
      settings.savedSkin = "trSkin17cYhAQAACMCwSvf074WgBGJTqzOJiIiIiIj8yAI=";
      unreload(acsntClrHelp);
      boo.play();
    });
    const allTds = $("td");
    const gridM = $("#gridManager").on("change", function () {
      allTds.css(
        "border-color",
        gridM.prop("checked") ? "var(--accent)" : allTds.css("background-color")
      );
    });
    function forClr1Helper1() {
      let tmp = "";
      switch (clr1help.val().length) {
        case 6:
          tmp = clr1help.val();
          break;
        case 3:
          tmp = [...clr1help.val()].map((e) => e + e).join("");
          break;
        case 2:
          tmp = clr1help.val().repeat(3);
          break;
        case 1:
          tmp = clr1help.val().repeat(6);
          break;
      }
      tmp = "#" + tmp;
      clr.val(tmp);
      val = tmp;
      root.css({ "--clr": `${val}aa`, "--hl": val });
    }

    function forClr2Helper1() {
      switch (clr2help.val().length) {
        case 6:
          clr2.val("#" + clr2help.val());
          break;
        case 3:
          clr2.val("#" + [...clr2help.val()].map((e) => e + e).join(""));
          break;
        case 2:
          clr2.val("#" + clr2help.val().repeat(3));
          break;
        case 1:
          clr2.val(`#${clr2help.val().repeat(6)}`);
      }
    }

    function clrHelpBlur() {
      switch ($(this).val().length) {
        case 3:
          $(this).val([...$(this).val()].map((e) => e + e).join(""));
          break;
        case 2:
          $(this).val($(this).val().repeat(3));
          break;
        case 1:
          $(this).val($(this).val().repeat(6));
          break;
      }
    }

    function denyChars(e) {
      if (!/[0-9a-f]/i.test(e.key)) {
        return false;
      }
    }
    clr1help.on({
      keypress: denyChars,
      input: forClr1Helper1,
      paste: (e) => e.preventDefault(),
      blur: clrHelpBlur,
    });
    clr2help.on({
      keypress: denyChars,
      input: forClr2Helper1,
      paste: (e) => e.preventDefault(),
      blur: clrHelpBlur,
    });

    $("#noClr").on("click", function () {
      clr.val("#ffffff");
      clr1help.val("ffffff");
      val = "#ffffff";
      root.css({ "--clr": `${val}88`, "--hl": val });
      clr2.val("#000000");
      clr2help.val("000000");
      boo.play();
    });

    const imprt = $("#importBtn");
    const exprt = $("#exportBtn");

    imprt.on("click", function () {
      navigator.clipboard.readText().then((text) => {
        try {
          if (!text.startsWith("trSkin1")) {
            throw new SkinError('The text doesn\'t start from "trSkin1"');
          }
          const strdata = atob(text.replace("trSkin1", "").trim());
          const charData = strdata.split("").map(function (x) {
            return x.charCodeAt(0);
          });
          const binData = new Uint8Array(charData);
          const data = window.pako.inflateRaw(binData);
          const result = String.fromCharCode.apply(null, new Uint16Array(data));
          const arrr = result.split(";").map((e) => "#" + e);
          tds.each(function (i) {
            if (!/#?([0-9a-f]{6}|[0-9a-f]{8})/i.test(arrr[i])) {
              throw new SkinError(
                "Error occurred while import (the skin contains NOT hex string)"
              );
            }
            $(this).css("background-color", arrr[i]);
          });
        } catch (e) {
          console.error(e);
          errDialogOpen(new SkinError(e.message));
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
    });
    $("#resBdyClr").on("click", function () {
      head.css("background", "#ffffff");
      darkhead.css("background", "#adadad");
      boo.play();
    });
    $("#resLgsClr").on("click", function () {
      legs.css("background", "#000000");
      darklegs.css("background", "#000000");
      boo.play();
    });

    musC = $("#mus");
    let mus;
    musC.on("change", () => {
      if (musC.prop("checked")) {
        mus = new Audio("../src/music/menu.wav");
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
        $("#tbl").mousemove();
        blur();
        switch (e.code) {
          case "KeyX":
            switchCols.trigger("click");
            break;
          case "KeyS":
          case "Digit0":
          case "Numpad0":
            looperDisabler.trigger("click");
            break;
          case "KeyA":
          case "Digit9":
          case "Numpad9":
            gridM.trigger("click");
            break;
          case "KeyB":
          case "Digit1":
          case "Numpad1":
            brush.trigger("click");
            break;
          case "KeyE":
          case "Digit2":
          case "Numpad2":
            ereaser.trigger("click");
            break;
          case "KeyP":
          case "Digit3":
          case "Numpad3":
            pippet.trigger("click");
            break;
          case "KeyF":
          case "Digit4":
          case "Numpad4":
            filler.trigger("click");
            break;
          case "KeyL":
          case "Digit5":
          case "Numpad5":
            line.trigger("click");
            break;
          case "KeyZ":
          case "Digit6":
          case "Numpad6":
            bdlg.trigger("click");
            break;
          case "KeyJ":
            crtline.trigger("click");
            break;

          case "KeyN":
            if (e.shiftKey) {
              navigator.clipboard.writeText(currClrSpan.text().trim());
            }
            break;
        }
      }
    };

    $("#cpyForClr1").on("click", async () => {
      const str = await navigator.clipboard.readText();
      const filtered = str.replace(/#?[^\da-f]/i, "");
      switch (filtered.length) {
        case 1:
          const repeatedd = filtered.repeat(6);
          clr.val("#" + repeatedd);
          clr1help.val(repeatedd);
          val = "#" + repeatedd;
          root.css({ "--clr": `${val}88`, "--hl": val });
          break;
        case 2:
          const repeate = filtered.repeat(3);
          clr.val("#" + repeate);
          clr1help.val(repeate);
          val = "#" + repeate;
          root.css({ "--clr": `${val}88`, "--hl": val });
          break;
        case 3:
          const repeated = filtered.repeat(2);
          clr.val("#" + repeated);
          clr1help.val(repeated);
          val = "#" + repeated;
          root.css({ "--clr": `${val}88`, "--hl": val });
          break;
        case 6:
          clr.val("#" + filtered);
          clr1help.val(filtered);
          val = "#" + filtered;
          root.css({ "--clr": `${val}88`, "--hl": val });
          break;
        case 8:
          const unbruh = filtered.slice(0, 7);
          clr.val("#" + unbruh);
          clr1help.val(unbruh);
          val = "#" + unbruh;
          root.css({ "--clr": `${val}88`, "--hl": val });
          break;
        case 0:
        default:
          return;
      }
    });
    $("#cpyForClr2").on("click", async () => {
      const str = await navigator.clipboard.readText();
      const filtered = str.replace(/#?[^\da-f]/i, "");
      switch (filtered.length) {
        case 1:
          const repeatedd = filtered.repeat(6);
          clr2.val("#" + repeatedd);
          clr2help.val(repeatedd);
          break;
        case 2:
          const repeate = filtered.repeat(3);
          clr2.val("#" + repeate);
          clr2help.val(repeate);
          break;
        case 3:
          const repeated = filtered.repeat(2);
          clr2.val("#" + repeated);
          clr2help.val(repeated);
          break;
        case 6:
          clr2.val("#" + filtered);
          clr2help.val(filtered);
          break;
        case 8:
          const unbruh = filtered.slice(0, 7);
          clr2.val("#" + unbruh);
          clr2help.val(unbruh);
          break;
        case 0:
        default:
          return;
      }
    });

    $(document.body).css("display", "flex");

    acsnt.on({
      change: function () {
        let hsl;
        try {
          hsl = hexToCssHsl(acsnt.val(), true).split(",");
        } catch (e) {
          fatalErrD.dialog("open");
        }
        root.css({
          "--accent-h": hsl[0],
          "--accent-s": hsl[1],
          "--accent-l": hsl[2],
        });
        acsntClrHelp.val(acsnt.val().slice(1));
      },
      input: function () {
        acsntClrHelp.val($(this).val().slice(1));
      },
    });

    function forAcsntHelper() {
      try {
        switch (acsntClrHelp.val().length) {
          case 6:
            acsnt.val(`#${acsntClrHelp.val()}`);
            break;
          case 3:
            acsnt.val(`#${[...acsntClrHelp.val()].map((e) => e + e).join("")}`);
            break;
          case 2:
            acsnt.val("#" + acsntClrHelp.val().repeat(3));
            break;
          case 1:
            acsnt.val("#" + acsntClrHelp.val().repeat(6));
            break;
        }

        const hsl = hexToCssHsl(chroma(acsnt.val()).hex(), true).split(",");
        root.css({
          "--accent-h": hsl[0],
          "--accent-s": hsl[1],
          "--accent-l": hsl[2],
        });
      } catch (e) {
        fatalErrD.dialog("open");
      }
    }
    acsntClrHelp.on({
      keyup: forAcsntHelper,
      keypress: denyChars,
      paste: (e) => e.preventDefault(),
      blur: clrHelpBlur,
    });

    ((c) => {
      const hsl = hexToCssHsl(c, true).split(",");

      root.css({
        "--accent-h": hsl[0],
        "--accent-s": hsl[1],
        "--accent-l": hsl[2],
      });

      acsnt.val(c);
      acsntClrHelp.val(c.slice(1));
    })(settings.accent);

    const resAcsnt = $("#resAcsnt");
    resAcsnt.on("click", function () {
      const hsl = hexToCssHsl("#65abcf", true).split(",");

      root.css({
        "--accent-h": hsl[0],
        "--accent-s": hsl[1],
        "--accent-l": hsl[2],
      });
      acsntClrHelp.val("65abcf");
      acsnt.val("#65abcf");
      boo.play();
    });

    $("#paddingTbl").on("input", function () {
      allTds.css("padding", $(this).val());
    });

    const notMainTable = $("#tbl");
    const notMainTbody = notMainTable.children(":first");

    $("select").selectmenu();

    /**@type {HTMLCanvasElement} */
    const imgCanv = document.querySelector("#canvSkin");
    const cx = imgCanv.getContext("2d");

    const importImg = $("#importImg");
    $("#btnImImg").on("click", () => importImg.trigger("click"));

    importImg.on("change", function (e) {
      const img = new Image();
      img.src = URL.createObjectURL(e.target.files[0]);
      img.onload = function () {
        if (img.naturalWidth != 20 || img.naturalHeight != 18) {
          return errDialogOpen(
            new ResolutionError("The image must be 20x18 px")
          );
        }
        cx.drawImage(img, 0, 0, 20, 18);
        const data = _.chunk(cx.getImageData(0, 0, 20, 18).data, 4);
        const rgba = data.map((e) => doRGBA(...e));
        cx.clearRect(0, 0, 20, 18);
        tds.each(function (i) {
          $(this).css("background-color", rgba[i]);
        });
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
        const link = document.createElement("a");
        link.download = "skin.png";
        link.href = imgCanv.toDataURL();
        link.trigger("click");
      } catch (e) {
        errDialogOpen(e);
      }
    });

    $('#input[type="color"]').on("change", () => blur());
    window.onbeforeunload = () =>
      unreload(
        acsntClrHelp,
        chroma(document.querySelector(".head").style.backgroundColor).hex(),
        chroma(document.querySelector(".legs").style.backgroundColor).hex()
      );

    const ratioMixTxt = $("#ratioMixTxt");
    const ratioMix = $("#ratioMix");

    const mixClrs = $("#modMix").dialog(defaultModal(400, 250));

    const resClr = $("#resClr");
    const resClrHelp = $("#resClrHelp");

    ratioMix.on("input", function () {
      ratioMixTxt.text($(this).val());
      const qwe = chroma
        .mix(clr1help.val(), clr2help.val(), +ratioMix.val())
        .hex();
      resClr.val(qwe);
      resClrHelp.val(qwe.slice(1));
    });

    $("#modMixClrs").on("click", function () {
      mixClrs.dialog("open");
      const qwe = chroma
        .mix(clr1help.val(), clr2help.val(), +ratioMix.val())
        .hex();
      resClr.val(qwe);
      resClrHelp.val(qwe.slice(1));
    });

    $("#frstClr").on("click", function () {
      clr1help.val(resClrHelp.val());
      clr.val(`#${clr1help.val()}`);
      val = `#${clr1help.val()}`;
      autoclose.prop("checked") && mixClrs.dialog("close");
    });

    $("#scndClr").on("click", function () {
      clr2help.val(resClrHelp.val());
      clr2.val(`#${clr2help.val()}`);
      autoclose.prop("checked") && mixClrs.dialog("close");
    });

    const addSets = $("#addSets").dialog(defaultModal(500, 600));
    $("#addSetsBtn").on("click", () => addSets.dialog("open"));

    $("#settabs").tabs();

    const head = $(".head");
    const legs = $(".legs");
    const darkhead = $(".darkhead");
    const darklegs = $(".darklegs");

    ((bdclr, lgclr) => {
      const [headHsl, legshsl] = [hexToCssHsl(bdclr), hexToCssHsl(lgclr)];
      head.css("background", headHsl);
      darkhead.css("background", hslDark(headHsl, 68));
      legs.css("background", legshsl);
      darklegs.css("background", hslDark(legshsl, 68));
    })(settings.bodyColor, settings.legsColor);

    $(".ui-dialog-titlebar").hide();

    const errorDialog = $("#errorDialog").dialog(defaultModal(400, 500));

    const errorDialogTitleBar = $(".ui-dialog-title:contains('Error')");
    errorDialogTitleBar.parent().addClass("boom-poom-shikidi-toom");

    function errDialogOpen(err) {
      errorDialogTitleBar.text(
        err.name
          .replace(...camelSplit)
          .split(" ")
          .map((e, i) => (i !== 0 ? e.toLowerCase() : e))
          .join(" ")
      );
      errorDialog.text(err.message);
      errorDialog.dialog("open");
      bonk.play();
    }

    const to20 = _.range(20);
    const to18 = _.range(18);

    function oppositeIndex(arr, index) {
      return arr.length - index - 1;
    }

    const flipDialog = $("#flipDialog").dialog(defaultModal(400, 250));

    $("#flipDialogOpen").on("click", () => flipDialog.dialog("open"));

    const flipH = $("#flipH").on("click", function () {
      const flipped = [];
      tds.each(function () {
        flipped.push($(this).css("background-color"));
      });
      const res = _.chunk(flipped, 20).flatMap((e) => e.reverse());
      tds.each(function (i) {
        $(this).css("background-color", res[i]);
      });
    });
    const flipV = $("#flipV").on("click", function () {
      const flipped = [];
      tds.each(function () {
        flipped.push($(this).css("background-color"));
      });
      const res = _.chunk(flipped, 20).reverse().flat();
      tds.each(function (i) {
        $(this).css("background-color", res[i]);
      });
    });
    $("#flipB").on(
      "click",
      () => flipV.trigger("click") + flipH.trigger("click")
    );

    $(".forflip").on(
      "click",
      () => autoclose.prop("checked") && flipDialog.dialog("close")
    );

    const uploadDialog = $("#uploadToTrss").dialog(defaultModal(400, 400));
    $("#uploadDialogBtn").on("click", () => uploadDialog.dialog("open"));

    const skinNameInp = $("#skinName");
    const trssToken = $("#trsstoken");

    const wellDone = $("#jobWellDone").dialog(defaultModal(400, 200));

    const showTokenBtn = $("#showToken").checkboxradio();

    showTokenBtn.on("click", () =>
      trssToken.attr(
        "type",
        trssToken.attr("type") == "text" ? "password" : "text"
      )
    );

    $("#uploadSkin").on("click", async (e) => {
      const qwe = await makeRequestToTRSS("skins", e, "upload_skin", {
        token: trssToken.val(),
        skin: "trSkin1" + exprtSkin(true),
        skin_name: skinNameInp.val().trim(),
        primary_color: chroma(head[0].style.backgroundColor)
          .hex()
          .toUpperCase(),
        secondary_color: chroma(legs[0].style.backgroundColor)
          .hex()
          .toUpperCase(),
      });
      if (isJson(qwe) && "error_code" in skin) {
        const code = JSON.parse(token).error_code;
        addSets.dialog("close");
        return errDialogOpen(
          new TRSSError("Error: " + trssErrors[code] + ". Error code: " + code)
        );
      }
      if (qwe == 1) {
        uploadDialog.dialog("close");
        trssToken.val("");
        skinNameInp.val("");
        wellDone.dialog("open");
      }
    });

    const [trssLogin, trssPassword] = [$("#trssLogin"), $("#trssPassword")];

    const tokenSpan = $("#tokenHere").on("click", function () {
      navigator.clipboard.writeText($(this).text());
    });

    $("#showPsswrd").on("click", () =>
      trssPassword.attr(
        "type",
        trssPassword.attr("type") == "text" ? "password" : "text"
      )
    );

    async function makeRequestToTRSS(link, e, action, params, dialog) {
      try {
        e.preventDefault();
        const data = new URLSearchParams();
        data.append("action", action);
        for (const [k, v] of Object.entries(params)) {
          data.append(k, v);
          acsnt.val();
        }
        const response = await fetch(
          "http://trsstest.crystalcloud.xyz/game-dev/TRSSDatabase/" +
            link +
            ".php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data,
          }
        ).catch((e) => console.error(e));
        return response.text();
      } catch (e) {
        dialog.dialog("close");
        errDialogOpen(new RequestError("Turn off adblock, lol"));
      }
    }

    $("#getToken").on("click", async (e) => {
      const token = await makeRequestToTRSS(
        "users",
        e,
        "login",
        {
          login: trssLogin.val().trim(),
          password: trssPassword.val().trim(),
        },
        addSets
      );
      if (isJson(token) && "error_code" in skin) {
        const code = JSON.parse(token).error_code;
        addSets.dialog("close");
        return errDialogOpen(
          new TRSSError("Error: " + trssErrors[code] + ". Error code: " + code)
        );
      }
      tokenSpan.text(token);
      trssLogin.val("");
      trssPassword.val("");
    });

    const fromTrssD = $("#importFromTrss").dialog(defaultModal(400, 350));

    $("#imprtFromTrss").on("click", async () => fromTrssD.dialog("open"));

    const skinidInp = $("#skinid").spinner();

    $("#gettrssskin").on("click", async (e) => {
      const skin = JSON.parse(
        await makeRequestToTRSS(
          "skins",
          e,
          "get_skin_by_id",
          {
            skin_id: +skinidInp.val(),
          },
          fromTrssD
        )
      );
      if ("error_code" in skin) {
        const code = skin.error_code;
        fromTrssD.dialog("close");
        return errDialogOpen(
          new TRSSError("Error: " + trssErrors[code] + ". Error code: " + code)
        );
      }
      console.log(skin);
      head.css("background", skin.primary_color);
      darkhead.css("background", hslDark(hexToCssHsl(skin.primary_color), 68));
      legs.css("background", skin.secondary_color);
      darklegs.css(
        "background",
        hslDark(hexToCssHsl(skin.secondary_color), 68)
      );
      const resSkin = arrFromSkin(skin.skin, false).map((e) => e.toUpperCase());
      tds.css("background-color", "#00000000");
      tds.each(function (i) {
        if (/#?00000000/i.test(chroma(resSkin[i]).hex())) {
          $(this).css("background-color", "#00000000");
          return;
        }

        $(this).css(
          "background-color",
          chroma(resSkin[i])
            .hex()
            .replace(/#?[a-f0-9]{6,6}00/i)
            .slice(0, 7)
        );
      });
      skinidInp.val("");
      fromTrssD.dialog("close");
    });
  });
  function unreload(acsnt, bdclr, lgclr) {
    let csses = [];
    $("#tbl tbody td.notMain")
      .removeClass("point1Line points1Line point2Line points2Line")
      .each(function () {
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
    settings.accent = chroma(acsnt.val()).hex();
    settings.autoclose = autoclose.prop("checked");
    settings.bodyColor = bdclr;
    settings.legsColor = lgclr;
    for (const k in defaultSettings) {
      if (!(k in settings)) settings[k] = defaultSettings[k];
    }
    for (const k in settings) {
      if (!(k in defaultSettings)) delete settings[k];
    }
    localStorage.setItem("settings", JSON.stringify(settings));
  }
} catch (e) {
  $("#fatalErrDialog")
    .dialog({
      width: 500,
      height: 550,
      autoOpen: false,
      modal: true,
      dialogClass: "mixClrs",
      resizable: false,
    })
    .dialog("open");
}
