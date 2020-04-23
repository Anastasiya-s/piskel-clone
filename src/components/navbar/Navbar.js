import React from 'react';

import { Button } from './components/button';

import logo from './img/logo.png';

import * as S from './Navbar.styles';

const Navbar = () => (
  <S.Container>
    <img src={logo} />
    <S.Title>Piskel Title</S.Title>
    <div>
      <Button>Create new</Button>
      <Button>Sign in</Button>      
    </div>
  </S.Container>
);

export default Navbar;