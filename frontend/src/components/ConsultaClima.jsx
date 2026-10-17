import { useState } from 'react';
import { consultarClimaSaoPaulo } from '../services/climaService.js';
import Mensagem from './Mensagem.jsx';

export default function ConsultaClima() {
  const [clima, setClima] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function consultarClima() {
    setCarregando(true);
    setErro('');
    setClima(null);

    try {
      const dados = await consultarClimaSaoPaulo();
      setClima(dados);
    } catch {
      setErro('Não foi possível consultar o clima. Confira sua conexão e tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="painel" aria-labelledby="titulo-clima">
      <div className="cabecalho-clima">
        <h2 id="titulo-clima">Clima atual em São Paulo</h2>
        <button onClick={consultarClima} disabled={carregando}>
          {carregando ? 'Consultando…' : 'Consultar clima de São Paulo'}
        </button>
      </div>

      {carregando && <p className="estado-lista" role="status">Buscando dados na Open-Meteo…</p>}
      <Mensagem tipo="erro">{erro}</Mensagem>

      {!clima && !carregando && !erro && (
        <p className="texto-clima">Clique no botão para consultar as condições atuais.</p>
      )}

      {clima && (
        <dl className="dados-clima" aria-live="polite">
          <div>
            <dt>Temperatura</dt>
            <dd>{clima.temperatura.toLocaleString('pt-BR')} °C</dd>
          </div>
          <div>
            <dt>Condição do tempo</dt>
            <dd>{clima.condicao}</dd>
          </div>
          <div>
            <dt>Chuva no intervalo informado pela API</dt>
            <dd>{clima.chuva.toLocaleString('pt-BR')} mm</dd>
          </div>
          <div>
            <dt>Referência dos dados — horário de São Paulo</dt>
            <dd>{new Date(clima.referenciaEm).toLocaleString('pt-BR', {
              timeZone: 'America/Sao_Paulo',
              dateStyle: 'short',
              timeStyle: 'short',
            })}</dd>
          </div>
        </dl>
      )}
    </section>
  );
}
