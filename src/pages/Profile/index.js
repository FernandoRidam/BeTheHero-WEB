import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';

import CaseBox from '../../components/CaseBox';

export default function Profile() {
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  const [ incidents, setIncidents ] = useState([]);

  async function handleDeleteIncidents( id ) {
    try {
      await api.delete(`/incidents/${ id }`, {
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents( incidents.filter( incident => incident.id !== id ));
    } catch( error ) {
      alert('Falha ao deletar caso!');
    }
  };

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  };

  useEffect(() => {
    async function loadIncidents() {
      try {
        const response = await api.get('/profile', {
          headers: {
            Authorization: ongId,
          }
        });

        setIncidents( response.data );
      } catch( error ) {}
    };

    loadIncidents();
  }, [ ongId ]);

  return (
    <div className="profile-container">
      <header>
        <img src={ logo } alt="Be The Hero"/>

        <span>Bem vinda, { ongName }</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>

        <button
          onClick={ handleLogout }
          type="button"
        >
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {
          incidents.map( incident =>
          <CaseBox
            key={ incident.id }
            item={ incident }
            handleDeleteIncidents={ handleDeleteIncidents }
          />)
        }
      </ul>
    </div>
  );
};
