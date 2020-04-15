import React from 'react'
import styled from 'styled-components'

import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeProduct } from '../../actions';

const CartItem =({ product }) => {
  const productQuantity = useSelector((state) => state.cart[product.id].quantity);

  console.log(productQuantity)
  console.log(product)

  const subtotal = useSelector((state) => {
    let newPrice = state.cart[product.id].price
    newPrice = newPrice.split('$')[1]
    console.log(newPrice)
    return state.cart[product.id].quantity * Number(newPrice)
  }) 

  const dispatch = useDispatch();
  console.log(product.quantity)

  return (
    <Wrapper>
      <ItemWrapper>
        <PlaceholderItem src={product.imageSrc} />
      </ItemWrapper>

      <DescriptionWrapper>{product.name}</DescriptionWrapper>

      <PriceWrapper>
      <Price>{product.price}</Price>
      </PriceWrapper>

      <QuantityWrapper>
        <QuantityInput 
          type="number"
          min="0"
          max={product.numInStock}
          value={productQuantity}
          onChange={(ev) => {
            if (product.numInStock === 0) return
              dispatch(updateQuantity(product.id, ev.target.value))
            }
          }
        />
      </QuantityWrapper>

      <TotalWrapper>
        <RemoveButton onClick={() => dispatch(removeProduct(product.id))}>
          Remove
        </RemoveButton>
      <TotalPrice>${subtotal.toFixed(2)}</TotalPrice>
      </TotalWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid; 
  grid-template-columns: 32% 32% 12% 12% 12%;
  color: black;
  height: 20vh;
  border: 1px solid black;
  margin: 2px;
  font-size: 18px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid black;
`;

const PlaceholderItem = styled.img`
  display: flex;
  justify-content: center;
  width: auto;
  height: 158px;
  text-align: center;
`;

const DescriptionWrapper = styled.div`
  margin: 10px;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;
`;

const QuantityInput = styled.input`
  display: flex;
  justify-content: center;
  width: 25px;
  height: 25px;
  margin: auto;
  font-size: 15px;
`;

const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;
  margin: 0 auto;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  font-weight: bolder;
  outline: none;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
`;



export default CartItem
