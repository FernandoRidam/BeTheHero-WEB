import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';
import heroes from '../../assets/heroes.png';
import { FiLogIn } from 'react-icons/fi';

export default function Logon() {
  const [ id, setId ] = useState('');

  const history = useHistory();

  async function handleLogin( event ) {
    event.preventDefault();

    try {
      const response = await api.post('/sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch( error ) {
      alert('Falha ao fazer login, tente novamente!');
    }
  };

  return (
    <div className="logon-container">
      <section className="form">
        <img src={ logo } alt="Be The Hero" className="logo"/>

        <form onSubmit={ handleLogin }>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={ id }
            onChange={ event => setId( event.target.value )}
            required
          />

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={ 16 } color="#E02041" />

            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={ heroes } alt="Heroes" className="heroes"/>
    </div>
  );
};
