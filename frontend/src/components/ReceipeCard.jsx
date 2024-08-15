import React from "react";

export default function ReceipeCard({ receipes }) {
    const published = (createdAt) => {
        const date = new Date(createdAt);
        const now = new Date();
        const diff = now - date; // difference in milliseconds
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);
      
        if (years > 0) {
          return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (months > 0) {
          return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
          return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
          return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
          return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    };
  return (
    <>
      {receipes &&
        receipes.map((receipe, index) => (
          <div
            className="bg-white p-4 rounded-lg shadow-md space-y-3"
            key={index}
          >
            <h3 className="font-bold text-2xl text-green-400">
              {receipe.title}
            </h3>
            <p className="font-bold">{receipe.description}</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Mollitia, totam doloremque perferendis recusandae eos dolorum
              voluptate laboriosam dolores repellendus labore, rem ex dolor at
              tenetur quis amet, eaque unde modi eum corporis asperiores odit
              dicta magni! Doloribus natus vel nostrum veniam vero voluptatibus
              alias aspernatur.
            </p>
            <div className="space-x-2">
              <span className="font-bold">Ingredients - </span>
              {receipe.ingredients.map((ingredient, index) => (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full" key={index}>
                  {ingredient}
                </span>
              ))}
            </div>
            <p className="text-gray-400">
              Published at -{published(receipe.createdAt)}
            </p>
          </div>
        ))}
    </>
  );
}
