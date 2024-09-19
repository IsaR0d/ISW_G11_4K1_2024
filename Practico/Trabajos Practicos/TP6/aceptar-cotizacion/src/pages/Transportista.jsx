import React, { useEffect, useState } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../firebase';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import Notificacion from '../components/Notificacion';

const Transportista = () => {
	const { idTransportista } = useParams();
	const [pedidos, setPedidos] = useState([]);
	const [notificaciones, setNotificaciones] = useState([]);

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
				mostrarNotificacion(pedido.mensaje);
				handleEliminarPedido(pedido.id);
			});
		} else {
			setPedidos([]);
		}
		});
	
		return () => unsubscribe();
	}, [idTransportista]);

	const mostrarNotificacion = (mensaje) => {
		const id = Date.now();
		setNotificaciones((prev) => [...prev, { id, mensaje }]);
	};

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

	const handleClickNotificacion = (id) => {
		setNotificaciones((prev) => prev.filter((notif) => notif.id !== id));
	};

	return (
		<Layout footerType={"default"} headerType={"default"} inicioAccion={true}>
		<div className="flex flex-col items-center justify-center mt-3 py-10 relative">
			<p className="text-lg font-semibold p-4 text-center text-black">
			{"Transportista ID: "} {idTransportista}
			</p>
			<div className="absolute top-0 left-0 right-0 p-4">
			{notificaciones.map((notif) => (
				<div
				key={notif.id}
				onClick={() => handleClickNotificacion(notif.id)}
				className="mb-1"
				>
				<Notificacion
					title={"TANGO APP"}
					message={notif.mensaje}
				/>
				</div>
			))}
			</div>
		</div>
		</Layout>
	);
};

export default Transportista;
