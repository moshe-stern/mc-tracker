import { Link } from "react-router-dom"

function Success () {
    return (
        <>
            <div className="container">
                <h1 className="text-primary" >Success!</h1>
                <Link to={'/'}>Log In</Link>
            </div>
        </>
    )
}

export default Success