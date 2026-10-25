export async function listarProdutos() {
  const resposta = await fetch('/produtos');

  if (!resposta.ok) {
    throw new Error('Não foi possível consultar os alimentos.');
  }

  return resposta.json();
}

export async function cadastrarProduto(nome) {
  let resposta;

  try {
    resposta = await fetch('/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome }),
    });
  } catch {
    throw new Error('Não foi possível salvar o alimento. Confira se o backend está ligado e tente novamente.');
  }

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => null);
    throw new Error(erro?.mensagem || 'Não foi possível cadastrar o alimento. Tente novamente.');
  }
}
