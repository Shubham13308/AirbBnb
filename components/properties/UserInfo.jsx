import { Image } from '../ui/Image'; 

function UserInfo({ user, createdAt }) {
  const getTimeSince = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();

    const seconds = Math.floor((now - createdDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `Just now`;
  };

  return (
    <article className='grid grid-cols-[auto,1fr] gap-4 mt-4'>
      <Image
        src={user?.image}
        alt={user?.username || 'user'}
        width={50}
        height={50}
        className='rounded w-12 h-12 object-cover'
      />
      <div>
        <p>
          Hosted by <span className='font-bold'>{user?.username}</span>
        </p>
        <p className='text-muted-foreground font-light'>
          Posted {getTimeSince(createdAt)}
        </p>
      </div>
    </article>
  );
}

export default UserInfo;
