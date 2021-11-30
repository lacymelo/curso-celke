import React from "react";
import Article from "./components/Article";
import Header from "./components/Header";
import Menu from "./components/Menu";


function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Article />
    </div>
  );
}

// function Welcome(props){
//   return <span>{props.name}</span>
// }

// class Welcome extends React.Component{
//   render() {
//     return <span>{this.props.name}</span>
    
//   }
// }

export default App;
