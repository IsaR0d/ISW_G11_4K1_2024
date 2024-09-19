export const enviarCorreoConfirmacion = async (detallesPedido) => {
    try {
        const response = await fetch('http://localhost:5000/enviar-correo', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ detallesPedido }),
        });
    
        if (response.ok) {
            console.log('Correo electrónico enviado');
            } else {
                console.error('Error al enviar el correo electrónico');
            }
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
};