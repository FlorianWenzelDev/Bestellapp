let data = {
  currentMenu: [],
};

function saveToLocalStorage() {
  localStorage.setItem("menu", JSON.stringify(data.currentMenu));
}

function getFromLocalStorage() {
  let storageData = JSON.parse(localStorage.getItem("menu"));
  if (storageData !== null) {
    data.currentMenu = storageData;
  } else {
    data.currentMenu = menu;
    saveToLocalStorage();
  }
}

// Menu

function renderMenu() {
  let restaurantSite = document.getElementById("menu");
  restaurantSite.innerHTML = "";
  for (let index = 0; index < data.currentMenu.length; index++) {
    restaurantSite.innerHTML += getDishCategory(renderCategoryHeader(index), renderCategoryDishes(index));
  }
  restaurantSite.innerHTML += getBasket();
}

function renderCategoryHeader(categoryIndex) {
  let categoryHeader = getCategoryHeader(categoryIndex);
  return categoryHeader;
}

function renderCategoryDishes(categoryIndex) {
  let categoryDishes = "";
  for (let dishIndex = 0; dishIndex < data.currentMenu[categoryIndex].dishes.length; dishIndex++) {
    const dish = getDish(categoryIndex, dishIndex, getBtnTextDependingOnQuanityInBasket(categoryIndex, dishIndex));
    categoryDishes += dish;
  }
  return categoryDishes;
}

function renderDishElementOnChange(categoryIndex, dishIndex) {
  changeDishBtnColorDependingOnQuanity(categoryIndex, dishIndex);
  changeDishBtnTextOnQuantityChange(categoryIndex, dishIndex);
}

function changeDishBtnTextOnQuantityChange(categoryIndex, dishIndex) {
  let elementRef = getDishElementByClassName(categoryIndex, dishIndex);
  elementRef.innerText = "";
  elementRef.innerText = getBtnTextDependingOnQuanityInBasket(categoryIndex, dishIndex);
}

function changeDishBtnColorDependingOnQuanity(categoryIndex, dishIndex) {
  let elementRef = getDishElementByClassName(categoryIndex, dishIndex);
  if (data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity > 0) {
    elementRef.classList.add("highlight-btn-text");
  } else {
    elementRef.classList.remove("highlight-btn-text");
  }
}

function getDishElementByClassName(categoryIndex, dishIndex) {
  let classNameIndex = 0;
  let elementsRef = document.getElementsByClassName("dish-card-btn");
  for (let elementIndex = 0; elementIndex < categoryIndex; elementIndex++) {
    classNameIndex += data.currentMenu[categoryIndex].dishes.length;
  }
  return elementsRef[(classNameIndex += dishIndex)];
}

function getBtnTextDependingOnQuanityInBasket(categoryIndex, dishIndex) {
  if (data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity > 0) {
    return `Added ${data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity}`;
  } else {
    return "Add to basket";
  }
}

//Basket

function toggleBasket() {
  let basketRef = document.getElementById("mobileBasket");
  let basketCloseBtnRef = document.getElementById("basketCloseBtn")
  basketRef.hidden = !basketRef.hidden;
  if (!basketRef.hidden){
    basketRef.classList.add("openend");
    basketCloseBtnRef.focus();
  }
  else{
    basketRef.classList.remove("openend");
  }
  renderBasket();
}

function changeArticleQuantity(categoryIndex, dishIndex, countDirection) {
  data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity += countDirection;
  renderBasket();
  saveToLocalStorage();
}

function changeArticleQuantityToZero(categoryIndex, dishIndex) {
  data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity = 0;
  renderBasket();
  saveToLocalStorage();
}

function renderBasket() {
  renderBasketArticles();
  renderBasketTable();
  changeBasketHeight();
  renderBasketButton();
  changeElementVisibilityOnEmptyBasket("listOfBasketArticles", false);
  changeElementVisibilityOnEmptyBasket("emptyBasketStyling", true);
  changeElementVisibilityOnEmptyBasket("pricingTable", false);
  changeElementVisibilityOnEmptyBasket("basketBuyButton", false);
}

