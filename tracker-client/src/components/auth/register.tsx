import { register } from "@/api/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register () {
    const [formData, setFormData] = useState({
        confirmPassword: '',
        password: '',
        email: '',
        name: ''
    });
    const navigate = useNavigate()
    const [errorMsg, seterrorMsg] = useState('')
    return (
        <>
            <div className="container">
                <form className="container" onSubmit={handleRegister} onChange={handleInputChange}>
                    <h1 className="text-primary" >Register</h1>
                    <div className="form-floating mb-3">
                        <input type="email" className={`form-control ${errorMsg && 'is-invalid'}`} placeholder="name@example.com" required name="email" />
                        <label >Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className={`form-control ${errorMsg && 'is-invalid'}`} placeholder="Name" required name="name" />
                        <label >Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className={`form-control ${errorMsg && 'is-invalid'}`} placeholder="Password" required name="password" />
                        <label >Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className={`form-control ${errorMsg && 'is-invalid'}`} placeholder="Confirm Password" required name="confirmPassword" />
                        <label >Confirm Password</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg">Confirm</button>
                    {errorMsg && <p className="text-danger">{errorMsg}</p>}
                </form>
                <Link to={'/'}>Log In</Link>
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
    async function handleRegister (e: React.SyntheticEvent) {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            seterrorMsg('Passwords do not match')
            return
        }
        const response = await register(formData.email, formData.password, formData.name)
        if (!response) {
            seterrorMsg('Email or Password is incorrect')
        } else {
            navigate('success')
        }
    }
}
export default Register