// Load Products from localStorage
let products = JSON.parse(localStorage.getItem("products")) || [
    {
        id: 1,
        name: "Comfy Fashionista Men Shirts",
        price: 335,
        image: "products/image1.avif",
        rating: "★★★★☆"
    }
];

// Load Cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Products
function displayProducts() {
    let container = document.getElementById("product-container");

    if (!container) return;

    container.innerHTML = "";

    products.forEach(function(product) {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name} ">
                <p class="starrating">${product.rating}</p>
                <h3>${product.name}</h3>
                <p class="price">₹${product.price}</p>
                <button class="addtocartbutton" onclick="addToCart(${product.id})">
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

// Open Modal
function openModal() {
    document.getElementById("popup").style.display = "block";
}

// Close Modal
function closeModal() {
    document.getElementById("popup").style.display = "none";
}

// Add New Product
function addNewProduct() {

    let fileInput = document.getElementById("productImage");
    let file = fileInput.files[0];

    let name = document.getElementById("productName").value;
    let rating = document.getElementById("productRating").value;
    let price = document.getElementById("productPrice").value;

    if (!file || !name || !rating || !price) {
        alert("Please fill all fields");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e) {

        let newProduct = {
            id: products.length + 1,
            image: e.target.result,
            name: name,
            rating: rating,
            price: Number(price)
        };

        products.push(newProduct);

        // Save Products
        localStorage.setItem("products", JSON.stringify(products));

        displayProducts();

        closeModal();

        document.getElementById("productImage").value = "";
        document.getElementById("productName").value = "";
        document.getElementById("productRating").value = "";
        document.getElementById("productPrice").value = "";
    };

    reader.readAsDataURL(file);
}

// Initial Load
displayProducts();
updateCartCount();