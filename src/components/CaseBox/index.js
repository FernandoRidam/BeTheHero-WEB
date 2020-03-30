import React from 'react';

import { FiTrash2 } from 'react-icons/fi';

export default function CaseBox({ item , handleDeleteIncidents }) {
  return (
    <li>
      <strong>CASO:</strong>
      <p>{ item.title }</p>

      <strong>DESCRIÇÃO:</strong>
      <p>{ item.description }</p>

      <strong>VALOR:</strong>
      <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format( item.value )}</p>

      <button
        type="button"
        onClick={() => handleDeleteIncidents( item.id )}
      >
        <FiTrash2 size={20} color="#A8A8B3" />
      </button>
    </li>
  )
};
