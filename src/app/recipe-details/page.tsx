'use client';
import React, { Suspense } from 'react';
import Loading from '@/components/loading';
import RecipeDetails from '@/components/recipe-details';

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RecipeDetails />
    </Suspense>
  );
};

export default Page;
