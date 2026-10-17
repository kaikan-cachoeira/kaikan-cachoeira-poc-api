import FormularioAlimento from './components/FormularioAlimento.jsx';
import ListaAlimentos from './components/ListaAlimentos.jsx';
import ConsultaClima from './components/ConsultaClima.jsx';
import useAlimentos from './hooks/useAlimentos.js';

export default function App() {
  const {
    alimentos,
    carregando,
    salvando,
    erroConsulta,
    consultarAlimentos,
    cadastrarAlimento,
  } = useAlimentos();

  return (
    <main>
      <header className="cabecalho">
        <h1>Cadastro de alimentos</h1>
        <p>Cadastre pelo nome e consulte os alimentos registrados.</p>
      </header>

      <ConsultaClima />

      <FormularioAlimento onCadastrar={cadastrarAlimento} salvando={salvando} />

      <ListaAlimentos
        alimentos={alimentos}
        carregando={carregando}
        salvando={salvando}
        erro={erroConsulta}
        onAtualizar={consultarAlimentos}
      />
    </main>
  );
}
