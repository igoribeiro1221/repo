import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface NovoComputadorProps {}

export function NovoComputador(props: NovoComputadorProps) {
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="block max-w-md rounded-lg bg-white p-6">
        <h1 className="font-sans font-bold text-4xl">Novo Computador</h1>
        <div className="relative mb-6">
          <input
            className="inline-block w-full"
            type="text"
            placeholder="Nome"
            onChange={(event) => setNome(event.target.value)}
          />
        </div>
        <div className="relative mb-6">
          <input
            className="inline-block w-full"
            type="text"
            placeholder="Cor"
            onChange={(event) => setCor(event.target.value)}
          />
        </div>
        <div className="relative mb-6">
          <input
            className="inline-block w-full"
            type="number"
            placeholder="Data de Fabricação"
            onChange={(event) => setDataFabricacao(+event.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block w-full"
          onClick={async () => {
            await axios.post('/api/computador', {
              nome: nome,
              cor: cor,
              dataFabricacao: dataFabricacao,
            });

            navigate('/', { replace: true });
          }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

export default NovoComputador;
