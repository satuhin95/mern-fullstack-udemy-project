import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import MainNavigation from "./utility/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./utility/context/authContext";
import { useAuth } from "./utility/hooks/auth-Hook";

function App() {
 const {token, login, logout, userId} = useAuth();
  let routes;
  if (token) {
    routes = (
      <>
        <Route exect path="/" element={<Users />}></Route>
        <Route exect path="/:userId/places/" element={<UserPlaces />}></Route>
        <Route exect path="/places/new" element={<NewPlaces />}></Route>
        <Route exect path="/places/:placeId" element={<UpdatePlace />}></Route>
      </>
    );
  } else {
    routes = (
      <>
        <Route exect path="/" element={<Users />}></Route>
        <Route exect path="/:userId/places/" element={<UserPlaces />}></Route>
        <Route exect path="/auth" element={<Auth />}></Route>
      </>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token:token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Routes>
            {routes}
          </Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
