import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/auth/Login';
import Home from './components/Home/Home';
import { Layout } from './components/Layout/Layout';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/languaje' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
