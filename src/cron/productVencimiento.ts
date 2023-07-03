import { IProduct } from "../types/produc";
import mongo from "../admin";
import Product from "../models/product";
import { Socket } from "socket.io-client";

const cron = require('node-cron');
const moment = require('moment');

mongo.connect();

export function codeexpirationDates(socket: Socket, daysExpiration: number, categories: string[]) {
    cron.schedule("0 10 * * *", async () => {
        console.log("Running a job every 5 seconds in Colombia");

        const products = await Product.find({
            expirationDate: { $lte: moment().add(daysExpiration, "days").toDate() },
            category: { $in: categories },
        });

        const closeToExpireByCategory: Record<any, any> = {};

        for (const category of categories) {
            const filteredProducts = products.filter((product: IProduct) => product.category === category);

            if (filteredProducts.length > 0) {
                const closestProduct = filteredProducts.reduce((prev: any, current: any) => {
                    const prevExpirationDate = moment(prev.expirationDate);
                    const currentExpirationDate = moment(current.expirationDate);
                    return prevExpirationDate.isBefore(currentExpirationDate) ? prev : current;
                });

                closeToExpireByCategory[category] = {
                    stock_showcase: 0,
                    stock_store: 0,
                    tags: [],
                    unitOfMeasure: "",
                    id: closestProduct.id,
                    local_id: closestProduct.local_id,
                    for_unsubscribing: closestProduct.for_unsubscribing,
                    discharged: closestProduct.discharged,
                    // Agregar el resto de propiedades requeridas de IProduct aquí
                    title: closestProduct.title,
                    expirationDate: closestProduct.expirationDate
                };
            }
        }

        console.log(closeToExpireByCategory);
        socket.emit("productExpiration", closeToExpireByCategory); // Emitir evento al socket
    }, {
        scheduled: true,
        timezone: "America/Bogota",
    });
}
