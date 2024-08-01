import React from 'react'
import { Button } from 'antd';

interface Iprops  {
  text: string,
  onSubmit: () => void,
  formData?: {
    name: string,
    category: string
  }
}

const SubmitButton: React.FC<Iprops>  = ({text, onSubmit, formData}) => {

    const onClick = () => {
      onSubmit();
    }

  return (
    <Button type="primary" onClick={onClick}>
          {text}
    </Button>
  )
}

export default SubmitButton