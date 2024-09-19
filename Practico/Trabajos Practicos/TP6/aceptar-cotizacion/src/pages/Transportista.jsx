import React, { useEffect, useState } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../firebase';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';

const Transportista = () => {
  const { idTransportista } = useParams();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    console.log("idTransportista:", idTransportista);
    const pedidoRef = ref(database, `transportistas/${idTransportista}/pedidos`);
  
    const unsubscribe = onValue(pedidoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const listaPedidos = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setPedidos(listaPedidos);
  
        listaPedidos.forEach((pedido) => {
          alert(pedido.mensaje);
  
          handleEliminarPedido(pedido.id);
        });
      } else {
        setPedidos([]);
      }
    });
  
    return () => unsubscribe();
  }, [idTransportista]);
  

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
    <Layout footerType={"default"} headerType={"default"} inicioAccion={true}>
      <div className="flex flex-col items-center justify-center mt-20 py-10">
        <p className="text-lg font-semibold p-4 text-center text-black">
          {"Transportista ID: "} {idTransportista}
        </p>
      </div>
    </Layout>
  );
};

export default Transportista;

