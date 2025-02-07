import {createContext, useState} from 'react';

export const ProductContext = createContext(null);
export default Context = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ProductContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
