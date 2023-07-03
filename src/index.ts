// index.ts
import { expirationDates } from './cron/productVencimiento';
import { io, Socket } from "socket.io-client";

// Conectarse al socket externo
const socket: Socket = io('http://localhost:4000', {
    query: {
        room: 'tienda1',
        storeId: 'tien43543fdgdfg-gfgdfgdgdfg-545da1',
    }
});

// Evento de conexión exitosa
socket.on("connect", () => {
    console.log("Conectado al servidor de socket");
});

const categorys = ["Cerveza", "Gaseosas", "Snack", "Cocteles", "Dulces", "Agua", "Jugos"];
// Inicia el cron
socket.emit("productExpiration", "closeToExpireByCategory"); // Emitir evento al socket
expirationDates(socket, 62, categorys);
expirationDates(socket, 31, categorys)
expirationDates(socket, 21, categorys)
expirationDates(socket, 11, categorys)
expirationDates(socket, 1, categorys)
