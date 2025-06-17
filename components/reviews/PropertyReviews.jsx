import Title from '@/components/properties/Title';
import ReviewCard from './ReviewCard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Rating from './Rating';
import Comment from './Comment';

const PropertyReviews = ({ reviews, appendReview }) => {
  if (!reviews || reviews.length < 1) return null;
 

  return (
    <div className="mt-8">
      <Title text="Reviews" />


      <div className='grid md:grid-cols-2 gap-8 mt-4'>
        {appendReview?.map((review, idx) => (
          <Card key={`append-${idx}`} className='relative'>
            <CardHeader>
              <div className='flex items-center'>
                <div className='ml-4'>
                  <h3 className='text-sm font-bold capitalize mb-1'>You</h3>
                  <Rating rating={review.rating} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Comment comment={review.comment} />
            </CardContent>
          </Card>
        ))}
      </div>


      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const { rating_description, rating } = review;
          const { username, image } = review?.user || {};

          const reviewInfo = {
            rating_description,
            rating,
            name: username,
            image: image,
          };

          return (
            <ReviewCard key={review.review_id} reviewInfo={reviewInfo} />
          );
        })}
      </div>
    </div>
  );
};

export default PropertyReviews;
