window.onload = () => {
  const grid = document.getElementById("calendar-grid");
  const ghost = document.getElementById("ghost-slot");
  const output = document.getElementById("time-output");
  const floatingMenu = document.getElementById("floating-menu");
  const modalStart = document.getElementById("modal-start");
  const modalEnd = document.getElementById("modal-end");
  const inputTitle = document.getElementById("event-title");

  let startY = 0;
  let startX = 0;
  let isDragging = false;
  let mouseUp = true;
  const DRAG_THRESHOLD = 5;
  let activeElement = null;

  grid.addEventListener("mousedown", (e) => {
    const isMenu = floatingMenu.contains(e.target);
    const clickedBlock = e.target.closest(".time-block");
    if (isMenu) {
      return;
    }
    if (clickedBlock) {
      mouseUp = true;
      isDragging = false;
      ghost.style.display = "none";

      activeElement = clickedBlock;
      activeElement.dataset.eventId = clickedBlock.getAttribute("data-id");

      const blockRect = clickedBlock.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();

      const relativeTop = blockRect.top - gridRect.top;
      const relativeLeft = blockRect.left - gridRect.left;

      showMenuAt(relativeTop, relativeLeft, blockRect.width, blockRect.height);
      const startTime = clickedBlock.dataset.start;
      const endTime = clickedBlock.dataset.end;
      const [startH, startM] = startTime.trim().split(":");
      const [endH, endM] = endTime.trim().split(":");
      const cleanedStartTime = `${startH.padStart(2, "0")}:${startM.padStart(2, "0")}`;
      const cleanedEndTime = `${endH.padStart(2, "0")}:${endM.padStart(2, "0")}`;
      modalStart.value = cleanedStartTime;
      modalEnd.value = cleanedEndTime;
      inputTitle.value = clickedBlock.dataset.title;
      return;
    }
    startX = e.clientX;
    startY = e.clientY;
    isDragging = false;
    mouseUp = false;
  });

  function showMenuAt(top, left, width, height) {
    const gridWidth = grid.offsetWidth;

    floatingMenu.style.display = "block";
    floatingMenu.style.top = `${top}px`;

    if (left > gridWidth * 0.6) {
      floatingMenu.style.left = `${left - 260}px`;
      floatingMenu.classList.add("popover-left");
    } else {
      floatingMenu.style.left = `${left + width + 10}px`;
      floatingMenu.classList.remove("popover-left");
    }

    document.getElementById("event-title").focus();
  }

  function isMouseInsideGrid(x, y) {
    const gridRect = grid.getBoundingClientRect();
    return (
      x >= gridRect.left &&
      x <= gridRect.right &&
      y >= gridRect.top &&
      y <= gridRect.bottom
    );
  }
  window.addEventListener("mousemove", (e) => {
    const isMenu = floatingMenu.contains(e.target);
    const isTimeBlock = e.target.closest(".time-block");
    if (isMenu || isTimeBlock) return;
    if (mouseUp) return;
    /*
     *  e.clientY: the coordinate y of mouse from the browser
     *  rect.top: the distance from the browswer to the grid view
     *  currentY: the coordinate y of mouse from the grid view
     */
    const rect = grid.getBoundingClientRect(); // get area of grid view
    const TOTAL_BLOCK = 96;
    const pixelsPerBlock = rect.height / TOTAL_BLOCK;

    if (!isDragging) {
      const moveX = Math.abs(e.clientX - startX);
      const moveY = Math.abs(e.clientY - startY);

      if (moveX > DRAG_THRESHOLD || moveY > DRAG_THRESHOLD) {
        isDragging = true;
        dragStarted = true;
        ghost.style.display = "block";
      }
    }

    if (isDragging) {
      const currentY = e.clientY - rect.top;
      const initialY = startY - rect.top;

      // Snap selection to the nearest 15-minute interval (96 blocks per 24h)
      const startBlock = Math.round(initialY / pixelsPerBlock);
      let currentBlock = Math.round(currentY / pixelsPerBlock);
      currentBlock = Math.max(0, Math.min(96, currentBlock));

      //Horizontal Positioning
      const dayWidth = rect.width / 7;
      const dayIndex = Math.floor((startX - rect.left) / dayWidth);

      const topBlock = Math.min(startBlock, currentBlock);
      const blockCount = Math.abs(currentBlock - startBlock);

      ghost.style.left = `${dayIndex * dayWidth}px`;
      ghost.style.width = `${dayWidth}px`;
      ghost.style.top = `${topBlock * pixelsPerBlock}px`;
      ghost.style.height = `${blockCount * pixelsPerBlock}px`;

      updateTimeFromBlocks(topBlock, blockCount);

      inputTitle.value = "";
    }
  });

  window.addEventListener("mouseup", (e) => {
    const rect = grid.getBoundingClientRect();
    const gridWidth = rect.width;
    const gridHeight = rect.height;
    const pixelsPerBlock = gridHeight / 96;
    const dayWidth = gridWidth / 7;

    if (!isDragging) {
      const isMenu = floatingMenu.contains(e.target);
      const isTimeBlock = e.target.closest(".time-block");
      if (isMenu || isTimeBlock) return;
      if (!isMouseInsideGrid(e.clientX, e.clientY)) return;
      const mousePosY = e.clientY - rect.top;
      const mousePosX = e.clientX - rect.left;

      const clickBlock = Math.floor(mousePosY / (pixelsPerBlock * 4)) * 4;
      const dayIndex = Math.floor(mousePosX / dayWidth);

      ghost.style.display = "block";
      ghost.style.top = `${clickBlock * pixelsPerBlock}px`;
      ghost.style.left = `${dayIndex * dayWidth}px`;
      ghost.style.width = `${dayWidth}px`;
      ghost.style.height = `${pixelsPerBlock * 4}px`;

      inputTitle.value = "";
      updateTimeFromBlocks(clickBlock, 4);
    }

    activeElement = ghost;
    delete activeElement.dataset.eventId;
    const ghostTop = parseFloat(ghost.style.top);
    const ghostLeft = parseFloat(ghost.style.left);
    const ghostWidth = parseFloat(ghost.style.width);
    const ghostHeight = parseFloat(ghost.style.height);

    showMenuAt(ghostTop, ghostLeft, ghostWidth, ghostHeight);

    const startBlock = Math.round(ghostTop / pixelsPerBlock);
    const blockCount = Math.round(parseFloat(ghostHeight) / pixelsPerBlock);

    updateTimeFromBlocks(startBlock, blockCount);

    isDragging = false;
    dragStarted = false;
    mouseUp = true;
    ghost.querySelector(".time-block-label").innerHTML = "";

    // Here is where you would trigger your Django Form Modal
  });
  function updateTimeFromBlocks(topBlock, numOfBlocks) {
    const MINUTES_PER_BLOCK = 15;

    const startMins = topBlock * MINUTES_PER_BLOCK;
    const endMins = startMins + numOfBlocks * MINUTES_PER_BLOCK;

    modalStart.value = formatTime(startMins);
    modalEnd.value = formatTime(endMins);

    output.innerText = `${formatTime(startMins)} - ${formatTime(endMins)}`;
  }

  function formatTime(totalMinutes) {
    const total = Math.round(totalMinutes);
    const hour = Math.floor(total / 60);
    const m = total % 60;

    const hh = hour.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    return `${hh}:${mm}`;
  }

  function createTimeBlock(startTime, endTime, dayIndex, title) {
    const rect = grid.getBoundingClientRect();
    const gridHeight = rect.height;
    const pixelsPerMinute = gridHeight / 1440;

    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    console.log(endH, endM, endTime);

    const startTotalMinutes = startH * 60 + startM;
    const endTotalMinutes = endH * 60 + endM;
    const duration = endTotalMinutes - startTotalMinutes;

    const topPx = startTotalMinutes * pixelsPerMinute;
    const heightPx = duration * pixelsPerMinute;

    const dayWidth = rect.width / 7;
    const leftPx = dayIndex * dayWidth;

    const div = document.createElement("div");
    const p = document.createElement("p");
    const p2 = document.createElement("p");

    div.className = "time-block";

    Object.assign(div.style, {
      position: "absolute",
      top: `${topPx}px`,
      left: `${leftPx}px`,
      width: `${dayWidth}px`,
      height: `${heightPx}px`,
    });

    p.className = "time-block-label";
    p.innerText = title;
    Object.assign(p2.style, {
      fontSize: "14px",
    });
    p2.className = "time-block-time";
    p2.innerText = `${startTime}-${endTime}`;
    div.dataset.start = startTime;
    div.dataset.end = endTime;
    div.dataset.title = title;

    div.appendChild(p);
    div.appendChild(p2);
    grid.appendChild(div);
  }

  function syncVisualsToTime() {
    const startVal = modalStart.value;
    const endVal = modalEnd.value;

    if (!startVal || !endVal) return;

    const [startH, startM] = startVal.split(":").map(Number);
    const [endH, endM] = endVal.split(":").map(Number);

    const startMins = startH * 60 + startM;
    const endMins = endH * 60 + endM;
    const duration = endMins - startMins;

    if (duration <= 0) return;

    const rect = grid.getBoundingClientRect();
    const pixelsPerMinutes = rect.height / 1440;

    activeElement.style.top = `${startMins * pixelsPerMinutes}px`;
    activeElement.style.height = `${duration * pixelsPerMinutes}px`;

    const timeLabel = activeElement.querySelector(".time-block-time");
    if (timeLabel) {
      timeLabel.innerText = `${formatTime(startMins)}-${formatTime(endMins)}`;
      activeElement.dataset.start = startVal;
      activeElement.dataset.end = endVal;
    }
  }

  function closeMenu() {
    floatingMenu.style.display = "none";
    activeElement = null;
    ghost.style.display = "none";
  }

  function updateTitle() {
    if (!activeElement) return;
    const inputValue = inputTitle.value;
    activeElement.dataset.title = inputValue;

    const titleLabel = activeElement.querySelector(".time-block-label");
    if (titleLabel) {
      titleLabel.innerText = inputValue;
    }
  }
  async function saveEvent() {
    if (!activeElement) return;

    const csrftoken = getCookie("csrftoken");
    const rect = grid.getBoundingClientRect();
    const dayWidth = rect.width / 7;
    const ghostLeft = parseFloat(activeElement.style.left);

    // Bug Fix: Use floor for more predictable day indexing
    const dayIndex = Math.floor((ghostLeft + 2) / dayWidth);

    const eventData = {
      title: inputTitle.value,
      start_time: modalStart.value,
      end_time: modalEnd.value,
      day_index: dayIndex,
      // Bug Fix: Check both id and eventId
      event_id:
        activeElement.dataset.id || activeElement.dataset.eventId || null,
    };

    try {
      const response = await fetch("/timetable/save-timeslot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        mode: "same-origin",
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Saved Successfully");
        location.reload();
      } else {
        // Handle Django's error message (like the 500 we saw)
        alert("Error: " + (result.message || "Unknown server error"));
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  }

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  modalStart.addEventListener("input", syncVisualsToTime);
  modalEnd.addEventListener("input", syncVisualsToTime);
  inputTitle.addEventListener("input", updateTitle);

  window.closeMenu = closeMenu;

  window.saveEvent = saveEvent;

  createTimeBlock("3:00", "5:00", 2, "Hello World");
};
