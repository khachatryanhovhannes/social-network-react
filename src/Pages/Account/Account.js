import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore"
import { db } from "../../firebase-config"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loading from "../../Componenets/Loading/Loading"
import PostList from "../../Componenets/PostList/PostList"
import { getBirthDay } from "../../utils/utils"
import classes from "./Account.module.css"

export default function Account(){
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    const postList = collection(db, "posts")

    const getUser = async () => {
        const docRef = doc(db, "users", id)
        const obj = await getDoc(docRef)
        if (!obj._document) {
            return navigate('/profile/search')
        }
        getPosts(obj.data().userId)
        setUser({
            ...obj.data(),
            id: obj.id
        })
    }

    const getPosts = async (id) => {
        const items = await getDocs(query(postList, where("userId", "==", id)))
        setPosts(items.docs.map(elm => {
            return {
                ...elm.data(),
                id: elm.id
            }
        }))
    }

    useEffect(()=>{
        getUser()
    }, [])

    const defaultPicture = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'

    return (<div className={classes.userProfileBack}>
        {
            !user ?
                <Loading />
                :
                <div className={classes.userProfile}>
                    <div>
                        <img src={user.profilePicture ? user.profilePicture : defaultPicture} alt="" />

                        <h1>{user.name} {user.surname}</h1>
                        <p>{user.region} region ({user.country})</p>
                        <p>{getBirthDay(Math.abs(user.birthDay.seconds))}</p>
                    </div>
                    {console.log(posts)}
                    <PostList posts={posts}/>
                </div>
        }
    </div>
    )
}