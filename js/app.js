/*  Declaraciones
----------------- */

//Array de Habitaciones
const habitacionesTodas = [kingRoom, dobleQueenRoom, kingRoomPremium, simpleSuite]


let habitacionesEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito')) || []
let cantidadNoches = 2


/*  Query de Elementos
---------------------- */
const roomsContainer = document.querySelector('.rooms-container')
const botonCarrito = document.querySelector('#boton-carrito-activo')
const modalCarrito = document.querySelector('#modal-carrito')

const botonCarritoActivo = document.querySelector('.boton-carrito-activo')

//query de carrito
const carritoContainer = document.querySelector('#carrito-container')



/*  Funciones
------------- */



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

        })

    })
}



//Funcion para obtener el ID del boton pulsado
function agregarProducto(e) {
    const habitacionID = e.target.getAttribute('data-id')
    const habitacionAgregada = habitacionesTodas.find(habitacion => habitacion.id === habitacionID)

    habitacionesEnCarrito.push(habitacionAgregada)

    localStorage.setItem('productos-en-carrito', JSON.stringify(habitacionesEnCarrito))




    ////SACAR///////////
    console.log(habitacionesEnCarrito);

    if (habitacionesEnCarrito.length > 0) {
        botonCarritoActivo.classList.remove('boton-carrito-desactivado')
    }


    //cambia la clase del boton para desactivarlo en la sesion
    e.currentTarget.classList.add('boton-desactivado')
    e.currentTarget.classList.remove('boton-disponibilidad')
    e.currentTarget.innerText = `En el carrito`

}


//fincion para desactivar los botones de reserva que ya estén en el carrito al cargar la pagina
function desactivarBotonesReservar() {
    const botonesReservar = document.querySelectorAll('.boton-disponibilidad')

    /* console.log(botonesReservar[0].dataset); */

    habitacionesEnCarrito.forEach(habitReservada => {
        const habitacionesID = habitReservada.id

        botonesReservar.forEach(boton => {
            if (boton.dataset.id == habitacionesID) {
                const botonADesactivar = document.querySelector("[data-id=" + CSS.escape(habitacionesID) + "]")
                botonADesactivar.classList.add('boton-desactivado')
                botonADesactivar.classList.remove('boton-disponibilidad')
                botonADesactivar.innerText = `En el carrito`
            }

        })

    })

}




//funcion para ocultar el boton carrito
function desactivarBotonCarrito() {
    botonCarritoActivo.classList.add('boton-carrito-desactivado')
    console.log(habitacionesEnCarrito);


    if (habitacionesEnCarrito.length > 0) {
        botonCarritoActivo.classList.remove('boton-carrito-desactivado')
    }
}




function renderizarCarrito() {
    carritoContainer.innerHTML = "";


    habitacionesEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito'))



    //hacer fecha
    const carritoFecha = document.createElement('div')
    carritoFecha.classList.add('carrito-fecha')
    carritoFecha.innerHTML = `
        <p>Desde el 22/05/2023 hasta el 30/05/20223</p>
    `
    carritoContainer.append(carritoFecha)

    habitacionesEnCarrito.forEach(producto => {
        const carritoProducto = document.createElement('div')
        carritoProducto.classList.add('carrito-producto')
        carritoProducto.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.img}" alt="${producto.nombre}">
            <div class="carrito-producto-titulo">
                <h3>${producto.nombre}</h3>
            </div>
            <div class="carrito-producto-cantOcupantes">
                <p>Ocupantes:</p>
                <p>${producto.ocupantes}</p>
            </div>
            <div class="carrito-producto-precioNoche">
                <p>Precio por noche:</p>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <p>Subtotal:</p>
                <p>$${producto.precio * cantidadNoches}</p>
            </div>
            <button class="carrito-producto-eliminar" data-id= "${producto.id}">
                <i class="bi bi-trash-fill"></i>
            </button>
        `;
        carritoContainer.append(carritoProducto)

    })

    //hacer total
    const carritoPrecioTotal = document.createElement('div')
    carritoPrecioTotal.classList.add('carrito-precio-total')
    carritoPrecioTotal.innerHTML = `
        <p>Total: $25003 </p>
    `
    carritoContainer.append(carritoPrecioTotal)


    const modalBotonera = document.createElement('div')
    modalBotonera.setAttribute('id', 'modal-botonera')
    modalBotonera.innerHTML = `
        <div class="modal-botonera-izquierda">
            <button id="modal-boton-cerrar">Cerrar</button>
        </div>
        <div class="modal-botonera-derecha">
            <button id="modal-boton-vaciarCarrito">Vaciar Carrito</button>
            <button id="modal-boton-pagar">Pagar</button>
        </div>
    `
    carritoContainer.append(modalBotonera)

    botonCerrarModal()
    botonesEliminarProducto()
}

function eliminarProductoCarrito() {

}





/*  EventListeners
------------------ */

botonCarrito.addEventListener('click', () => {
    modalCarrito.classList.add('activo')
    renderizarCarrito()

})

function botonCerrarModal() {
    const modalBotonCerrar = document.querySelector('#modal-boton-cerrar')
    modalBotonCerrar.addEventListener('click', () => {
        modalCarrito.classList.remove('activo')
    })
}

function botonesEliminarProducto() {
    const eliminarProducto = document.querySelectorAll('.carrito-producto-eliminar')

    eliminarProducto.addEventListener('click', eliminarProductoCarrito)
}




/*  Ejecuciones
---------------*/

desactivarBotonCarrito()
renderizarHabitaciones()
desactivarBotonesReservar()

