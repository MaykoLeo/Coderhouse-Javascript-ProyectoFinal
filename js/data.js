class Habitaciones {
    constructor(id, nombre, img, ocupantes, tamaño, cantCamas, balcon, precio) {

        this.id = id
        this.nombre = nombre
        this.img = img
        this.ocupantes = ocupantes
        this.tamaño = tamaño
        this.cantCamas = cantCamas
        this.balcon = balcon
        this.precio = precio

        //faltan los dias disponibles
    }
}


const kingRoom = new Habitaciones('01', 'King Room', '../assets/img/reserva1.jpg', '2', '6', '1', 'Si', '5.500')
const dobleQueenRoom = new Habitaciones('02', 'Doble Queen Room', '../assets/img/reserva2.jpg', '4', '6', '2', 'Si', '8.400')
const kingRoomPremium = new Habitaciones('03', 'King Room Premium', '../assets/img/reserva3.jpg', '2', '6', '1', 'Si', '9.100')
const simpleSuite = new Habitaciones('04', 'Simple Suite', '../assets/img/reserva4.jpg', '2', '10', '1', 'Si', '12.800')

