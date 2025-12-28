
const id = Number(localStorage.getItem("selectedCandy"));
const candies = JSON.parse(localStorage.getItem("candies")) || [];
const candy = candies.find(c => c.id === id);

if (!candy) {
  alert("Candy not found");
  window.location.href = "index.html";
}

document.getElementById("name").innerText = candy.name;
document.getElementById("image").src = candy.image;
document.getElementById("desc").innerText = candy.description;
document.getElementById("price").innerText = "₹" + candy.price;

function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (candy.stock <= 0) {
    alert("Out of stock!");
    return;
  }

  const item = cart.find(i => i.id === candy.id);

  if (item) {
    if (item.qty >= candy.stock) {
      alert("No more stock available");
      return;
    }
    item.qty++;
  } else {
    cart.push({ ...candy, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}
