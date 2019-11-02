import React, {Fragment} from 'react'
import ProductoLista from './ProductoLista';

function Productos ({productos, guardarRecargarProductos}) {

    return(
        <Fragment>
             <h1 className="text-center">Productos</h1>
             <ul className="list-group mt-5"></ul>
             {productos.map(producto =>(
                 <ProductoLista
                    key={producto.id}
                    producto={producto}
                    guardarRecargarProductos={guardarRecargarProductos}
                 />

             ))}
        </Fragment>
       
    );
}

export default Productos;