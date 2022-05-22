import imageData from "./imageData.js";

let selectedIndex = 0;

// adds the listItem from ImageData array and appends it to ul tag
(function populateGallery() {
  const ul = document.querySelector("ul");
  imageData.forEach((element, index) => {
    let listItem = document.createElement("li");
    listItem = fillListItem(listItem, element, index); // filling the listItem
    ul.appendChild(listItem);
  });
  showSelected(); /* after inserting all the images initially highlight and show
  the selected image*/
})();

document.addEventListener("keydown", onKeysPress);
// adding event listner to pressing key to change images

/* highlights the image with selected index and changes the image and caption 
with the particular selected index*/

function showSelected() {
  const picture = document.querySelector(".picture");
  const caption = document.querySelector("textarea");
  const selectedItem = document.querySelector(`#item-${selectedIndex}`);
  selectedItem.classList.add("selected");
  const selectedImage = imageData[selectedIndex];
  picture.src = selectedImage.previewImage;
  caption.value = selectedImage.title;
  caption.addEventListener("keypress", onChangingName); // adding event listner
  //when user changes the name on pressing a key
}

// updates the selected index with the new changed index
function updateSelectedIndex(newIndex) {
  newIndex = validateIndex(newIndex);
  const selectedItem = document.querySelector(`#item-${selectedIndex}`);
  selectedItem.classList.remove("selected");
  selectedIndex = newIndex;
  showSelected(); // now showing the element after updating the index
}

// fills the lisItem with the avatar and short title of the gallery image
function fillListItem(listItem, { previewImage, title }, index) {
  const newTitle = shortenTitle(title);
  listItem.setAttribute("id", `item-${index}`);
  listItem.innerHTML = `<img class="thumbnail" src=${previewImage} "/> 
    <span id="item-${index}-caption"> ${newTitle}</span>`;
  listItem.addEventListener("click", () => {
    // adding event listner when someone clicks on the listItem
    updateSelectedIndex(index);
  });
  return listItem;
}

//helper functions

/*shortens the title of the image with only includ ing first 15 and last 15 charcters
and the putting three dots(...) between it*/
function shortenTitle(title) {
  if (title.length < 20) return title; // if title is laready short return it
  return title.substring(0, 15) + "..." + title.substring(title.length - 15);
}

// for making te index valid
function validateIndex(index) {
  /*when index is changed by addin +1 or -1 we use modulus properties as index might 
  become negative*/
  return (index + imageData.length) % imageData.length;
}

// event listner function when name is changed of an image in the input area
function onChangingName(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const selectedItemCaption = document.querySelector(
      `#item-${selectedIndex}-caption`
    );
    imageData[selectedIndex].title = event.target.value;
    selectedItemCaption.textContent = shortenTitle(event.target.value);
  }
}

// event listner function for pressing keys and checking for up and down arrow key
function onKeysPress(event) {
  switch (event.keyCode) {
    case 38:
      updateSelectedIndex(selectedIndex - 1);
      break;
    case 40:
      updateSelectedIndex(selectedIndex + 1);
      break;
  }
}
