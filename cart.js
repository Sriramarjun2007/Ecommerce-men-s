let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {

    let cartContainer = document.getElementById("cart-container");
    let totalElement = document.getElementById("total");

    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h3>Your Cart is Empty</h3>";
        totalElement.innerText = "Total : ₹0";
        return;
    }

    cart.forEach(function(item) {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" 
                     alt="${item.name}" 
                     class="imageofproductcard">

                <h3>${item.name}</h3>

                <p>Price : ₹${item.price}</p>

                <div class="quantity-section">
                    <button onclick="decreaseQuantity(${item.id})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">
                        +
                    </button>
                </div>

                <p class="subtotal">Subtotal : ₹${item.price * item.quantity}</p>

                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>

            </div>
        `;
    });

    totalElement.innerText = `Total : ₹${total}`;
}

// Increase Quantity
function increaseQuantity(id) {

    let item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

// Decrease Quantity
function decreaseQuantity(id) {

    let item = cart.find(product => product.id === id);

    if (item && item.quantity > 1) {
        item.quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

// Remove Product
function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

// Load Cart
displayCart();
function closepopup() {
    window.location.href = "index.html";
}