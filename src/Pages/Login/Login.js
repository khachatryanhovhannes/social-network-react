import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import classes from './Login.module.css'

export default function Login(){
    const navigate = useNavigate()
    const [err, setErr] = useState(false)
    const auth = getAuth()
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    });

    const handleInputChange = (evt) => {
        setUser(state => {
            return {
                ...state,
                [evt.target.name]: evt.target.value
            }
        })
    };

    const onSubmit = (evt) => {
        if(!user.email || !user.password){
            setErr ("Please, fill in all things!")
        }
        evt.preventDefault()
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then(r=>{navigate('/profile')})
        .catch(err=>{setErr("Uncorrect login or password")})
    }

    return (
        <div className={classes.signUpBackground}>
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <p>If you have not account go to <Link to='/signUp'>Sign Up</Link>
                </p>
                <p className={classes.authErr}>{err}</p>
                <input type="email"
                    name='email'
                    placeholder='email'
                    value={user.email}
                    onChange={handleInputChange}
                />
                <input type="password"
                    name='password'
                    placeholder='password'
                    value={user.password}
                    onChange={handleInputChange}
                />

                <input type="submit"
                    value='Login'
                />
            </form>
        </div>
    )
}