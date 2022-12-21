/*  Declaraciones
----------------- */

let habitacionesTodas = []
let habitacionesDisponibles = []


/*  Query de Elementos
---------------------- */

const botonEnviarReserva = document.querySelector("#boton-enviar-reserva")
const modalSpinner = document.querySelector('.modal-spinner')
const formulario = document.querySelector('.formulario')

/*  Funciones
------------- */

function fechas() {

    //se establecen las fechas en base a las fechas actuales
    let dateActual = new Date().toISOString().slice(0, 10);
    const dateActualMilisegundos = new Date().getTime();

    //se calcula el día siguiente (1 dia = 86400000 milisegundos)
    const dateManianaMilisegundos = dateActualMilisegundos + 86400000
    const dateManiana = new Date(dateManianaMilisegundos).toISOString().slice(0, 10);


    const fechas = document.createElement('div')
    fechas.classList.add('fechas')
    fechas.innerHTML = `
        <label class="form-item form-item-date">
            Desde
            <input type="date" name="" id="date-desde" value="${dateActual}" min="${dateActual}">
        </label>
        <label class="form-item form-item-date">
            Hasta
            <input type="date" name="" id="date-hasta" value="${dateManiana}" min="${dateManiana}">
        </label>
    `
    formulario.prepend(fechas)

}


//funcion para calcular la cantidad de noches en base a las fechas de ingreso y egreso
function calcularNoches(dia1, dia2) {
    let diff = dia2.getTime() - dia1.getTime();
    let cantidadNoches = Math.ceil(diff / (1000 * 3600 * 24))

    return cantidadNoches
}



//funcion para setear en formato date
function parseDate(input) {
    let parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]);
}



/*  EventListeners
------------------ */
botonEnviarReserva.addEventListener('click', (e) => {
    e.preventDefault()
    modalSpinner.classList.add('modal-spinner-activo')

    const dateDesde = document.querySelector('#date-desde').value
    const dateHasta = document.querySelector('#date-hasta').value
    const diaDesde = parseDate(dateDesde)
    const diaHasta = parseDate(dateHasta)

    const cantidadNoches = calcularNoches(diaDesde, diaHasta)

    if (cantidadNoches > 0) {

        const evento = (res) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (res === true) {
                        resolve(location.href = "disponibilidad.html")

                    } else {
                        reject('No se cumplio')
                    }
                    modalSpinner.classList.remove('modal-spinner-activo')
                }, 1000)
            })
        }

        evento(true)
            .then(() => {
                habitacionesDisponibles = [kingRoom, dobleQueenRoom, kingRoomPremium, simpleSuite]
                localStorage.setItem('habitaciones-disponibles', JSON.stringify(habitacionesDisponibles))
                localStorage.setItem('cantidad-noches', cantidadNoches)
                localStorage.setItem('dia-desde', JSON.stringify(diaDesde))
                localStorage.setItem('dia-hasta', JSON.stringify(diaHasta))
            });

        //modal de error
    } else {
        modalSpinner.classList.remove('modal-spinner-activo')
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La fecha de ingreso debe ser inferior a la de egreso',
            confirmButtonText: 'Aceptar',

        })
    }
})


/*  Ejecuciones
---------------*/
fechas()


