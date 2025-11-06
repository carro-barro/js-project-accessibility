document.body.classList.toggle("js-enabled")

document.addEventListener("DOMContentLoaded", () => {

  // hamburger menu

  const hamburger = document.getElementById("hamburger")
  const hamMenuList = document.getElementById("hamMenuList")
  const hamMenuItems = document.querySelectorAll(".menu-item")
  let trapEnabled = false

  hamburger.setAttribute("aria-expanded", "false")
  hamMenuList.setAttribute("aria-hidden", "true")
  hamMenuList.classList.remove("show")

  hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true"
    const opening = !expanded

    hamburger.setAttribute("aria-expanded", String(opening))
    hamMenuList.setAttribute("aria-hidden", expanded ? "true" : "false")
    hamMenuList.classList.toggle("show", opening)
    hamburger.classList.toggle("active", opening)

    if (opening) {
      trapEnabled = true
      hamMenuItems[0].focus()
      document.addEventListener("keydown", trapFocus)
    } else {
      trapEnabled = false
      document.removeEventListener("keydown", trapFocus)
    }
  })

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
      hamMenuList.classList.remove("show")
      hamburger.classList.remove("active")
      hamburger.focus()

      trapEnabled = false
      document.removeEventListener("keydown", trapFocus)
    }
  })

  //hamburger trap

  function trapFocus(e) {
    const first = hamMenuItems[0]
    const last = hamMenuItems[hamMenuItems.length - 1]

    if (e.key === "Tab" && !e.shiftKey) {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    if (e.key === "Tab" && e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    }
  }

})


