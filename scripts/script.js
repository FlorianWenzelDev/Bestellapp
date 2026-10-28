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

function toogleBasket() {
    let basketRef = document.getElementById("mobileBasket");
    if(basketRef.open){
      basketRef.close();
    }
    else{
      basketRef.show();
    }
}

function changeArticleQuantity(categoryIndex, dishIndex, countDirection) {
  data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity += countDirection;
  renderBasketArticles()
}

function changeArticleQuantityToZero(categoryIndex, dishIndex) {
  data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity = 0;
  renderBasketArticles()
}

function renderBasketArticles() {
  let basketArticleListRef = document.getElementById("listOfBasketArticles");
  basketArticleListRef.innerHTML = "";
  for (let categoryIndex = 0; categoryIndex < data.currentMenu.length; categoryIndex++) {
    for (let dishIndex = 0; dishIndex < data.currentMenu[categoryIndex].dishes.length; dishIndex++) {
      if (data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity !== 0){
        basketArticleListRef.innerHTML += getBasketArticle(categoryIndex, dishIndex, getDishSum(categoryIndex, dishIndex));
      } 
    }
  }
  changeVisibilityOnBasketElements();
  getBasketSum();
}

function changeVisibilityOnBasketElements() {
  let basketArticleListRef = document.getElementById("listOfBasketArticles");
  let emptyBasketStylingRef = document.querySelector("#emptyBasketStyling");
  console.log(basketArticleListRef.querySelectorAll('li').length);
  
  if (basketArticleListRef.querySelectorAll('li').length > 0){
    emptyBasketStylingRef.setAttribute("hidden", true);
  }
  else{
    emptyBasketStylingRef.removeAttribute("hidden", false);
  }
}

function getDishSum(categoryIndex, dishIndex) {
  return data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity * data.currentMenu[categoryIndex].dishes[dishIndex].dishPrice;
}

function getBasketSum() {
  let subtotalSumRef = document.getElementById("subtotalSum");
  let subtotalSum = 0;
  subtotalSumRef.innerText = "";
  for (let categoryIndex = 0; categoryIndex < data.currentMenu.length; categoryIndex++) {
    for (let dishIndex = 0; dishIndex < data.currentMenu[categoryIndex].dishes.length; dishIndex++) {
      if (data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity !== 0){
        subtotalSum += getDishSum(categoryIndex, dishIndex); 
      } 
    }
  }
  subtotalSumRef.innerText = `${subtotalSum.toFixed(2)}€`;
}