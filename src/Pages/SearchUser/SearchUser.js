import { useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from './../../firebase-config'
import classes from './SearchUser.module.css'
import { Link } from 'react-router-dom';

export default function SearchUser() {

    const [searchText, setSearchText] = useState("")
    const [result, setResult] = useState([])
    const [searched, setSearched] = useState(false)
    const userList = collection(db, 'users')

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const q = query(userList, where("name", "==", searchText));
            const items = await getDocs(q);
            setResult(items.docs.map((elm) => ({
                ...elm.data(),
                id: elm.id
            })));
            setSearched(true)
        } catch (error) {
            console.error("Error fetching posts:", error.message);
        }
    }

    const defaultPicture = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'


    return (
        <div className={classes.searchPage}>
            <form>
                <input type="text"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
                <input type="submit"
                    onClick={handleSearch}
                />
            </form>
            <div className={classes.searchResult}>
                {result.length ?
                    result.map(user => {
                        return (
                            <div key={user.id} className={classes.searchResultUser}>
                                {console.log(user)}
                                <img src={user.profilePicture ? user.profilePicture : defaultPicture} alt="" />
                                <div>
                                    <h3>{user.name} {user.surname}</h3>
                                    <p>{user.region}/{user.country}</p>
                                    <Link className={classes.seeProfile} to={`/profile/user/account/${user.id}`} >See Profile</Link>
                                </div>
                            </div>
                        )
                    })
                    : searched && <p>user no found</p>
                }

            </div>
        </div>
    )
}