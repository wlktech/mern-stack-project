import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from '@mui/icons-material/Edit';
import BASE_URL from "../hooks/baseURL";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ReceipeCard({ receipe, onDelete }) {
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
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };
  const deleteReceipe = async () => {
    let res = await axios.delete(BASE_URL + "/receipes/" + receipe._id);
    if (res.status === 200) {
      onDelete(receipe._id);
    }
  };
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
        <div className="flex justify-between">
          <h3 className="font-bold text-2xl text-green-400">{receipe.title}</h3>
          <div className="space-x-2">
            <Link to={'/edit/' + receipe._id}>
                <EditIcon
                  className="text-green-500 cursor-pointer"
                />
            </Link>
            <DeleteForeverIcon
              onClick={deleteReceipe}
              className="text-red-500 cursor-pointer"
            />
          </div>

        </div>

        <p className="font-bold">{receipe.description}</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          totam doloremque perferendis recusandae eos dolorum voluptate
          laboriosam dolores repellendus labore, rem ex dolor at tenetur quis
          amet, eaque unde modi eum corporis asperiores odit dicta magni!
          Doloribus natus vel nostrum veniam vero voluptatibus alias aspernatur.
        </p>
        <div className="space-x-1">
          <span className="font-bold">Ingredients - </span>
          {receipe.ingredients.map((ingredient, index) => (
            <span
              className="bg-green-500 text-white px-1 py-1 rounded-full"
              key={index}
            >
              {ingredient}
            </span>
          ))}
        </div>
        <p className="text-gray-400">
          Published at -{published(receipe.createdAt)}
        </p>
      </div>
    </>
  );
}
