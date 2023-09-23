import React from 'react';
import GetUserData from './Components/ApiHandle';
import HeaderComponent from './Components/Header';


// App contains the Header Component and the UserData called and organized from MockApi.

function App() { 
  return (
    <div className='App'>
      <HeaderComponent />
      <GetUserData />
    </div>
  )

}

export default App;
