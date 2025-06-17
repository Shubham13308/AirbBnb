import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { fetchProperties } from "@/app/redux/actions/propertyAction";
import { Button } from "../ui/button"; 
const NavSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const searchParams = useSearchParams();
  const dispatch = useDispatch();


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);


  useEffect(() => {
    if (!debouncedText) return;

    const category = searchParams.get("category") ?? "0";
    const selectedCountry = searchParams.get("selectedCountry") ?? "0";

    dispatch(fetchProperties(category, debouncedText, selectedCountry));
  }, [debouncedText, searchParams.toString(), dispatch]);


  const handleClear = () => {
    setSearchText("");
    setDebouncedText("");


    const category = searchParams.get("category") ?? "0";
    const selectedCountry = searchParams.get("selectedCountry") ?? "0";

    dispatch(fetchProperties(category, "", selectedCountry));
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Find a property..."
        className="max-w-xs dark:bg-muted"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button onClick={handleClear} variant="outline" size="sm">
        Clear
      </Button>
    </div>
  );
};

export default NavSearch;
