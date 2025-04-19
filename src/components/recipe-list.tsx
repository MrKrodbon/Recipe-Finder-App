'use client';
import { RecipeItem, RecipeSearchParams } from '@/app/types/recipes';
import React, { useEffect, useState } from 'react';
import RecipeListItem from './recipe-list-item';
import { useSearchParams } from 'next/navigation';
import { getRecipes } from '@/app/lib/api/getRecipes';
const RecipeList = () => {
  const [searchResult, setSearchResult] = useState<RecipeItem[]>([]);

  const params = useSearchParams();
  const search = params.toString();

  const query = params.get('query') || '';
  const cuisine = params.get('cuisine') || '';
  const preparationTime = params.get('preparationTime') || '';

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const paramsObj: RecipeSearchParams = {
          query,
          cuisine,
          preparationTime,
        };
        const response = await getRecipes(paramsObj);
        const data = response?.data?.results;

        if (data.length > 0) {
          setSearchResult(data);
        } else {
          throw new Error();
        }
      } catch (error) {
        throw error;
      }
    };

    fetchReceipts();
  }, [search, cuisine, preparationTime, query]);

  return (
    <ul className="flex flex-wrap justify-center gap-7 m-3">
      {searchResult.length > 0 &&
        searchResult.map((item) => <RecipeListItem key={item.id} recipeData={item} />)}
    </ul>
  );
};

export default RecipeList;
