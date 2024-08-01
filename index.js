
function GeneratePassword() {
    //config
    const inputPassLength = document.getElementById("passlength").value;
    const passLength = parseInt(inputPassLength);
    document.getElementById("passlength").value = passLength; // to see the parsed number inside the textbox
    const includeLowerCase = true;
    const includeUpperCase = true;
    const includesymbols = true;
    const includeNumbers = true;
    //possible chars
    let allowedCharacters = "";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = "!'()*+,-./:;$<=>?@[\]^_%`{|}~&";
    const numbers = "0123456789";
    parseInt
    if (passLength < 1 || passLength > 128) {
        document.getElementById("password-output").textContent = "Password must be between 1 and 128 characters";
        return;
    }
    if (includeLowerCase) allowedCharacters += lowerCase;
    if (includeUpperCase) allowedCharacters += upperCase;
    if (includesymbols) allowedCharacters += symbols;
    if (includeNumbers) allowedCharacters += numbers;
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
    if(passwordOutput.textContent == ""){
        console.log("Erorr: password must be generated first")
        return;
    }

        try {
            const successful = document.execCommand('copy');
            const message = successful ? 'Password copied to clipboard!' : "Error: unable to copy password.";
            console.log(message);
        } catch (err) {
            console.error("Error: password could not be copied:", err);
        }
    window.getSelection().removeAllRanges();// Clean up the selection
}

