import React from 'react';
import Layout from '../layout/Layout';

const Error = () => {

    return (
        <Layout footerType={"default"} headerType={"default"} disableButton={true}>
            <div className="flex flex-col items-center justify-center mt-20 py-10">

                <p className="text-lg font-semibold p-4 text-center text-black">
                    {"URL: pedido/{id}/cotizacion/{id}"}
                </p>
            </div>
        </Layout>
    );
};

export default Error;
