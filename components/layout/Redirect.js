import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from './Loading';

export default function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, []);

  return <Loading />;
}
