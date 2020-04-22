import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

const Header = () => {
  const cartNumber = useSelector((state) => state.cart);
  return (
    <HeaderDiv>
      <Logo>H+VER</Logo>
      <LinkDiv>
        <li>
          <NavLink exact to='/' activeStyle={{ textDecoration: 'underline' }}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to='/shop'
            activeStyle={{ textDecoration: 'underline' }}
          >
            SHOP
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to='/about'
            activeStyle={{ textDecoration: 'underline' }}
          >
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to='/cart'
            style={{ display: 'flex' }}
            activeStyle={{ textDecoration: 'underline' }}
          >
            CART
            {Object.values(cartNumber).length > 0 ? (
              <div>&thinsp;&#40;{Object.values(cartNumber).length}&#41;</div>
            ) : null}
          </NavLink>
        </li>
      </LinkDiv>
    </HeaderDiv>
  );
};

const Logo = styled.div`
  font-size: 30px;
  font-family: 'Righteous', cursive;
  margin-left: 40px;
`;

const LinkDiv = styled.ul`
  list-style: none;
  display: flex;
  margin-right: 40px;
`;

const HeaderDiv = styled.div`
  width: 100%;
  border: 1px solid black;
  margin-top: 50px;
  font-family: 'Open Sans', sans-serif;
  padding: 30px 0px 30px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
    margin-left: 40px;
  }
`;

export default Header;
