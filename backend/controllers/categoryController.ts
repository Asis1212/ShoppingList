import { Request, Response } from 'express';
import db from '../models';

export const getCategories = async (req: Request, res: Response) => {
    try {
      let categories = await db.Category.findAll();
      categories = categories.map((category:any) =>  { return {id: category.id, name: category.name}});
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };