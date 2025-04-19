import axios from 'axios';

axios.defaults.baseURL = ' https://api.spoonacular.com/recipes/';

export const getRecipeByID = async (id: number) => {
  const key = `recipeByID: ${JSON.stringify(id)}`;
  const cache = localStorage.getItem(key);

  const now = Date.now();

  const cacheTime = 60 * 1000;

  if (cache) {
    const parsedData = JSON.parse(cache);

    if (now - parsedData.timeStamp < cacheTime) {
      return parsedData.data;
    }
  }

  const axiosOptions = {
    params: {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    },
  };
  const response = await axios.get(`${id}/information`, axiosOptions);

  localStorage.setItem(key, JSON.stringify({ data: response, timeStamp: now }));

  return response;
};
