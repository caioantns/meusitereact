import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Cadastro.css';

const CadastroProfissional = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        foto: null,
        especialidades: [],
        experiencia: '',
        descricao: '',
        preco: '',
        horarios: '',
        localizacao: ''
    });
    const [searchEspecialidade, setSearchEspecialidade] = useState('');

    const especialidades = [
        'musculacao',
        'funcional',
        'yoga',
        'pilates',
        'crossfit',
        'boxe',
        'jiu-jitsu',
        'natacao',
        'danca',
        'meditacao',
        'reabilitacao',
        'nutricao'
    ];

    useEffect(() => {
        AOS.init({
            duration: 800,
            offset: 100,
            once: true
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            foto: file
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            especialidades: checked 
                ? [...prev.especialidades, value]
                : prev.especialidades.filter(item => item !== value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validação básica
        if (!formData.nome || !formData.email || !formData.senha) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Salvar dados no localStorage
        const savedUsers = JSON.parse(localStorage.getItem('itrainer_users') || '[]');
        
        // Verificar se o email já existe
        const existingUser = savedUsers.find(user => user.email === formData.email);
        if (existingUser) {
            alert('Este email já está cadastrado. Use outro email ou faça login.');
            return;
        }

        // Adicionar novo usuário
        const newUser = {
            ...formData,
            type: 'professional',
            area: formData.especialidades.join(', '),
            dataCadastro: new Date().toISOString()
        };
        
        savedUsers.push(newUser);
        localStorage.setItem('itrainer_users', JSON.stringify(savedUsers));

        // Simular cadastro
        console.log('Dados do cadastro profissional:', formData);
        
        // Simular sucesso
        alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
        navigate('/login');
    };

    const filteredEspecialidades = especialidades.filter(especialidade => 
        especialidade.toLowerCase().includes(searchEspecialidade.toLowerCase())
    );

    return (
        <main className="cadastro-container">
            <div className="cadastro-form" data-aos="fade-up">
                <h1>Cadastro de Profissional</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="nome">Nome Completo</label>
                        <input 
                            type="text" 
                            id="nome" 
                            name="nome" 
                            value={formData.nome}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input 
                            type="password" 
                            id="senha" 
                            name="senha" 
                            value={formData.senha}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefone">Telefone</label>
                        <input 
                            type="tel" 
                            id="telefone" 
                            name="telefone" 
                            value={formData.telefone}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="foto">Foto de Perfil</label>
                        <input 
                            type="file" 
                            id="foto" 
                            name="foto" 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="especialidades">Especialidades</label>
                        <div className="search-container">
                            <input 
                                type="text" 
                                id="searchEspecialidade" 
                                placeholder="Buscar especialidade..."
                                value={searchEspecialidade}
                                onChange={(e) => setSearchEspecialidade(e.target.value)}
                            />
                            <i className="fas fa-search"></i>
                        </div>
                        <div className="especialidades-container">
                            <div className="especialidades-grid">
                                {filteredEspecialidades.map(especialidade => (
                                    <label key={especialidade} className="especialidade-item">
                                        <input 
                                            type="checkbox" 
                                            name="especialidades" 
                                            value={especialidade}
                                            checked={formData.especialidades.includes(especialidade)}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span>{especialidade.charAt(0).toUpperCase() + especialidade.slice(1)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="experiencia">Anos de Experiência</label>
                        <input 
                            type="number" 
                            id="experiencia" 
                            name="experiencia" 
                            min="0" 
                            value={formData.experiencia}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descricao">Descrição Pessoal</label>
                        <textarea 
                            id="descricao" 
                            name="descricao" 
                            rows="4" 
                            value={formData.descricao}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="preco">Preço por Sessão (R$)</label>
                        <input 
                            type="number" 
                            id="preco" 
                            name="preco" 
                            min="0" 
                            step="0.01" 
                            value={formData.preco}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="horarios">Horários Disponíveis</label>
                        <input 
                            type="text" 
                            id="horarios" 
                            name="horarios" 
                            placeholder="Ex: Seg-Sex, 8h-18h"
                            value={formData.horarios}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="localizacao">Localização (Cidade/Estado)</label>
                        <input 
                            type="text" 
                            id="localizacao" 
                            name="localizacao" 
                            value={formData.localizacao}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-cadastro">Cadastrar</button>
                </form>
            </div>
        </main>
    );
};

export default CadastroProfissional; 