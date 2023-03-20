const lengthSlider = document.querySelector(".pass-length input")
const options = document.querySelectorAll(".option input")
const copyIcon = document.querySelector(".input-box span")
const passwordInput = document.querySelector(".input-box input")
const passIndicator = document.querySelector(".pass-indicator")
const generateBtn = document.querySelector(".generate-btn")

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[]{}():;.,*/-+#@<>"
}

const generatePassword = () => {
    let staticPassword = "",
        ramdomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach(options => {
        if (options.checked) {
            if (options.id !== "exc-duplicate" && options.id !== "spaces") {
                staticPassword += characters[options.id]
            } else if (options.id === "spaces") {
                staticPassword += `  ${staticPassword}  `
            } else {
                excludeDuplicate = true
            }
        }
    })

    for (let i = 0; i < passLength; i++) {
        let ramdomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
        if (excludeDuplicate) {
            !ramdomPassword.includes(ramdomChar) | ramdomChar == " " ? ramdomPassword += ramdomChar : i--
        } else {
            ramdomPassword += ramdomChar
        }
    }
    passwordInput.value = ramdomPassword
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong"
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value
    generatePassword()
    updatePassIndicator()
}
updateSlider()

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value)
    copyIcon.innerText = "check"
    copyIcon.style.color = "#4285f4"
    setTimeout(() => {
        copyIcon.innerText = "copy_all"
        copyIcon.style.color = "#707070"
    }, 1500)
}

copyIcon.addEventListener("click", copyPassword)
lengthSlider.addEventListener("input", updateSlider)
generateBtn.addEventListener("click", generatePassword)