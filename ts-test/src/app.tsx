import * as React from 'react';
import * as svg from './a.dvg'

export interface ToolBarProps<T> {
  name:T
}

export interface ToolBarState{
}

class ToolBar<T> extends React.Component<ToolBarProps<T>, ToolBarState> {
  render() {
  return (<div>{this.props.name}</div>);
  }
}

type ToolBar2 = ToolBar<string>

const App:React.FunctionComponent = () => {
  return <div>
    app
    <ToolBar2 name={'12'}></ToolBar2>
  </div>
}


export default App