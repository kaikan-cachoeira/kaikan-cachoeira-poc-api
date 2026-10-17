function formatarHorario(valor) {
  if (!valor) {
    return 'Não informado';
  }

  return new Date(valor).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

export default function TabelaAlimentos({ alimentos }) {
  return (
    <div className="tabela-container">
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome do alimento</th>
            <th scope="col">Data/hora do cadastro</th>
            <th scope="col">Clima registrado</th>
          </tr>
        </thead>
        <tbody>
          {alimentos.map(alimento => (
            <tr key={alimento.id}>
              <td>{alimento.id}</td>
              <td>{alimento.nome}</td>
              <td className="horario-cadastro">{formatarHorario(alimento.cadastradoEm)}</td>
              <td>
                {alimento.temperatura != null && alimento.chuva != null && alimento.condicao && alimento.referenciaEm ? (
                  <div className="clima-registrado">
                    <span>{alimento.temperatura.toLocaleString('pt-BR')} °C · {alimento.chuva.toLocaleString('pt-BR')} mm de chuva</span>
                    <span>{alimento.condicao}</span>
                    <small>Referência: {formatarHorario(alimento.referenciaEm)}</small>
                  </div>
                ) : (
                  <span className="clima-ausente">Sem clima registrado</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
