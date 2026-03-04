window.onload = () => {
  const grid = document.getElementById("calendar-grid");
  const ghost = document.getElementById("ghost-slot");
  const floatingMenu = document.getElementById("floating-menu");
  const modalStart = document.getElementById("modal-start");
  const modalEnd = document.getElementById("modal-end");
  const inputTitle = document.getElementById("event-title");
  const inputTitleContainer = document.getElementById("event-title-container");
  const slotTypeSelect = document.getElementById("slot-type");
  const course = document.getElementById("course");
  const courseSelectContainer =
    document.getElementsByClassName("course-select-form")[0];

  let originalState = null;
  let startY = 0;
  let startX = 0;
  let dragMode = null;
  let offsetTop = 0; //to prevent block from jumping when grabbed
  let offsetLeft = 0;
  let isDragging = false;
  let mouseUp = true;
  let activeElement = null;
  const DRAG_THRESHOLD = 5;

  grid.addEventListener("mousedown", (e) => {
    const isMenu = floatingMenu.contains(e.target);
    if (isMenu) return;

    const clickedBlock = e.target.closest(".time-block");
    const clickedGhost =
      ghost.contains(e.target) && ghost.style.display !== "none";

    if (clickedBlock || clickedGhost) {
      activeElement = clickedBlock || ghost;
      const rect = activeElement.getBoundingClientRect();
      if (activeElement.dataset.atEdge === "true") {
        dragMode = "RESIZE";
      } else {
        dragMode = "MOVE";
        offsetTop = e.clientY - rect.top;
        offsetLeft = e.clientX - rect.left;
      }
    } else {
      dragMode = "CREATE";
      startX = e.clientX;
      startY = e.clientY;
      activeElement = ghost;
      ghost.style.display = "block";
      delete ghost.dataset.id;
    }
    mouseUp = false;
  });

  window.addEventListener("mouseup", (e) => {
    mouseUp = true;
    const rect = grid.getBoundingClientRect();
    const gridWidth = rect.width;
    const gridHeight = rect.height;
    const pixelsPerBlock = gridHeight / 96;
    const dayWidth = gridWidth / 7;
    const wasDragging = isDragging;
    const currentDragMode = dragMode;

    //updating position of time block after dragging
    if (
      activeElement &&
      wasDragging &&
      (currentDragMode === "MOVE" || currentDragMode === "RESIZE")
    ) {
      let dayIndex;
      const currentLeft = activeElement.style.left;
      if (currentLeft.includes("%")) {
        dayIndex = Math.round(parseFloat(currentLeft) / (100 / 7));
      } else if (currentLeft.includes("px")) {
        dayIndex = Math.round(parseFloat(currentLeft) / dayWidth);
      } else {
        dayIndex = parseInt(activeElement.dataset.dayIndex || 0);
      }

      activeElement.classList.remove("dragging");
      activeElement.style.left = `${dayIndex * dayWidth}px`;
      activeElement.dataset.day_index = dayIndex;
      activeElement.style.cursor = "pointer";
    }

    if (!isDragging) {
      const isMenu = floatingMenu.contains(e.target);
      const isTimeBlock = e.target.closest(".time-block");
      const isGhostBlock = ghost.contains(e.target);
      /* 
        if we click anything inside pop-up menu,return early to prevent creating time block 
        when we want to type into the pop-up menu form
      */
      if (isMenu) return;

      //if clicking non-existing block, we create 1-hour time block
      if (!isTimeBlock && !isGhostBlock) {
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
    }

    //update menu position,start-time and end-time after dragging
    if (activeElement) {
      if (activeElement.classList.contains("time-block")) {
        activeElement.classList.remove("dragging");
        ghost.style.display = "none";
      }

      const top = parseFloat(activeElement.style.top);
      let currentLeft = activeElement.style.left;
      let dayIndex = 0;
      if (currentLeft.includes("%")) {
        dayIndex = Math.round(parseFloat(currentLeft) / (100 / 7));
      } else if (currentLeft.includes("px")) {
        dayIndex = Math.round(parseFloat(currentLeft) / dayWidth);
      }
      const left = dayIndex * dayWidth;

      let finalWidth = activeElement.style.width.includes("%")
        ? (rect.width * parseFloat(activeElement.style.width)) / 100
        : parseFloat(activeElement.style.width);
      const height = parseFloat(activeElement.style.height);

      showMenuAt(top, left, finalWidth || dayWidth, height);

      const startBlock = Math.round(top / pixelsPerBlock);
      const blockCount = Math.round(parseFloat(height) / pixelsPerBlock);
      inputTitle.value = activeElement.dataset.title
        ? activeElement.dataset.title
        : "";

      updateTimeFromBlocks(startBlock, blockCount);
      if (
        wasDragging &&
        (dragMode === "MOVE" || dragMode === "RESIZE") &&
        activeElement.dataset.id
      ) {
        saveEvent();
      }
    }

    //resetting the state
    isDragging = false;
    dragMode = null;
    ghost.querySelector(".time-block-label").innerHTML = "";
  });

  window.addEventListener("mousemove", (e) => {
    detectResizing(e);
    if (mouseUp) return;
    /*
     *  e.clientY: the coordinate y of mouse from the browser
     *  rect.top: the distance from the browswer to the grid view
     *  currentY: the coordinate y of mouse from the grid view
     */
    const rect = grid.getBoundingClientRect();
    const TOTAL_BLOCK = 96;
    const pixelsPerBlock = rect.height / TOTAL_BLOCK;

    //tracking if user is dragging or not
    if (!isDragging) {
      const moveX = Math.abs(e.clientX - startX);
      const moveY = Math.abs(e.clientY - startY);

      if (moveX > DRAG_THRESHOLD || moveY > DRAG_THRESHOLD) {
        isDragging = true;
        floatingMenu.style.display = "none";
      } else {
        return;
      }
    }

    if (isDragging && dragMode === "MOVE") {
      handleMoveDrag(e, rect, pixelsPerBlock);
    } else if (isDragging && dragMode === "CREATE") {
      ghost.style.display = "block";
      handleCreateDrag(e, rect, pixelsPerBlock);
    } else if (isDragging && dragMode === "RESIZE") {
      handleResize(e, rect, pixelsPerBlock);
    }
  });

  function detectResizing(e) {
    if (isDragging) return;
    const block =
      e.target.closest(".time-block") || e.target.closest(".ghost-slot");
    if (!block) return false;

    const blockRect = block.getBoundingClientRect();
    const mouseY = e.clientY;

    const BUFFER = 10;
    const isNearBottom = Math.abs(mouseY - blockRect.bottom) <= BUFFER;

    if (isNearBottom) {
      block.style.cursor = "ns-resize";
      block.dataset.atEdge = "true";
    } else {
      block.style.cursor = "pointer";
      delete block.dataset.atEdge;
    }
  }
  function handleResize(e, rect, pixelsPerBlock) {
    if (!activeElement) return;

    const mouseYInGrid = e.clientY - rect.top;

    const blockTop = parseFloat(activeElement.style.top) || 0;
    const startBlock = Math.round(blockTop / pixelsPerBlock);

    let newHeight = mouseYInGrid - blockTop;
    const maxHeight = (96 - startBlock) * pixelsPerBlock;
    newHeight = Math.min(newHeight, maxHeight);

    const snappedHeight = Math.max(
      pixelsPerBlock,
      Math.round(newHeight / pixelsPerBlock) * pixelsPerBlock,
    );

    activeElement.style.height = `${snappedHeight}px`;

    const blockCount = Math.round(snappedHeight / pixelsPerBlock);
    updateTimeFromBlocks(startBlock, blockCount);
  }
  function handleCreateDrag(e, rect, pixelsPerBlock) {
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
  }

  function handleMoveDrag(e, rect, pixelsPerBlock) {
    activeElement.style.cursor = "grabbing";

    const currentY = e.clientY - rect.top - offsetTop;
    const snappedY = Math.round(currentY / pixelsPerBlock);

    const finalTop = Math.max(
      0,
      Math.min(
        96 - Math.round(activeElement.offsetHeight / pixelsPerBlock),
        snappedY,
      ),
    );
    activeElement.style.top = `${finalTop * pixelsPerBlock}px`;

    const currentX = e.clientX - rect.left - offsetLeft;
    const maxLeft = rect.width - activeElement.offsetWidth;
    const smoothLeft = Math.max(0, Math.min(maxLeft, currentX));

    activeElement.style.left = `${smoothLeft}px`;
  }

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
      slotTypeSelect.value = savedType;
    }
    if (slotTypeSelect.value === "class") {
      inputTitleContainer.style.display = "none";
      courseSelectContainer.style.display = "block";
    } else {
      inputTitleContainer.style.display = "block";
      courseSelectContainer.style.display = "none";
    }

    // 2. Handle Delete Button Visibility
    const deleteBtn = document.querySelector(".btn-delete");
    if (!activeElement.dataset.id) {
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

  function updateTimeFromBlocks(topBlock, numOfBlocks) {
    const MINUTES_PER_BLOCK = 15;

    const startMins = topBlock * MINUTES_PER_BLOCK;
    const endMins = Math.min(1440, startMins + numOfBlocks * MINUTES_PER_BLOCK);

    const startTime = formatTime(startMins);
    const endTime = formatTime(endMins);

    modalStart.value = startTime === "24:00" ? "00:00" : startTime;
    modalEnd.value = endTime === "24:00" ? "00:00" : endTime;

    if (activeElement && activeElement !== ghost) {
      activeElement.querySelector(".time-block-time").innerHTML =
        `${getTimeFormat(startTime)} - ${getTimeFormat(endTime)}`;
    }
  }
  function getTimeFormat(time) {
    if (!time || !time.includes(":")) return "12:00am";
    let [HH, MM] = time.split(":").map(Number);
    if (HH >= 24) {
      return `12:${MM.toString().padStart(2, "0")}am`;
    }

    const period = HH >= 12 ? "pm" : "am";
    let displayHour = HH % 12;
    if (displayHour === 0) displayHour = 12;

    const displayMin = MM.toString().padStart(2, "0");
    return `${displayHour}:${displayMin}${period}`;
  }

  function formatTime(totalMinutes) {
    const total = Math.round(totalMinutes);
    let hour = Math.floor(total / 60);
    const m = total % 60;
    const hh = hour.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    return `${hh}:${mm}`;
  }

  function syncVisualsToTime() {
    const startVal = modalStart.value;
    const endVal = modalEnd.value;

    if (!startVal || !endVal) return;

    const [startH, startM] = startVal.split(":").map(Number);
    let [endH, endM] = endVal.split(":").map(Number);

    const startMins = startH * 60 + startM;
    let endMins = endH * 60 + endM;

    if (endMins === 0 && startMins > 0) {
      endMins = 1440;
    }

    const duration = endMins - startMins;

    if (duration <= 0) return;

    const rect = grid.getBoundingClientRect();
    const pixelsPerMinutes = rect.height / 1440;

    activeElement.style.top = `${startMins * pixelsPerMinutes}px`;
    activeElement.style.height = `${duration * pixelsPerMinutes}px`;

    const timeLabel = activeElement.querySelector(".time-block-time");
    if (timeLabel) {
      const displayStart = getTimeFormat(formatTime(startMins));
      const displayEnd = getTimeFormat(formatTime(endMins));

      timeLabel.innerText = `${displayStart} - ${displayEnd}`;

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
    let title;
    if (slotTypeSelect.value !== "class") {
      title = inputTitle.value.trim() || activeElement.dataset.title;
    } else {
      title = course.value;
    }
    if (!title && dragMode !== "RESIZE" && dragMode !== "MOVE") {
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
      title: title,
      slot_type: document.getElementById("slot-type").value,
      start_time: modalStart.value,
      end_time: modalEnd.value,
      day_index: dayIndex,
      event_id: activeElement.dataset.id || null,
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
    class: "#6366F1",
    self_study: "#8B5CF6",
    break: "#14B8A6",
    activity: "#F59E0B",
    free: "#3B82F6",
  };

  slotTypeSelect.addEventListener("change", (e) => {
    const selectedType = e.target.value;
    const activeColor = typeColorMap[selectedType];

    if (selectedType === "class") {
      inputTitleContainer.style.display = "none";
      courseSelectContainer.style.display = "block";
    } else {
      inputTitleContainer.style.display = "block";
      courseSelectContainer.style.display = "none";
    }

    if (activeColor && activeElement) {
      activeElement.style.backgroundColor = activeColor + "80";
      activeElement.style.borderColor = activeColor;
      activeElement.dataset.slotType = selectedType;
    }
  });

  window.closeMenu = closeMenu;
  window.deleteEvent = deleteEvent;
  window.saveEvent = saveEvent;
  window.hideDeleteModal = hideDeleteModal;
};
