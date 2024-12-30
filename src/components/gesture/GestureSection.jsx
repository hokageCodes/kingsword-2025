import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const GestureSection = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  const actions = [
    {
      label: 'VOLUNTEER',
      imageUrl: '/assets/connect1.webp',
      alt: 'Volunteer',
      link: '/volunteer-form',
    },
    {
      label: 'GIVE',
      imageUrl: '/assets/connect2.webp',
      alt: 'Give',
      link: '/give',
    },
    {
      label: 'CONNECT',
      imageUrl: '/assets/other1.webp',
      alt: 'Connect',
      link: '/connect',
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
            Want to be a part of this movement?
          </h2>
        </div>
        <div className="flex flex-wrap justify-center items-stretch gap-4">
          {actions.map((action, index) => (
            <a
              key={index}
              href={action.link}
              className="flex-1 min-w-[24rem] max-w-xs relative h-96"
              style={{ textDecoration: 'none' }}
            >
              {loading ? (
                <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
              ) : (
                <>
                  <img
                    src={action.imageUrl}
                    alt={action.alt}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 rounded-lg">
                    <h3 className="text-white text-3xl lg:text-5xl font-bold text-center">
                      {action.label}
                    </h3>
                  </div>
                </>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestureSection;
