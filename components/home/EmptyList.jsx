'use client'
import { Button } from "../ui/button";
import { Player } from "@lottiefiles/react-lottie-player";
import { usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchProperties } from "@/app/redux/actions/propertyAction";
function EmptyList({ heading, message, btnText }) {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const handleFilter = () => {
    const category = searchParams.get("category") ?? "0";
    const search = searchParams.get("search") ?? "0";
    const country = searchParams.get("country") ?? "0";
    dispatch(fetchProperties(category, search, country));
  };
  return (
    <div className="mt-10 text-center">
      <h2 className="text-2xl font-bold text-muted-foreground">
        {heading || "No items found."}
      </h2>
      <p className="text-lg mt-2 text-gray-500">
        {message || "Keep exploring our properties"}
      </p>

      <div className="flex justify-center mt-6">
        <Player
          autoplay
          loop
          src="/lottie/NotFound1.json"
          style={{ height: "300px", width: "300px" }}
        />
      </div>

      <Button onClick={handleFilter} className="mt-6 capitalize" size="lg">
        {btnText || "Back home"}
      </Button>
    </div>
  );
}

export default EmptyList;
