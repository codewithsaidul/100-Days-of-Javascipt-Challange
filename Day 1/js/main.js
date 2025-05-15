{
  const container = document.querySelector(".container");
  const gridButton = document.getElementById("submit-grid");
  const clearGridButton = document.getElementById("clear-grid");
  const gridWidth = document.getElementById("width-range");
  const gridHeight = document.getElementById("height-range");
  const colorButton = document.getElementById("color-input");
  const eraseBtn = document.getElementById("erase-btn");
  const paintBtn = document.getElementById("paint-btn");
  const widthValue = document.getElementById("width-value");
  const heightValue = document.getElementById("height-value");

  // create all events

  const events = {
    mouse: {
      down: "mousedown",
      move: "mousemove",
      up: "mouseup",
    },
    touch: {
      down: "touchstart",
      move: "touchmove",
      up: "touchend",
    },
  };

  let deviceType = "";

  let draw = false;
  let erase = false;


//   checking device touch or mouse
  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      deviceType = "touch";
      return true;
    } catch {
      deviceType = "mouse";
      return false;
    }
  };

  isTouchDevice();

  // creat grid
  gridButton.addEventListener("click", () => {
    container.innerHTML = "";

    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
      count += 2;
      const div = document.createElement("div");
      div.classList.add("gridRow");

      for (let j = 0; j < gridWidth.value; j++) {
        count += 2;
        const col = document.createElement("div");
        col.classList.add("gridCol");
        col.setAttribute("id", `gridCol${count}`);

        col.addEventListener(events[deviceType].down, () => {
          draw = true;

          if (erase) {
            div.style.backgroundColor = "transparent";
          } else {
            div.style.backgroundColor = colorButton.value;
          }
        });

        col.addEventListener(events[deviceType].move, (e) => {
          let elementId = document.elementFromPoint(
            !isTouchDevice() ? e.clientX : e.touches[0].clientX,
            !isTouchDevice() ? e.clientY : e.touches[0].clientY
          ).id;

          checker(elementId);
        });

        col.addEventListener(events[deviceType].up, () => {
            draw = false
        });

        div.appendChild(col)
      };
      container.appendChild(col)
    }
  });

//   checking which col selected
  const checker = (elementId) => {
    let gridColumns = document.querySelectorAll(".gridCol");

    gridColumns.forEach(element => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent"
            }
        }
    })
  }


//   clear all grid
clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
})

eraseBtn.addEventListener("click", () => {
    erase = true;
})

paintBtn.addEventListener("click", () => {
    draw = true
})



gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 10 ? `0${gridWidth.value }` : gridWidth.value 
})


gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 10 ? `0${gridHeight.value }` : gridHeight.value 
})


window.onload = () => {
    gridWidth.value = 0;
    gridHeight.value = 0;
}

}
