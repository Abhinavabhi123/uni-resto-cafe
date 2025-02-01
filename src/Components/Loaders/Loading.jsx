import "./loading.css";

export default function Loading() {
  return (
    <div className="w-screen h-screen overflow-x-hidden flex justify-center items-center">
      <div className="custom-loader"></div>
    </div>
  );
}
