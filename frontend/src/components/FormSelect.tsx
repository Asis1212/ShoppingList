import React from 'react'
import styled from 'styled-components'

import { Select } from 'antd';

interface Iprops  {
    options: {
        value: string
        label: string
    }[],
    handleChange: (e: any) => void
}


const ProductTypeSelect: React.FC<Iprops> = ({options, handleChange}) => {
      
  return (
    <Container>
        <label>קטגוריה</label>
        <Select
            placeholder="בחר קטגוריה"
            className='select'
            dropdownStyle={{"direction": "rtl"}}
            onChange={(e) => {handleChange(e)}}
            options={options}
        />
    </Container>
  )
}

export default ProductTypeSelect;

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

    .select {
        width: 300px;
    }

    
`;