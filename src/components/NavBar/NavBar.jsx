import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    // 1. Remove the token from local storage
    localStorage.removeItem("token");

    // 2. Clear the user state from context
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome back {user.username}</li>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/hoots">HOOTS</Link>
          </li>

          <li>
            <Link to='/hoots/new'>New HOOT</Link>
          </li>
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/">Landing Page</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
