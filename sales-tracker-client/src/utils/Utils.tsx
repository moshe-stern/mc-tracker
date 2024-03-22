import { Link } from "react-router-dom";
// @ts-expect-error prop error
export const comment: IconProp = "fa-regular fa-comment"
// @ts-expect-error prop error
export const edit: IconProp = "fa-regular fa-pen-to-square"
// @ts-expect-error prop error
export const show: IconProp = "fa-regular fa-eye"
// @ts-expect-error prop error
export const hide: IconProp = "fa-regular fa-eye-slash"
export function ErrorHandler() {
  return (
    <Link to={`/`} className="link">
      <h2 className="error-message">Oops Error! click here to go home</h2>
    </Link>
  )
}