function renderBasketArticles() {
  let basketArticleListRef = document.getElementById("listOfBasketArticles");
  basketArticleListRef.innerHTML = "";
  for (let categoryIndex = 0; categoryIndex < data.currentMenu.length; categoryIndex++) {
    for (let dishIndex = 0; dishIndex < data.currentMenu[categoryIndex].dishes.length; dishIndex++) {
      if (data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity === 1) {
        basketArticleListRef.innerHTML += getBasketArticle(categoryIndex, dishIndex, getDishSum(categoryIndex, dishIndex), true);
      } else if (data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity > 1) {
        basketArticleListRef.innerHTML += getBasketArticle(categoryIndex, dishIndex, getDishSum(categoryIndex, dishIndex), false);
      }
    }
  }
}

function changeElementVisibilityOnEmptyBasket(elementId, isVisibleOnEmpty) {
  let basketArticleListRef = document.getElementById("listOfBasketArticles");
  let elementStylingRef = document.querySelector("#" + elementId);
  if (basketArticleListRef.querySelectorAll("li").length > 0) {
    elementStylingRef.hidden = isVisibleOnEmpty;
  } else {
    elementStylingRef.hidden = !isVisibleOnEmpty;
  }
}

function renderBasketTable() {
  let subtotalSumRef = document.getElementById("subtotalSum");
  let totalSumRef = document.getElementById("totalSum");
  subtotalSumRef.innerText = "";
  subtotalSumRef.innerText = `${getBasketSum().toFixed(2)}€`;
  totalSumRef.innerText = `${getTotalSum().toFixed(2)}€`;
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
  if (basketArticleListRef.querySelectorAll("li").length >= 3) {
    for (let basketArticleIndex = 0; basketArticleIndex < 3; basketArticleIndex++) {
      basketMaxHeight += basketArticles[basketArticleIndex].offsetHeight;
    }
    basketArticleListRef.style.maxHeight = `${basketMaxHeight + 32}px`;
  } else {
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
      if (data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity !== 0) {
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

function renderBasketButton() {
  let btnRef = document.getElementById("basketBtn");
  let amountRef = document.getElementById("amountInBasket");
  let amountInBasket = getQuantityInBasket();
  if (amountInBasket !== 0) {
    amountRef.innerText = amountInBasket;
    btnRef.classList.add("articles-in-basket");
  } else {
    btnRef.classList.remove("articles-in-basket");
  }
}

function getQuantityInBasket() {
  let totalAmount = 0;
  for (let categoryIndex = 0; categoryIndex < data.currentMenu.length; categoryIndex++) {
    for (let dishIndex = 0; dishIndex < data.currentMenu[categoryIndex].dishes.length; dishIndex++) {
      totalAmount += data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity;
    }
  }
  if (totalAmount > 9) {
    totalAmount = "9+";
  }
  return totalAmount;
}

function adaptAttributesDependingOnScreenSize() {
  let basketRef = document.getElementById("mobileBasket");
  if (body.offsetWidth >= 1024) {
    basketRef.hidden = false;
    basketRef.classList.remove("openend");
  }
  else if (body.offsetWidth < 1024 && basketRef.hidden === false && basketRef.classList.contains("openend")){
    basketRef.hidden = false;
  }
  else{
    basketRef.hidden = true;
  }
}

// Order confirmation

function openDialog() {
  let dialogRef = document.getElementById("orderConfirmation");
  dialogRef.showModal();
}

function closeDialog() {
  let dialogRef = document.getElementById("orderConfirmation");
  dialogRef.close();
}

function resetQuantityForAllElements() {
  for (let categoryIndex = 0; categoryIndex < data.currentMenu.length; categoryIndex++) {
    for (let dishIndex = 0; dishIndex < data.currentMenu[categoryIndex].dishes.length; dishIndex++) {
      data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity = 0;
    }
  }
  renderMenu();
  renderBasket();
  saveToLocalStorage();
}
