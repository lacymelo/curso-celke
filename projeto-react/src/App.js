import React, { useState, useEffect} from "react";
// import Article from "./components/Article";
// import Header from "./components/Header";
// import Menu from "./components/Menu";


function App() {
   const [ date, setPeople ] = useState({name: '', phone: ''});

  // let state = {
  //   date: new Date(),
  //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tortor diam, auctor nec facilisis facilisis, ornare nec erat. Vestibulum ornare turpis ex, a aliquet diam tincidunt in. Aenean fringilla ex id urna tincidunt eleifend. Aliquam eu tempor velit',
  //   author: {
  //     name: 'Laciene',
  //     avatarUrl: 'https://placekitten.com/g/64/64'
  //   }
  // }

  function buscarProduto() {
    setPeople({name: 'Laciene', phone: '12345678910'});
  }

  useEffect(() => {
    buscarProduto();
  }, []);

  return (
    <div>

      <p>{date.phone}</p>
      {/* <button onClick={() => setPeople('Laciene')}>Alterar</button> */}

      {/* <Header />
      <Menu />
      <Article date={state} /> */}
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
