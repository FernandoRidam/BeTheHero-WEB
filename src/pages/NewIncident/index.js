import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

export default function NewIncident() {
  const ongId = localStorage.getItem('ongId');

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ value, setValue ] = useState('');

  const history = useHistory();

  async function handleNewIncident( event ) {
    event.preventDefault();

    try {
      const response = await api.post('/incidents', {
        title,
        description,
        value,
      }, {
        headers: {
          Authorization: ongId,
        },
      });

      history.push('/profile');
    } catch (error) {
      alert("Falha ao cadastrar novo caso, tente novamente!");
    }
  };

  return (
    <div className="new-incident-container">
       <div className="content">
         <section>
           <img src={ logo } alt="Be The Hero"/>

           <h1>Cadastrar novo caso</h1>
           <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

           <Link className="back-link" to="/profile">
            <FiArrowLeft size={ 16 } color="#E02041" />

            Voltar para home
          </Link>
         </section>

         <form>
            <input
              placeholder="Título do caso"
              value={ title }
              onChange={ event => setTitle( event.target.value )}
            />

            <textarea
              placeholder="Descrição"
              value={ description }
              onChange={ event => setDescription( event.target.value )}
            />

            <input
              placeholder="Valor em reias"
              value={ value }
              onChange={ event => setValue( event.target.value )}
            />

           <button
              onClick={ handleNewIncident }
              className="button"
              type="submit"
            >
              Cadastrar
            </button>
         </form>
       </div>
    </div>
  );
};
