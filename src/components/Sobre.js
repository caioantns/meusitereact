import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Sobre.css';

const Sobre = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            offset: 100,
            once: true
        });
    }, []);

    return (
        <main>
            <section className="about-section">
                <div className="container">
                    <h1 className="section-title" data-aos="fade-up">Sobre o iTRAINER</h1>
                    
                    <div className="about-content">
                        <div className="about-text" data-aos="fade-right">
                            <h2>Nossa História</h2>
                            <p>O iTRAINER nasceu da necessidade de conectar profissionais de educação física qualificados com pessoas que buscam melhorar sua qualidade de vida através do exercício físico. Nossa plataforma foi desenvolvida para tornar esse processo mais acessível, transparente e eficiente.</p>
                            
                            <h2>Nossa Missão</h2>
                            <p>Transformar vidas através da educação física, conectando profissionais qualificados e pessoas que buscam uma vida mais saudável, de forma simples e acessível.</p>
                            
                            <h2>Nossa Visão</h2>
                            <p>Ser a principal plataforma de conexão entre profissionais de educação física e alunos em todo o Brasil, reconhecida pela qualidade dos serviços e pelo impacto positivo na vida das pessoas.</p>
                            
                            <h2>Nossos Valores</h2>
                            <ul className="values-list">
                                <li><i className="fas fa-check"></i> Qualidade e Excelência</li>
                                <li><i className="fas fa-check"></i> Compromisso com o Cliente</li>
                                <li><i className="fas fa-check"></i> Inovação Constante</li>
                                <li><i className="fas fa-check"></i> Ética e Transparência</li>
                                <li><i className="fas fa-check"></i> Responsabilidade Social</li>
                            </ul>
                        </div>
                        
                        <div className="about-features" data-aos="fade-left">
                            <div className="feature">
                                <i className="fas fa-users"></i>
                                <h3>Comunidade Ativa</h3>
                                <p>Milhares de profissionais e alunos conectados</p>
                            </div>
                            <div className="feature">
                                <i className="fas fa-certificate"></i>
                                <h3>Profissionais Qualificados</h3>
                                <p>Rigoroso processo de verificação de credenciais</p>
                            </div>
                            <div className="feature">
                                <i className="fas fa-star"></i>
                                <h3>Experiência Premium</h3>
                                <p>Interface intuitiva e suporte dedicado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <div className="cta-content" data-aos="fade-up">
                        <h2>Comece sua jornada fitness hoje</h2>
                        <p>Encontre o profissional ideal para alcançar seus objetivos</p>
                        <Link to="/profissionais" className="btn btn-primary">Encontrar Profissional</Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Sobre; 