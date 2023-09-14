import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from './SignUp.module.css';


export default function SignUp() {
    const auth = getAuth();
    const [err, setErr] = useState("")
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    });
    const userList = collection(db, "users")
    const [address, setAddress] = useState({
        country: '',
        region: '',
    })
    const [startDate, setStartDate] = useState(new Date('01-01-1923'))

    const handleSelectCountry = (val) => {
        setAddress({ ...address, country: val })
    }

    const handleSelectRegion = (val) => {
        setAddress({ ...address, region: val })
    }

    const handleInputChange = (evt) => {
        setUser(state => {
            return {
                ...state,
                [evt.target.name]: evt.target.value
            }
        })
    };

    const onSubmit = (evt) => {
        evt.preventDefault()
        const { name, surname, email, password } = user;
        const { country, region } = address;

        if (!name || !surname || !country || !region || !email || !password) {
            setErr("Please, fill in all things!")
            return;
        }

        console.log(user)
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(async r => {
                await addDoc(userList, {
                    name: user.name,
                    surname: user.surname,
                    profilePicture: '',
                    country: address.country,
                    region: address.region,
                    birthDay: startDate,
                    userId: r.user.uid,
                })
                navigate('/')

            })
            .catch(err => {
                console.log(err.message)
                if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
                    console.log("inside if")
                    setErr("This email already in use")
                } else if (err.message === 'Firebase: Error (auth/missing-password).' || err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    console.log("inside second if")
                    setErr("This password isn't secure")
                }
            })
    };

    return (
        <div className={classes.signUpBackground}>
            <form onSubmit={onSubmit}>
                <h2>Sign Up</h2>
                <p>If you have account go to <Link to='/'>Login</Link></p>
                <p className={classes.authErr}>{err}</p>
                <input type="text"
                    name='name'
                    placeholder='name'
                    value={user.name}
                    onChange={handleInputChange}
                />
                <input type="text"
                    name='surname'
                    placeholder='surname'
                    value={user.surname}
                    onChange={handleInputChange}
                />
                <DatePicker className={classes.datePicker}
                    selected={startDate}
                    minDate={new Date("01-01-1923")}
                    maxDate={new Date("12-21-2011")}
                    onChange={(date) => setStartDate(date)} />
                <div className={classes.selectAddres}>
                    <CountryDropdown
                        className={classes.selectCountry}
                        value={address.country}
                        onChange={(val) => handleSelectCountry(val)}
                    />
                    <RegionDropdown
                        className={classes.selectRegion}
                        country={address.country}
                        value={address.region}
                        onChange={(val) => handleSelectRegion(val)}
                    />
                </div>
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
                    value='Sign Up'
                />
            </form>
        </div>
    )
}