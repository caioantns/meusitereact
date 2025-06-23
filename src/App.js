import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import CadastroCliente from './components/CadastroCliente';
import CadastroProfissional from './components/CadastroProfissional';
import Contato from './components/Contato';
import Sobre from './components/Sobre';
import PerfilCliente from './components/PerfilCliente';
import PainelProfissional from './components/PainelProfissional';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro-cliente" element={<CadastroCliente />} />
          <Route path="/cadastro-profissional" element={<CadastroProfissional />} />
          <Route path="/profissionais" element={<div>Página de Profissionais (em desenvolvimento)</div>} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/perfil-cliente" element={<PerfilCliente />} />
          <Route path="/painel-profissional" element={<PainelProfissional />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
