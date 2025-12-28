let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartDiv = document.getElementById("cart-items");

function renderCart() {
  cartDiv.innerHTML = "";
  let total = 0;

  const candies = JSON.parse(localStorage.getItem("candies")) || [];

  cart.forEach((item, index) => {
    const candy = candies.find(c => c.id === item.id);
    const availableStock = candy ? candy.stock : 0;

    total += item.price * item.qty;

    cartDiv.innerHTML += `
      <div class="cart-item">
        <p>${item.name} - ₹${item.price}</p>

        <button onclick="changeQty(${index}, -1)">-</button>
        <strong>${item.qty}</strong>
        <button 
          onclick="changeQty(${index}, 1)" 
          ${item.qty >= availableStock ? "disabled" : ""}>
          +
        </button>

        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function changeQty(index, delta) {
  const candies = JSON.parse(localStorage.getItem("candies")) || [];
  const candy = candies.find(c => c.id === cart[index].id);

  if (delta === 1 && cart[index].qty >= candy.stock) {
    alert("No more stock available");
    return;
  }

  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function purchase() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Please login to continue");
    window.location.href = "login.html";
    return;
  }

  const candies = JSON.parse(localStorage.getItem("candies")) || [];
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  for (let item of cart) {
    const candy = candies.find(c => c.id === item.id);
    if (!candy || candy.stock < item.qty) {
      alert(`Insufficient stock for ${item.name}`);
      return;
    }
  }

  cart.forEach(item => {
    const candy = candies.find(c => c.id === item.id);
    candy.stock -= item.qty;
  });

  orders.push({
    orderId: Date.now(),
    user: user.username,
    items: cart,
    total: cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    date: new Date().toLocaleString()
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("candies", JSON.stringify(candies));
  localStorage.removeItem("cart");

  window.location.href = "purchased.html";
}

renderCart();

function logout() {
  localStorage.removeItem("currentUser");
  window.location.replace("login.html");
}
document.getElementById("logoutBtn").addEventListener("click", logout);
