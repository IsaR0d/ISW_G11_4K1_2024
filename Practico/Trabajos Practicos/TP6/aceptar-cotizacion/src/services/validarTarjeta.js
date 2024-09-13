// Algoritmo de Luhn
export const validarNumero =(number) => {

    const sanitizedCardNumber = number.replace(/\D/g, '');

    let sum = 0;
    let shouldDouble = false;
  
    // Process each digit from right to left
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
        return "Formato de tarjeta invalido."
    }
    if (!validarNumero(number)){
        return "Numero de tarjeta invalidado."
    }
    return true;
}

export const validateName = (name) => 
{
    const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ'’-]+(?: [A-Za-zÀ-ÖØ-ÿ'’-]+)*$/i;
    if (!nameRegex.test(name))
    {
        return "Ingrese un nombre valido."
    }
    return true;
};
export const validateExpiry = (name) => {
    const nameRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!nameRegex.test(name))
    {
        return "Ingrese una fecha de expiracion valida (MM/YY)"
    }
    return true;
};
export const validateCvc = (number) => {
    const fourDigitNumberRegex = /^\d{3,4}$/;
    if (!fourDigitNumberRegex.test(number))
        {
            return "Ingrese un CVC de 3 digitos"
        }
    return true;
};
export const validatePin= (number) => {
    const fourDigitNumberRegex = /^\d{4,6}$/;
    if (!fourDigitNumberRegex.test(number))
        {
            return "Ingrese un PIN de hasta 6 digitos"
        }
    return true;
};
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