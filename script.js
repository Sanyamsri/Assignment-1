import imageData from "./imageData.js";

let selectedIndex = 0;

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
  showSelected();
})();

function updateSelectedIndex(newIndex) {
  newIndex = validateIndex(newIndex);
  const selectedItem = document.querySelector(`#item-${selectedIndex}`);
  selectedItem.classList.remove("selected");
  selectedIndex = newIndex;
  showSelected();
}

function showSelected() {
  const picture = document.querySelector(".picture");
  const caption = document.querySelector("textarea");
  const selectedItem = document.querySelector(`#item-${selectedIndex}`);
  selectedItem.classList.add("selected");
  const selectedImage = imageData[selectedIndex];
  picture.src = selectedImage.previewImage;
  caption.value = selectedImage.title;
}

function shortenTitle(title) {
  if (title.length < 20) return title;
  return title.substring(0, 15) + "..." + title.substring(title.length - 15);
}
