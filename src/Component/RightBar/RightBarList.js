import React, { useState,useEffect } from "react";
import RightBar from "./RightBar";
import { category, movieType, tvType } from "../../API/tmdbApi";
import "./RightBar.css";
import StarIcon from "@material-ui/icons/Star";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Trailer from "./Trailer";
import { createBookmark } from "../../bookmarkData";
import firebase from "../../Firebase/firebase";

const RightBarList = (props) => {
  const [bookmarks,setBookmarks] = useState (()=>{
    const bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
    return (bookmarkList ?? []);
  });
  const [statusBtn, setStatusBtn] = useState(false);
  const addBookmark = (id,user,category,name,poster_path) => {
    id = props.id;
    user = firebase.auth().currentUser.email;
    category = props.category;
    name = props.name;
    poster_path = props.poster;
    createBookmark(id,user,category,name,poster_path).then(bookmark => {
      setBookmarks([bookmark,...bookmarks]);
    })
    setStatusBtn(true);
  }
  useEffect(()=>{
    bookmarks.map((bookmark)=> {
      if (bookmark.id === props.id && bookmark.user === firebase.auth().currentUser.email) {
        setStatusBtn(true);
      }
    })
  },[])

  useEffect(()=>{
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
  },[bookmarks]);
  return (
    <div>
      <div className="vote-container ">
        <div className="vote-average">{props.vote}</div>
        <div className="vote-count-container d-flex flex-column">
          <div className="vote-icons">
            <StarIcon className="vote-icon" />
            <StarIcon className="vote-icon" />
            <StarIcon className="vote-icon" />
            <StarIcon className="vote-icon" />
            <StarIcon className="vote-icon" />
          </div>
          <div className="vote-count">{props.votecount} votes</div>
        </div>
      </div>
      {!statusBtn ?
        <button className="bookmark-btn d-flex align-items-center justify-content-center" onClick={addBookmark}>
           <BookmarkBorderIcon className="bookmark-icon"  /> Bookmark
        </button>:
        <button className="bookmark-btn btn-clicked d-flex align-items-center justify-content-center">
           <BookmarkBorderIcon className="bookmark-icon"  /> Bookmarked
        </button>
      }
      
      <Trailer id={props.id} />
      <div className="lists-rightbar">
        <div className="listTitle-rightbar">Phim lẻ xem nhiều</div>
        <RightBar category={category.movie} type={movieType.top_rated} />
      </div>
      <div className="lists-rightbar">
        <div className="listTitle-rightbar">Phim bộ xem nhiều</div>
        <RightBar category={category.tv} type={tvType.top_rated} />
      </div>
    </div>
  );
};

export default RightBarList;
