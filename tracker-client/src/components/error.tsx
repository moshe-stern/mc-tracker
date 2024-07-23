import { Link } from "react-router-dom"

function ErrorHandler() {
    return (
        <Link to={`/`} className="link">
            <h2 className="error-message">Oops Error! click here to go home</h2>
        </Link>
    )
}

export {
    ErrorHandler
}