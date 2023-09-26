import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Computador {
  nome: string;
  cor: string;
  dataFabricacao: number;
  perifericos: Perifericos[];
}

interface Perifericos {
  nome: string;
}

/* eslint-disable-next-line */
export interface MainProps {}

export function Main(props: MainProps) {
  const [computadores, setComputadores] = useState<Computador[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/computador/')
      .then((response) => {
        setComputadores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="flex">
        <h1 className="flex flex-auto place-content-center font-sans font-bold text-4xl">
          Lista de Computadores
        </h1>
        <button
          className="flex w-fit border-teal-700 rounded-lg border-2 p-4 m-2 hover:bg-teal-200"
          onClick={() => navigate('/addComputador', { replace: true })}
        >
          Novo Computador
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 content-stretch m-20">
        {computadores.map((computador) => (
          <div className="border-neutral-600 border-solid border-2 rounded-xl">
            <div className="flex">
              <h1 className="flex-auto mx-4 my-2 font-sans font-bold text-2xl">
                {computador.nome}
              </h1>
              <p
                className="flex place-content-end mx-4 my-2 font-sans font-bold text-2xl text-red-600 hover:cursor-pointer"
                onClick={() => {
                  axios.delete('/api/computador/' + computador.nome);
                  setComputadores(
                    computadores.filter(
                      (computadorFilter) =>
                        computadorFilter.nome !== computador.nome
                    )
                  );
                }}
              >
                X
              </p>
            </div>

            <ul className="grid grid-cols-1 mx-2">
              <li className="flex my-2">
                <label className="flex-none mx-1">cor:</label>
                <input
                  type="text"
                  className="flex w-fit"
                  value={computador.cor}
                  onChange={(event) => {
                    setComputadores(
                      computadores.map((computadorMap) => {
                        if (computadorMap.nome === computador.nome) {
                          computadorMap.cor = event.target.value;

                          return computadorMap;
                        }
                        return computadorMap;
                      })
                    );
                  }}
                  onBlur={(event) => {
                    axios.put('/api/computador/' + computador.nome, {
                      cor: event.target.value,
                    });
                  }}
                />
              </li>
              <li className="flex my-2">
                <label className="flex-none mx-1">Data de Fabricação:</label>
                <input
                  type="number"
                  className="flex w-3/4"
                  value={computador.dataFabricacao}
                  onChange={(event) => {
                    setComputadores(
                      computadores.map((computadorMap) => {
                        if (computadorMap.nome === computador.nome) {
                          computadorMap.dataFabricacao = +event.target.value;

                          return computadorMap;
                        }
                        return computadorMap;
                      })
                    );
                  }}
                  onBlur={(event) => {
                    axios.put('/api/computador/' + computador.nome, {
                      dataFabricacao: +event.target.value,
                    });
                  }}
                />
              </li>
            </ul>
            {computador.perifericos &&
              computador.perifericos.map((periferico) => (
                <div className="flex border-2 rounded-xl w-fit mx-2 bg-slate-100">
                  <label className="flex-none mx-2">Periferico: </label>
                  <span className="flex-auto">{periferico.nome}</span>
                  <span
                    className="flex place-content-end text-red-600 mx-2 hover:cursor-pointer"
                    onClick={async () => {
                      await axios.delete(
                        '/api/computador/' +
                          computador.nome +
                          '/perifericos/' +
                          periferico.nome
                      );

                      setComputadores(
                        computadores.map((computadorMap) => {
                          if (computadorMap.nome === computador.nome) {
                            computadorMap.perifericos =
                              computadorMap.perifericos.filter(
                                (perifericoFilter) =>
                                  perifericoFilter.nome !== periferico.nome
                              );
                          }
                          return computadorMap;
                        })
                      );
                    }}
                  >
                    X
                  </span>
                </div>
              ))}
            <button
              className="flex w-full place-content-center"
              onClick={() => {
                navigate('/addPeriferico/' + computador.nome, {
                  replace: true,
                });
              }}
            >
              Adicionar Item
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Main;
