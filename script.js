// Diccionario de traducción de código morse a texto y viceversa
const morseToText = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G',
    '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N',
    '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U',
    '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1',
    '..---': '2', '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
    '---..': '8', '----.': '9', '.-.-.-': '.', '--..--': ',', '..--..': '?', '-.-.--': '!',
    '-....-': '-', '-..-.': '/', '.--.-.': '@', '-.-.-.': ';', '---...': ':'
};

// Diccionario inverso de texto a código morse
const textToMorse = Object.entries(morseToText).reduce((acc, [morse, text]) => {
    acc[text] = morse;
    return acc;
}, {});

// Función para mostrar notificaciones
function showAlert(message, isCorrect) {
    const alertBox = document.getElementById('alert');
    alertBox.textContent = message;
    alertBox.className = isCorrect ? 'notification correct visible' : 'notification incorrect visible';
    setTimeout(() => {
        alertBox.classList.remove('visible');
    }, 3000);
}

// Traducción de Morse a Texto
document.getElementById('translateMorseToTextBtn').addEventListener('click', () => {
    const morseInput = document.getElementById('morseInput').value.trim();
    const morseWords = morseInput.split('   '); // Separar palabras por tres espacios
    let isValidMorse = true;

    const translatedText = morseWords.map(morseWord => {
        const morseChars = morseWord.split(' '); // Separar letras por un solo espacio
        const translatedWord = morseChars.map(morseChar => {
            if (morseToText[morseChar]) {
                return morseToText[morseChar];
            } else {
                isValidMorse = false;
                return '';
            }
        }).join('');
        return translatedWord;
    }).join(' '); // Juntar palabras con un solo espacio

    if (isValidMorse) {
        document.getElementById('output').value = translatedText;
        showAlert('¡Traducción correcta!', true);
    } else {
        showAlert('Error: código Morse incorrecto.', false);
    }
});

// Traducción de Texto a Morse
document.getElementById('translateTextToMorseBtn').addEventListener('click', () => {
    const textInput = document.getElementById('textInput').value.trim().toUpperCase();
    let isValidText = true;

    const translatedMorse = textInput.split('').map(char => {
        if (textToMorse[char]) {
            return textToMorse[char];
        } else if (char === ' ') {
            return ''; // Mantener los espacios entre palabras
        } else {
            isValidText = false;
            return '';
        }
    }).join(' ').replace(/\s+/g, '   '); // Triple espacio para separar palabras

    if (isValidText) {
        document.getElementById('output').value = translatedMorse;
        showAlert('¡Traducción a Morse correcta!', true);
    } else {
        showAlert('Error: el texto contiene caracteres no válidos.', false);
    }
});
