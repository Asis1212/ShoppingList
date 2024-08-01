import express from 'express';
import db from './models';
import cors from 'cors';
import {categories} from './seeders/categories';
import categoryRouter from './routes/categoryRoutes';
import orderRouter from './routes/orderRoutes';

const createCategories = async() => {
    const count = await db.Category.count();
    if(count === 0) {
        categories.map((category) => {
            db.Category.create(category)
        });
    }
};

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/categories', categoryRouter);
app.use('/orders', orderRouter);


db.sequelize.sync().then(() => {
    createCategories();
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
        
    });
})