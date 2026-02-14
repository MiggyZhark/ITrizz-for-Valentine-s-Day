$(document).ready(function () {
  // Cache DOM elements
  const envelope = $("#envelope");
  const btnOpen = $("#open");
  const btnReset = $("#reset");
  const valentineOverlay = $("#valentineOverlay");
  const yesBtn = $("#yesBtn");
  const noBtn = $("#noBtn");
  const catGif = $("#catGif");
  const mySound = document.getElementById("mySound");
  const myMusic = document.getElementById("myMusic");

  let noClickCount = 0;
  let envelopeUnlocked = false;

  // Disable buttons until valentine is answered
  btnOpen.prop("disabled", true);
  btnReset.prop("disabled", true);

  // Event listeners
  yesBtn.on("click", handleYes);
  noBtn.on("click", handleNo);
  yesBtn.on("mouseenter", () => changeCatGif("happy"));
  yesBtn.on("mouseleave", () => changeCatGif("default"));
  noBtn.on("mouseenter", () => changeCatGif("sad"));
  noBtn.on("mouseleave", () => changeCatGif("default"));

  envelope.on("click", open);
  btnOpen.on("click", open);
  btnReset.on("click", close);

  function changeCatGif(mood) {
    const gifUrl = catGif.attr(`data-${mood}`);
    catGif.css("opacity", "0.7");
    setTimeout(() => {
      catGif.attr("src", gifUrl);
      catGif.css("opacity", "1");
    }, 150);
  }

  function handleYes() {
    // Play cute sound effect
    if (mySound) mySound.play().catch(() => {});

    // Fade out dialog
    valentineOverlay.fadeOut(800, function () {
      $(this).remove();
    });

    // Unlock envelope buttons
    setTimeout(() => {
      $("body").addClass("envelope-unlocked");
      btnOpen.prop("disabled", false);
      btnReset.prop("disabled", false);
    }, 300);

    envelopeUnlocked = true;
  }

  function handleNo() {
    noClickCount++;
    const opacity = Math.max(0, 1 - noClickCount * 0.2);

    // Fade only the No button
    noBtn.css("opacity", opacity);

    // Remove "No" button after 3 clicks
    if (noClickCount >= 3) {
      noBtn.fadeOut(400, function () {
        $(this).remove();
      });
    }

    // After 5 clicks, make sure No button is fully gone
    if (noClickCount >= 5) {
      noBtn.css("pointer-events", "none");
    }
  }

  function open() {
    if (envelopeUnlocked) {
      envelope.removeClass("close").addClass("open");
      if (mySound) mySound.play().catch(() => {});
      if (myMusic) myMusic.play().catch(() => {});
    }
  }

  function close() {
    envelope.removeClass("open").addClass("close");
  }
});
