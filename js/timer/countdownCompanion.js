/* ============================================
   KittyTimer — Countdown Companion
   Sleepy buddy badge + self-care nudges for Countdown sessions.
   Purely additive — the core Ui classes call these hooks optionally
   (guarded by `if (window.CountdownCompanion)`), so this file can be missing
   or fail to load without breaking the timer itself.
   ============================================ */

(function () {
  "use strict";

  var MESSAGES = [
    "Stretch those paws 🐾 reach up, reach out.",
    "Sip some water 💧 your future self says thanks.",
    "Rest your eyes for a moment 👀 look at something far away.",
    "Take one slow breath in... and out... 🌬️",
    "Roll your shoulders back — you've been curled up a while.",
    "Give yourself a little smile 😊 you're doing just fine.",
  ];
  var lastMessageIndex = -1;

  function pickMessage() {
    if (MESSAGES.length <= 1) return MESSAGES[0];
    var index;
    do {
      index = Math.floor(Math.random() * MESSAGES.length);
    } while (index === lastMessageIndex);
    lastMessageIndex = index;
    return MESSAGES[index];
  }

  var buddyEl, faceEl, toastEl, toastTextEl, toastDismissEl;
  var currentStage = "awake";

  function buildBuddy() {
    buddyEl = document.createElement("div");
    buddyEl.id = "countdownBuddy";
    buddyEl.setAttribute("aria-hidden", "true");
    buddyEl.innerHTML =
      '<span class="face">🙂</span>' +
      '<span class="zzz"><span>z</span><span>Z</span><span>z</span></span>';
    document.body.appendChild(buddyEl);
    faceEl = buddyEl.querySelector(".face");
  }

  function buildToast() {
    toastEl = document.createElement("div");
    toastEl.id = "selfCareToast";
    toastEl.innerHTML =
      '<p class="selfCareText"></p>' +
      '<button class="selfCareDismiss" aria-label="Dismiss">×</button>';
    document.body.appendChild(toastEl);
    toastTextEl = toastEl.querySelector(".selfCareText");
    toastDismissEl = toastEl.querySelector(".selfCareDismiss");
    toastDismissEl.addEventListener("click", hideMessage);
  }

  function showBuddy() {
    if (buddyEl) buddyEl.classList.add("visible");
  }

  function hideBuddy() {
    if (!buddyEl) return;
    buddyEl.classList.remove("visible", "stage-drowsy", "stage-asleep");
    currentStage = "awake";
    faceEl.textContent = "🙂";
  }

  function setProgress(_ratio) {
    if (!buddyEl) return;
    var stage = _ratio >= 0.85 ? "asleep" : _ratio >= 0.5 ? "drowsy" : "awake";
    if (stage === currentStage) return;
    currentStage = stage;
    buddyEl.classList.remove("stage-drowsy", "stage-asleep");
    if (stage === "asleep") {
      buddyEl.classList.add("stage-asleep");
      faceEl.textContent = "😴";
    } else if (stage === "drowsy") {
      buddyEl.classList.add("stage-drowsy");
      faceEl.textContent = "😌";
    } else {
      faceEl.textContent = "🙂";
    }
  }

  function showMessage() {
    try {
      if (TimerApp.Datas.breakTipsEnabled != true) return;
    } catch (e) {
      return;
    }
    if (!toastEl) return;
    toastTextEl.textContent = pickMessage();
    toastEl.classList.add("visible");
  }

  function hideMessage() {
    if (toastEl) toastEl.classList.remove("visible");
  }

  window.CountdownCompanion = {
    OnSessionStart: function () {
      setProgress(0);
      showBuddy();
      hideMessage();
    },
    OnProgress: function (_ratio) {
      setProgress(_ratio);
    },
    OnComplete: function () {
      setProgress(1);
    },
    OnReset: function () {
      hideBuddy();
      hideMessage();
    },
    HideBuddy: hideBuddy,
    ShowSelfCareMessage: showMessage,
  };

  function init() {
    buildBuddy();
    buildToast();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
