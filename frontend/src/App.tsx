import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import './App.css';
import type { RootState } from './app/Store';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { reset } from './features/counter/TotalSlice';
import { ClipLoader } from 'react-spinners';


import SubmitButton from './components/SubmitButton';
import Form from './components/Form';

export interface IState {
  products: {
    category: string
    totalAmount: number
    list: {
      name: string
      amount: number
    }[]
  }[],
  options: {
    value: string
    label: string
  }[],
}

function App() {
  const [products, setProducts] = useState<IState["products"]>([]);
  const [options, setOptions] = useState<IState["options"]>([]);
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useDispatch();

  const totalItems = useSelector((state: RootState) => state.counter.totalItems)

  useEffect(() => {
    try {
      fetch('http://localhost:3001/categories').then((res) => {
        return res.json();
      })
      .then((data) => {
        const optionsList = data.map((item: any) => { return {value: item.name, label: item.name}});
        setOptions(optionsList);
      }).catch((error) => {
        console.log('Failed to fetch data from server', error);
      });
    } catch (error) {
        console.log('There is an error!', error);
    }
  }, []);

  const renderList = (): JSX.Element[] => {
    return products.map((product, index) => {
      return (
        <div key={index} className='list-item'>
          <span className='category-title'>{product.category} - {product.totalAmount} מוצרים</span>
          <ul className='products-list'>
            {product.list.map((item, index) => {
              return (
                <li key={index}>{item.name}{item.amount > 1 ? <> - {item.amount}</> : <></> }</li>
              )
            })}
          </ul>
        </div>
      )
    });
  }

  const handleSubmit = async () : Promise<void> => {    
    let orderSummary: any = [];
    products.forEach((list) => {
      list.list.forEach((product) => {
        orderSummary = [...orderSummary, product]
      });
    });
    try {
      const response = await fetch('http://localhost:3001/orders/createOrder', {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({totalAmount: totalItems, productList: orderSummary}),
      })
      if(response.status === 201) {
        setProducts([]);
        dispatch(reset());

        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }
    } catch (err) {
      console.log('Failed to create order', err);
    }
    
    
  }  

  return (
    <div className="App">
      <FormContainer>
        <h1>רשימת קניות</h1>
        <span>סה״כ: {totalItems} מוצרים</span>
        <Form options={options} products={products} setProducts={setProducts}/>
      </FormContainer>
      <ListContainer>
        <h3>יש לאסוף מוצרים אלו במחלקות המתאימות</h3>
        <List>{renderList()}</List>
        {products.length ?  <SubmitButton text={"שלח הזמנה"} onSubmit={handleSubmit}/> : <></>}
        {showMessage && <div className='success-wrapper'>
          <span className='success-message'>הזמנתך נשלחה בהצלחה !</span>
          <ClipLoader size={12} color='#4F8A10' speedMultiplier={0.6}/>
        </div>}
      </ListContainer>
    </div>
  );
}

export default App;

const FormContainer = styled.div`
  width: 100%;  
  padding-block: 10px 25px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 55px;

  .success-wrapper {
    direction: rtl;
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }

  .success-message {
    font-size: 22px;
    font-weight: 900;
    color: #4F8A10;
    letter-spacing: 1px;
  }
`;
  
  const List = styled.div`
  padding-inline: 35px;
  direction: rtl;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 85px;

  @media(max-width: 1050px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(max-width: 650px) {
    grid-template-columns: 1fr;
  }


  .list-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .category-title {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: .5px;
  }

  .products-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;
