import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import the spinner
import SpinnerSrc from './spinner.gif';

const ProductsList = ({ products }) => {
  const state = useSelector((state) => state.products);

  return (
    <>
      {state.status === 'idle' && state.status !== 'error'
        ? Object.values(products).map((product) => {
            return (
              <PlaceholderItem key={product._id} to={`/product/${product._id}`}>
                <ProductPicture
                  key={product._id}
                  src={product.imageSrc}
                  alt={product.name}
                ></ProductPicture>
                <Test>
                  <ProductPrice>{product.price}</ProductPrice>
                  {product.name}
                </Test>
              </PlaceholderItem>
            );
          })
        : state.status !== 'error' && (
            <Spinner src={SpinnerSrc} alt='spinner'></Spinner>
          )}
    </>
  );
};

const PlaceholderItem = styled(Link)`
  width: 100%;
  height: 350px;
  text-align: center;
  background-color: white;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  font-size: 14px;
`;

const ProductPicture = styled.img`
  transition: 400ms ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Test = styled.div`
  max-width: 80%;
  min-height: 50px;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px 10px;
  position: absolute;
  bottom: 0;
`;

const ProductPrice = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Spinner = styled.img`
  height: 70px;
  width: 70px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export default ProductsList;
