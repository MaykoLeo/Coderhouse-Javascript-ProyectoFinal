let nombreHabitacion
let precio = 0

alert('Bienvenido a la sección de reserva del Hotel Leviton')
let cantPersonas = parseInt(prompt('Cantidad de Personas: '))
let noches = parseInt(prompt('Cantidad de Noches: '))


const habitaciones = [
    {
        nombreHabitacion: 'King Room - $5500 p/noche',
        precio: 5500,
        balcon: 'si',
    },
    {
        nombreHabitacion: 'Doble Queen Room - $4800 p/noche',
        precio: 4800,
        balcon: 'no',
    },
    {
        nombreHabitacion: 'King Room Premium - $9100 p/noche',
        precio: 9100,
        balcon: 'si',
    },
    {
        nombreHabitacion: 'Simple Suite - $12800 p/noche',
        precio: 12800,
        balcon: 'si',
    },
]


let busquedaBalcon = 0
// "habitDisponibles" es solo un simple cambio de nombre de la variable para que sea mas entendible
let habitDisponibles = 0

const disponibilidad = (opcion) => {
    while (opcion != 'si' || opcion != 'no') {
        opcion = prompt('¿Desea habitación con balcón?\nEscriba "Si" o "No"').toLocaleLowerCase()

        if (opcion == 'si') {
            busquedaBalcon = habitaciones.filter((habit) => habit.balcon === 'si')
            habitDisponibles = busquedaBalcon
            return busquedaBalcon

        } else if (opcion == 'no') {
            busquedaBalcon = habitaciones.filter((habit) => habit.balcon === 'no')
            habitDisponibles = busquedaBalcon
            return busquedaBalcon
        }
    }
}



// Generador de string de descripcion de habitaciones
let acum = 0
let descripcionHabitaciones = 0

function stringGenerator(habitDisponibles) {
    for (const habit of habitDisponibles) {
        acum = acum + 1
        //El if es para evitar que "descripcionHabitaciones" devuelva un 0 al inicio
        if (acum == 1) {
            descripcionHabitaciones = acum + ' - ' + habit.nombreHabitacion
        } else {
            descripcionHabitaciones = descripcionHabitaciones + '\n' + acum + ' - ' + habit.nombreHabitacion
        }

    }
}



// Funcion para calcular el precio total en funcion de la cantidad de noches ingresadas
let total = 0
function calculo(array) {
    total = array.precio * noches;

}


const calculoPrecioPorNoche = (opcion) => {
    while (opcion < 1 || opcion > longitudHabitDisponibles) {
        opcion = parseInt(prompt('Habitaciones\n' + descripcionHabitaciones + '\nSeleccione numéricamente la opción: '))

        if (opcion >= 1 && opcion <= longitudHabitDisponibles) {
            calculo(habitDisponibles[opcion - 1]);
            nombreHabitacion = habitDisponibles[opcion - 1].nombreHabitacion

        } else {
            alert('Valor incorrecto')
        }
    }
}


let nroCuota
let recargo
let precioCuota = 0


const infoPrecioCuotas = (opcion) => {
    while (opcion != 1 && opcion != 3 && opcion != 6 && opcion != 12) {
        opcion = parseInt(prompt('Ingrese la cantidad de cuotas\nPueden ser 1, 3, 6 o 12 Cuotas'))

        switch (opcion) {
            case 1:
                nroCuota = '1'
                recargo = 0
                break;
            case 3:
                nroCuota = '3'
                recargo = 10.10
                break;
            case 6:
                nroCuota = '6'
                recargo = 20.78
                break;
            case 12:
                nroCuota = '12'
                recargo = 45.06
                break;

            default:
                alert('Valor de cuota incorrecto')
                break;

        }

    }
}

const calculoPrecioCuotas = (precioTotal, recargoCuota, cantidadCuotas) => {
    precioCuota = (((precioTotal * recargoCuota) / 100) + precioTotal) / cantidadCuotas
    return precioCuota
}


disponibilidad(0)
// Se calcula la longitud del array de "habitDisponibles"
const longitudHabitDisponibles = habitDisponibles.length

stringGenerator(habitDisponibles)
calculoPrecioPorNoche(0)
infoPrecioCuotas(0)
calculoPrecioCuotas(total, recargo, nroCuota)

alert('RESERVA REALIZADA\nRESUMEN: \n' + nombreHabitacion + '\nCant de personas: ' + cantPersonas + '\nCant de noches: ' + noches + '\nPrecio total: $' + total + '\nEn ' + nroCuota + ' cuota/s de: $' + precioCuota)


