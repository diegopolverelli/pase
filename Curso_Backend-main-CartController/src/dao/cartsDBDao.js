import { cartsModel } from './models/carts.models.js';
import mongoose from 'mongoose';


export class CartsDBDao {
    constructor() {
    }

    async get() {
        return await cartsModel.find()
    }

    async getById(idCart) {
        return await cartsModel.findOne({ _id: idCart })
    }

    async post(cart) {
        return await cartsModel.create(cart)
    }

    async updateOne(idCart, cart) {
        await cartsModel.updateOne({ _id: idCart }, cart)
        return cartsModel.findOne({_id:idCart})
    }

    async deleteOne(idCart) {
        return await cartsModel.deleteOne({ _id: idCart });
    }

}