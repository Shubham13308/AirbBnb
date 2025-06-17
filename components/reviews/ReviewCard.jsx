import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Rating from './Rating';
import Comment from './Comment';

function ReviewCard({ reviewInfo, children ,useInfo }) {


  return (
    <Card className='relative'>
      <CardHeader>
        <div className='flex items-center'>
          <img
            src={reviewInfo?.image}
            alt='profile'
            className='w-12 h-12 rounded-full object-cover'
          />
          <div className='ml-4'>
            <h3 className='text-sm font-bold capitalize mb-1'>
              {reviewInfo?.name}
            </h3>
            <Rating rating={reviewInfo.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewInfo.rating_description} />
      </CardContent>
     
      <div className='absolute top-3 right-3'>{children}</div>
    </Card>
  );
}

export default ReviewCard;
