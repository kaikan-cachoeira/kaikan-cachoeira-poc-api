const condicoesTempo = {
  0: 'Céu limpo',
  1: 'Predominantemente limpo',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Nevoeiro',
  48: 'Nevoeiro com geada',
  51: 'Garoa leve',
  53: 'Garoa moderada',
  55: 'Garoa intensa',
  56: 'Garoa congelante leve',
  57: 'Garoa congelante intensa',
  61: 'Chuva leve',
  63: 'Chuva moderada',
  65: 'Chuva forte',
  66: 'Chuva congelante leve',
  67: 'Chuva congelante forte',
  71: 'Neve leve',
  73: 'Neve moderada',
  75: 'Neve intensa',
  77: 'Grãos de neve',
  80: 'Pancadas de chuva leves',
  81: 'Pancadas de chuva moderadas',
  82: 'Pancadas de chuva fortes',
  85: 'Pancadas de neve leves',
  86: 'Pancadas de neve fortes',
  95: 'Tempestade',
  96: 'Tempestade com granizo leve',
  97: 'Tempestade forte',
  99: 'Tempestade com granizo forte',
};

export async function consultarClimaSaoPaulo() {
  const parametros = new URLSearchParams({
    latitude: '-23.5505',
    longitude: '-46.6333',
    current: 'temperature_2m,rain,showers,weather_code',
    temperature_unit: 'celsius',
    precipitation_unit: 'mm',
    timezone: 'America/Sao_Paulo',
    timeformat: 'unixtime',
  });

  const resposta = await fetch(`https://api.open-meteo.com/v1/forecast?${parametros}`, {
    cache: 'no-store',
  });

  if (!resposta.ok) {
    throw new Error('Não foi possível consultar a Open-Meteo.');
  }

  const dados = await resposta.json();
  const atual = dados.current;

  if (!atual || ![
    atual.temperature_2m,
    atual.rain,
    atual.showers,
    atual.weather_code,
    atual.time,
  ].every(Number.isFinite)) {
    throw new Error('A Open-Meteo retornou dados incompletos.');
  }

  return {
    temperatura: atual.temperature_2m,
    chuva: atual.rain + atual.showers,
    codigoTempo: atual.weather_code,
    condicao: condicoesTempo[atual.weather_code] || 'Condição não identificada',
    referenciaEm: new Date(atual.time * 1000).toISOString(),
  };
}
