import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from './loading';

type Props = {
  to: string;
};

export default function Redirect({ to }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, []);

  return <Loading />;
}
