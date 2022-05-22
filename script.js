import imageData from "./imageData.js";

function fillListItem(listItem, { previewImage, title }, index) {
  const newTitle = shortenTitle(title);
  listItem.setAttribute("id", `item-${index}`);
  listItem.innerHTML = `<img class="thumbnail" src=${previewImage} "/> 
      <span id="item-${index}-caption"> ${newTitle}</span>`;
  return listItem;
}

(function populateGallery() {
  const ul = document.querySelector("ul");
  imageData.forEach((element, index) => {
    let listItem = document.createElement("li");
    listItem = fillListItem(listItem, element, index);
    ul.appendChild(listItem);
  });
})();

function shortenTitle(title) {
  if (title.length < 20) return title;
  return title.substring(0, 15) + "..." + title.substring(title.length - 15);
}
