import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase-config"
import Loading from "../../Componenets/Loading/Loading"
import { getBirthDay } from "../../utils/utils"
import classes from "./Profile.module.css"
import Gallery from "../../Componenets/Gallery/Gallery"

export default function Profile() {
    const { user } = useOutletContext()
    const [account, setAccount] = useState(null)
    const userList = collection(db, 'users')

    const getUserProfile = async () => {
        const q = query(userList, where("userId", "==", user))
        const info = await getDocs(q)
        if (info.size > 0) {
            const obj = info.docs[0]
            setAccount({ ...obj.data(), id: obj.id })
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    const defaultPicture = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'

    return (
        <div className={classes.userProfileBack}>
            {
                !account ?
                    <Loading />
                    :
                    <div className={classes.userProfile}>
                        <div>
                            <img src={account.profilePicture ? account.profilePicture : defaultPicture} alt="" />

                            <h1>{account.name} {account.surname}</h1>
                            <p>{account.region} region ({account.country})</p>
                            <p>{getBirthDay(account.birthDay.seconds)}</p>
                        </div>

                        <Gallery />
                    </div>
            }
        </div>
    )
}