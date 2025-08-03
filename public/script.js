const mobileHamburger = document.getElementById("hamburger");
const mobileSidebar = document.getElementById("mobile-nav-sidebar");
const mobileSidebarMain = document.getElementById("sidebar-main");
const cross = document.getElementById("cross-button");

// const doc = document.querySelector("html");
// doc.addEventListener("click", (e) => {
//   console.log(e.target);
// });

mobileHamburger.addEventListener("click", () => {
  mobileSidebar.classList.remove("hidden");
  setTimeout(() => {
    mobileSidebar.classList.add("mnav-open");
  }, 10)
});
mobileSidebar.addEventListener("click", (e) => {
  if (!mobileSidebarMain.contains(e.target)) {
    mobileSidebar.classList.remove("mnav-open");
    setTimeout(() => {
      mobileSidebar.classList.add("hidden");
    }, 200);
  }
});
cross.addEventListener("click", (e) => {
  mobileSidebar.classList.remove("mnav-open");
  setTimeout(() => {
    mobileSidebar.classList.add("hidden");
  }, 200);
});

