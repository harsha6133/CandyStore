function register() {
  const users = JSON.parse(localStorage.getItem("users"));
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (users.find(u => u.username === username)) {
    alert("User already exists");
    return;
  }

  users.push({ username, password, role: "user" });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered successfully");
  window.location.href = "login.html";
}

function login() {
  const users = JSON.parse(localStorage.getItem("users"));
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  if (user.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "index.html";
  }
}
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

