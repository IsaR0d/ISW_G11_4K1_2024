// Algoritmo de Luhn
export const validarNumero =(number) => {

    const sanitizedCardNumber = number.replace(/\D/g, '');

    let sum = 0;
    let shouldDouble = false;

    for (let i = sanitizedCardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedCardNumber.charAt(i), 10);

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

export const validateNumber = (number) =>
{
    const cardNumberRegex = /^\d+$/;
    if (!cardNumberRegex.test(number))
    {
        return "Formato de tarjeta inválido."
    }
    else if (!validarNumero(number)){
        return "Número de tarjeta inválido."
    }

    else if (getMarca(number) !== "Mastercard" && getMarca(number) !== "Visa") {
        return "Por favor, ingrese una tarjeta Visa o Mastercard."
    }
    return true;
}

export const validateName = (name) => 
{
    const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ'’-]+(?: [A-Za-zÀ-ÖØ-ÿ'’-]+)*$/i;
    if (!nameRegex.test(name))
    {
        return "Ingrese un nombre válido."
    }
    return true;
};

export const validateExpiry = (expiry) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    
    if (!expiryRegex.test(expiry)) {
        return "Ingrese una fecha de expiración válida (MM/YY)";
    }

    const [month, year] = expiry.split('/');
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    const expiryMonth = parseInt(month, 10);
    const expiryYear = parseInt(year, 10);

    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        return "La fecha de expiración debe ser posterior a la actual";
    }

    return true;
};

export const validateCvc = (number) => {
    const fourDigitNumberRegex = /^\d{3,4}$/;
    if (!fourDigitNumberRegex.test(number))
        {
            return "Ingrese un CVC de 3 o 4 dígitos."
        }
    return true;
};
export const validatePin= (number) => {
    const fourDigitNumberRegex = /^\d{4,6}$/;
    if (!fourDigitNumberRegex.test(number))
        {
            return "Ingrese un PIN de hasta 6 dígitos."
        }
    return true;
};

function getMarca(number) {
    number = number.replace(/\s+/g, '').replace(/-/g, '');
    const bin = number.substring(0, 6);

    if (bin.startsWith('4')) {
        return 'Visa';
    } else if (bin.startsWith('51') || bin.startsWith('52') || bin.startsWith('53') || bin.startsWith('54') || bin.startsWith('55')) {
        return 'Mastercard';
    } else {
        return 'Marca de tarjeta no reconocida';
    }
}