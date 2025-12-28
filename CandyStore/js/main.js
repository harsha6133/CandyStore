const candyList = document.getElementById("candy-list");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

function displayCandies(list) {
  candyList.innerHTML = "";

  list.forEach(candy => {
    const div = document.createElement("div");
    div.className = "candy";

    const outOfStock = candy.stock <= 0;

    div.innerHTML = `
      <img src="${candy.image}">
      <h3>${candy.name}</h3>
      <p>₹${candy.price}</p>
      <p style="font-size:13px; color:${outOfStock ? 'red' : '#555'}">
        ${outOfStock ? 'Out of stock' : `Stock: ${candy.stock}`}
      </p>
      <button 
        ${outOfStock ? 'disabled' : ''} 
        onclick="viewDetails(${candy.id})">
        ${outOfStock ? 'Unavailable' : 'View'}
      </button>
    `;

    candyList.appendChild(div);
  });
}


const candies = JSON.parse(localStorage.getItem("candies"));
displayCandies(candies);


search.addEventListener("input", () => {
  const value = search.value.toLowerCase();

  const candies = JSON.parse(localStorage.getItem("candies")) || [];

  const filtered = candies.filter(c =>
    c.name.toLowerCase().includes(value)
  );

  displayCandies(filtered);
});


filter.addEventListener("change", () => {
  const candies = JSON.parse(localStorage.getItem("candies")) || [];
  let filtered;

  if (filter.value === "low") {
    filtered = candies.filter(c => c.price < 30);
  } else if (filter.value === "high") {
    filtered = candies.filter(c => c.price >= 30);
  } else {
    filtered = candies;
  }

  displayCandies(filtered);
});


function viewDetails(id) {
  localStorage.setItem("selectedCandy", id);
  window.location.href = "details.html";
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countEl = document.getElementById("cart-count");

  if (!countEl) return;

  countEl.innerText = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );
}

updateCartCount();

function logout() {
  localStorage.removeItem("currentUser");
  window.location.replace("login.html");
}
document.getElementById("logoutBtn").addEventListener("click", logout);

