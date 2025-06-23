import React, { useEffect, useState, useRef } from 'react';
import './PainelProfissional.css';

const PainelProfissional = () => {
  const [user, setUser] = useState(null);
  const [profissional, setProfissional] = useState(undefined);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [horarios, setHorarios] = useState({});
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [historico, setHistorico] = useState([]);
  const inputFotoRef = useRef(null);

  const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const horariosDisponiveis = Array.from({ length: 11 }, (_, i) => `${i + 8}:00`);

  useEffect(() => {
    const userData = localStorage.getItem('itrainer_user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      
      const allUsers = JSON.parse(localStorage.getItem('itrainer_users') || '[]');
      const profData = allUsers.find(u => u.email === userObj.email && u.type === 'professional');
      if (profData) {
        setProfissional(profData);
        if (profData.foto) {
          setFotoPreview(profData.foto);
        }

        // Carregar horários salvos ou inicializar novos
        const horariosData = localStorage.getItem(`horarios_${userObj.email}`);
        if (horariosData) {
          setHorarios(JSON.parse(horariosData));
        } else {
          const horariosIniciais = {};
          diasSemana.forEach(dia => {
            horariosIniciais[dia] = {};
            horariosDisponiveis.forEach(horario => {
              horariosIniciais[dia][horario] = true;
            });
          });
          setHorarios(horariosIniciais);
          localStorage.setItem(`horarios_${userObj.email}`, JSON.stringify(horariosIniciais));
        }

        // Carregar solicitações e histórico
        const solicitacoesData = localStorage.getItem(`solicitacoes_${userObj.email}`);
        if (solicitacoesData) {
          setSolicitacoes(JSON.parse(solicitacoesData));
        }

        const historicoData = localStorage.getItem(`historico_${userObj.email}`);
        if (historicoData) {
          setHistorico(JSON.parse(historicoData));
        }
      }
    }
  }, []);

  const handleFotoClick = () => {
    inputFotoRef.current?.click();
  };

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
        salvarFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const salvarFoto = (fotoBase64) => {
    const allUsers = JSON.parse(localStorage.getItem('itrainer_users') || '[]');
    const userIndex = allUsers.findIndex(u => u.email === user.email && u.type === 'professional');
    
    if (userIndex !== -1) {
      allUsers[userIndex] = {
        ...allUsers[userIndex],
        foto: fotoBase64
      };
      localStorage.setItem('itrainer_users', JSON.stringify(allUsers));
      setProfissional(allUsers[userIndex]);
    }
  };

  const toggleHorario = (dia, horario) => {
    const novosHorarios = {
      ...horarios,
      [dia]: {
        ...horarios[dia],
        [horario]: !horarios[dia]?.[horario]
      }
    };
    setHorarios(novosHorarios);
    localStorage.setItem(`horarios_${user.email}`, JSON.stringify(novosHorarios));
  };

  const handleSolicitacao = (id, aceitar) => {
    const solicitacao = solicitacoes.find(s => s.id === id);
    if (solicitacao) {
      if (aceitar) {
        // Adicionar ao histórico
        const novoHistorico = [...historico, {
          aluno: solicitacao.aluno,
          data: solicitacao.data,
          horario: solicitacao.horario,
          tipo: 'Aula agendada',
          status: 'Confirmada'
        }];
        setHistorico(novoHistorico);
        localStorage.setItem(`historico_${user.email}`, JSON.stringify(novoHistorico));
      }

      // Remover solicitação
      const novasSolicitacoes = solicitacoes.filter(s => s.id !== id);
      setSolicitacoes(novasSolicitacoes);
      localStorage.setItem(`solicitacoes_${user.email}`, JSON.stringify(novasSolicitacoes));
    }
  };

  if (!user) {
    return (
      <main className="painel-container">
        <div className="prof-perfil">
          <h1>Painel do Profissional</h1>
          <p>Usuário não encontrado. Faça login novamente.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="painel-container">
      {/* Sidebar com informações do profissional */}
      <aside className="prof-sidebar">
        <div className="prof-perfil">
          <div className="prof-foto-container" onClick={handleFotoClick}>
            <div className="prof-foto">
              {fotoPreview ? (
                <img src={fotoPreview} alt={`Foto de ${user.name}`} />
              ) : (
                <div className="prof-foto-placeholder">👤</div>
              )}
              <div className="foto-overlay">
                <span>Clique para alterar a foto</span>
              </div>
            </div>
            <input
              type="file"
              ref={inputFotoRef}
              className="foto-input"
              accept="image/*"
              onChange={handleFotoChange}
            />
          </div>
          <div className="prof-info">
            <h1>{user.name}</h1>
            <div className="prof-detalhes">
              <p>{profissional?.area || 'Área não especificada'}</p>
              <p>{user.email}</p>
              <p>{profissional?.telefone || 'Telefone não cadastrado'}</p>
              <p>{profissional?.localizacao || 'Localização não cadastrada'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Área principal com horários, solicitações e histórico */}
      <div className="prof-main">
        {/* Container de Horários */}
        <section className="horarios-container">
          <h2 className="container-titulo">Horários Disponíveis</h2>
          <div className="horarios-grid">
            {diasSemana.map(dia => (
              <div key={dia} className="dia-semana">
                <h3 className="dia-titulo">{dia}</h3>
                <div className="horarios-row">
                  {horariosDisponiveis.map(horario => (
                    <button
                      key={horario}
                      className={`horario-btn ${horarios[dia]?.[horario] ? 'disponivel' : 'ocupado'}`}
                      onClick={() => toggleHorario(dia, horario)}
                      type="button"
                    >
                      {horario}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Container de Solicitações */}
        <section className="solicitacoes-container">
          <h2 className="container-titulo">Solicitações de Agendamento</h2>
          {solicitacoes.length === 0 ? (
            <p>Nenhuma solicitação pendente</p>
          ) : (
            solicitacoes.map(solicitacao => (
              <div key={solicitacao.id} className="solicitacao-item">
                <div className="solicitacao-header">
                  <span className="solicitacao-aluno">{solicitacao.aluno}</span>
                  <span className="solicitacao-data">{solicitacao.data}</span>
                </div>
                <p>{solicitacao.horario}</p>
                <div className="solicitacao-acoes">
                  <button
                    className="btn-aceitar"
                    onClick={() => handleSolicitacao(solicitacao.id, true)}
                  >
                    Aceitar
                  </button>
                  <button
                    className="btn-recusar"
                    onClick={() => handleSolicitacao(solicitacao.id, false)}
                  >
                    Recusar
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Container de Histórico */}
        <section className="historico-container">
          <h2 className="container-titulo">Histórico de Atendimentos</h2>
          {historico.length === 0 ? (
            <p>Nenhum atendimento registrado</p>
          ) : (
            historico.map((atendimento, index) => (
              <div key={index} className="historico-item">
                <div className="historico-header">
                  <span className="historico-aluno">{atendimento.aluno}</span>
                  <span className="historico-data">{atendimento.data}</span>
                </div>
                <div className="historico-detalhes">
                  <p>{atendimento.tipo}</p>
                  <p>{atendimento.status}</p>
                  {atendimento.observacoes && <p>{atendimento.observacoes}</p>}
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default PainelProfissional; 