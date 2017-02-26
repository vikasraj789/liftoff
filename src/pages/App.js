import React, { Component } from 'react';
import './../styles/styles.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {indigo700} from 'material-ui/styles/colors';
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo700,
    primary2Color: indigo700,
    accent1Color: indigo700
  }
});

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <MuiThemeProvider muiTheme={muiTheme}>
          {this.props.children}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
