import { login } from "@/api/auth";
import { useUserStore } from "@/store/user";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogIn () {
    const [formData, setFormData] = useState({
        password: '',
        email: '',
    });
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate()
    const { setUser, setTokens } = useUserStore();
    return (
        <>
            <div className="container">
                <form className="container" onSubmit={handleLogIn} onChange={handleInputChange}>
                    <h1 className="text-primary" >Log In</h1>
                    <div className="form-floating mb-3">
                        <input type="email" className={`form-control ${isError && 'is-invalid'}`} placeholder="name@example.com" required name="email" />
                        <label >Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className={`form-control ${isError && 'is-invalid'}`} placeholder="Password" required name="password" />
                        <label >Password</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg">Confirm</button>
                    {isError && <p className="text-danger">Email or Password is incorrect</p>}
                </form >
                <div className="sub-container">  <Link to={'register'}>Register</Link>
                    <Link to={'forgot-password'}>Forgot Password?</Link>
                </div>
            </div>
        </>
    )
    function handleInputChange (event: React.ChangeEvent<HTMLFormElement>) {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }
    async function handleLogIn (e: React.SyntheticEvent) {
        e.preventDefault();
        const response = await login(formData.email, formData.password)
        if (!response) {
            setIsError(true)
        } else {
            setTokens(response.tokens)
            setUser(response.user)
            console.log(useUserStore.getState());
            navigate('/app')
        }
    }
}
export default LogIn