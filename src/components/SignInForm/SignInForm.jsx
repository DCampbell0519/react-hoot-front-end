import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../services/authService.js";
import { UserContext } from "../../contexts/UserContext.jsx";

const SignInForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { setUser } = useContext(UserContext)

  // destructure the formData state to access the variables inside
  const { username, password } = formData;

  const handleChange = (event) => {
    setMessage("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // stops the form from refreshing
    // console.log(formData);
    try {
        const signInUser = await signIn(formData)
        setUser(signInUser)
        console.log(signInUser)

        navigate('/')
    } catch (error) {
        setMessage(error.message)
    }
  };

  const isFormInvalid = () => {
    return !(username && password);
  };

  return (
    <main>
      <h1>Sign In</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
            <button disabled={isFormInvalid()}>Sign In</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignInForm;
