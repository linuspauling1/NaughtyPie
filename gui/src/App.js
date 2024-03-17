import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Users from './pages/Users';
import Keys from './pages/Keys';
import Clients from './pages/Clients';
import Messages from './pages/Messages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout logged='ou' />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="clients" element={<Clients />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}