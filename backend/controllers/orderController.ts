import { Request, Response } from 'express';
import {v4 as uuidv4} from 'uuid';
import db from '../models';

export const getOrders = async (req: Request, res: Response) => {
    try {
      let orders = await db.Order.findAll();
      orders = orders.map((order:any) =>  { return {id: order.id, totalAmount: order.totalAmount, productList: order.productList}});
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    const id = uuidv4();
    const body = req.body;
    const data = {
        id: id,
        totalAmount: body.totalAmount,
        productList: JSON.stringify(body.productList),
    }
    
    try {
        const order = await db.Order.create(data);
        res.status(201).json(order);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};