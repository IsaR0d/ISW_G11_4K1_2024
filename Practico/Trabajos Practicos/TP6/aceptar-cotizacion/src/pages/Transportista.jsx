import React, { useEffect, useState } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../firebase'; // Importa tu configuración de Firebase
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';

const Transportista = () => {
  const { idTransportista } = useParams(); // Obtener el ID del transportista desde la URL
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Referencia a los pedidos del transportista en la Realtime Database
    const pedidoRef = ref(database, `transportistas/${idTransportista}/pedidos`);

    // Escuchar los cambios en tiempo real
    const unsubscribe = onValue(pedidoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convertir el objeto de pedidos en un array
        const listaPedidos = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setPedidos(listaPedidos);

        // Mostrar un alert y eliminar el pedido
        listaPedidos.forEach((pedido) => {
          // Mostrar un alert con el mensaje de la cotización
          alert(`Se aceptó su cotización del pedido: ${pedido.id}, por el monto de: ${pedido.precio}`);

          // Eliminar el pedido de la base de datos
          handleEliminarPedido(pedido.id);
        });
      } else {
        setPedidos([]); // Si no hay pedidos
      }
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, [idTransportista]);

  // Función para eliminar un pedido
  const handleEliminarPedido = (idPedido) => {
    const pedidoRef = ref(database, `transportistas/${idTransportista}/pedidos/${idPedido}`);
    remove(pedidoRef)
      .then(() => {
        console.log(`Pedido ${idPedido} eliminado exitosamente`);
      })
      .catch((error) => {
        console.error("Error al eliminar el pedido:", error);
      });
  };

  return (
    <Layout footerType={"default"} headerType={"default"}>
      <div className="flex flex-col items-center justify-center mt-20 py-10">
        <p className="text-lg font-semibold p-4 text-center text-black">
          {"Transportista ID: "} {idTransportista}
        </p>
      </div>
    </Layout>
  );
};

export default Transportista;

