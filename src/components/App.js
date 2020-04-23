import React from 'react';
import nanoid from 'nanoid';

import { DrawField } from './canvas';
import { Navbar } from './navbar';
import { Toolbar } from './toolbar';
import { FramesList } from './frames';

import * as S from './App.styles';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentColor: '',
      framesList: [],
      currentFrameId: 0,
      currentFrameImage: null,
    }
    this.handleUpdatingFrame = this.handleUpdatingFrame.bind(this);
    this.handleGettingFrame = this.handleGettingFrame.bind(this);
    this.handleAddingNewFrame = this.handleAddingNewFrame.bind(this);
  }

  generateNewId() {
    const id = nanoid(4);
    return id;
  }

  handleGettingFrame(id) {
    this.setState({ currentFrame: id})
  }

  handleAddingNewFrame() {
    const id = this.generateNewId();
    const newFrame = { id: id, img: null }
    this.setState({ currentFrameId: id});
    this.setState({framesList: [ ...this.state.framesList, newFrame ]});
  }

  handleUpdatingFrame(image) {
    this.setState({ currentFrameImage: image });
    const newFrames = this.state.framesList.map(frame => frame.id === this.state.currentFrameId ? { ...frame, img: image} : frame);
    this.setState({ framesList: newFrames });
  }

  componentDidMount() {
    this.handleAddingNewFrame();
  }


  render() {
    console.log(this.state.framesList)
    return (
      <S.AppContainer>
        <Navbar />
        <S.Main>
          <S.AsideMenu>
            <Toolbar />
            <FramesList 
              frames={this.state.framesList}
              onAddButtonClick={this.handleAddingNewFrame}
              onFrameClick={this.handleGettingFrame}
            />
          </S.AsideMenu>
          <DrawField 
            onFrameChange={this.handleUpdatingFrame}
            frame={this.state.framesList[this.state.currentFrameId]}
          />
        </S.Main>
      </S.AppContainer>
    );
  }
}

export default App;