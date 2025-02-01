import { IoIosCart } from "react-icons/io";
import { useDishContext } from "../context/dishes";
import { useEffect, useState } from "react";

export default function Header() {
  const { state } = useDishContext();
  const [quantity, setQuantity] = useState(0);

  // code for calculating the total cart item
  useEffect(() => {
    if (state?.cartData) {
      const totalCount = state?.cartData?.reduce(
        (acc, curr) => acc + curr.count,
        0
      );
      setQuantity(totalCount);
    }
  }, [state]);

  return (
    <header className="w-full h-14 flex items-center justify-center py-10 px-10 border-b border-gray-200">
      <div className="w-full h-fit flex justify-between items-center">
        <div>
          <p className="font-bold text-gray-600 text-xl">
            {state && state?.items?.restaurant_name
              ? state?.items?.restaurant_name
              : "Restaurant"}
          </p>
        </div>
        <div className="w-fit h-fit flex items-center gap-5 cursor-pointer">
          <p className="text-gray-600">My Orders</p>
          <div className="relative cursor-pointer">
            <IoIosCart size={23} className="text-gray-600" />
            <div className="absolute rounded-full px-[8px] py-[3px] bg-red-500 -top-4 -right-3 flex justify-center items-center">
              <p className="text-white text-xs">{quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
