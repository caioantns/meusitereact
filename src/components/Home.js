import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

const Home = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { type: 'support', text: 'Olá! Como posso ajudar você hoje?' }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const testimonials = [
        {
            content: "Excelente atendimento! Os profissionais são muito atenciosos e o acompanhamento é excepcional!",
            author: "Maria Silva",
            title: "Cliente desde 2025",
            image: "https://via.placeholder.com/60x60/667eea/ffffff?text=MS"
        },
        {
            content: "Sempre encontro horários disponíveis e o atendimento é rápido e eficiente. Recomendo!",
            author: "João Santos",
            title: "Cliente desde 2025",
            image: "https://via.placeholder.com/60x60/764ba2/ffffff?text=JS"
        }
    ];

    const services = [
        {
            icon: "fa-solid fa-comment",
            title: "Consultoria e Treinamento Personalizado",
            description: "Acompanhamento físico e ajustes no treino conforme progresso"
        },
        {
            icon: "fa-solid fa-user-plus",
            title: "Programas Específicos",
            description: "Treinamento funcional, Treino para atletas de alto rendimento"
        },
        {
            icon: "fa-solid fa-users",
            title: "Aulas Online e Videoaulas",
            description: "Plataforma de treinos online com vídeos explicativos"
        },
        {
            icon: "fas fa-stethoscope",
            title: "Avaliação Física e Nutricional",
            description: "Avaliação de desempenho e mobilidade, Orientação nutricional"
        }
    ];

    useEffect(() => {
        // Inicializar AOS
        AOS.init({
            duration: 800,
            offset: 100,
            once: true
        });

        // Auto-play do testimonial slider
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const sendMessage = () => {
        if (newMessage.trim()) {
            const userMessage = { type: 'user', text: newMessage };
            setChatMessages(prev => [...prev, userMessage]);
            setNewMessage('');

            // Simular resposta do suporte
            setTimeout(() => {
                const supportMessage = { 
                    type: 'support', 
                    text: 'Obrigado por sua mensagem! Nossa equipe entrará em contato em breve.' 
                };
                setChatMessages(prev => [...prev, supportMessage]);
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <>
            <main>
                <section className="hero">
                    <div className="hero-content" data-aos="fade-up">
                        <h1>Transforme sua vida através do treinamento personalizado</h1>
                        <p>Conecte-se com os melhores profissionais e alcance seus objetivos de forma eficiente e segura</p>
                        <div className="hero-buttons">
                            <Link to="/contato" className="btn btn-primary">Agende um Treino</Link>
                            <a href="#services" className="btn btn-secondary">Conheça Nossos Serviços</a>
                        </div>
                    </div>
                    <div className="hero-overlay"></div>
                </section>

                <section className="services" id="services">
                    <div className="container">
                        <h2 data-aos="fade-up">Nossos Serviços</h2>
                        <div className="services-grid">
                            {services.map((service, index) => (
                                <div 
                                    key={index}
                                    className="service-card" 
                                    data-aos="fade-up" 
                                    data-aos-delay={100 * (index + 1)}
                                >
                                    <div className="service-icon">
                                        <i className={service.icon}></i>
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <Link to="/contato" className="service-link">
                                        Saiba mais <i className="fas fa-arrow-right"></i>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="about-preview">
                    <div className="container">
                        <div className="about-content" data-aos="fade-right">
                            <h2>Sobre Nosso Site</h2>
                            <p>Bem-vindo ao nosso site! 🚀 Criado em 2025, nossa plataforma foi desenvolvida com o objetivo de conectar você ao personal trainer ideal. Aqui, você pode encontrar profissionais especializados em diversas áreas de treinamento, garantindo um acompanhamento personalizado e eficiente para atingir seus objetivos de saúde e bem-estar.</p>
                            <div className="about-features">
                                <div className="feature">
                                    <i className="fas fa-check-circle"></i>
                                    <span>Profissionais Certificados</span>
                                </div>
                                <div className="feature">
                                    <i className="fas fa-check-circle"></i>
                                    <span>Treinos Personalizados</span>
                                </div>
                                <div className="feature">
                                    <i className="fas fa-check-circle"></i>
                                    <span>Acompanhamento Online</span>
                                </div>
                            </div>
                            <Link to="/sobre" className="btn btn-secondary">Saiba Mais</Link>
                        </div>
                        <div className="about-image" data-aos="fade-left">
                            <img src="https://via.placeholder.com/600x400/667eea/ffffff?text=Personal+Trainer" alt="Personal trainer dando instruções para aluno" loading="lazy" />
                        </div>
                    </div>
                </section>

                <section className="testimonials">
                    <div className="container">
                        <h2 data-aos="fade-up">O que nossos clientes dizem</h2>
                        <div className="testimonial-slider">
                            {testimonials.map((testimonial, index) => (
                                <div 
                                    key={index}
                                    className={`testimonial ${index === currentTestimonial ? 'active' : ''}`}
                                    data-aos="fade-up"
                                    style={{ display: index === currentTestimonial ? 'block' : 'none' }}
                                >
                                    <div className="testimonial-content">
                                        <i className="fas fa-quote-left"></i>
                                        <p>{testimonial.content}</p>
                                    </div>
                                    <div className="testimonial-author">
                                        <img src={testimonial.image} alt={`Cliente ${testimonial.author}`} loading="lazy" />
                                        <div className="author-info">
                                            <span className="author-name">{testimonial.author}</span>
                                            <span className="author-title">{testimonial.title}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="testimonial-dots">
                            {testimonials.map((_, index) => (
                                <span 
                                    key={index}
                                    className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                                    onClick={() => setCurrentTestimonial(index)}
                                ></span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <div className="container">
                        <div className="cta-content" data-aos="fade-up">
                            <h2>Pronto para transformar sua vida?</h2>
                            <p>Comece sua jornada fitness hoje mesmo com os melhores profissionais</p>
                            <Link to="/contato" className="btn btn-primary">Comece Agora</Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Seção de Suporte ao Cliente */}
            <section className="support-section" id="support-section">
                <div className="container">
                    <h2 className="section-title">Suporte ao Cliente</h2>
                    <div className="support-grid">
                        <div className="support-card">
                            <i className="fas fa-headset"></i>
                            <h3>Atendimento 24/7</h3>
                            <p>Nossa equipe está disponível para ajudar você a qualquer momento.</p>
                        </div>
                        <div className="support-card">
                            <i className="fas fa-comments"></i>
                            <h3>Chat Online</h3>
                            <p>Converse com nossos atendentes em tempo real.</p>
                            <button className="btn btn-primary" onClick={() => setIsChatOpen(true)}>
                                Iniciar Chat
                            </button>
                        </div>
                        <div className="support-card">
                            <i className="fas fa-envelope"></i>
                            <h3>Email</h3>
                            <p>Envie suas dúvidas para: suporte@itrainer.com</p>
                        </div>
                        <div className="support-card">
                            <i className="fas fa-phone"></i>
                            <h3>Telefone</h3>
                            <p>Ligue para: (11) 99999-9999</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal de Chat */}
            {isChatOpen && (
                <div className="chat-modal active" id="chatModal">
                    <div className="chat-header">
                        <h3>Suporte ao Cliente</h3>
                        <button 
                            className="close-chat" 
                            aria-label="Fechar chat"
                            onClick={() => setIsChatOpen(false)}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="chat-body">
                        <div className="chat-messages">
                            {chatMessages.map((message, index) => (
                                <div key={index} className={`message ${message.type}`}>
                                    <p>{message.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <input 
                                type="text" 
                                placeholder="Digite sua mensagem..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button onClick={sendMessage}>
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Botão Flutuante de Suporte */}
            <a href="#support-section" className="support-float-button">
                <i className="fas fa-headset"></i>
                <span>Suporte</span>
            </a>
        </>
    );
};

export default Home; 