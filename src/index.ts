// index.ts
import {expirationDates} from './cron/productVencimiento';
import { io } from "socket.io-client";


// URL del servidor de socket externo
const socketUrl = "http://localhost:4000";
// Conectarse al socket externo
const socket = io(socketUrl);
const categorys = ["Cerveza","Gaseosas","Snack","Cocteles","Dulces","Agua","Jugos"];
// Inicia el cron
expirationDates(socket,62,categorys);
expirationDates(socket,31,categorys)
expirationDates(socket,21,categorys)
expirationDates(socket,11,categorys)
expirationDates(socket,1,categorys)
