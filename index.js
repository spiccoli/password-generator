function GeneratePassword() {
    let inputPassLength = document.getElementById("passlength").value;
    const passLength = parseInt(inputPassLength);
    document.getElementById("passlength").value = passLength; // Just a detail to see the parsed number inside the textbox

    let includeLowerCase = document.getElementById("lowerCaseCheck");
    let includeUpperCase = document.getElementById("upperCaseCheck");
    let includeNumbers = document.getElementById("numbersCheck");
    let includeSymbols = document.getElementById("symbolsCheck");

    if(!includeLowerCase.checked) includeLowerCase = false;
    if(!includeUpperCase.checked) includeUpperCase = false;
    if(!includeNumbers.checked) includeNumbers = false;
    if(!includeSymbols.checked) includeSymbols = false;



    let allowedCharacters = ""; // Characters that the generator could use
    if (passLength > 128) {
        const confirmation = window.confirm("Generating a password longer than 128 characters can be risky and not optimal. Do you want to proceed?");
        if (!confirmation) {
            // User clicked "Cancel," so stop the function
            return;
        }
    }
    
    if (passLength < 1) {
        document.getElementById("password-output").textContent = "Password must be greater than 1";
        return;
    }

    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = "!'()*+,-./:;$<=>?@[\]^_%`{|}~&";
    const numbers = "0123456789";

    if (includeLowerCase) allowedCharacters += lowerCase;
    if (includeUpperCase) allowedCharacters += upperCase;
    if (includeNumbers) allowedCharacters += numbers;
    if (includeSymbols) allowedCharacters += symbols;

    let generatedPassword = "";
    for (let i = 0; i < passLength; i++) {
        const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
        generatedPassword += allowedCharacters[randomIndex];
    }
    
    document.getElementById("password-output").textContent = generatedPassword;
}

function CopyToClipboard() {
    const passwordOutput = document.getElementById("password-output");
    const range = document.createRange();
    range.selectNode(passwordOutput);
    window.getSelection().removeAllRanges(); // Clear any existing selection
    window.getSelection().addRange(range);

    if (passwordOutput.textContent === "") {
        console.log("Error: Password must be generated first");
        return;
    }

    try {
        const successful = document.execCommand('copy');
        const message = successful ? 'Password copied to clipboard!' : 'Error: Unable to copy password.';
        console.log(message);
    } catch (err) {
        console.error("Error: Password could not be copied:", err);
    }

    window.getSelection().removeAllRanges(); // Clean up the selection
}
