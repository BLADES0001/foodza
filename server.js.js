const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

// homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================= MENU =================

let menu = [];

if (fs.existsSync("menu.json")) {

  const data = fs.readFileSync("menu.json");

  menu = JSON.parse(data);

}

// get menu
app.get("/menu", (req, res) => {
  res.json(menu);
});

// delete item
app.post("/delete-item/:id", (req, res) => {

  const id = Number(req.params.id);

  menu = menu.filter(item => item.id !== id);

  fs.writeFileSync(
    "menu.json",
    JSON.stringify(menu, null, 2)
  );

  res.send("Deleted");

});

// add item
app.post("/add-item", (req, res) => {

  const newItem = {
    id: Date.now(),
    name: req.body.name,
    price: Number(req.body.price)
  };

  menu.push(newItem);

  fs.writeFileSync(
    "menu.json",
    JSON.stringify(menu, null, 2)
  );

  res.send("Item added");

});

// ================= ORDERS =================

let orders = [];
let completedOrders = [];

// LOAD SAVED ORDERS

if (fs.existsSync("orders.json")) {
  orders = JSON.parse(fs.readFileSync("orders.json"));
}

if (fs.existsSync("completedOrders.json")) {
  completedOrders = JSON.parse(
    fs.readFileSync("completedOrders.json")
  );
}

// receive order
app.post("/order", (req, res) => {

  const order = {
    ...req.body,
    createdAt: Date.now()
  };

  orders.push(order);

  fs.writeFileSync(
    "orders.json",
    JSON.stringify(orders, null, 2)
  );

  console.log("New Order:", order);

  res.send("Order received");

});

// mark order done
app.post("/done/:id", (req, res) => {

  const index = req.params.id;

  const completed = orders[index];

  completed.completedAt = Date.now();

  completedOrders.push(completed);

  orders.splice(index, 1);

  fs.writeFileSync(
    "orders.json",
    JSON.stringify(orders, null, 2)
  );

  fs.writeFileSync(
    "completedOrders.json",
    JSON.stringify(completedOrders, null, 2)
  );

  res.send("Done");

});

// ================= ADMIN PANEL =================

app.get("/admin", (req, res) => {

  let html = `
    <h1>Admin Panel</h1>

    <input id="search" placeholder="Search food">
    <br><br>

    Name:
    <input id="name">

    Price:
    <input id="price">

    <button onclick="addItem()">Add Item</button>

    <hr>

    <div id="menu"></div>

    <script>

      let foods = [];

      function loadMenu() {

        fetch('/menu')
          .then(res => res.json())
          .then(data => {

            foods = data;
            showFoods(data);

          });

      }

      function showFoods(items) {

        document.getElementById('menu').innerHTML =

          items.map(item => \`

            <div style="
              margin-bottom:10px;
              border:1px solid black;
              padding:10px;
              border-radius:10px;
            ">

              <b>\${item.name}</b><br>
              ₹\${item.price}<br>
              ID: \${item.id}<br><br>

              <button onclick="deleteItem(\${item.id})">
                Delete
              </button>

            </div>

          \`).join("");

      }

      function addItem() {

        fetch('/add-item', {

          method:'POST',

          headers:{
            'Content-Type':'application/json'
          },

          body: JSON.stringify({
            name: document.getElementById('name').value,
            price: document.getElementById('price').value
          })

        })
        .then(() => {

          document.getElementById('name').value = "";
          document.getElementById('price').value = "";

          loadMenu();

        });

      }

      function deleteItem(id) {

        fetch('/delete-item/' + id, {
          method:'POST'
        })
        .then(() => {
          loadMenu();
        });

      }

      document.getElementById('search')
        .addEventListener('input', function() {

          const text = this.value.toLowerCase();

          const filtered = foods.filter(food =>
            food.name.toLowerCase().includes(text)
          );

          showFoods(filtered);

      });

      loadMenu();

    </script>
  `;

  res.send(html);

});

// ================= ORDERS PAGE =================

app.get("/orders", (req, res) => {

let html = `
<html>

<head>

<title>Orders</title>

<style>

body{
  font-family:Arial;
  background:#f2f2f2;
  margin:0;
  padding:20px;
}

.container{
  display:flex;
  gap:20px;
}

.column{
  flex:1;
}

h1{
  text-align:center;
}

.order{
  background:white;
  padding:15px;
  margin-bottom:15px;
  border-radius:10px;
  box-shadow:0 0 10px rgba(0,0,0,0.1);
}

.done{
  background:green;
  color:white;
  border:none;
  padding:10px 15px;
  border-radius:5px;
  cursor:pointer;
}

.completed{
  border-left:8px solid green;
}

.tick{
  color:green;
  font-size:25px;
  font-weight:bold;
}

</style>

</head>

<body>

<h1>🍔 Foodza Orders</h1>

<div class="container">

<div class="column">

<h2>🟠 Current Orders</h2>
`;

orders.forEach((order, index) => {

let total = 0;

let itemsHTML = order.items.map(item => {

total += item.price * item.quantity;

return `
<div>
${item.name} x${item.quantity}<br>
<small>${item.custom || ""}</small><br>
₹${item.price * item.quantity}
</div><br>
`;

}).join("");

html += `

<div class="order">

<b>Name:</b> ${order.name || "No Name"}<br>
<b>Mobile:</b> ${order.mobile || "No Mobile"}<br>
<b>Table:</b> ${order.table}<br>
<b>Time:</b> ${order.time}<br><br>

${itemsHTML}

<h3>Total: ₹${total}</h3>

<button
class="done"
onclick="markDone(${index})">
Done
</button>

</div>
`;

});

html += `
</div>

<div class="column">

<h2>✅ Completed Orders</h2>
`;

completedOrders.forEach(order => {

let total = 0;

let itemsHTML = order.items.map(item => {

total += item.price * item.quantity;

return `
<div>
${item.name} x${item.quantity}<br>
₹${item.price * item.quantity}
</div><br>
`;

}).join("");

html += `

<div class="order completed">

<div class="tick">✅ Completed</div><br>

<b>Name:</b> ${order.name || "No Name"}<br>
<b>Mobile:</b> ${order.mobile || "No Mobile"}<br>
<b>Table:</b> ${order.table}<br>
<b>Time:</b> ${order.time}<br><br>

${itemsHTML}

<h3>Total: ₹${total}</h3>

</div>
`;

});

html += `

</div>
</div>

<script>

function markDone(index){

fetch("/done/" + index,{
method:"POST"
})
.then(()=>{
location.reload();
});

}

setInterval(()=>{
location.reload();
},3000);

</script>

</body>
</html>
`;

res.send(html);

});
// AUTO DELETE AFTER 48 HOURS

setInterval(() => {

  const now = Date.now();

  completedOrders = completedOrders.filter(order => {

    const hours48 =
      48 * 60 * 60 * 1000;

    return now - order.completedAt < hours48;

  });

  fs.writeFileSync(
    "completedOrders.json",
    JSON.stringify(completedOrders, null, 2)
  );

}, 60000);
// ================= START =================

app.listen(3000, () => {

  console.log("Server running on http://localhost:3000");

});