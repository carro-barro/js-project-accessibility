document.body.classList.toggle("js-enabled")

document.addEventListener("DOMContentLoaded", () => {

  // hamburger menu

  const hamburger = document.getElementById("hamburger")
  const hamMenuList = document.getElementById("hamMenuList")

  hamburger.setAttribute("aria-expanded", "false")
  hamMenuList.setAttribute("aria-hidden", "true")
  hamMenuList.classList.remove("show")

  hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true"
    hamburger.setAttribute("aria-expanded", String(!expanded))
    hamMenuList.setAttribute("aria-hidden", expanded ? "true" : "false")
    hamMenuList.classList.toggle("show", !expanded)

    hamburger.classList.toggle("active", !expanded)
  })

  const hamMenuItems = document.querySelectorAll(".menu-item")
  hamMenuItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.setAttribute("aria-expanded", "false")
      hamMenuList.setAttribute("aria-hidden", "true")
      hamMenuItems.classList.remove("show")

      hamburger.classList.remove("active")
    })
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hamburger.setAttribute("aria-expanded", "false")
      hamMenuList.setAttribute("aria-hidden", "true")
      hamMenuItems.classList.remove("show")
      hamburger.focus()

      hamburger.classList.remove("active")
      hamburger.focus()
    }
  })

})


