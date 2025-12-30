
if (!localStorage.getItem("users")) {
  const users = [
    {
      username: "admin",
      password: "admin123",
      role: "admin"
    },
    {
      username: "user",
      password: "user123",
      role: "user"
    }
  ];
  localStorage.setItem("users", JSON.stringify(users));
}


if (!localStorage.getItem("currentUser")) {
  localStorage.setItem("currentUser", null);
}


if (!localStorage.getItem("candies")) {
  const candies = [
    {
      id: 1,
      name: "Chocolate Bar",
      price: 50,
      stock: 10,
      image: "images/chocolate.jpg",
      description: "Rich and creamy milk chocolate."
    },
    {
      id: 2,
      name: "Gummy Bears",
      price: 30,
      stock: 15,
      image: "images/gummy.jpg",
      description: "Colorful fruity gummy bears."
    },
    {
      id: 3,
      name: "Lollipop",
      price: 20,
      stock: 25,
      image: "images/lollipop.jpg",
      description: "Sweet and tangy lollipop."
    },
    {
      id: 4,
      name: "Candy Cane",
      price: 40,
      stock: 8,
      image: "images/candycane.jpg",
      description: "Classic peppermint candy cane."
    }
  ];

  localStorage.setItem("candies", JSON.stringify(candies));
}

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

if (!localStorage.getItem("orders")) {
  localStorage.setItem("orders", JSON.stringify([]));
}
