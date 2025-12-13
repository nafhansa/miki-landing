'use client';

import dynamic from 'next/dynamic';

const StoryHero = dynamic(() => import('./StoryHero'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />,
});

export default function DynamicStoryHero() {
  return <StoryHero />;
}
