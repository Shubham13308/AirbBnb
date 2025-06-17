"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Title from "@/components/properties/Title";
import { useFormSubmit } from "../hooks/useFormSubmit";
import PropertyReviewsCard from "@/components/card/PropertyReviewsCard";
import LoadingCards from "@/components/card/LoadingCards";
import SessionTimeoutModal from "@/components/ui/SessionTimeoutModal";

function ReviewsPage() {
  const pathname = usePathname();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSessionTimeoutModal, setShowSessionTimeoutModal] = useState(false);
  const { submitForm } = useFormSubmit();

  const fetchReviews = async () => {
    setLoading(true);
    await submitForm({
      url: "/api/review/fetch",
      onSuccess: (result) => {
        if (result.success === true) {
          setReviews(result.data);
        }
        setLoading(false);  
      },
      onError: (error) => {
        console.error("Error fetching reviews:", error);
        if (error.message === "Invalid token") {
          setShowSessionTimeoutModal(true);
        }
        setLoading(false); 
      }
    });
  };

  useEffect(() => {
    if (pathname !== "/reviews") return;
    console.log("Fetching reviews...");
    fetchReviews();
  }, [pathname]);

  return (
    <>
      <Title text="Your Reviews" />

      {showSessionTimeoutModal && <SessionTimeoutModal open={showSessionTimeoutModal} />}

      {loading ? (
        <LoadingCards />
      ) : (
        <section className="grid md:grid-cols-2 gap-8 mt-4">
          {reviews.map((property) => (
            <PropertyReviewsCard key={property._id} property={property} />
          ))}
        </section>
      )}
    </>
  );
}

export default ReviewsPage;
