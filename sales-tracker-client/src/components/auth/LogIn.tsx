import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { serverUrl } from '../../utils/Utils'
interface formData {
    userName: string
    password: string
    confirmPassword?: string
    email?: string
}
export let theUserId = ''
export default function LogIn() {
    const [signUp, setSignUp] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const [formData, setFormData] = useState<formData>({ userName: '', password: '' })
    const navigate = useNavigate()

    return (
        <div>
            <h1>Invoice Tracker</h1>
            <h3>{signUp ? 'Register' : 'Log In'}</h3>
            <form onSubmit={logInSignUp} >
                <div className='form-group'>
                    <label htmlFor="userName">User Name</label>
                    <input type="text"  className='form-control' id='userName' name='userName' value={formData?.userName} required onChange={handleInputChange} placeholder='User Name' />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password"  className='form-control' id='password' name='password' value={formData?.password} required onChange={handleInputChange} placeholder='Password' />
                </div>
                {signUp &&
                    <>
                        <div className='form-group'>
                            <label htmlFor="email">Email</label>
                            <input type='password' name='email' className='form-control'
                                value={formData?.confirmPassword} onChange={handleInputChange} required placeholder='Email'></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type='password' name='confirmPassword' className='form-control'
                                value={formData?.confirmPassword} onChange={handleInputChange} required placeholder='Confirm Password'></input>
                        </div>
                    </>
                }
                <button type='submit' className='btn btn-outline-success'>{signUp ? 'Register' : 'Log In'}</button>
            </form>
            {error && <p className='error'>{error}</p>}
            <a className='breadcrumb-item link' onClick={() => setSignUp(!signUp)}>{signUp ? 'Log In' : `Don't have an account Sign up!`}</a>
        </div>
    )
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData((prevFormData: formData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));
    }
    async function logInSignUp(e: FormEvent) {
        e.preventDefault()
        const type = signUp ? 'register' : 'login'
        const response = await fetch(`/${type}`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        })
        if (!response.ok) {
            setError(await response.text())
            return
        }
        if (signUp) {
            navigate('success')
        } else {
            const { userId } = await response.json()
            theUserId = userId
            navigate(`${theUserId}/invoices`)
        }
    }
}
