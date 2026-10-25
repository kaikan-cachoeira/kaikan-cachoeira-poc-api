export async function consultarClimaSaoPaulo() {
  let resposta;

  try {
    resposta = await fetch('/clima/atual', { cache: 'no-store' });
  } catch {
    throw new Error('Não foi possível consultar o clima. Confira se o backend está ligado e tente novamente.');
  }

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => null);
    throw new Error(erro?.mensagem || 'Não foi possível consultar o clima. Tente novamente.');
  }

  return resposta.json();
}
