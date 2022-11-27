import "./App.css";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import MainNavigation from "./utility/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./utility/context/authContext";
import { useCallback, useState } from "react";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(()=>{
    setIsLoggedIn(true)
  })
  const logout = useCallback(()=>{
    setIsLoggedIn(false)
  })
  let routes;
  if (isLoggedIn) {
    routes=(
      <>
        <Route exect path="/" element={<Users />}></Route>
        <Route exect path="/:userId/places/" element={<UserPlaces />}></Route>
        <Route exect path="/places/new" element={<NewPlaces />}></Route>
          <Route exect path="/places/:placeId" element={<UpdatePlace />}></Route>
        
      </>
    );
  }else{
    routes=(
      <>
        <Route exect path="/" element={<Users />}></Route>
        <Route exect path="/:userId/places/" element={<UserPlaces />}></Route>
        <Route exect path="/auth" element={<Auth />}></Route>
        
      </>
    );
  }
  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn,login:login,logout:logout}}>
    <BrowserRouter>
      <MainNavigation />
      <main>
        <Routes>
          {routes}
          {/* <Route exect path="/" element={<Users />}></Route>
          <Route exect path="/:userId/places/" element={<UserPlaces />}></Route>
          <Route exect path="/places/new" element={<NewPlaces />}></Route>
          <Route exect path="/places/:placeId" element={<UpdatePlace />}></Route>
          <Route exect path="/auth" element={<Auth />}></Route> */}
        </Routes>
      </main>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
