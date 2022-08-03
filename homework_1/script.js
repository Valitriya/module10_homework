const btn = document.querySelector(".btn_start"),
      svgNoneFill = btn.querySelector(".btn_icon__none"),
      svgFill = btn.querySelector(".btn_icon__filling");

      // пишем функцию для добавления и удаления класса, отвечающего 
      // за видимость svg изображения
const showFill = () => {
  svgNoneFill.classList.toggle("visible");
  svgFill.classList.toggle("visible");
};

svgNoneFill.addEventListener("click", showFill);
svgFill.addEventListener("click", showFill);
