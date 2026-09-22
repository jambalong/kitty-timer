/* ============================================
   KittyTimer — Settings Panel
   Small floating gear button with a popover for nap-tip and purr
   ambience controls. Persists through the existing SaveSystem.
   Purely additive — reads/writes TimerApp.Datas via public system
   methods, same as any other Ui class would.
   ============================================ */

(function () {
  "use strict";

  var panelEl, gearBtn, napToggleBtn, purrToggleBtn, purrVolumeInput, purrVolumeRow;

  function refresh() {
    try {
      var napOn = TimerApp.Datas.napMessagesEnabled == true;
      napToggleBtn.classList.toggle("on", napOn);
      napToggleBtn.textContent = napOn ? "Nap tips: on" : "Nap tips: off";

      var purrOn = TimerApp.Datas.purrEnabled == true;
      purrToggleBtn.classList.toggle("on", purrOn);
      purrToggleBtn.textContent = purrOn ? "Purring: on" : "Purring: off";

      purrVolumeInput.value = TimerApp.Datas.purrVolume;
      purrVolumeRow.style.display = purrOn ? "flex" : "none";
    } catch (e) {}
  }

  function togglePanel() {
    panelEl.classList.toggle("open");
  }

  function onToggleNapMessages() {
    try {
      TimerApp.Datas.napMessagesEnabled = !TimerApp.Datas.napMessagesEnabled;
      TimerApp.Systems.SaveSystem.Save();
      refresh();
    } catch (e) {}
  }

  function onTogglePurr() {
    try {
      TimerApp.Systems.AudioSystem.UpdatePurrEnabled(!TimerApp.Datas.purrEnabled);
      TimerApp.Systems.SaveSystem.Save();
      refresh();
    } catch (e) {}
  }

  function onChangePurrVolume(_e) {
    try {
      var value = window.parseInt(_e.target.value);
      TimerApp.Systems.AudioSystem.UpdatePurrVolume(value);
      TimerApp.Systems.SaveSystem.Save();
    } catch (e) {}
  }

  function build() {
    gearBtn = document.createElement("button");
    gearBtn.id = "settingsGearButton";
    gearBtn.setAttribute("aria-label", "Timer settings");
    gearBtn.textContent = "⚙️";
    document.body.appendChild(gearBtn);

    panelEl = document.createElement("div");
    panelEl.id = "settingsPanel";
    panelEl.innerHTML =
      '<button class="settingsRow napToggleBtn"></button>' +
      '<button class="settingsRow purrToggleBtn"></button>' +
      '<div class="settingsRow purrVolumeRow">' +
      '<span class="label">Purr volume</span>' +
      '<input type="range" class="purrVolumeInput" min="0" max="100" step="5" />' +
      "</div>";
    document.body.appendChild(panelEl);

    napToggleBtn = panelEl.querySelector(".napToggleBtn");
    purrToggleBtn = panelEl.querySelector(".purrToggleBtn");
    purrVolumeRow = panelEl.querySelector(".purrVolumeRow");
    purrVolumeInput = panelEl.querySelector(".purrVolumeInput");

    gearBtn.addEventListener("click", togglePanel);
    napToggleBtn.addEventListener("click", onToggleNapMessages);
    purrToggleBtn.addEventListener("click", onTogglePurr);
    purrVolumeInput.addEventListener("input", onChangePurrVolume);

    refresh();
  }

  window.SettingsPanel = { Refresh: refresh };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
