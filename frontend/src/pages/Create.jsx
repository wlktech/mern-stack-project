import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BASE_URL from '../hooks/baseURL';
import { useNavigate } from 'react-router-dom';

export default function Create() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addIngredient = () => {
        setIngredients([...ingredients, ingredient]);
        setIngredient("");
    }

    const create = async (e) => {
        e.preventDefault();
        setLoading(true);
        const inputData = {
            title,
            description,
            ingredients
        }
        
        const res = await fetch(BASE_URL + "/receipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputData)
        });
        const data = await res.json();
        if(!res.ok){
            if(res.status === 400){
                setError(data.errors);
                setLoading(false);
            }
        }else{
            setLoading(false);
            navigate("/");
        }
    }
    

  return (
    <div className='mx-auto max-w-md border-4 border-white p-5 rounded-md shadow-md mt-5'>
        <h1 className='text-green-500 mb-5 text-2xl font-bold text-center'>Receipe Create Form</h1>
        <form className='space-y-5' onSubmit={create}>
            <div>
                <input type="text"  
                placeholder='Receipe Title'
                className='w-full py-2 px-4 border border-gray-300 rounded-md' 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                />
                {error && error.title && <small className='text-red-500'>{error.title.msg}</small> }
            </div>
            <div>
                <textarea cols="30" rows="5" className='w-full py-2 px-4 border border-gray-300 rounded-md'
                placeholder='Receipe Description'
                onChange={(e) => setDescription(e.target.value)} 
                value={description}
                ></textarea>
                {error && error.description && <small className='text-red-500'>{error.description.msg}</small> }
            </div>
            <div className='flex items-center space-x-2'>
                <input type="text" 
                placeholder='Ingredients'
                className='w-full py-2 px-4 border border-gray-300 rounded-md' 
                onChange={(e) => setIngredient(e.target.value)}
                value={ingredient}
                />
                <AddCircleOutlineIcon className='text-green-500 cursor-pointer' fontSize='large' onClick={addIngredient} />
            </div>
            <div className='flex space-x-2'>
                {ingredients.length > 0 && ingredients.map((ingredient, index) => (
                    <span className='bg-green-200 text-green-800 px-2 rounded-full shadow' key={index}>{ingredient}</span>
                ))
                }
            </div>
            <div className="">
                <button className='bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-800'>Create</button>
            </div>
        </form>
    </div>
  )
}
