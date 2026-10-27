function getDishCategory(header, dishes) {
  return `<section class="dish-category">
            ${header}
                <ul class="dishes-of-category">
                    ${dishes}
                </ul>
            </section>`;
}

function getCategoryHeader(index) {
  return `      <header class="dish-category-header">
                    <img src="./assets/icons/${data.currentMenu[index].dishCategoryImg}" alt="${data.currentMenu[index].dishCategoryImgAlt}">
                    <h2 class="category-name">${data.currentMenu[index].dishCategoryName}</h2>
                </header>`;
}

function getDish(categoryIndex, dishIndex) {
  return `    <li>
                <section class="dish-card">
                    <div class="dish-card-image-wrapper">
                        <img src="./assets/img/${data.currentMenu[categoryIndex].dishes[dishIndex].dishImg}" alt="${data.currentMenu[categoryIndex].dishes[dishIndex].dishImgAlt}">
                    </div>
                    <div class="dish-information-wrapper">
                        <h3 class="dish-card-dish-name">${data.currentMenu[categoryIndex].dishes[dishIndex].dishName}</h3>
                        <p class="dish-card-ingredients">${data.currentMenu[categoryIndex].dishes[dishIndex].dishIngredients}</p>
                    </div>
                    <div class="dish-card-purchase-wrapper">
                        <p class="dish-card-price">${data.currentMenu[categoryIndex].dishes[dishIndex].dishPrice.toFixed(2)}€</p>
                        <button onclick="changeArticleQuantity(${categoryIndex}, ${dishIndex}, +1)" class="dish-card-btn">Add to basket</button>
                    </div>
                </section>
            </li>`;
}


function getBasketArticle(categoryIndex, dishIndex) {
return `<li class="basket-article">
            <div class="basket-article-styling-container">
                <p>${data.currentMenu[categoryIndex].dishes[dishIndex].dishName}</p>
                <button onclick="changeArticleQuantityToZero(${categoryIndex}, ${dishIndex})"><img src="./assets/icons/delete.svg" alt="trash can icon"></button>
            </div>
            <div class="basket-article-styling-container">
                <div class="article-quantity-menu">
                    <button onclick="changeArticleQuantity(${categoryIndex}, ${dishIndex}, -1)"><p>-</p></button>
                    <p class="article-quantity">${data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity}</p>
                    <button onclick="changeArticleQuantity(${categoryIndex}, ${dishIndex}, +1)"><p>+</p></button>
                </div>
                <p class="article-sum">23.80€</p>
            </div>
        </li>`
}