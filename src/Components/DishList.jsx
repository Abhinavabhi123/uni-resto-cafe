import { GoPlus } from "react-icons/go";
import { HiMiniMinus } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useDishContext } from "../../src/context/dishes";

export default function DishList() {
  const { state, incrementCartQty, decrementCartQty, addToCart } =
    useDishContext();
  const [data, setData] = useState([]);

  // Fix: Ensure filtering runs when state.items changes
  useEffect(() => {
    if (state.selectedCategoryId && state.items?.table_menu_list) {
      const filteredData = state.items.table_menu_list.filter(
        (item) => item.menu_category_id === state.selectedCategoryId
      );
      setData(filteredData);
    }
  }, [state.selectedCategoryId, state.items]); // Added `state.items` dependency

  function getCartData(dish_id) {
    if (state?.cartData) {
      return state.cartData.find((cartItem) => cartItem.dish === dish_id);
    }
    return null; // Return null if no cart data is available
  }

  return (
    <div className="w-full h-[85dvh] md:h-[38rem] py-3 px-8 space-y-2 overflow-y-scroll hide_scrollbar">
      {data.length > 0 &&
        data[0]?.category_dishes.length > 0 &&
        data[0]?.category_dishes.map((item, index) => {
          const cartItem = getCartData(item?.dish_id);

          return (
            <div
              key={index}
              className="min-h-32 h-fit w-full bg-white border-b-2 border-gray-300"
              onClick={() => addToCart(item?.dish_id)}
            >
              <div className="flex gap-2 w-full h-full">
                {/* Dish Type Indicator */}
                <div
                  className={`size-5 border p-[3px] ${
                    item?.dish_Type === 1
                      ? "border-red-500"
                      : "border-green-500"
                  }`}
                >
                  <div
                    className={`size-full rounded-full ${
                      item?.dish_Type === 1 ? "bg-red-500" : "bg-green-500"
                    }`}
                  ></div>
                </div>
                <div className="w-full space-y-1">
                  <p className="w-full font-bold text-sm md:text-base">
                    {item?.dish_name}
                  </p>
                  <div className="w-full flex justify-between">
                    <p className="text-sm text-gray-700 font-bold">{`${item?.dish_currency} ${item?.dish_price}`}</p>
                    <p className="text-sm text-gray-700 font-bold">
                      {item?.dish_calories} Calories
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {item?.dish_description}
                  </p>

                  {/* Cart Functionality */}
                  {cartItem && (
                    <div className="w-fit h-fit flex items-center bg-green-500 rounded-4xl overflow-hidden py-[4px]">
                      <div
                        className="w-8 flex justify-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          decrementCartQty(item?.dish_id);
                        }}
                      >
                        <HiMiniMinus />
                      </div>
                      <span className="w-8 text-center text-sm">
                        {cartItem?.count ?? 0}
                      </span>
                      <span
                        className="w-8 flex justify-center text-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          incrementCartQty(item?.dish_id);
                        }}
                      >
                        <GoPlus />
                      </span>
                    </div>
                  )}
                  {cartItem ? (
                    <p className="text-red-500 text-sm">
                      Customization Available
                    </p>
                  ) : item?.dish_Availability ? (
                    <p className="text-sm text-green-500">Available</p>
                  ) : (
                    <p className="text-red-500 text-sm">Not Available</p>
                  )}
                </div>
                <div className="flex justify-center items-center w-32 h-full">
                  {item?.dish_image ? (
                    <img
                      className="w-24 h-20 object-cover rounded-xl"
                      src={item?.dish_image}
                      alt="food image"
                    />
                  ) : (
                    <img
                      className="w-24 h-20 object-cover rounded-xl"
                      src="https://th.bing.com/th/id/R.5e9d914158f20abde43751bc56170aff?rik=IVjPf86fA0ExdQ&riu=http%3a%2f%2fwww.zedamagazine.com%2fwp-content%2fuploads%2f2018%2f06%2fIndian-Food-Samosa-Dish-HD-Wallpapers.jpg&ehk=CIZsxVe5CLA%2fpZXkiCdJuoTdrhucm2fgYqo%2fkXVfHls%3d&risl=&pid=ImgRaw&r=0"
                      alt="food image"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
