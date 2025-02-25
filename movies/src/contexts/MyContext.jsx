import { createContext } from 'react';

 const MyContext = createContext();

export function UseMyContext(){
    return useContext(MyContext);
}

export default MyContext;