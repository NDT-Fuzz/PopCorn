import React, {useState} from 'react'
import './CommentForm.css'
import firebase from "../../Firebase/firebase";
import Avatar from "@material-ui/core/Avatar";
import "antd/dist/antd.css";

const CommentForm = ({placeHolderText,handleLabel,handleSubmit,hasCancelButton=false,initialText="",handleCancel}) => {
    const user = {
        img: firebase.auth().currentUser.photoURL,
        name: firebase.auth().currentUser.displayName,
    };
    const [text,setText] = useState(initialText);
    const isBtnDisabled = text.length ===0;
    const onSubmit = event => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    }
    return (
        <div className="comment-box d-flex">
        {!hasCancelButton && <Avatar alt="Cindy Baker" src={user.img} className="comment-img" />}
        <form className="comment-input-container d-flex flex-column" onSubmit={onSubmit}>
            <textarea value={text} 
             placeholder={placeHolderText}
             onChange={(e)=>setText(e.target.value)} 
             className="comment-input">
            </textarea>
            <div className="comment-btn d-flex justify-content-end">
                <button className="submit-btn" disabled={isBtnDisabled}>{handleLabel}</button>
                {hasCancelButton && <button type="button" className="cancel-btn" onClick={handleCancel}>Hủy</button>}
            </div>
        </form>
        </div>
    )
}

export default CommentForm