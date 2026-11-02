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

function getDish(categoryIndex, dishIndex, btnText) {
  return `    <li>
                <section class="dish-card">
                    <div class="dish-card-image-wrapper">
                        <img src="./assets/img/${data.currentMenu[categoryIndex].dishes[dishIndex].dishImg}" alt="${data.currentMenu[categoryIndex].dishes[dishIndex].dishImgAlt}">
                    </div>
                    <div class="dish-content-styling-container">
                    <div class="dish-information-wrapper">
                        <h3 class="dish-card-dish-name">${data.currentMenu[categoryIndex].dishes[dishIndex].dishName}</h3>
                        <p class="dish-card-ingredients">${data.currentMenu[categoryIndex].dishes[dishIndex].dishIngredients}</p>
                    </div>
                    <div class="dish-card-purchase-wrapper">
                        <p class="dish-card-price">${data.currentMenu[categoryIndex].dishes[dishIndex].dishPrice.toFixed(2)}€</p>
                        <button onclick="changeArticleQuantity(${categoryIndex}, ${dishIndex}, +1), renderDishElementOnChange(${categoryIndex}, ${dishIndex})" 
                        class="dish-card-btn ${data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity > 0 ? 'highlight-btn-text' : ""}">${btnText}</button>
                    </div>
                    </div>
                </section>
            </li>`;
}


function getBasketArticle(categoryIndex, dishIndex, dishSum, isHiddenOnQuantityOne) {
return `<li class="basket-article" onclick="renderDishElementOnChange(${categoryIndex}, ${dishIndex})">
            <div class="basket-article-styling-container">
                <p>${data.currentMenu[categoryIndex].dishes[dishIndex].dishName}</p>
                <button onclick="changeArticleQuantityToZero(${categoryIndex}, ${dishIndex})" ${isHiddenOnQuantityOne ? 'hidden' : ""} class="delete-btn"></button>
            </div>
            <div class="basket-article-styling-container">
                <div class="article-quantity-menu">
                    <button onclick="changeArticleQuantityToZero(${categoryIndex}, ${dishIndex})" ${isHiddenOnQuantityOne ? "" : 'hidden'} class="delete-btn"></button>
                    <button onclick="changeArticleQuantity(${categoryIndex}, ${dishIndex}, -1)" ${isHiddenOnQuantityOne ? 'hidden' : ""}><p>-</p></button>
                    <p class="article-quantity">${data.currentMenu[categoryIndex].dishes[dishIndex].dishBasketQuantity}</p>
                    <button onclick="changeArticleQuantity(${categoryIndex}, ${dishIndex}, +1)"><p>+</p></button>
                </div>
                <p class="article-sum">${dishSum.toFixed(2)}€</p>
            </div>
        </li>`
}

function getBasket() {
    return `<div class="basket-styling-wrapper"><section ${document.body.offsetWidth >= 1024 ? "" : 'hidden'} id="mobileBasket" class="basket">
            <button onclick="toggleBasket()" class="close-btn"><img src="./assets/icons/close.svg"
                    alt="close icon"></button>
            <h2>Your Basket</h2>
            <div class="basket-styling-container">
                <div id="emptyBasketStyling" class="empty-basket-styling">
                    <p>Nothing here yet. <br> Go ahead and choose something delicious!</p>
                    <img src="./assets/icons/shopping_cart_beige.svg" alt="shopping cart icon">
                </div>
                <ul id="listOfBasketArticles" class="list-of-basket-articles">
                </ul>
                <table id="pricingTable" class="pricing-table">
                    <tbody>
                        <tr>
                            <td class="position-text">Subtotal</td>
                            <td id="subtotalSum" class="price-text">23.10€</td>
                        </tr>
                        <tr>
                            <td class="position-text">Delivery fee</td>
                            <td id="deliveryFee" class="price-text">4.90€</td>
                        </tr>
                        <tr>
                            <td class="position-text table-total">Total</td>
                            <td id="totalSum" class="price-text table-total"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button id="basketBuyButton" class="basket-btn" onclick="openDialog(), resetQuantityForAllElements()">Buy
                now</button>
        </section></div>`
}