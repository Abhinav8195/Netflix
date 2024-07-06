import axios from 'axios';
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import React, { useEffect, useState } from 'react'
import Movie from './Movie';

const Row = ({title,fetchUrl,rowId}) => {

        const[movies,setMovies]=useState([])
       

        useEffect(()=>{
         axios.get(fetchUrl)
         .then((response)=>{
            setMovies(response.data.results)
         })
        },[fetchUrl])

        console.log(movies)

        const slidLeft =()=>{
          var slider = document.getElementById("slider"+rowId)
          slider.scrollLeft = slider.scrollLeft - 500
        }
        const slidRight =()=>{
          var slider = document.getElementById("slider"+rowId)
          slider.scrollLeft = slider.scrollLeft + 500
        }

  return (
    <>
     <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
     <div className='relative flex items-center group'>
      <MdChevronLeft onClick={slidLeft} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 group-hover:block  cursor-pointer z-10 hidden' size={40} />
        <div id={'slider'+rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative '>
            {
                movies.map((item,id)=>(
                    <Movie key={id} item={item} />
                ))
            }
        </div>
        <MdChevronRight onClick={slidRight} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 group-hover:block  cursor-pointer z-10 hidden' size={40}/>
     </div>
    </>
  )
}

export default Row