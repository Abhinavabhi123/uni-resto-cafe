import axios from "axios";
const getDishesUrl = import.meta.env.VITE_SERVER_API

// Api for getting data from dishes api
export const getDishesDetails = async (updateState) => {
  await axios
    .get(getDishesUrl)
    .then((response) => {
      updateState({
        items: response?.data?.data[0],
        selectedCategoryId:
          response?.data?.data[0]?.table_menu_list[0]?.menu_category_id,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
