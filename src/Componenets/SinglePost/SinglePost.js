import { db } from '../../firebase-config'
import { doc, updateDoc } from 'firebase/firestore'
import { BiSolidLike } from 'react-icons/bi'
import classes from './SinglePost.module.css'
import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function SinglePost({ post }) {
    const [likes, setLikes] = useState(0)
    const { user } = useOutletContext()
    const handleLike = async (e) => {
        e.preventDefault()
        let likes = [...post.likes]
        const curentPost = doc(db, "posts", post.id)
        if (post.likes.findIndex(v => v === user) === -1) {
            likes = [...likes, user]
        } else {
            likes = likes.filter(v => v !== user)
        }

        await updateDoc(curentPost, { likes })
        setLikes(likes.length)
    }
    useEffect(() => {
        setLikes(post.likes.length)
    }, [post.likes.length])

    return (
        <>
            {console.log(post)}
            <img src={post.photo} alt="" />
            <br />
            <button className={classes.likeButton}
                onClick={handleLike}
            ><BiSolidLike /> ({likes})</button>
        </>
    )
}


