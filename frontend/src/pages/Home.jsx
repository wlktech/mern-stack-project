import React from 'react'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import ReceipeCard from '../components/ReceipeCard';
import Pagination from '../components/Pagination';

export default function Home() {
  const page = new URLSearchParams(window.location.search).get('page') || 1;
  const {data, loading} = useFetch(BASE_URL + '/receipes?page=' + page);
  let receipes = data?.data;
  let links = data?.links;

  return (
    <div className='space-y-3'>
      {loading && (
        <p>Loading...</p>
      )}
      <ReceipeCard receipes={receipes} />
      {links && <Pagination links={links} />}
    </div>
  )
}
