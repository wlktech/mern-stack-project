import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BASE_URL from "../hooks/baseURL";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ReceipeForm() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      let fetchData = async () => {
        let res = await axios.get(BASE_URL + "/receipes/" + id);
        if (res.status === 200) {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients);
        }
      };
      fetchData();
    }
  }, [id]);

  const addIngredient = () => {
    setIngredients([...ingredients, ingredient]);
    setIngredient("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const inputData = {
      title,
      description,
      ingredients,
    };
    let res;
    if (id) {
      res = await axios.put(BASE_URL + "/receipes/" + id, inputData);
    } else {
      res = await axios.post(BASE_URL + "/receipes", inputData);
    }
    const data = await res.data;
    if (res.status === 400) {
      setError(data.errors);
      setLoading(false);
    }
    if(res.status === 200){
        setLoading(false);
        navigate("/");
    }
  };

  return (
    <div className="mx-auto max-w-md border-4 border-white p-5 rounded-md shadow-md mt-5">
      <h1 className="text-green-500 mb-5 text-2xl font-bold text-center">
        Receipe {id ? "Update" : "Create"} Form
      </h1>
      <form className="space-y-5" onSubmit={submit}>
        <div>
          <input
            type="text"
            placeholder="Receipe Title"
            className="w-full py-2 px-4 border border-gray-300 rounded-md"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          {error && error.title && (
            <small className="text-red-500">{error.title.msg}</small>
          )}
        </div>
        <div>
          <textarea
            cols="30"
            rows="5"
            className="w-full py-2 px-4 border border-gray-300 rounded-md"
            placeholder="Receipe Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          {error && error.description && (
            <small className="text-red-500">{error.description.msg}</small>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ingredients"
            className="w-full py-2 px-4 border border-gray-300 rounded-md"
            onChange={(e) => setIngredient(e.target.value)}
            value={ingredient}
          />
          <AddCircleOutlineIcon
            className="text-green-500 cursor-pointer"
            fontSize="large"
            onClick={addIngredient}
          />
        </div>
        <div className="flex space-x-2">
          {ingredients.length > 0 &&
            ingredients.map((ingredient, index) => (
              <span
                className="bg-green-200 text-green-800 px-2 rounded-full shadow"
                key={index}
              >
                {ingredient}
              </span>
            ))}
        </div>
        <div className="">
          <button className="bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-800">
            {id ? "Update" : "Create"} Receipe
          </button>
        </div>
      </form>
    </div>
  );
}
