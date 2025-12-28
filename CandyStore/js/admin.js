/* ================= AUTH GUARD ================= */
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "admin") {
  window.location.replace("login.html");
}


let candies = JSON.parse(localStorage.getItem("candies")) || [];
const adminCandiesDiv = document.getElementById("admin-candies");

const nameInput = document.getElementById("candy-name");
const priceInput = document.getElementById("price");
const stockInput = document.getElementById("stock");
const imageInput = document.getElementById("image");
const descInput = document.getElementById("desc");

function addCandy() {
  if (
    !nameInput.value ||
    !priceInput.value ||
    !stockInput.value ||
    !imageInput.value ||
    !descInput.value
  ) {
    alert("Please fill all fields");
    return;
  }

  const candy = {
    id: Date.now(),
    name: nameInput.value,
    price: Number(priceInput.value),
    stock: Number(stockInput.value),
    image: imageInput.value,
    description: descInput.value
  };

  candies.push(candy);
  saveCandies();


  nameInput.value =
    priceInput.value =
    stockInput.value =
    imageInput.value =
    descInput.value =
      "";

  renderCandies();
}


function removeCandy(index) {
  const confirmDelete = confirm(
    `Are you sure you want to remove "${candies[index].name}"?`
  );

  if (!confirmDelete) return;

  candies.splice(index, 1);
  saveCandies();
  renderCandies();
}

function refillStock(index) {
  candies[index].stock += 5;
  saveCandies();
  renderCandies();
}


function saveCandies() {
  localStorage.setItem("candies", JSON.stringify(candies));
}

/
function renderCandies() {
  adminCandiesDiv.innerHTML = "";

  if (candies.length === 0) {
    adminCandiesDiv.innerHTML = "<p>No candies available</p>";
    return;
  }

  candies.forEach((c, index) => {
    const div = document.createElement("div");
    div.className = "admin-item";

    div.innerHTML = `
      <span>
        <strong>${c.name}</strong> |
        ₹${c.price} |
        Stock: ${c.stock}
      </span>
      <div>
        <button onclick="refillStock(${index})">Refill +5</button>
        <button onclick="removeCandy(${index})" style="background:#ff4d4d">
          Remove
        </button>
      </div>
    `;

    adminCandiesDiv.appendChild(div);
  });
}


function logout() {
  localStorage.removeItem("currentUser");
  window.location.replace("login.html");
}

document
  .getElementById("logoutBtn")
  .addEventListener("click", logout);


renderCandies();
