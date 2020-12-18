import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  componentDidMount() {
    axios.get('/api/test').then(response => {
      console.log(response);
    })
  }
  render() {
    return (
      <div className="APP">
        My App
      </div>
    )
  }
}

export default App;
