import axios from 'axios';
import { RecipeSearchParams } from '@/app/types/recipes';

axios.defaults.baseURL = 'https://api.spoonacular.com/recipes/complexSearch';

export const getRecipes = async (searchQuery: RecipeSearchParams) => {
  const key = `recipes:${JSON.stringify(searchQuery)}`;
  const cache = localStorage.getItem(key);

  const now = Date.now();
  const cacheTime = 60 * 1000;

  if (cache) {
    const parsedRecipe = JSON.parse(cache);

    if (now - parsedRecipe.timeStamp < cacheTime) {
      return parsedRecipe.data;
    }
  }

  const axiosOptions = {
    params: {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      query: searchQuery.query,
      cuisine: searchQuery.cuisine,
      preparationTime: searchQuery.preparationTime,
    },
  };

  const response = await axios.get(`/`, axiosOptions);

  localStorage.setItem(key, JSON.stringify({ data: response, timeStamp: now }));

  return response;
};
