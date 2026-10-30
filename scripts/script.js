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
      renderBasketArticles();
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
  renderBasketTable();
  renderBasketButton();
  changeBasketHeight();
}

//hier übergabewert visible on empty als true oder false und die variable einsetzen und dann übergeordneter baustein der mehrfahc aufruft mit entsprechender ID
function changeVisibilityOnBasketElements() {
  let basketArticleListRef = document.getElementById("listOfBasketArticles");
  let emptyBasketStylingRef = document.querySelector("#emptyBasketStyling");
  if (basketArticleListRef.querySelectorAll('li').length > 0){
    emptyBasketStylingRef.setAttribute("hidden", true);
  }
  else{
    emptyBasketStylingRef.removeAttribute("hidden", false);
  }
}

function renderBasketTable() {
  let subtotalSumRef = document.getElementById("subtotalSum");
  let totalSumRef = document.getElementById("totalSum");
  subtotalSumRef.innerText = "";
  subtotalSumRef.innerText = `${getBasketSum().toFixed(2)}€`;
  totalSumRef.innerText = `${getTotalSum().toFixed(2)}€`
}

function renderBasketButton() {
  let basketButtonRef = document.getElementById("basketBuyButton");
  basketButtonRef.innerText = "";
  basketButtonRef.innerText = `Buy now (${getTotalSum().toFixed(2)}€)`;
}

function changeBasketHeight() {
  let basketArticleListRef = document.getElementById("listOfBasketArticles");
  let basketArticles = Array.from(basketArticleListRef.children);
  let basketMaxHeight = 0;
  if (basketArticleListRef.querySelectorAll('li').length > 3){
    for (let basketArticleIndex = 0; basketArticleIndex < 3; basketArticleIndex++) {
      basketMaxHeight += basketArticles[basketArticleIndex].offsetHeight;     
    }
    basketArticleListRef.style.maxHeight = `${basketMaxHeight + 32}px`;
  }
  else{
    basketArticleListRef.style.maxHeight = "auto";
  }
}

function getDishSum(categoryIndex, dishIndex) {
  return data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity * data.currentMenu[categoryIndex].dishes[dishIndex].dishPrice;
}

function getBasketSum() {
  let subtotalSum = 0;
  for (let categoryIndex = 0; categoryIndex < data.currentMenu.length; categoryIndex++) {
    for (let dishIndex = 0; dishIndex < data.currentMenu[categoryIndex].dishes.length; dishIndex++) {
      if (data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity !== 0){
        subtotalSum += getDishSum(categoryIndex, dishIndex); 
      } 
    }
  }
  return subtotalSum;
}

function getTotalSum() {
  let deliveryFeeRef = document.getElementById("deliveryFee").innerText;
  return parseFloat(deliveryFeeRef) + getBasketSum();

}