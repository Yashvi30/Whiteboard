window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const colors = document.querySelectorAll(".color");
  const picker = document.querySelector(".color-picker");
  const range = document.querySelector(".range");
  const clear = document.querySelector(".clear");
  const shape = document.querySelector("shape-btn");
  const undo = document.querySelector(".undo");
  const redo = document.querySelector(".redo");
  const erase = document.querySelector(".erase");
  // console.log(colors)

  canvas.height = 0.77 * window.innerHeight;
  canvas.width = 0.8 * window.innerWidth;

  let bgColor = "white";
  let penColor = "black";
  let penWidth = "3";
  let flag = false;

  let undoArray = [];
  let undoIdx = -1;
  let redoArray = [];

  //   const arrayOfTools = [shapesElem];

  //   select.addEventListener("click", () => {
  //     arrayOfTools.forEach((tool) => {
  //       if (!tool.classList.contains("none")) {
  //         tool.classList.add("none");
  //       }
  //     });
  //     console.log("hello");
  //   });
  const changeColor = () => {
    Array.from(colors).forEach((color, i) => {
      color.addEventListener("click", (e) => {
        console.log("color " + i + " clicked");
        console.log(color.style.background);
        penColor =
          i == 0 ? "red" : i == 1 ? "blue" : i == 2 ? "green" : "yellow";
        console.log("gcua");
      });
    });
  };

  // const changePickerColor = () => {
  //   picker.addEventListener("input", (e) => {
  //     penColor = picker.value;
  //     console.log("ihoih");
  //   });
  // };

  const changeWidth = () => {
    range.addEventListener("input", (e) => {
      penWidth = range.value;
    });
  };

  const clearPage = () => {
    clear.addEventListener("click", (e) => {
      ctx.fillStyle = bgColor;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
  };

  const undoCanvas = () => {
    undo.addEventListener("click", (e) => {
      console.log(undoIdx);
      if (undoIdx <= 0) {
        ctx.fillStyle = bgColor;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        undoArray = [];
        undoIdx = -1;
      } else {
        undoIdx -= 1;
        undoArray.slice(undoIdx, 1);
        ctx.putImageData(undoArray[undoIdx], 0, 0);
      }
    });
  };

  const redoCanvas = () => {
    redo.addEventListener("click", (e) => {
      if (undoIdx + 1 < redoArray.length) {
        undoIdx += 1;
        undoArray.push(redoArray[undoIdx]);
        ctx.putImageData(redoArray[undoIdx], 0, 0);
      }
    });
  };
  //   function handleShapeEvents() {
  //     const rectangle = document.getElementById("Rectangle");
  //     rectangle.addEventListener("click", (e) => {
  //       ctx.strokeRect(canvas.width / 2 - 100, canvas.height / 2, 400, 200);
  //     });
  //     const square = document.getElementById("Square");
  //     square.addEventListener("click", (e) => {
  //       ctx.strokeRect(canvas.width / 2, canvas.height / 2, 200, 200);
  //     });
  //     const circle = document.getElementById("Circle");
  //     circle.addEventListener("click", (e) => {
  //       ctx.beginPath();
  //       ctx.arc(
  //         canvas.width / 2 - 50,
  //         canvas.height / 2,
  //         50,
  //         0,
  //         Math.PI * 2,
  //         false
  //       );
  //       ctx.stroke();
  //       ctx.beginPath();
  //     });
  //     const triangle = document.getElementById("Triangle");
  //     triangle.addEventListener("click", (e) => {
  //       ctx.beginPath();
  //       ctx.moveTo(canvas.width / 2, canvas.height / 2);
  //       ctx.lineTo(canvas.width / 2 - 100, canvas.height / 2 - 200);
  //       ctx.lineTo(canvas.width / 2 - 100, canvas.height / 2 - 250);
  //       ctx.closePath();
  //       ctx.stroke();
  //       ctx.beginPath();
  //     });

  //     const line = document.getElementById("Line");
  //     line.addEventListener("click", (e) => {
  //       ctx.beginPath();
  //       ctx.log(e.target);
  //       ctx.beginPath();
  //       ctx.moveTo(e.clientX, e.clientY);
  //       ctx.lineTo(canvas.width / 2, canvas.height / 2);
  //       ctx.stroke();
  //       ctx.closePath();
  //     });

  //     const ellipse = document.getElementById("shapeEllipse");
  //     ellipse.addEventListener("click", (e) => {
  //       ctx.beginPath();
  //       ctx.ellipse(
  //         canvas.width / 2,
  //         canvas.height / 2,
  //         50,
  //         75,
  //         Math.PI / 2,
  //         0,
  //         2 * Math.PI
  //       );
  //       ctx.stroke();
  //     });
  //   }

  // const eraseOnMove = () => {
  //     ctx.fillStyle = bgColor
  //     ctx.clearRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  //     ctx.fillRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  //     // context.clearRect(0,0 ,canvas.width, canvas.height);
  //     context.fillRect(0,0 ,canvas.width, canvas.height);
  //     restore_array=[];
  //     index=-1;
  // }

  // const stopErasing = () => {
  // }

  // const erasePage = () => {
  //     erase.addEventListener('click', e => {
  //         canvas.addEventListener('mousedown', eraseOnMove)
  //         canvas.addEventListener('mousemove', eraseOnMove)
  //         canvas.addEventListener('mouseup', stopErasing)
  //     })
  // }

  const eraser = () => {
    erase.addEventListener("click", (e) => {
      penColor = bgColor;
    });
  };

  changeColor();
  // changePickerColor();
  changeWidth();
  clearPage();
  undoCanvas();
  redoCanvas();
  eraser();
  //   erasePage();
  //normal drawing
  const start = (e) => {
    flag = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  };

  const end = (e) => {
    if (flag) {
      // ctx.stroke()
      ctx.closePath();
      flag = false;
    }

    if (e.type != "mouseout") {
      undoArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      redoArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      undoIdx += 1;
      console.log(undoArray);
    }
  };

  const draw = (e) => {
    if (!flag) return;
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    ctx.strokeStyle = ctx.fillStyle = penColor;
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.lineWidth = penWidth * 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(
      e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop,
      penWidth,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  };

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mouseup", end);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseout", end, false);

  window.addEventListener("resize", (e) => {
    canvas.height = 0.77 * window.innerHeight;
    canvas.width = 0.8 * window.innerWidth;
    ctx.putImageData(undoArray[undoIdx], 0, 0);
  });
});
