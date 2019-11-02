import React, { useState, useRef } from 'react'
import Error from './Error';

import axios from 'axios';
import Swal from 'sweetalert2';

import { withRouter } from 'react-router-dom';



function EditarProducto ({producto, history, guardarRecargarProductos}) {
    

    // generar los ref
    const precioPlatoRef = useRef('');
    const nombrePlatoRef = useRef('');

   
    const [error, guardarError] = useState(false);
    const [categoria, guardarCategoria] = useState('');


    const editarProducto = async e => {
        e.preventDefault();

        // validacion
        const nuevoNombrePlato = nombrePlatoRef.current.value,
              nuevoPrecioPlato =  precioPlatoRef.current.value;

              if(nuevoNombrePlato === '' || nuevoPrecioPlato === '' || categoria === '') {
                guardarError(true);
                return;
              }

              guardarError(false);

        //revisar si cambio  la categoria, delo contrario asignar el mismo  valor
        let categoriaPlato = (categoria === '') ?  producto.categoria : categoria;
        console.log(categoriaPlato);
        

        // editamos el producto
        const editarPlato = {
            nombrePlato : nuevoNombrePlato ,
            precioPlato : nuevoPrecioPlato,
            categoria : categoriaPlato
            
        }
        //console.log(editarPlato);
        //enviamos el Request
        const url = `http://localhost:4000/restaurant/${producto.id}`;

        try {
            const resultado = await axios.put(url, editarPlato);

           // console.log(resultado);
            if(resultado.status === 200){
                Swal.fire(
                    'Producto editado',
                    'El producto se edito correctamente',
                    'success'
                )
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title:'Oops...',
                text: 'Hubo un error, vuelve a intentarlo'
            })
            
        }

        // redirigir al usuario y consultar la api
        guardarRecargarProductos(true);
        history.push('/productos'); 
        
    }

    // metodo para el button-radio
    const leerValorRadio =  e => {
        guardarCategoria(e.target.value);
    }

    return(
        <div className="col-md-8 mx-auto ">
        <h1 className="text-center">Editar Producto</h1>
        {/* injectamos como ternario el componente del error */}
        {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null }
        <form
            onSubmit={editarProducto}
            className="mt-5"
        >
            <div className="form-group">
                <label>Nombre Plato</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="nombre" 
                    placeholder="Nombre Plato"
                    ref={nombrePlatoRef}
                    defaultValue={producto.nombrePlato}
                    
                />
            </div>

            <div className="form-group">
                <label>Precio Plato</label>
                <input 
                    type="number" 
                    className="form-control" 
                    name="precio"
                    placeholder="Precio Plato"
                    ref={precioPlatoRef}
                    defaultValue={producto.precioPlato}
                    
                />
            </div>

            <legend className="text-center">Categoría:</legend>
            <div className="text-center">
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="postre"
                    onChange={leerValorRadio}
                    defaultChecked={(producto.categoria === 'postre')}
                />
                <label className="form-check-label">
                    Postre
                </label>
            </div>
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="bebida"
                    onChange={leerValorRadio}
                    defaultChecked={(producto.categoria === 'bebida')}
                />
                <label className="form-check-label">
                    Bebida
                </label>
            </div>

            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="cortes"
                    onChange={leerValorRadio}
                    defaultChecked={(producto.categoria === 'cortes')}
                />
                <label className="form-check-label">
                    Cortes
                </label>
            </div>

            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="ensalada"
                    onChange={leerValorRadio}
                    defaultChecked={(producto.categoria === 'ensalada')}
                />
                <label className="form-check-label">
                    Ensalada
                </label>
            </div>
            </div>

            <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Guardar Cambios" />
        </form>
    </div>
    );
}

export default withRouter(EditarProducto) ;