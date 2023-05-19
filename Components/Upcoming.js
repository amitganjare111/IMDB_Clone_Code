import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { RotatingLines} from  'react-loader-spinner'
import Pagination from './Pagination';

const Upcoming = () => {
    const[upcoming, setUpcoming]=useState([]);

    const [page, setPage]=useState(1);
       
    const previous = () => {
       if(page>1)
       setPage(page-1);
    }
    const next = () => {
       setPage(page+1)
    }

    useEffect(function(){

        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=03056f9e2e643ba4493005b6bf65ea06&region=IN&language=hi-IN&with_origin_country=IN&page=${page}`)
        .then((res) => setUpcoming(res.data.results))
      
        },[page])
      
  return (
    <>
    <div className="mb-8">
          <div className="mt-3 mb-8 font-bold text-2xl text-center bg-black text-white">Upcoming Movies</div>
            {
            upcoming.length===0 ?
            <div className='flex justify-center'>
          
            <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}>
            </RotatingLines> </div> :

            <div className="flex flex-wrap justify-center bg-black">
            {
                upcoming.map((list)=>
                <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${list.backdrop_path})] h-[45vh] w-[220px]
                                  bg-center bg-cover  rounded-lg flex items-end m-2 hover:scale-150  ease-out duration-300`}>
                    <div className="w-full bg-opacity-50 bg-gray-900 text-white py-2 font-bold text-center rounded-b-lg">{list.title}</div>
                </div>
                )
            }
            </div>
        }
            </div>
        <Pagination page={page} previous={previous} next={next}/>
    </>
  )
}

export default Upcoming;