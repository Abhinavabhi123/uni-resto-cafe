import { GoPlus } from "react-icons/go";
import { HiMiniMinus } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useDishContext } from "../../src/context/dishes";

export default function DishList() {
  const { state ,incrementCartQty,decrementCartQty} = useDishContext();
  const [data, setData] = useState([]);

  // code for filtering dish data based on the selected category
  useEffect(() => {
    if (state.selectedCategoryId) {
      const filteredData = state?.items?.table_menu_list.filter((item) => {
        return item.menu_category_id === state?.selectedCategoryId;
      });
      setData(filteredData);
    }
  }, [state?.selectedCategoryId]);

  return (
    <div className="w-full h-[85dvh] md:h-[38rem]  py-3 px-8 space-y-2 overflow-y-scroll hide_scrollbar">
      {data[0] &&
        data[0]?.category_dishes.length > 0 &&
        data[0]?.category_dishes.map((item, index) => (
          <div
            key={index}
            className="min-h-32 h-fit w-full bg-white border-b-2 border-gray-300"
          >
            <div className="flex gap-2 w-full h-full">
              <div
                className={`size-5 border  p-[3px] ${
                  item?.dish_Type === 1 ? "border-red-500" : "border-green-500"
                }`}
              >
                <div
                  className={`size-full rounded-full ${
                    item?.dish_Type === 1
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                ></div>
              </div>
              <div className="w-full space-y-1">
                <p className="w-full font-bold text-sm md:text-base">
                  {item?.dish_name}
                </p>
                <div className="w-full flex justify-between">
                  <p className="text-sm text-gray-700 font-bold">{`${item?.dish_currency}  ${item?.dish_price}`}</p>
                  <p className="text-sm text-gray-700 font-bold">
                    {item?.dish_calories} Calories
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  {item?.dish_description}
                </p>
                {/* cart functionality button */}
                {item?.addonCat.length > 0 && (
                  <div className="w-fit h-fit flex items-center bg-green-500 rounded-4xl overflow-hidden py-[4px]">
                    <div className="w-8 flex justify-center cursor-pointer" onClick={()=>decrementCartQty(item?.dish_id)}>
                      <HiMiniMinus />
                    </div>
                    <span className="w-8 text-center text-sm">
                      {item?.addonCat.length ? item?.addonCat.length : "0"}
                    </span>
                    <span className="w-8 flex justify-center text-center cursor-pointer" onClick={()=>incrementCartQty(item?.dish_id)}>
                      <GoPlus />
                    </span>
                  </div>
                )}
                {item?.addonCat.length > 0 ? (
                  <p className="text-red-500 text-sm">
                    Customization Available
                  </p>
                ) : item?.dish_Availability ? (
                  <p className="text-sm text-green-500">Available</p>
                ) : (
                  <p className="text-red-500 text-sm">Not Available</p>
                )}
              </div>
              <div className=" flex justify-center items-center w-32 h-full">
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
        ))}
    </div>
  );
}
