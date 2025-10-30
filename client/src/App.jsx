import { Routes, Route } from 'react-router-dom';
import './App.css';
import {
  NotFound,
  Login,
  Registration,
  Home,
  User,
  SuperAdmin,
  Admin,
} from './handlers/pageHandler.js';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route path="/register" element={<Registration />} />
        <Route path="/superAdmin" element={<SuperAdmin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/User" element={<User />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
