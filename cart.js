// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Cart
function displayCart() {
    let cartContainer = document.getElementById("cart-container");
    let totalElement = document.getElementById("total");

    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.innerText = "Total : ₹0";
        return;
    }

    cart.forEach(function(item) {
        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price : ₹${item.price}</p>
                <p>Quantity : ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;
    });

    totalElement.innerText = `Total : ₹${total}`;
}

// Remove Item
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

// Load Cart When Page Opens
displayCart();