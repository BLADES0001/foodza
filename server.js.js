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

// add item
app.post("/delete-item/:id", (req, res) => {
  const id = Number(req.params.id);

  menu = menu.filter(item => item.id !== id);


  fs.writeFileSync(
  "menu.json",
  JSON.stringify(menu, null, 2)
);

  res.send("Deleted");
});
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

// receive order
app.post("/order", (req, res) => {
  orders.push(req.body);
  console.log("New Order:", req.body);
  res.send("Order received");
});

// mark order done
app.post("/done/:id", (req, res) => {
  const id = req.params.id;
  orders.splice(id, 1);
  res.send("Removed");
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
            <div style="margin-bottom:10px; border:1px solid black; padding:10px;">

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
  let html = "<h1>📦 Orders</h1>";

  orders.forEach((order, index) => {
    let total = 0;

    let itemsHTML = order.items.map(item => {
      total += item.price * item.quantity;

      return `
        <div>
          ${item.name} x${item.quantity}<br>
          <small>${item.custom || ""}</small><br>
          ₹${item.price * item.quantity}
        </div>
      `;
    }).join("<br>");

    html += `
      <div style="border:1px solid black; padding:10px; margin:10px;">
        <b>Table:</b> ${order.table}<br>
<b>Time:</b> ${order.time}<br><br>
        ${itemsHTML}
        <h3>Total: ₹${total}</h3>
        <button onclick="done(${index})">Done</button>
      </div>
    `;
  });

  html += `
    <script>
      function done(id) {
        fetch('/done/' + id, { method: 'POST' })
          .then(() => location.reload());
      }

      // 🔄 auto refresh orders every 3 sec
setInterval(() => {
  location.reload();
}, 3000);

    </script>
  `;

  res.send(html);
});

// ================= START =================

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});