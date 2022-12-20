/*  Declaraciones
----------------- */




/*  Query de Elementos
---------------------- */
const botonEnviarReserva = document.querySelector("#boton-enviar-reserva")



/*  Funciones
------------- */



/*  EventListeners
------------------ */
botonEnviarReserva.addEventListener('click', (e) => {
    e.preventDefault()
    location.href = "disponibilidad.html"
})


/*  Ejecuciones
---------------*/


