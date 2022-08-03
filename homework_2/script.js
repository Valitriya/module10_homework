const btn = document.querySelector(".btn_start");

btn.addEventListener("click", () => {
  alert("Размер экрана: " + window.screen.width + "x" + window.screen.height);
});
