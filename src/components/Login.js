import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [activeTab, setActiveTab] = useState('client');
    const [formData, setFormData] = useState({
        client: { email: '', password: '' },
        professional: { email: '', password: '' }
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (userType, field, value) => {
        setFormData(prev => ({
            ...prev,
            [userType]: {
                ...prev[userType],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e, userType) => {
        e.preventDefault();
        setIsLoading(true);

        const { email, password } = formData[userType];

        // Validação básica
        if (!email || !password) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            setIsLoading(false);
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um endereço de email válido.');
            setIsLoading(false);
            return;
        }

        // Simular API call
        setTimeout(() => {
            // Verificar dados de teste primeiro
            if (userType === 'client' && email === 'aluno@teste.com' && password === '12345') {
                const userData = {
                    name: 'Aluno Teste',
                    email: email,
                    type: 'client'
                };
                localStorage.setItem('itrainer_user', JSON.stringify(userData));
                navigate('/perfil-cliente');
            } else if (userType === 'professional' && email === 'admin@teste.com' && password === '12345') {
                const userData = {
                    name: 'Profissional Teste',
                    email: email,
                    type: 'professional'
                };
                localStorage.setItem('itrainer_user', JSON.stringify(userData));
                navigate('/painel-profissional');
            } else {
                // Verificar dados salvos no localStorage
                const savedUsers = JSON.parse(localStorage.getItem('itrainer_users') || '[]');
                const user = savedUsers.find(u => 
                    u.email === email && 
                    u.senha === password && 
                    u.type === userType
                );

                if (user) {
                    const userData = {
                        name: user.nome,
                        email: user.email,
                        type: user.type
                    };
                    localStorage.setItem('itrainer_user', JSON.stringify(userData));
                    navigate(user.type === 'client' ? '/perfil-cliente' : '/painel-profissional');
                } else {
                    alert('Email ou senha inválidos! Verifique se você já se cadastrou.');
                }
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <main>
            <section className="login-section">
                <div className="container">
                    <div className="login-container">
                        <div className="login-header">
                            <h2>Bem-vindo ao iTrainer!</h2>
                            <p>Escolha como deseja continuar</p>
                        </div>
                        
                        <div className="login-tabs">
                            <button 
                                className={`tab-btn ${activeTab === 'client' ? 'active' : ''}`}
                                onClick={() => handleTabChange('client')}
                            >
                                Cliente
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'professional' ? 'active' : ''}`}
                                onClick={() => handleTabChange('professional')}
                            >
                                Profissional
                            </button>
                        </div>
                        
                        <div className="tab-content">
                            <div className={`tab-pane ${activeTab === 'client' ? 'active' : ''}`} id="client-login">
                                <form 
                                    className="login-form"
                                    onSubmit={(e) => handleSubmit(e, 'client')}
                                >
                                    <div className="form-group">
                                        <label htmlFor="client-email">Email</label>
                                        <input 
                                            type="email" 
                                            id="client-email" 
                                            name="email" 
                                            value={formData.client.email}
                                            onChange={(e) => handleInputChange('client', 'email', e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="client-password">Senha</label>
                                        <input 
                                            type="password" 
                                            id="client-password" 
                                            name="password" 
                                            value={formData.client.password}
                                            onChange={(e) => handleInputChange('client', 'password', e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Entrando...' : 'Entrar'}
                                    </button>
                                    <p className="form-footer">
                                        Não tem uma conta? <Link to="/cadastro-cliente">Cadastre-se</Link>
                                    </p>
                                </form>
                            </div>
                            
                            <div className={`tab-pane ${activeTab === 'professional' ? 'active' : ''}`} id="professional-login">
                                <form 
                                    className="login-form"
                                    onSubmit={(e) => handleSubmit(e, 'professional')}
                                >
                                    <div className="form-group">
                                        <label htmlFor="professional-email">Email</label>
                                        <input 
                                            type="email" 
                                            id="professional-email" 
                                            name="email" 
                                            value={formData.professional.email}
                                            onChange={(e) => handleInputChange('professional', 'email', e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="professional-password">Senha</label>
                                        <input 
                                            type="password" 
                                            id="professional-password" 
                                            name="password" 
                                            value={formData.professional.password}
                                            onChange={(e) => handleInputChange('professional', 'password', e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Entrando...' : 'Entrar'}
                                    </button>
                                    <p className="form-footer">
                                        Não tem uma conta? <Link to="/cadastro-profissional">Cadastre-se</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Login; 