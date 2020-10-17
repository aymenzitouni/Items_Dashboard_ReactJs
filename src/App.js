import React, { Component } from 'react';
import Movies from './components/movies'

class App extends Component {
    state = {  }
    render() { 
        return ( <React.Fragment>
            <Movies />
        </React.Fragment>
             );
    }
}
 
export default App;