import './App.css';
import { BrowserRouter,Routes,Route ,Navigate  } from "react-router-dom";
import Users from './user/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import MainNavigation from './utility/components/Navigation/MainNavigation';

function App() {
  return (
    <BrowserRouter>
    <MainNavigation/>
    <main>
      <Routes>
        <Route exect path='/' element={<Users/>}></Route>
        <Route exect path='/places/new' element={<NewPlaces/>}></Route>
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
