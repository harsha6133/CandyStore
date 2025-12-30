(function () {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const publicPages = ["login.html", "register.html"];

  const currentPage = window.location.pathname.split("/").pop();

  if (!user && !publicPages.includes(currentPage)) {
    window.location.href = "login.html";
  }

  if (user && publicPages.includes(currentPage)) {
    if (user.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  }
})();
