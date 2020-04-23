import React from 'react';

import { Tool } from './components/tool';

import colorpicker from './icons/tool-colorpicker.png';
import eraser from './icons/tool-eraser.png';
import bucket from './icons/tool-paint-bucket.png';
import pen from './icons/tool-pen.png';
import stroke from './icons/tool-stroke.png';
import colorswap from './icons/tool-colorswap.png';

import * as S from './Toolbar.style';

const Toolbar = () => (
  <S.Container>
    <Tool icon={pen}/>
    <Tool icon={colorpicker}/>
    <Tool icon={eraser}/>
    <Tool icon={bucket}/>
    <Tool icon={stroke}/>
    <Tool icon={colorswap}/>
  </S.Container>
);

export default Toolbar;