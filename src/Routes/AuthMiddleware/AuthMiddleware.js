import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "./AuthMiddleware.module.css"

export default function AuthMiddleware() {
    const auth = getAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if(!user){
                return navigate('/')
            } else {
                setUser(user.uid)
            }
        })
    }, [])

    return user && <>
            <nav className={classes.navBar}>
                <div className={classes.logo}>
                    Social 
                    <br/>
                    Network
                </div>
                <ul>
                    <li><Link className={classes.link} to='/profile'>Profile</Link></li>
                    <li><Link className={classes.link} to='/profile/search'>Search users</Link></li>
                    <li><Link className={classes.link} to='/profile/settings'>Settings</Link></li>
                    <li className={classes.link} onClick={()=>{signOut(auth)}}>Logout</li>
                </ul>
            </nav>
            <Outlet context={{user}}/>
        </>
}