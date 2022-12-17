import { MoreVert } from '@mui/icons-material'
import { useState,useEffect } from 'react'
import "./post.css"
import axios from "axios"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Post({post}) {

  const [like,setLike] = useState(post.likes.length)
  const [user,setUser] = useState({})
  const [isLiked,setIsLiked] = useState(false)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user:currentuser } = useContext(AuthContext)

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentuser._id))
  },[currentuser._id,post.likes])

  useEffect(()=>{
    const fetchUsers = async()=>{
    const res = await axios.get(`/users?userId=${post.userId}`)
    setUser(res.data)
  }
  fetchUsers();
  },[post.userId])

  const likeHandler =()=>{
    try{
      axios.put("/posts/"+post._id+"/like",{userId:currentuser._id})
    }catch(err){
      console.log(err)
    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft">
              <Link to={`profile/${user.username}`}>
                <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" className="postProfileImg" />
              </Link>
              <span className="postUsername">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
        </div>
        <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img src={PF+post.img} alt="" className='postImg'/>
        </div>
        <div className="postBottom">
        <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people liked it.</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
