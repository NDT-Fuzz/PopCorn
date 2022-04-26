import React, {useState, useEffect} from 'react'
import './Comments.css';
import Comment from '../Comment/Comment';
import { createComment,deleteUserComment,updateUserComment} from '../../commentData';
import CommentForm from '../CommentForm/CommentForm';
import firebase from "../../Firebase/firebase";
import "antd/dist/antd.css";
import { useParams } from 'react-router'

const Comments = ({currentUserEmail}) => {
    const user = {
        img: firebase.auth().currentUser.photoURL,
        name: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email
    };
    const [backendComments, setBackendComments] = useState (()=>{
        const commentUser = JSON.parse(localStorage.getItem("comments"));
        return (commentUser ?? []);
    });
    const [activeComment, setActiveComment] = useState(null);
    const {id} = useParams();
    const rootComments = backendComments.filter(backendComment => backendComment.parentId === null && backendComment.movieId ==id);
    const getReplies = (commentId) => {
        return backendComments.filter(backendComment => backendComment.parentId === commentId)
    }
    const addComment = (text,parentId,avatar,username,email,movieId) => {
        avatar = user.img;
        username = user.name;
        email = user.email;
        movieId = id;
        createComment(text,parentId,avatar,username,email,movieId).then(comment => {
            setBackendComments([comment,...backendComments]);
            setActiveComment(null);
        })
    }
    const deleteComment= (commentId) => {
        if (window.confirm('Bạn có chắc muốn xóa bình luận này không?')){
            deleteUserComment().then(()=>{
                const updateBackendComments = backendComments.filter((comment) => comment.id !== commentId);
                setBackendComments(updateBackendComments);
            });
            
        }
    }
    const updateComment = (text, commentId) => {
        updateUserComment(text).then(()=>{
            const updateBackendComments = backendComments.map((comment)=>{
                if (comment.id === commentId){
                    return {...comment, body:text}
                }
                return comment;
            });
            setBackendComments(updateBackendComments);
            setActiveComment(null);
        })
    }
    useEffect(()=>{
        localStorage.setItem("comments",JSON.stringify(backendComments));
    },[backendComments]);
    return (
        <div className="comment-container">
            <strong className="comment-total">{rootComments.length} bình luận</strong>
            <hr/>
            <CommentForm placeHolderText="Thêm bình luận..." handleLabel="Đăng" handleSubmit={addComment}/> 
            {
                rootComments.map((item)=>(
                    <Comment 
                    key={item.id} 
                    props={item}
                    replies={getReplies(item.id)}
                    currentUserEmail={currentUserEmail}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}/>
                ))
            }
        </div>
    )
}

export default Comments
