// Products
let products = [
    {
        id: 1,
        name: "Comfy Fashionista Men Shirts",
        price: 335,
        image: "products/image1.avif"
    },
    {
        id: 2,
        name: "Slim Blazer",
        price: 2499
    }
];

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Products
function displayProducts() {
    let container = document.getElementById("product-container");

    if (!container) return;

    container.innerHTML = "";

    products.forEach(function(product) {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="addToCart(${product.id})">
                    Add To Cart
                </button>
            </div>
        `;
    });
}

// Add To Cart
function addToCart(id) {
    let product = products.find(item => item.id === id);

    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product added to cart!");
}

// Update Cart Count
function updateCartCount() {
    let countElement = document.getElementById("cart-count");

    if (!countElement) return;

    let totalItems = 0;

    cart.forEach(function(item) {
        totalItems += item.quantity;
    });

    countElement.innerText = totalItems;
}

// Initial Load
displayProducts();
updateCartCount();