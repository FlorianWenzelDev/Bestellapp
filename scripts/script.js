let data = {
  currentMenu: [],
};

function saveToLocalStorage() {
  localStorage.setItem("menu", JSON.stringify(menu));
}

function getFromLocalStorage() {
  let storageData = JSON.parse(localStorage.getItem("menu"));
  if (storageData !== null) {
    data.currentMenu = storageData;
} else {
    saveToLocalStorage();
    data.currentMenu = menu;
}
};

function renderMenuOnLoad() {
  let restaurantSite = document.getElementById("menu");
  restaurantSite.innerHTML = "";
  for (let index = 0; index < data.currentMenu.length; index++) {
    restaurantSite.innerHTML += getDishCategory(renderCategoryHeader(index), renderCategoryDishes(index));  
  }
}

function renderCategoryHeader(categoryIndex) {
    let categoryHeader = getCategoryHeader(categoryIndex);
    return categoryHeader;
}

function renderCategoryDishes(categoryIndex) {
    let categoryDishes = "";
    for (let dishIndex = 0; dishIndex < data.currentMenu[categoryIndex].dishes.length; dishIndex++) {
        const dish = getDish(categoryIndex, dishIndex);
        categoryDishes += dish;
    }
    return categoryDishes;
}