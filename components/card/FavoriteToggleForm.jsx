"use client";

import { useDecodedToken } from "@/app/hooks/useDecodedToken";
import { useState, useEffect } from "react";
import { FaHeart, FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
import { useFormSubmit } from "@/app/hooks/useFormSubmit";
import { useSelector } from "react-redux";
import SessionTimeoutModal from "../ui/SessionTimeoutModal";

function FavoriteToggleForm({ propertyId }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favid, setFavID] = useState('');
  const [token, setToken] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const user = useDecodedToken();
  const { submitForm } = useFormSubmit();

  const propertyList = useSelector((state) =>
    state?.property?.properties?.favourites || []
  );

useEffect(() => {
  if (Array.isArray(propertyList)) {
    const matchingFavorite = propertyList.find(
      (fav) =>
        fav?.property_id?.toString().trim() === propertyId?.toString().trim()
    );

    const newFavID = matchingFavorite?.favourite_id || "";
    const newIsFavorited =
      matchingFavorite?.favourite_status === true ||
      matchingFavorite?.favourite_status === "1";

   
    if (favid !== newFavID) setFavID(newFavID);
    if (isFavorited !== newIsFavorited) setIsFavorited(newIsFavorited);
  }
}, [propertyList, propertyId]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const checkTokenExpiry = (message) => {
    if (["Invalid token", "Token expired"].includes(message)) {
      setShowTimeoutModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("You need to be logged in to favorite a property.");
      return;
    }

    if (!user) {
      toast.error("User session not found.");
      return;
    }

    setLoader(true);
    const status = isFavorited ? "0" : "1";

    try {
      const formData = new FormData();
      formData.append("user_id", user?.user_id);
      formData.append("property_id", propertyId);
      formData.append("status", status);

      if (status === "0" && favid) {
        formData.append("fav", favid);
      }

      await submitForm({
        url: "/api/favourite/create", 
        formData,
        onSuccess: (result) => {
          if (result.success) {
            setIsFavorited(
              result.favourite_status === true ||
              result.favourite_status === "1"
            );
          } else {
            toast.error(result.message);
          }
        },
        onError: (errorResponse) => {
          toast.error("Something went wrong.");
          console.log("API error:", errorResponse);
          checkTokenExpiry(errorResponse?.message);
        },
      });
    } catch (error) {
      console.log("Client error:", error);
      checkTokenExpiry(error?.message);
    } finally {
      setLoader(false);
    }
  };



  return (
    <>
      <SessionTimeoutModal
        open={showTimeoutModal}
        onClose={() => setShowTimeoutModal(false)}
      />
      <button
        onClick={handleSubmit}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-all"
        aria-label="Toggle Favorite"
        disabled={loader}
      >
        {loader ? (
          <FaSpinner className="w-5 h-5 animate-spin text-gray-500" />
        ) : (
          <FaHeart
            className={`w-5 h-5 transition-colors ${
              isFavorited ? "text-red-500" : "text-gray-400"
            }`}
          />
        )}
      </button>
    </>
  );
}

export default FavoriteToggleForm;
