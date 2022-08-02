import { useState } from 'react';
import './App.css';
import Card from './component/Card/Card';
import Header from './component/Layout/Header';
import Meals from './component/Meals/Meals';
import CartProvider from './Store/CartProvider';

// Fetching data from the backend firebase 

function App() {
  const [cartIsShown, setcartIsShown] = useState(false)
  
  const shownCartHandler = () => {
    setcartIsShown(true)
  }
  
  const hideCartHandler = () => {
    setcartIsShown(false)
  }
  
  
  return (
    <CartProvider>
      {cartIsShown && <Card onClose={hideCartHandler}/>}    
      {/* above code will show card if cartIsShown is true */}

      <Header onShowCart = {shownCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
