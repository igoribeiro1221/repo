import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface NovoPerifericoProps {}

export function NovoPeriferico(props: NovoPerifericoProps) {
  const [nome, setNome] = useState('');
  const computadorNome = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="block max-w-md rounded-lg bg-white p-6">
        <h1 className="font-sans font-bold text-4xl">Novo Periferico</h1>
        <div className="relative mb-6">
          <input
            className="inline-block w-full"
            type="text"
            placeholder="Nome"
            onChange={(event) => setNome(event.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block w-full"
          onClick={async () => {
            await axios.post(
              '/api/computador/' + computadorNome.nome + '/perifericos',
              {
                nome: nome,
              }
            );

            navigate('/', { replace: true });
          }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

export default NovoPeriferico;
