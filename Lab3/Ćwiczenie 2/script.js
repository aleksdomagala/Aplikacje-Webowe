document.getElementById('generate-password').addEventListener('click', () => {

    const minLength = parseInt(document.getElementById('min-length').value) || 8;
    const maxLength = parseInt(document.getElementById('max-length').value) || 12;
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeSpecial = document.getElementById('include-special').checked;

    const password = generatePassword(minLength, maxLength, includeUppercase, includeSpecial);

    alert(`Wygenerowane hasło: ${password}`);
});

function generatePassword(minLength, maxLength, includeUppercase, includeSpecial) {

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const numbers = '0123456789';

    let allChars = lowercaseChars + numbers;
    if (includeUppercase) {allChars += uppercaseChars;}
    if (includeSpecial) {allChars += specialChars;}

    const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    return password;
}
