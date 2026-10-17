import Mensagem from './Mensagem.jsx';
import TabelaAlimentos from './TabelaAlimentos.jsx';

export default function ListaAlimentos({ alimentos, carregando, salvando, erro, onAtualizar }) {
  let conteudo;

  if (carregando) {
    conteudo = <p className="estado-lista" role="status">Consultando alimentos…</p>;
  } else if (erro) {
    conteudo = <Mensagem tipo="erro">{erro}</Mensagem>;
  } else if (alimentos.length === 0) {
    conteudo = <p className="estado-lista">Nenhum alimento cadastrado.</p>;
  } else {
    conteudo = <TabelaAlimentos alimentos={alimentos} />;
  }

  return (
    <section className="painel" aria-labelledby="titulo-consulta">
      <div className="cabecalho-lista">
        <h2 id="titulo-consulta">Alimentos cadastrados</h2>
        <button className="botao-secundario" onClick={onAtualizar} disabled={carregando || salvando}>
          Atualizar lista
        </button>
      </div>

      {conteudo}
    </section>
  );
}
