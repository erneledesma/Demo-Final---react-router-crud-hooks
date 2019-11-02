import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function ProductoLista({producto, guardarRecargarProductos}) {

    const eliminarProducto =  id => {
        console.log('eliminando', id);
        //TODO: Eliminar los registros
        Swal.fire({
            title: 'Estas seguro?',
            text: "Un plato eliminado no se podrá recuperar ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText:'cancelar'
          }).then( async (result) => {
            if (result.value) {
                 try {

                    const url = `http://localhost:4000/restaurant/${id}`;

                    const resultado = await axios.delete(url);
    
                    //console.log(resultado);
                    if(resultado.status === 200 ){
    
                    Swal.fire(
                        'Eliminado!',
                        'El producto se ha eliminado',
                        'success'
                      )
                    }
                    //consultar la api
                    guardarRecargarProductos(true)
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        type: 'error',
                        title:'Oops...',
                        text: 'Hubo un error, vuelve a intentarlo'
                    })
                         
                }
            }
          })
        
    }
    return(
        <li data-categoria={producto.categoria} className="list-group-item d-flex justify-content-between align-items-center">
            <p>
                {producto.nombrePlato} {' '}
                <span className="font-weight-bold">${producto.precioPlato}</span>
            </p>
            <div>
                <Link
                  to={`/productos/editar/${producto.id}`}
                  className="btn btn-success mr-2"
                >Editar</Link>

                <button 
                  type="button"
                  className="btn btn-danger"
                  onClick={() => eliminarProducto(producto.id)}
                >
                Eliminar &times;
                </button>
            </div>
        </li>
    );
}

export default ProductoLista;