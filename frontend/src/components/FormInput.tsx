import React from 'react'
import styled from 'styled-components'

import { Input } from 'antd';

interface Iprops {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProductInput:React.FC<Iprops>  = ({handleChange}) => {

  return (
    <Container>
      <label>שם מוצר</label>
      <Input placeholder="הכנס מוצר" className='input' name='name' onChange={(e) => handleChange(e)}/>
    </Container>
  )
}

export default ProductInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  label {
    font-weight: 600;
    color: rgba(0,0,0,0.5);
  }

  .input {
    direction: RTL;
    width: 300px;
  }
`;