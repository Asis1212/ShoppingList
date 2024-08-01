import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { increment } from '../features/counter/TotalSlice';

import { IState as props } from '../App';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import SubmitButton from './SubmitButton';
 
interface Iprops  {
    options: props['options'],
    products: props['products'],
    setProducts: React.Dispatch<React.SetStateAction<props['products']>>
}

const Form: React.FC<Iprops> = ({options, products, setProducts}) => {
    const [formData, setFormData] = useState({
        name: "",
        category: ""
    });

    const dispatch = useDispatch();

    const handleChange = (e : React.ChangeEvent<HTMLInputElement> | any) => {
        if(e.target?.name) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        } else {
            setFormData({
                ...formData,
                category: e
            })
        }
    };

    const onSubmit = () => {
        let newProductsList = products;
        const isCategoryExist = newProductsList.findIndex(product => product.category === formData.category);
        if(isCategoryExist === -1) {
            let newCategory = {
            category: formData.category,
            totalAmount: 1,
            list: [{name: formData.name, amount: 1}]
            }

            newProductsList.push(newCategory);
        } else {
            newProductsList[isCategoryExist].totalAmount += 1;

            const isProductExist = newProductsList[isCategoryExist].list.findIndex(item => item.name === formData.name);
            if(isProductExist === -1) {
            let newProduct = {
                name: formData.name,
                amount: 1
            }

            newProductsList[isCategoryExist].list.push(newProduct);
            } else {
            newProductsList[isCategoryExist].list[isProductExist].amount += 1;
            }
        }

        setProducts(newProductsList);
        dispatch(increment());
    }
    
  return (
    <Container>
        <FormInput handleChange={handleChange}/>
        <FormSelect options={options} handleChange={handleChange}/>
        <SubmitButton text={"הוסף"} onSubmit={onSubmit} formData={formData}/>
    </Container>
  )
}

export default Form;

const Container = styled.form`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;