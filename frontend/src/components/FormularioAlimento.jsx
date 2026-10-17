import { useState } from 'react';
import Mensagem from './Mensagem.jsx';

export default function FormularioAlimento({ onCadastrar, salvando }) {
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function enviarFormulario(evento) {
    evento.preventDefault();
    setErro('');
    setMensagem('');

    if (!nome.trim()) {
      setErro('Informe o nome do alimento.');
      return;
    }

    try {
      await onCadastrar(nome.trim());
      setNome('');
      setMensagem('Alimento cadastrado com o clima de São Paulo.');
    } catch (erro) {
      setErro(erro.message || 'Não foi possível cadastrar o alimento. Tente novamente.');
    }
  }

  return (
    <section className="painel" aria-labelledby="titulo-cadastro">
      <h2 id="titulo-cadastro">Novo alimento</h2>
      <p className="ajuda-cadastro">O clima de São Paulo será consultado ao cadastrar e registrado junto do alimento.</p>

      <form onSubmit={enviarFormulario}>
        <label htmlFor="nome">Nome do alimento</label>
        <div className="campos-cadastro">
          <input
            id="nome"
            type="text"
            placeholder="Ex.: Arroz"
            value={nome}
            onChange={evento => setNome(evento.target.value)}
            maxLength={255}
            disabled={salvando}
            required
          />
          <button type="submit" disabled={salvando}>
            {salvando ? 'Consultando clima e cadastrando…' : 'Cadastrar alimento'}
          </button>
        </div>
      </form>

      <Mensagem tipo="erro">{erro}</Mensagem>
      <Mensagem>{mensagem}</Mensagem>
    </section>
  );
}
