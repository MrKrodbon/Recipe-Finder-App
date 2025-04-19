'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getRecipeByID } from '../lib/api/getRecipeByID';
import { Ingredients, RecipeInfo } from '../types/recipes';
import Loading from '@/components/loading';

const Page = () => {
  const params = useSearchParams();
  const route = useRouter();
  const [recipe, setRecipe] = useState<RecipeInfo>();
  const searchRecipeID = params.get('id');

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (searchRecipeID) {
        try {
          const response = await getRecipeByID(+searchRecipeID);

          setRecipe(response.data);
        } catch (error) {
          console.error('Failed to fetch recipe details:', error);
        }
      }
    };
    if (searchRecipeID) {
      fetchRecipeDetails();
    }
  }, [searchRecipeID]);

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-gray-600">
          <Loading />
        </p>
      </div>
    );
  }

  const onBackHandle = () => {
    route.back();
  };

  const { title, image, sourceName, servings, cookingMinutes, extendedIngredients, instructions } =
    recipe;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <div className="flex flex-row justify-evenly items-center mb-6">
        <button
          onClick={onBackHandle}
          className=" py-2 px-4 text-white text-lg font-semibold rounded-xl transition duration-200 bg-blue-500 hover:bg-blue-600"
        >
          Back
        </button>
        <h1 className=" text-4xl font-bold text-center ">{title}</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-shrink-0">
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
            className="rounded-xl object-cover w-full h-auto"
          />
        </div>

        <div className="flex flex-col gap-4 text-gray-800">
          <p>
            <span className="font-semibold">Source:</span> {sourceName}
          </p>
          <p>
            <span className="font-semibold">Preparation time:</span> {cookingMinutes} min
          </p>
          <p>
            <span className="font-semibold">Servings:</span> {servings}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="columns-2 gap-4 list-disc list-inside">
          {extendedIngredients?.map((ingredient: Ingredients) => (
            <li key={ingredient.id}>{ingredient.nameClean}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {instructions || 'No instructions available.'}
        </p>
      </div>
    </div>
  );
};

export default Page;
