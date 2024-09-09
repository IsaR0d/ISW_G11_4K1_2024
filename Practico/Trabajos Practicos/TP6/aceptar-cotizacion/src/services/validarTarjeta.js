// Algoritmo de Luhn
export const validarNumero =(number) => {

    const cleanNumber = number.replace(/\D/g, '');

    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
        return false;
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber[i], 10);

        if (shouldDouble) {
            digit *= 2;

            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

function getMarca(number) {
    // Eliminar espacios y guiones
    number = number.replace(/\s+/g, '').replace(/-/g, '');

    // Verificar longitud del número de tarjeta
    if (number.length < 13 || number.length > 19) {
        return 'Número de tarjeta inválido';
    }

    // Determinar el BIN/IIN (primeros 6 dígitos)
    const bin = number.substring(0, 6);

    // Identificar la marca de la tarjeta
    if (bin.startsWith('4')) {
        return 'Visa';
    } else if (bin.startsWith('51') || bin.startsWith('52') || bin.startsWith('53') || bin.startsWith('54') || bin.startsWith('55')) {
        return 'Mastercard';
    } else {
        return 'Marca de tarjeta no reconocida';
    }
}