// Algoritmo de Luhn
export const validarNumero = (number) => {

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
    const cardNumberRegex = /^(4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|2(2[2-9][0-9]{2}|[3-6][0-9]{3}|7([01][0-9]{2}|20[0-9]))[0-9]{12})$/;
    if (!cardNumberRegex.test(number) || !validarNumero(number))
    {
        return "Ingrese una tarjeta VISA o Mastercard valida."
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
        return "La tarjeta debe estar vigente.";
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