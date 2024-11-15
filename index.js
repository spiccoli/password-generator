function generatePassword() {
    const inputPassLength = document.getElementById("passlength").value;
    const passLength = parseInt(inputPassLength);
    document.getElementById("passlength").value = passLength; // Show the parsed number in the textbox

    const includeLowerCase = document.getElementById("lowerCaseCheck").checked;
    const includeUpperCase = document.getElementById("upperCaseCheck").checked;
    const includeNumbers = document.getElementById("numbersCheck").checked;
    const includeSymbols = document.getElementById("symbolsCheck").checked;

    let allowedCharacters = "";
    let generatedPassword = "";

    if (passLength > 128) {
        if (!confirm("Generating a password longer than 128 characters can be risky and not optimal. Do you want to proceed?")) {
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

    // Ensure at least one of each selected type is included
    if (includeLowerCase) generatedPassword += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
    if (includeUpperCase) generatedPassword += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
    if (includeNumbers) generatedPassword += numbers.charAt(Math.floor(Math.random() * numbers.length));
    if (includeSymbols) generatedPassword += symbols.charAt(Math.floor(Math.random() * symbols.length));

    for (let i = generatedPassword.length; i < passLength; i++) {
        const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
        generatedPassword += allowedCharacters[randomIndex];
    }

    document.getElementById("password-output").textContent = shuffleString(generatedPassword);
}

function copyToClipboard() {
    const passwordOutput = document.getElementById("password-output");
    if (passwordOutput.textContent === "") {
        console.log("Error: Password must be generated first");
        return;
    }
    const range = document.createRange();
    range.selectNode(passwordOutput);
    window.getSelection().removeAllRanges(); // Clear existing selection
    window.getSelection().addRange(range);

    try {
        const successful = document.execCommand('copy');
        const message = successful ? 'Password copied to clipboard!' : 'Error: Unable to copy password.';
        console.log(message);
    } catch (err) {
        console.error("Error: Password could not be copied:", err);
    }

    window.getSelection().removeAllRanges(); // Clean up the selection
}

function shuffleString(string) {
    const array = string.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}
