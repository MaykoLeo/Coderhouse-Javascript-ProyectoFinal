/*  Declaraciones
----------------- */

//Array de Habitaciones
const habitacionesTodas = [kingRoom, dobleQueenRoom, kingRoomPremium, simpleSuite]

let habitacionesDisponibles = JSON.parse(localStorage.getItem('habitaciones-disponibles')) || []
let habitacionesEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito')) || []
let cantidadNoches = localStorage.getItem('cantidad-noches')


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
    roomsContainer.innerHTML = ""

    habitacionesDisponibles.forEach((habitacion) => {
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

    desactivarBotonesReservar()
    desactivarBotonCarrito()
}



//Funcion para obtener el ID del boton pulsado
function agregarProducto(e) {
    const habitacionID = e.target.getAttribute('data-id')
    const habitacionAgregada = habitacionesDisponibles.find(habitacion => habitacion.id === habitacionID)

    habitacionesEnCarrito.push(habitacionAgregada)

    localStorage.setItem('productos-en-carrito', JSON.stringify(habitacionesEnCarrito))

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

    if (habitacionesEnCarrito.length > 0) {
        botonCarritoActivo.classList.remove('boton-carrito-desactivado')
    }
}


//funcion para setear en formato date
function parseDate(input) {
    let parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]);
}


function renderizarCarrito() {
    carritoContainer.innerHTML = "";

    let fechaDesde = JSON.parse(localStorage.getItem('dia-desde'))
    fechaDesde = parseDate(fechaDesde);
    fechaDesde = fechaDesde.toISOString().slice(0, 10);

    let fechaHasta = JSON.parse(localStorage.getItem('dia-hasta'))
    fechaHasta = parseDate(fechaHasta);
    fechaHasta = fechaHasta.toISOString().slice(0, 10);

    const carritoFecha = document.createElement('div')
    carritoFecha.classList.add('carrito-fecha')
    carritoFecha.innerHTML = `
        <p>Ingreso: ${fechaDesde}  Egreso: ${fechaHasta}  Catidad de noches: ${cantidadNoches}</p>
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

    const total = calcularTotal()

    const carritoPrecioTotal = document.createElement('div')
    carritoPrecioTotal.classList.add('carrito-precio-total')
    carritoPrecioTotal.innerHTML = `
        <p>Total: $${total} </p>
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
    botonVaciarCarrito()
    botonPagar()
}


function calcularTotal() {
    const totalCalculado = habitacionesEnCarrito.reduce((acc, habitacion) => acc + (habitacion.precio * cantidadNoches), 0)
    return totalCalculado
}

function eliminarProductoCarrito(e) {
    let idBoton = e.currentTarget.dataset.id

    const index = habitacionesEnCarrito.findIndex(habitacion => habitacion.id === idBoton)
    habitacionesEnCarrito.splice(index, 1);

    renderizarCarrito()
    localStorage.setItem('productos-en-carrito', JSON.stringify(habitacionesEnCarrito))
    renderizarHabitaciones()
}


function botonVaciarCarrito() {
    const modalBotonVaciarCarrito = document.querySelector('#modal-boton-vaciarCarrito')
    modalBotonVaciarCarrito.addEventListener('click', () => {
        habitacionesEnCarrito.length = 0
        localStorage.setItem('productos-en-carrito', JSON.stringify(habitacionesEnCarrito))
        renderizarCarrito()
        renderizarHabitaciones()
    })
}


function botonPagar() {
    const modalBotonPagar = document.querySelector('#modal-boton-pagar')
    modalBotonPagar.addEventListener('click', () => {

        if (habitacionesEnCarrito.length > 0) {
            modalCarrito.classList.remove('activo')
            habitacionesEnCarrito.length = 0
            localStorage.setItem('productos-en-carrito', JSON.stringify(habitacionesEnCarrito))
            renderizarHabitaciones()

            Swal.fire({
                icon: 'success',
                title: 'Reserva realizada',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',

            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = "reserva.html"
                }
            })

        } else {
            modalCarrito.classList.remove('activo')
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El carrito está vacío',
                confirmButtonText: 'Aceptar',

            })
        }
    })
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
    eliminarProducto.forEach(producto => {
        producto.addEventListener('click', eliminarProductoCarrito)
    })
}





/*  Ejecuciones
---------------*/

renderizarHabitaciones()


