import React from 'react'
import { Routes as Router, Route } from 'react-router-dom';
import About from '../components/About/About';
import { Login } from '../components/auth/Login';
import Contact from '../components/Contact/Contact';
import Home from '../components/Home/Home';
import { Layout } from '../components/Layout/Layout'

export const Routes = () => {
  return (
    <Layout>
      <Router>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/languaje' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Router>
    </Layout>
  )
}
