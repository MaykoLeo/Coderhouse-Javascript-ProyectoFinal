/*  Declaraciones
----------------- */

//Array de Habitaciones

const habitacionesTodas = [kingRoom, dobleQueenRoom, kingRoomPremium, simpleSuite]




/*  Query de Elementos
---------------------- */
const roomsContainer = document.querySelector('.rooms-container')



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
        botonDisponibilidad.innerText = `Reservar`
        costo.append(botonDisponibilidad)

    })



}




/*  EventListeners
------------------ */





/*  Ejecuciones
---------------*/

renderizarHabitaciones()