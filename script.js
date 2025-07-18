// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ✅ Load cart from sessionStorage OR start with empty array
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// ✅ Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // ✅ Add event listeners to all "Add to Cart" buttons
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// ✅ Render cart list from the `cart` array
function renderCart() {
  cartList.innerHTML = ""; // Clear previous cart

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ✅ Add item to cart & save to sessionStorage
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart)); // Save to sessionStorage
    renderCart();
  }
}

// ✅ Clear cart and sessionStorage
function clearCart() {
  cart = []; // Clear in-memory
  sessionStorage.removeItem("cart"); // Clear session storage
  renderCart(); // Update UI
}

// ✅ Event listener for "Clear Cart" button
clearCartBtn.addEventListener("click", clearCart);

// ✅ Initial render
renderProducts();
renderCart();
