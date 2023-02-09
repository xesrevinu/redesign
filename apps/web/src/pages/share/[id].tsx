import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Share() {
  const { query } = useRouter();
  const { id } = query;

  return <>id: {id}</>;
}
