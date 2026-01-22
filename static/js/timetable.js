window.onload = () => {
  const grid = document.getElementById("calendar-grid");
  const ghost = document.getElementById("ghost-slot");
  const output = document.getElementById("time-output");
  const floatingMenu = document.getElementById("floating-menu");
  const modalStart = document.getElementById("modal-start");
  const modalEnd = document.getElementById("modal-end");
  const inputTitle = document.getElementById("event-title");
  const slotTypeSelect = document.getElementById("slot-type");

  let originalState = null;
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
    const gridHeight = grid.offsetHeight;
    const popoverWidth = 280;
    const popoverHeight = floatingMenu.offsetHeight || 320;
    const spacing = 15;

    originalState = {
      title: activeElement.dataset.title || "",
      slotType: activeElement.dataset.slotType || "class",
      start: activeElement.dataset.start || modalStart.value,
      end: activeElement.dataset.end || modalEnd.value,
      top: activeElement.style.top,
      height: activeElement.style.height,
      backgroundColor: activeElement.style.backgroundColor,
      borderColor: activeElement.style.borderColor,
    };

    // 1. Restore the Category/Type and Color data
    const savedType = activeElement.dataset.slotType;
    if (savedType) {
      document.getElementById("slot-type").value = savedType;
    }

    // 2. Handle Delete Button Visibility
    const deleteBtn = document.querySelector(".btn-delete");
    if (!activeElement.dataset.id && !activeElement.dataset.eventId) {
      deleteBtn.style.visibility = "hidden";
    } else {
      deleteBtn.style.visibility = "visible";
    }

    floatingMenu.style.display = "block";

    if (top + popoverHeight > gridHeight) {
      floatingMenu.style.top = `${top - popoverHeight + height}px`;
      floatingMenu.classList.add("popover-top");
    } else {
      floatingMenu.style.top = `${top}px`;
      floatingMenu.classList.remove("popover-top");
    }

    if (left > gridWidth * 0.6) {
      floatingMenu.style.left = `${left - popoverWidth - spacing}px`;
      floatingMenu.classList.add("popover-left");
    } else {
      floatingMenu.style.left = `${left + width + spacing}px`;
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
  });
  function updateTimeFromBlocks(topBlock, numOfBlocks) {
    const MINUTES_PER_BLOCK = 15;

    const startMins = topBlock * MINUTES_PER_BLOCK;
    const endMins = startMins + numOfBlocks * MINUTES_PER_BLOCK;

    modalStart.value = formatTime(startMins);
    modalEnd.value = formatTime(endMins);

    if (output) {
      output.innerText = `${formatTime(startMins)} - ${formatTime(endMins)}`;
    }
  }

  function formatTime(totalMinutes) {
    const total = Math.round(totalMinutes);
    let hour = Math.floor(total / 60);
    const m = total % 60;

    if (hour >= 24) hour = 0;
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
    if (activeElement && originalState) {
      // 1. Restore Data Attributes
      activeElement.dataset.title = originalState.title;
      activeElement.dataset.slotType = originalState.slotType;
      activeElement.dataset.start = originalState.start;
      activeElement.dataset.end = originalState.end;

      // 2. Restore Visuals (CSS)
      activeElement.style.top = originalState.top;
      activeElement.style.height = originalState.height;
      activeElement.style.backgroundColor = originalState.backgroundColor;
      activeElement.style.borderColor = originalState.borderColor;

      // 3. Restore Inner Labels
      const titleLabel = activeElement.querySelector(".time-block-label");
      if (titleLabel) titleLabel.innerText = originalState.title;

      const timeLabel = activeElement.querySelector(".time-block-time");
      if (timeLabel)
        timeLabel.innerText = `${originalState.start}-${originalState.end}`;
    }

    floatingMenu.style.display = "none";
    ghost.style.display = "none";
    activeElement = null;
    originalState = null;
  }

  function updateTitle() {
    if (!activeElement) return;
    const inputValue = inputTitle.value;

    const titleLabel = activeElement.querySelector(".time-block-label");
    if (titleLabel) {
      titleLabel.innerText = inputValue;
    }
  }
  async function saveEvent() {
    if (!activeElement) return;

    const title = inputTitle.value.trim();
    if (!title) {
      inputTitle.style.border = "2px solid #ef4444";
      inputTitle.placeholder = "Title is required!";
      inputTitle.focus();

      inputTitle.classList.add("shake");
      setTimeout(() => inputTitle.classList.remove("shake"), 500);
      return;
    }

    inputTitle.style.border = "none";
    const csrftoken = getCookie("csrftoken");
    const rect = grid.getBoundingClientRect();
    const dayWidth = rect.width / 7;

    let dayIndex;
    const styleLeft = activeElement.style.left;
    if (styleLeft.includes("%")) {
      dayIndex = Math.round(parseFloat(styleLeft) / (100 / 7));
    } else if (styleLeft.includes("px")) {
      dayIndex = Math.floor((parseFloat(styleLeft) + 5) / dayWidth);
    } else {
      dayIndex = parseInt(activeElement.dataset.dayIndex || 0);
    }

    dayIndex = Math.max(0, Math.min(6, dayIndex));

    const eventData = {
      title: inputTitle.value,
      slot_type: document.getElementById("slot-type").value,
      start_time: modalStart.value,
      end_time: modalEnd.value,
      day_index: dayIndex,
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
        activeElement.dataset.id = result.id;
        originalState = null;
        closeMenu();
        location.reload();
      } else {
        alert("Error: " + (result.message || "Unknown server error"));
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  }
  function deleteEvent() {
    if (!activeElement) return;

    const slotId = activeElement.dataset.id;
    if (!slotId) {
      activeElement.remove();
      originalState = null;
      closeMenu();
      return;
    }

    floatingMenu.style.display = "none";
    const deleteConfirmModal = document.getElementById("delete-confirm-modal");

    deleteConfirmModal.style.display = "flex";
    deleteConfirmModal.addEventListener("mousedown", (e) => {
      e.stopPropagation();
    });

    deleteConfirmModal.addEventListener("mouseup", (e) => {
      e.stopPropagation();
    });

    deleteConfirmModal.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    document.getElementById("confirm-delete-btn").onclick = (e) => {
      executeDelete(slotId);
    };
  }

  function hideDeleteModal() {
    document.getElementById("delete-confirm-modal").style.display = "none";
    if (floatingMenu) {
      floatingMenu.style.display = "block";
    }
  }

  async function executeDelete(slotId) {
    hideDeleteModal();

    try {
      const response = await fetch(`/timetable/delete-slot/${slotId}/`, {
        method: "DELETE",
        headers: { "X-CSRFToken": getCookie("csrftoken") },
      });

      if (response.ok) {
        activeElement.remove();
        closeMenu();
        location.reload();
      }
    } catch (e) {
      console.error("Delete failed", e);
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
  inputTitle.addEventListener("input", () => {
    if (inputTitle.value.trim().length > 0) {
      inputTitle.style.border = "none";
    }
    updateTitle();
  });

  const typeColorMap = {
    class: "#6366f1",
    self_study: "#8b5cf6",
    break: "#10b981",
    activity: "#f59e0b",
    free: "#3b82f6",
  };

  slotTypeSelect.addEventListener("change", (e) => {
    const selectedType = e.target.value;
    const activeColor = typeColorMap[selectedType];

    if (activeColor && activeElement) {
      activeElement.style.backgroundColor = activeColor + "40";
      activeElement.style.borderColor = activeColor;
      activeElement.dataset.slotType = selectedType;
    }
  });

  window.closeMenu = closeMenu;
  window.deleteEvent = deleteEvent;
  window.saveEvent = saveEvent;
  window.hideDeleteModal = hideDeleteModal;
};
