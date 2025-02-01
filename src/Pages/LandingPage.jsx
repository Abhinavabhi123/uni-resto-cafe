import Categories from "../Components/Categories";
import Header from "../Components/Header";
import DishList from "../Components/DishList";

export default function LandingPage() {
  return (
    <div className="w-screen h-full">
      <Header />
      <Categories />
      <DishList />
    </div>
  );
}
