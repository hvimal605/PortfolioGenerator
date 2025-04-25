// Prevent authenticated users from accessing open routes (like login/signup)
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { ACCOUNT_TYPE } from "../../utils/constants"

function OpenRoute({ children }) {
  const { user } = useSelector((state) => state.profile)

  if (!user) {
    // User not logged in → allow access
    return children
  } else {
    // Redirect logged in users based on their account type
    switch (user.accountType) {
      case ACCOUNT_TYPE.USER:
        return <Navigate to="/UserDas" />
      case ACCOUNT_TYPE.DEVELOPER:
        return <Navigate to="/developerDas" />
      case ACCOUNT_TYPE.ADMIN:
        return <Navigate to="/AdminDas" />
      default:
        return <Navigate to="/" />
    }
  }
}

export default OpenRoute
