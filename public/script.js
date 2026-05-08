function login(){

  const name =
    document.getElementById("name").value;

  const mobile =
    document.getElementById("mobile").value;

  if(name.trim() === ""){
    alert("Enter your name");
    return;
  }

  if(mobile.length < 10){
    alert("Enter valid mobile number");
    return;
  }

  localStorage.setItem(
    "customerName",
    name
  );

  localStorage.setItem(
    "customerMobile",
    mobile
  );

  window.location.href = "/";
}
let foods = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const foodList = document.getElementById("food-list");
const cartDiv = document.getElementById("cart");
const search = document.getElementById("search");

// LOAD MENU
function loadFoods() {
  fetch("/menu")
    .then(res => res.json())
    .then(data => {
      foods = data;
      displayFoods(foods);
    });
}

// DISPLAY FOOD
function displayFoods(items) {
  foodList.innerHTML = "";

  items.forEach(food => {
    foodList.innerHTML += `
      <div class="food-item">
        <div>
          <strong>${food.name}</strong><br>
          No. ${food.id}<br>

          <input 
            type="text" 
            placeholder="Customisation"
            id="custom-${food.id}"
          >
        </div>

        <div>
          ${food.price ? "₹" + food.price : "APS"}
          <button onclick="addToCart(${food.id})">+</button>
        </div>
      </div>
    `;
  });
}

// ADD TO CART
function addToCart(id) {
  const item = foods.find(f => f.id === id);
  const custom = document.getElementById(`custom-${id}`).value;

  const existing = cart.find(c => c.id === id && c.custom === custom);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...item,
      quantity: 1,
      custom
    });
  }

  saveCart();
  displayCart();
}

// REMOVE
function removeFromCart(id) {
  const item = cart.find(c => c.id === id);

  if (item.quantity > 1) item.quantity--;
  else cart = cart.filter(c => c.id !== id);

  saveCart();
  displayCart();
}

// SAVE
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// DISPLAY CART
function displayCart() {
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "Cart is empty";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    if(item.price){
  total += item.price * item.quantity;
}

    cartDiv.innerHTML += `
      <div>
        ${item.name} (x${item.quantity})<br>
        <small>${item.custom || ""}</small><br>
        ${item.price ? "₹" + (item.price * item.quantity) : "APS"}
        <button onclick="removeFromCart(${item.id})">-</button>
      </div>
    `;
  });

  cartDiv.innerHTML += `
    <h3>Total: ₹${total}</h3>
    <button onclick="checkout()">Checkout</button>
  `;
}

// CHECKOUT
function checkout() {

  const tableNo = document.getElementById("tableNo").value;

  if (!tableNo) {
    alert("Please enter table number");
    return;
  }

  fetch("/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
  name: localStorage.getItem("customerName"),
  mobile: localStorage.getItem("customerMobile"),
      table: tableNo,
      items: cart,
      time: new Date().toLocaleString()
    })
  })
  .then(() => {
    alert("Order placed!");

    cart = [];
    saveCart();
    displayCart();

    document.getElementById("tableNo").value = "";
  });
}

function logout(){

  localStorage.removeItem("customerMobile");

  window.location.href = "/login.html";
}

// SEARCH
search.addEventListener("input", function () {

  const text = search.value.toLowerCase().trim();

  const filteredFoods = foods.filter(food => {

    const fullName = food.name.toLowerCase();

    // normal search
    if (fullName.includes(text)) {
      return true;
    }

    // initials search
    const initials = food.name
      .split(" ")
      .map(word => word[0].toLowerCase())
      .join("");

    return initials.includes(text);

  });

  displayFoods(filteredFoods);

});

loadFoods();
displayCart();