import { createContext, useEffect, useState, useContext } from "react";
import { getDishesDetails } from "../services/apiService";

const DishContext = createContext();

// custom hook for context
export const useDishContext = () => {
  return useContext(DishContext);
};

export const DishContextProvider = (Props) => {
  const { children } = Props;
  const [state, setState] = useState({
    items: [],
    selectedCategoryId: "",
    cartData: [],
  });

  // getting data from REST api
  useEffect(() => {
    getDishesDetails(setState);
  }, []);

  // Code for creating cart and items for cart functionality
  useEffect(() => {
    if (state?.items?.table_menu_list) {
      const cart = [];

      state.items.table_menu_list.forEach((menu) => {
        menu.category_dishes.forEach((dish) => {
          if (dish.addonCat.length > 0) {
            cart.push({ dish: dish.dish_id, count: dish.addonCat.length });
          }
        });
      });

      setState((prev) => {
        if (JSON.stringify(prev.cartData) !== JSON.stringify(cart)) {
          return { ...prev, cartData: cart };
        }
        return prev;
      });
    }
  }, [state.items]);

  console.log(state,"state");
  

  // code for change the selected category
  const changeCategoryId = (newValue) => {
    setState((prev) => ({ ...prev, selectedCategoryId: newValue }));
  };

  // code increase the quantity of the cart item
  const incrementCartQty = (id) => {
    const { cartData } = state;
    let updatedCart = cartData.map((item) =>
      item.dish === id ? { ...item, count: item.count + 1 } : item
    );
    const itemExists = cartData.some((item) => item.dish === id);
    if (!itemExists) {
      updatedCart = [...updatedCart, { dish: id, count: 1 }];
    }
    setState((prev) => ({ ...prev, cartData: updatedCart }));
  };

  // code decrease the quantity of the cart item
  const decrementCartQty = (id) => {
    const { cartData } = state;
    const updatedCart = cartData
      .map((item) =>
        item.dish === id ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0);
    setState((prev) => ({ ...prev, cartData: updatedCart }));
  };

  // function to add item in cart
  function addToCart(id) {
    setState((prevState) => {
      const isIncluded = prevState.cartData.some((cartItem) => cartItem.dish === id);
  
      if (!isIncluded) {
        return {
          ...prevState,
          cartData: [...prevState.cartData, { dish: id, count: 1 }],
        };
      }
  
      return prevState; 
    });
  }
  

  return (
    <DishContext.Provider
      value={{ state, changeCategoryId, incrementCartQty, decrementCartQty,addToCart }}
    >
      {children}
    </DishContext.Provider>
  );
};
