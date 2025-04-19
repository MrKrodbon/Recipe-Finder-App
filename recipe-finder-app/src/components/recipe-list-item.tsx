import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RecipeItem } from "@/app/types/recipes";

interface RecipeListItemProps extends RecipeItem {
  recipeData: RecipeItem;
}

const RecipeListItem = ({ recipeData }: RecipeListItemProps) => {
  const { id, image, title } = recipeData;
  return (
    <li className="bg-white shadow-lg rounded-lg overflow-hidden w-full  sm:w-1/2 md:w-1/3 lg:w-1/4">
      <Link href={`/recipe-details?id=${id}`}>
        <Image
          src={image || ""}
          width={320}
          height={320}
          alt="images"
          className="object-cover w-full h-48"
        />

        <div className="p-4">
          <p className="flex flex-wrap text-xl font-semibold ">{title}</p>
        </div>
      </Link>
    </li>
  );
};

export default RecipeListItem;
