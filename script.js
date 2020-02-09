const menuBtn = document.querySelector(".main__menu__btn")
const mainMenu = document.querySelector(".main__menu")
const overlay = document.querySelector(".overlay")
const container = document.querySelector(".container")
const closeMenuBtn = document.querySelector(".close__menu")

const handleOverflow = () => {
      if(container.style.overflow === "hidden"){
            container.style.overflow = ""
            container.style.maxHeight = ""
      } else {
            container.style.overflow = "hidden"
            container.style.maxHeight = "100vh"
      }
}

const openMenu = () => {
      menuBtn.setAttribute("aria-label", "Close menu")
      menuBtn.setAttribute("aria-expanded", true)
      mainMenu.style.transform = "translateX(0)"
      mainMenu.setAttribute("aria-hidden", false)
      overlay.style.display = "block"
      handleOverflow()
}

const closeMenu = () => {
      menuBtn.setAttribute("aria-label", "Open menu")
      menuBtn.setAttribute("aria-expanded", false)
      mainMenu.style.transform = "translateX(-100%)"
      mainMenu.setAttribute("aria-hidden", true)
      overlay.style.display = "none"
      handleOverflow()
}

overlay.addEventListener("click", () => {
      closeMenu()
})

closeMenuBtn.addEventListener("click", () => {
      closeMenu()
})

menuBtn.addEventListener("click", e => {
      if (menuBtn.getAttribute("aria-label") === "Open menu") {
            openMenu()
      } else {
            closeMenu()
      }
})

const dropdownSelectBtn = document.querySelector(".select__active")
const optionsList = document.querySelector(".options__list")
const arrow = document.querySelector(".arrow")
const options = document.querySelectorAll(".option")

const expandList = () => {
      optionsList.style.height = "200px"
      optionsList.setAttribute("aria-hidden", false)
      dropdownSelectBtn.setAttribute("aria-expanded", true)
      dropdownSelectBtn.setAttribute("aria-label", "Close list")
      arrow.style.transform = "rotate(270deg) scale(.7)"
      options.forEach(option => {
            option.tabIndex = 0
      })
}

const closeList = () => {
      optionsList.style.height = "0"
      optionsList.setAttribute("aria-hidden", true)
      dropdownSelectBtn.setAttribute("aria-expanded", false)
      dropdownSelectBtn.setAttribute("aria-label", "Expand list")
      arrow.style.transform = "rotate(90deg) scale(.7)"
      options.forEach(option => {
            option.tabIndex = -1
      })
}

document.addEventListener("click", () => {
      if(dropdownSelectBtn.getAttribute("aria-expanded")) {
            closeList()
      }
}, true)

options[options.length - 1].addEventListener("focusout", () => {
      closeList()
})

dropdownSelectBtn.addEventListener("click", () => {
      if (dropdownSelectBtn.getAttribute("aria-label") === "Expand list") {
            expandList()
      } else {
            closeList()
      }
})

dropdownSelectBtn.addEventListener("keypress", e => {
      if (dropdownSelectBtn.getAttribute("aria-label") === "Expand list" && (e.keyCode === 13 || e.keyCode === 32)) {
            expandList()
      } else {
            closeList()
      }
})

const closeListAndSetFocus = option => {
      dropdownSelectBtn.querySelector(".selected").innerText = option.innerText
      closeList()
      dropdownSelectBtn.focus()
}

options.forEach(option => {
      option.addEventListener("click", () => {
            closeListAndSetFocus(option)
      })
      option.addEventListener("keypress", e => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                  closeListAndSetFocus(option)
            }
      })
})
