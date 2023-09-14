import { useRef, useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db, storage } from "../../firebase-config"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useOutletContext } from "react-router-dom"
import classes from "./AddPost.module.css"

export default function AddPost({handleAddPost}) {
    const photoRef = useRef()
    const postList = collection(db, "posts")
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const { user } = useOutletContext()


    const handleSubmit = (e) => {
        e.preventDefault()
        const file = photoRef.current.files[0]
        if (!file) {
            return
        }

        setLoading(true)
        const storageRef = ref(storage, `posts/${Date.now() + file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed", null, null, () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(async (downoladURL) => {
                    await addDoc(postList, {
                        userId: user,
                        photo: downoladURL,
                        title: text,
                        likes: []
                    })

                    setText("")
                    photoRef.current.value = ''
                    setLoading(false)
                    handleAddPost()
                })
                .catch(err => {
                    console.log(err.message)
                })
        })
    }

    return (
        <div className={classes.addPostBack} onClick={handleAddPost}>
            <div className={classes.addPost} onClick={e=>e.stopPropagation()}>
                <div className={classes.closeBtn}>
                <button onClick={handleAddPost}>Close</button></div>
                <h4>AddPost</h4>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="What's on your mind" />
                    <input type="file"
                        ref={photoRef} />
                    <input type="submit"
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    )
}