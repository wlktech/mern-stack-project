import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import ReceipeCard from '../components/ReceipeCard';
import Pagination from '../components/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Home() {
  const page = new URLSearchParams(window.location.search).get('page') || 1;
  const {data, error, loading} = useFetch('/receipes?page=' + page);
  const [receipes, setReceipes] = useState([]);
  let links = data?.links;
  const navigate = useNavigate();
    
  
  useEffect(() => {
    setReceipes(data?.data)
  }, [page, data]);
  
  const onDelete = (id) => {
    if(receipes.length === 1 && page > 1){
      navigate('/?page=' + (page - 1));
    }else{
      setReceipes(receipes.filter((receipe) => receipe._id !== id));
    }
  }

  return (
    <div className='space-y-4'>
      <div className="text-end">
        <Link to={'/create'}>
          <AddCircleIcon className='text-5xl text-green-500' />
        </Link>
      </div>

      {loading && (
        <p>Loading...</p>
      )}
      {receipes && receipes.map((receipe,index) => (
        <ReceipeCard receipe={receipe} key={index} onDelete={onDelete} />
      ))}
      {links && <Pagination links={links} />}
    </div>
  )
}
