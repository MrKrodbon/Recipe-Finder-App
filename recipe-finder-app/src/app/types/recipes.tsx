export interface RecipeSearchParams {
  query: string;
  cuisine: string;
  preparationTime: string;
}

export interface RecipeItem {
  id?: number;
  query?: string;
  cuisine?: string;
  preparationTime?: string;
  image?: string;
  title?: string;
}

export interface RecipeInfo {
  title: string;
  image: string;
  sourceName: string;
  servings: number;
  cookingMinutes: number;
  extendedIngredients: [];
  instructions: string;
}

export interface Ingredients {
  id: number;
  nameClean: string;
}
