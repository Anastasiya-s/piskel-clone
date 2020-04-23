import React from 'react';

import * as S from './DrawField.style';

class DrawField extends React.Component {
  render() {
    return (
      <div>
        Draw Field
        <S.Canvas ref='canvas'/>
      </div>
    );
  }
}

export default DrawField;