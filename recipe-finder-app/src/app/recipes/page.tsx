"use client";

import React, { lazy, Suspense } from "react";

import Loading from "@/components/loading";

const RecipeList = lazy(() => import("@/components/recipe-list"));

export default function Recipes() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex-row justify-between">
        <h1 className="text-5xl m-5">Recipes</h1>
      </div>

      <Suspense fallback={<Loading />}>
        <RecipeList />
      </Suspense>
    </div>
  );
}
