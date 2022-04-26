import React from 'react'
import './SearchMovie.css'
import { useState,useEffect,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { category } from '../../API/tmdbApi';

export const SearchMovie = props => {
  const navigate = useNavigate(); 
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
  const goToSearch = useCallback(
      () => {
          if (keyword.trim().length >0){
              navigate(`/${category[props.category]}/search/${keyword}`);
          }
      },
      [keyword,navigate],
  );
  useEffect(()=>{
      const eventEnter = (e) => {
          e.preventDefault();
          if (e.keyCode == 13) goToSearch();
      }
      document.addEventListener('keyup',eventEnter);
      return () => {
          document.removeEventListener('keyup',eventEnter);
      }
  },[keyword, goToSearch]);      
    
  return (
    <div className='searchmovie'>
        <div className='container'>
            <div className='addcontent'>
                <div className='inputmovie'>
                    <input type='text'
                    className='search_input'
                    placeholder='Tìm kiếm'
                    value={keyword}
                    onChange={(e)=> setKeyword(e.target.value)}
                    >
                    </input>
                </div>
            </div>
        </div>
    </div>
  )
}
