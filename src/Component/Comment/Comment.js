import React from 'react'
import './Comment.css'
import CommentForm from "../CommentForm/CommentForm";
import Avatar from "@material-ui/core/Avatar";

const Comment = ({
    props,
    replies,
    currentUserEmail,
    deleteComment, 
    activeComment,
    addComment,
    setActiveComment,
    parentId=null,
    updateComment
}) => {
  const canEdit = currentUserEmail === props.email;
  const canDelete = currentUserEmail === props.email;
  const isReplying = activeComment && activeComment.type==="replying" && activeComment.id === props.id;
  const isEditing = activeComment && activeComment.type==="editing" && activeComment.id === props.id;
  const replyId = parentId ? parentId : props.id;

  return (
    <div className="other-comment-container d-flex">
        <Avatar alt="Cindy Baker" src={props.avatar} className="comment-img" />
        <div className="other-comment-info d-flex flex-column">
           <p className="user-comment-name">{props.username}</p>
           {!isEditing && <span className="user-comment-content">{props.body}</span>}
           {
              isEditing && (
                 <CommentForm 
                 placeHolderText="Chỉnh sửa bình luận..." 
                 handleLabel="Cập nhật" 
                 hasCancelButton initialText={props.body}
                 handleSubmit={(text) => updateComment(text,props.id)}
                 handleCancel={() => setActiveComment(null)}/> 
              )
           }
           <div>
                <button className="action-btn" onClick={() => setActiveComment({id: props.id,type:"replying"})}>Phản hồi</button>
                {canEdit && <button className="action-btn"  onClick={() => setActiveComment({id: props.id,type:"editing"})}>Chỉnh sửa</button>}
                {canDelete && <button className="action-btn" onClick={()=> deleteComment(props.id)}>Xóa</button>}
                <span className="user-comment-time">{props.createdAt}</span>
           </div>
           {
              isReplying && (
                 <CommentForm placeHolderText="Thêm phản hồi..." handleLabel="Phản hồi" handleSubmit={(text)=>addComment(text,replyId)}/> 
              )
           }
           
           {
               replies.length > 0 && (
                 <div className="replies">
                      {
                          replies.map((item)=>(
                            <Comment 
                            key={item.id} 
                            props={item}
                            replies={[]}
                            currentUserEmail={currentUserEmail}
                            deleteComment={deleteComment}
                            addComment={addComment}
                            updateComment={updateComment}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            parentId={props.id}/>
                          ))
                      }
                 </div>
               )
           }
        </div>
    </div>
  )
}

export default Comment