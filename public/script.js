const customerMobile =
localStorage.getItem("customerMobile");

if(!customerMobile){

  window.location.href = "/login.html";

}

let foods = [];

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const foodList =
document.getElementById("food-list");

const cartDiv =
document.getElementById("cart");

const search =
document.getElementById("search");


// LOAD MENU

function loadFoods(){

  fetch("/menu")

  .then(res => res.json())

  .then(data => {

    foods = data;

    displayFoods(foods);

  });

}


// DISPLAY FOOD

function displayFoods(items){

  foodList.innerHTML = "";

  items.forEach(food => {

    foodList.innerHTML += `

    <div class="food-item">

      <div class="food-left">

        <div class="food-icon">
          🍽️
        </div>

        <div class="food-details">

          <strong>${food.name}</strong>

          <div class="food-no">
            No. ${food.id}
          </div>

          <div class="food-price">
            ${food.price ? "₹" + food.price : "APS"}
          </div>

          <input
          type="text"
          placeholder="Customisation"
          id="custom-${food.id}"
          >

        </div>

      </div>

      <button onclick="addToCart(${food.id})">
        +
      </button>

    </div>

    `;

  });

}


// ADD TO CART

function addToCart(id){

  const item =
  foods.find(f => f.id === id);

  const custom =
  document.getElementById(`custom-${id}`).value;

  const existing =
  cart.find(c =>
    c.id === id &&
    c.custom === custom
  );

  if(existing){

    existing.quantity++;

  }else{

    cart.push({

      ...item,

      quantity:1,

      custom

    });

  }

  saveCart();

  displayCart();

}


// REMOVE ITEM

function removeFromCart(id){

  const item =
  cart.find(c => c.id === id);

  if(item.quantity > 1){

    item.quantity--;

  }else{

    cart =
    cart.filter(c => c.id !== id);

  }

  saveCart();

  displayCart();

}


// SAVE CART

function saveCart(){

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}


// DISPLAY CART

function displayCart(){

  cartDiv.innerHTML = "";

  if(cart.length === 0){

    cartDiv.innerHTML =
    "Cart is empty";

    document
    .getElementById("cart-count")
    .innerText = 0;

    return;

  }

  let total = 0;

  cart.forEach(item => {

    if(item.price){

      total +=
      item.price * item.quantity;

    }

    cartDiv.innerHTML += `

    <div class="cart-item">

      <div>

        ${item.name} (x${item.quantity})<br>

        <small>
        ${item.custom || ""}
        </small><br>

        ${item.price
          ? "₹" + (item.price * item.quantity)
          : "APS"}

      </div>

      <button onclick="removeFromCart(${item.id})">
        -
      </button>

    </div>

    `;

  });

  cartDiv.innerHTML += `

  <div class="cart-total">

    Total: ₹${total}

  </div>

  `;

  document
  .getElementById("cart-count")
  .innerText = cart.length;

}


// CHECKOUT

function checkout(){

  const tableNo =
  document.getElementById("tableNo").value;

  if(!tableNo){

    alert("Please enter table number");

    return;

  }

  fetch("/order", {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({

      name:
      localStorage.getItem("customerName"),

      mobile:
      localStorage.getItem("customerMobile"),

      table:tableNo,

      items:cart,

      time:new Date().toLocaleString()

    })

  })

  .then(() => {

    alert("Order placed!");

    cart = [];

    saveCart();

    displayCart();

    document
    .getElementById("tableNo")
    .value = "";

    toggleCart();

  });

}


// SEARCH

search.addEventListener("input", function(){

  const text =
  search.value
  .toLowerCase()
  .trim();

  const filteredFoods =
  foods.filter(food => {

    const fullName =
    food.name.toLowerCase();

    if(fullName.includes(text)){

      return true;

    }

    const initials =
    food.name

    .split(" ")

    .map(word =>
      word[0].toLowerCase()
    )

    .join("");

    return initials.includes(text);

  });

  displayFoods(filteredFoods);

});


// CATEGORY FILTERS

document
.querySelectorAll(".cat")

.forEach(btn => {

  btn.addEventListener("click", () => {

    document

    .querySelectorAll(".cat")

    .forEach(c =>
      c.classList.remove("active")
    );

    btn.classList.add("active");

    const text =
    btn.innerText.toLowerCase();

    if(text === "all"){

      displayFoods(foods);

      return;

    }

    const filtered =
    foods.filter(food =>

      food.name
      .toLowerCase()
      .includes(text)

    );

    displayFoods(filtered);

  });

});


// TOGGLE CART

function toggleCart(){

  document

  .getElementById("cartBox")

  .classList

  .toggle("show-cart");

}

function clearCart(){

  cart = [];

  saveCart();

  displayCart();

}


// CLEAR CART

function clearCart(){

  cart = [];

  saveCart();

  displayCart();

}


// LOGOUT

function logout(){

  localStorage.removeItem("customerMobile");

  localStorage.removeItem("customerName");

  window.location.href =
  "/login.html";

}


// START

loadFoods();

displayCart();