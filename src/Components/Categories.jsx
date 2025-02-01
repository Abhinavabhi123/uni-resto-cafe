
import { useDishContext } from "../context/dishes";

export default function Categories() {
  const { state, changeCategoryId } = useDishContext();
  
  // code for Select the category
  function selectCategory(id) {
    changeCategoryId(id);
  }

  return (
    <div className="w-[100vw] h-16  px-5 ">
      <div className="w-full h-16 overflow-x-scroll horizontal_scroll">
        <div className="flex h-full items-center ">
          {state?.items.table_menu_list &&
            state?.items?.table_menu_list.map((item, index) => (
              <div
                onClick={() => selectCategory(item?.menu_category_id)}
                key={index}
                className={`flex-shrink-0 w-fit border-b-2 px-4 md:px-8 ${
                  state?.selectedCategoryId === item?.menu_category_id
                    ? "border-red-500"
                    : "border-gray-500"
                }`}
              >
                <p
                  className={`${
                    state?.selectedCategoryId === item?.menu_category_id
                      ? "text-red-500"
                      : "text-gray-500"
                  } text-center cursor-pointer`}
                >
                  {item?.menu_category ? item?.menu_category : `Menu item`}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
