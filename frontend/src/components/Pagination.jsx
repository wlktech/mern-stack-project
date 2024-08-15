import React, { useEffect } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom';

export default function Pagination({links}) {
    let current_page = new URLSearchParams(window.location.search).get('page') || 1;
    let pages = links.loopableLinks;
    let next = links.next;
    let prev = links.prev;
    console.log(links);
    

    useEffect(() => {
        //scroll to top function
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [current_page])
    
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          to={prev === null ? '?page=' + current_page : '?page=' + prev}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          disabled
        >
          Previous
        </Link>
        <Link
            to={next === null ? '?page=' + current_page : '?page=' + next}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{links.start}</span> to <span className="font-medium">{links.end}</span> of{' '}
            <span className="font-medium">{links.total}</span> results
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <Link
              to={prev === null ? '?page=' + current_page : '?page=' + prev}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ArrowBackIosNewIcon />
            </Link>
            {pages && pages.map((no, index) => (
                <Link
                    to={'?page=' + no}
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${no == current_page ? 'bg-green-500 text-white' : 'bg-white text-gray-500 border border-1 border-gray-300 hover:bg-gray-50'}`}
                    key={index}
                >
                    {no}
                </Link>
            ))}
            <Link
              to={next === null ? '?page=' + current_page : '?page=' + next}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
              <ArrowForwardIosIcon className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
