export async function listarProdutos() {
  const resposta = await fetch('/produtos');

  if (!resposta.ok) {
    throw new Error('Não foi possível consultar os alimentos.');
  }

  return resposta.json();
}

export async function cadastrarProduto(produto) {
  const resposta = await fetch('/produtos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });

  if (!resposta.ok) {
    throw new Error('Não foi possível cadastrar o alimento.');
  }
}
