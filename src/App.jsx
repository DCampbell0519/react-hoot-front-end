import { useState, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import { UserContext } from "./contexts/UserContext.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Landing from "./components/Landing/Landing.jsx";
import HootList from "./components/HootList/HootList.jsx";
import HootDetails from "./components/HootDetails/HootDetails.jsx";
import HootForm from "./components/HootForm/HootForm.jsx";
import * as hootService from "./services/hootService.js";

function App() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  // hoot state
  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    const fetchHoots = async () => {
      const fetchedHoots = await hootService.index();
      // console.log(fetchedHoots)
      setHoots(fetchedHoots);
    };

    if (user) fetchHoots();
  }, [user]); // only run on component mount or when user state changes

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData)
    setHoots([newHoot, ...hoots])
    navigate("/hoots");
  };

  const handleDeleteHoot = async (hootId) => {
    
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path="/hoots" element={<HootList hoots={hoots} />} />
            <Route path="/hoots/new" element={<HootForm handleAddHoot={handleAddHoot}/>} />
            <Route path="/hoots/:hootId" element={<HootDetails handleDeleteHoot={handleDeleteHoot}/>} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
