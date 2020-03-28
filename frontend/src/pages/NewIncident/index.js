import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  async function handleNewincident(e) {
    e.preventDefault()

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });
    } catch (err) {
      alert('Não foi possível cadastrar o incidente, tente novamente.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Faça seu cadastro, entra na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewincident}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={setTitle(e => e.target.value)}
            />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={setDescription(e => e.target.value)}
            />
          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={setValue(e => e.target.value)}
            />

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}