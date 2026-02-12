'use client';
import dynamic from 'next/dynamic';

const IntroDataFetchClient = dynamic(
  () => import('@/components/intro-data-fetch-client'),
  {
    ssr: false,
  },
);

export default function Page() {
  return <IntroDataFetchClient />;
}
