import React from 'react';

import * as S from './Tool.style';

const Tool = ({ icon }) => (
  <div>
    <S.Tool>
      <img src={icon} />
    </S.Tool>
  </div>
);

export default Tool;