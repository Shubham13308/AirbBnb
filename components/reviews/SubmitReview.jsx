"use client";

import { useState } from "react";
import FormContainer from "@/components/form/FormContainer";
import { Card } from "@/components/ui/card";
import RatingInput from "../form/RatingInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Button } from "../ui/button";
import SessionTimeoutModal from "../ui/SessionTimeoutModal";
import { useFormSubmit } from "@/app/hooks/useFormSubmit";
function SubmitReview({ propertyID ,setAppenData }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  // const [appendData,setAppenData]=useState([])
  const { submitForm } = useFormSubmit();
  
  const token = localStorage.getItem("token");
  const toggleReviewForm = () => {
    if (!token) {
      setShowTimeoutModal(true);
      return;
    }
    setIsReviewFormVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target.closest("form");
    const formData = new FormData(form); 

    formData.append("propertyID", propertyID); 
    
    await submitForm({
      url: "/api/review/create",
      formData,
      onSuccess: (result) => {
        if (result.status === 200) {
          const submittedData = Object.fromEntries(formData.entries());
          setAppenData(prev => [...(Array.isArray(prev) ? prev : []), submittedData]);

        
        }
      },
      onError: (error) => {
       

        if (error === "Invalid token" || error === "Token expired") {
          setShowTimeoutModal(true);
        }
      },
    });

 
    setIsReviewFormVisible(false);
  };
  // console.log(appendData,"append Data is as follows")
  return (
    <div className="mt-8">
      <SessionTimeoutModal
        open={showTimeoutModal}
        onClose={() => setShowTimeoutModal(false)}
      />
      <Button onClick={toggleReviewForm}>Leave a Review</Button>

      {isReviewFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer>
            <input type="hidden" name="propertyId" value={propertyID} />
            <RatingInput name="rating" />
            <TextAreaInput
              name="comment"
              labelText="feedback"
              defaultValue="Amazing place !!!"
            />
            <Button type="submit" onClick={handleSubmit} className="mt-4">
              Submit Review
            </Button>
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview;
