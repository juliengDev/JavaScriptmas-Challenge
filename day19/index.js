import shoppingList from "./shoppingList.js";
/*
    You're shopping for holiday gifts, but money is tight
    so we need to consider the cheapest items first.
    Use JavaScript's built-in array sort() (or toSorted()) method to
    write a function that returns an array of products sorted 
    by price, cheapest to most expensive. 
    
    Log the sorted array to the console to double-check you
    solved it correctly.
*/

// Methode 1 

// function sortProducts(list){
//     return list.sort((a, b) => a.price - b.price);

// }

// const listByCheapest = sortProducts(shoppingList);

// console.log(listByCheapest);


    

let sortAscending = true;

function formatPrice(price) {
    return price === 0 ? 'Gratuit' : `${price.toFixed(2)} €`;
}

function renderProducts() {
    const sortedProducts = [...shoppingList].sort((a, b) => {
        return sortAscending ? a.price - b.price : b.price - a.price;
    });

    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    sortedProducts.forEach(item => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <div class="product-details">
                <span class="product-icon">${item.product}</span>
                <span class="product-price">${formatPrice(item.price)}</span>
            </div>
        `;
        productList.appendChild(productElement);
    });
}

function toggleSort() {
    sortAscending = !sortAscending;
    const button = document.querySelector('.sort-button');
    button.textContent = sortAscending ? '↑ Prix Croissant' : '↓ Prix Décroissant';
    renderProducts();
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.sort-button');
    button.addEventListener('click', toggleSort);
    
    renderProducts();
});



/**
 * Stretch goals:
 * 
 * 1. Log the items to the console in a more formatted way, 
 *    like this (one item per line):
 * 
 *    💕: $0
 *    🍬: $0.49
 *    🍫: $0.99
 *    🍭: $1.99
 *    🧁: $2.99
 *    ...etc.
 * 
 * 2. Create a UI for this by displaying the unsorted items first, then
 *    having a button that will sort the items on the page by price.
 */