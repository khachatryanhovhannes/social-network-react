import AddPost from "../AddPost/AddPost";
import PostList from "../PostList/PostList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { db } from "../../firebase-config";
import classes from './Gallery.module.css'


export default function Gallery(){
    const postList = collection(db, "posts")
    const {user} = useOutletContext()
    const [posts, setPosts] = useState([])
    const [showAddWindow, setShowAddWindow] = useState(false)

    const getPosts = async () => {
        try {
            const q = query(postList, where("userId", "==", user));
            const items = await getDocs(q);
            setPosts(items.docs.map((elm) => ({
                ...elm.data(),
                id: elm.id
            })));
        } catch (error) {
            console.error("Error fetching posts:", error.message);
        }
    };


    useEffect(()=>{
        getPosts()
    }, [])
    
    const handleAddPost = () => {
        setShowAddWindow(!showAddWindow)
    }

    return(
        <div className={classes.gallery}>
            <h3>My Albom <button onClick={handleAddPost}>Add post</button></h3>
            <PostList posts={posts}/>
            { showAddWindow && <AddPost handleAddPost={handleAddPost}/>}
        </div>
    )
}