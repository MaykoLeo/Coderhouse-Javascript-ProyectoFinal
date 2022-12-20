/*  Declaraciones
----------------- */

//Array de Habitaciones
const habitacionesTodas = [kingRoom, dobleQueenRoom, kingRoomPremium, simpleSuite]

const habitacionesEnCarrito = []



/*  Query de Elementos
---------------------- */
const roomsContainer = document.querySelector('.rooms-container')
const botonCarrito = document.querySelector('#boton-carrito-activo')
const modalCarrito = document.querySelector('#modal-carrito')
const modalBotonCerrar = document.querySelector('#modal-boton-cerrar')
const botonCarritoActivo = document.querySelector('.boton-carrito-activo')

/*  Funciones
------------- */

/* if (habitacionesEnCarrito) {
    habitacionesEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito'))
} */



// Renderizar Habitaciones
const renderizarHabitaciones = () => {
    habitacionesTodas.forEach((habitacion) => {
        const habitacionDisponible = document.createElement('div')
        habitacionDisponible.classList.add('habitacion-disponible')
        habitacionDisponible.innerHTML = `
        <h2><span>${habitacion.nombre}</span></h2>
        `

        roomsContainer.append(habitacionDisponible)

        const descripcion = document.createElement('div')
        descripcion.classList.add('descripcion')
        habitacionDisponible.append(descripcion)

        const imagen = document.createElement('div')
        imagen.classList.add('imagen')
        descripcion.append(imagen)

        //Imagen Habitacion
        const fotoHabitacion = document.createElement('img')
        fotoHabitacion.setAttribute('src', habitacion.img)
        fotoHabitacion.setAttribute('alt', habitacion.nombre)
        imagen.append(fotoHabitacion)

        const detallesContainer = document.createElement('div')
        detallesContainer.classList.add('detalles-container')
        descripcion.append(detallesContainer)

        const detalles = document.createElement('div')
        detalles.classList.add('detalles')
        detallesContainer.append(detalles)

        //Ocupantes
        const ocupantes = document.createElement('div')
        ocupantes.classList.add('ocupantes')
        ocupantes.classList.add('elemento-detalle')
        ocupantes.innerHTML = `
            <span>Ocupantes:</span>
            <span>${habitacion.ocupantes} Personas</span>
        `
        detalles.append(ocupantes)

        //Tamaño
        const tamanio = document.createElement('div')
        tamanio.classList.add('tamanio')
        tamanio.classList.add('elemento-detalle')
        tamanio.innerHTML = `
            <span>Tamaño:</span>
            <span>${habitacion.tamanio} m²</span>
        `
        detalles.append(tamanio)

        //Camas
        const camas = document.createElement('div')
        camas.classList.add('camas')
        camas.classList.add('elemento-detalle')
        camas.innerHTML = `
            <span>Camas:</span>
            <span>${habitacion.cantCamas}</span>
        `
        detalles.append(camas)

        //Balcon
        const balcon = document.createElement('div')
        balcon.classList.add('balcon')
        balcon.classList.add('elemento-detalle')
        balcon.innerHTML = `
            <span>Balcón:</span>
            <span>${habitacion.balcon}</span>
        `
        detalles.append(balcon)


        const costo = document.createElement('div')
        costo.classList.add('costo')
        habitacionDisponible.append(costo)

        //Precio
        const precio = document.createElement('div')
        precio.classList.add('precio')
        precio.innerHTML = `
            <span>Costo por noche:</span>
            <span>AR$ ${habitacion.precio}</span>
        `
        costo.append(precio)

        const botonDisponibilidad = document.createElement('button')
        botonDisponibilidad.classList.add('boton-disponibilidad')
        botonDisponibilidad.setAttribute('data-id', habitacion.id)
        botonDisponibilidad.innerText = `Reservar`
        costo.append(botonDisponibilidad)

        //Se podria haber agregado todo usando sólo un innerHTML

    })

    const botonReservar = document.querySelectorAll('.boton-disponibilidad')
    botonReservar.forEach((boton) => {
        boton.addEventListener('click', agregarProducto)
        boton.addEventListener('click', () => {
            console.log('pulsaste reservar');
        })

    })
}



//Funcion para obtener el ID del boton pulsado
function agregarProducto(e) {
    const habitacionID = e.target.getAttribute('data-id')
    const habitacionAgregada = habitacionesTodas.find(habitacion => habitacion.id === habitacionID)

    habitacionesEnCarrito.push(habitacionAgregada)

    localStorage.setItem('productos-en-carrito', JSON.stringify(habitacionesEnCarrito))
    console.log(habitacionesEnCarrito);

    if (habitacionesEnCarrito.length > 0) {
        botonCarritoActivo.classList.remove('boton-carrito-desactivado')
    }


    //cambia la clase del boton para desactivarlo en la sesion
    e.currentTarget.classList.add('boton-desactivado')
    e.currentTarget.classList.remove('boton-disponibilidad')
    e.currentTarget.innerText = `En el carrito`

}

//funcion para ocultar el boton carrito
function desactivarBotonCarrito() {
    botonCarritoActivo.classList.add('boton-carrito-desactivado')

    if (habitacionesEnCarrito.length > 0) {
        botonCarritoActivo.classList.remove('boton-carrito-desactivado')
    }
}





/*  EventListeners
------------------ */

botonCarrito.addEventListener('click', () => {
    modalCarrito.classList.add('activo')

})

modalBotonCerrar.addEventListener('click', () => {
    modalCarrito.classList.remove('activo')
})


/*  Ejecuciones
---------------*/

desactivarBotonCarrito()

renderizarHabitaciones()


