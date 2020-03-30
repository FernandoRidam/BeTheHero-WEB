import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

export default function Register() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ whatsapp, setWhatsapp ] = useState('');
  const [ city, setCity ] = useState('');
  const [ uf, setUf ] = useState('');

  const history = useHistory();

  async function handleRegister( event ) {
    event.preventDefault();

    try {
      const response = await api.post('/ongs', {
        name,
        email,
        whatsapp,
        city,
        uf,
      });

      alert(`Seu ID: ${ response.data.id }`);

      history.push('/');
    } catch( error ) {
      alert('Falha ao se cadastrar, tente novamente!');
    }
  };

  return (
    <div className="register-container">
       <div className="content">
         <section>
           <img src={ logo } alt="Be The Hero"/>

           <h1>Cadastro</h1>
           <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

           <Link className="back-link" to="/">
            <FiArrowLeft size={ 16 } color="#E02041" />

            Não tenho cadastro
          </Link>
         </section>

         <form onSubmit={ handleRegister }>
            <input
              value={ name }
              onChange={ event => setName( event.target.value )}
              placeholder="Nome da ONG"
              required
            />

            <input
              value={ email }
              onChange={ event => setEmail( event.target.value )}
              type="email" placeholder="Email"
              required
            />

            <input
              value={ whatsapp }
              onChange={ event => setWhatsapp( event.target.value )}
              placeholder="Whatsapp"
              required
            />


            <div className="input-group">
              <input
                value={ city }
                onChange={ event => setCity( event.target.value )}
                placeholder="Cidade"
                required
              />

              <input
                value={ uf }
                onChange={ event => setUf( event.target.value )}
                placeholder="UF" style={{ width: 80 }}
                required
              />

            </div>

           <button className="button" type="submit">Cadastrar</button>
         </form>
       </div>
    </div>
  );
};
