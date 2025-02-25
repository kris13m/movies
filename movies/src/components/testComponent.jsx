import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';
import { useAuth } from '../contexts/AuthContext';

function ChildComponent(){
    const { authUser, isLoggedIn, setAuthUser, setIsLoggedIn } = useAuth(); 

    const clicked = () => {
      if(isLoggedIn)
        setIsLoggedIn(false)
      else
      setIsLoggedIn(true)
    }


    return(
      <>
      <h4>childcomponent, value = true = {isLoggedIn.toString()}</h4>
      <button onClick = {clicked}>toggler :D</button>
      </>
    )
}

export default ChildComponent;


/*function ChildComponent() {
  const { value, setValue } = useContext(MyContext);

  const changeValue = () => {
    if(value != 'new value')
    setValue('new value');
    else
    setValue('old value');
  };

  return (
    <div>
      <h3>this is the child component</h3>
      <p>Current value: {value}</p>
      <button onClick={changeValue}>Change Value</button>
      <h3>this is still the child component</h3>
    </div>
  );
}

export default ChildComponent;*/