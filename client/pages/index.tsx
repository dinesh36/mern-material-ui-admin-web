import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line
      if ((window.location as any).pathname === '/') {
        // eslint-disable-next-line
        return router.push('/home');
      }
      // eslint-disable-next-line
      router.push((window.location as any).pathname);
    }, 100);
  }, [router]);

  return null;
};

export default HomePage;
