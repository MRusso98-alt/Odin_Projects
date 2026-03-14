import './index.css'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext } from 'react';
import { useState } from 'react';
import { Homepage } from './homepage';
import { Shop } from './shop';
import { Cart } from './cart';

export const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <StoreContext.Provider value = {[cart, setCart]}>
      {children}
    </StoreContext.Provider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>
);