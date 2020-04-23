import React from 'react';

import * as S from './FramesList.style';

const FramesList = ({ frames, onAddButtonClick, onClick }) => {
  if (!frames) {
    onAddButtonClick
    return(
      <S.Frame />
    )
  } 
  return (  
  <S.Container>
    FramesList
  <p>id: </p>
    <div>
      {frames.map(frame => <S.Frame key={frame.id} src={frame.img} onClick={onClick}/>)}
    </div>
    {/* <S.Frame src={frames}/> */}
    <button onClick={onAddButtonClick}>Add new frame</button>
  </S.Container>
  );
}

export default FramesList;