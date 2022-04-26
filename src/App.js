import { useState , useEffect} from 'react';
import './App.css';
import firebase from './Firebase/firebase'
import Routers from './Routers/Routers';
import Login from './Pages/Login/Login';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

function App() { 

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); 
  }, []);

  if (!isSignedIn) {
    return ( 
        <Login/>
    );
  }

  return (
    <div>
        <Routers/>     
    </div>
  )
 
}

export default App;
