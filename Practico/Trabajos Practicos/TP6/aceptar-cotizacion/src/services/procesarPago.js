export async function procesarPago(number, name, expiry, cvc, pin, monto) {
    console.log(number, name, expiry, cvc, pin, monto)
    try {
        const response = await fetch('http://localhost:4000/api/tarjetas', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                number,
                name,
                expiry,
                cvc,
                pin,
                monto
            })
        });

        const result = await response.json();
        const success = response.status == 200;
        alert(success)

        return {
            ok: success,
            message: result.message
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error en la solicitud: ' + error.message
        };

    }
}