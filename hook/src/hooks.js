import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <h2>Count App</h2>
      <p>{count}</p>
      <button onClick={increment}>Clicked </button>
    </div>
  );
}

// class App extends Component {

//   state = {
//     count: 0
//   }
//   increment = () => {
//     this.setState({
//       count: this.state.count + 1
//     })
//   };


//   render() {
  //   return (
  //     <div>
  //       <h2>Count App</h2>
  //       <button onClick={this.increment}>Clicked {this.state.count}</button>
  //     </div>
  //   )
  // }
// }



export default App;
