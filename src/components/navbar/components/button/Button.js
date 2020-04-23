import React from 'react';

import * as S from './Button.style';

const Button = ({ children, onClick }) => (
  <S.Button onClick={onClick}>
    {children}
  </S.Button>
);

export default Button;