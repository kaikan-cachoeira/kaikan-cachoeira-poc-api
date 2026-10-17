import { useCallback, useEffect, useState } from 'react';
import { cadastrarProduto, listarProdutos } from '../services/produtoService.js';
import { consultarClimaSaoPaulo } from '../services/climaService.js';

export default function useAlimentos() {
  const [alimentos, setAlimentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroConsulta, setErroConsulta] = useState('');

  const consultarAlimentos = useCallback(async () => {
    setCarregando(true);
    setErroConsulta('');

    try {
      const dados = await listarProdutos();
      setAlimentos(dados);
    } catch {
      setErroConsulta('Não foi possível consultar os alimentos. Confira se o backend está ligado e tente novamente.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    consultarAlimentos();
  }, [consultarAlimentos]);

  async function cadastrarAlimento(nome) {
    setSalvando(true);

    try {
      let clima;

      try {
        clima = await consultarClimaSaoPaulo();
      } catch {
        throw new Error('Não foi possível consultar o clima de São Paulo. O alimento não foi cadastrado. Tente novamente.');
      }

      const produto = {
        nome,
        temperatura: clima.temperatura,
        chuva: clima.chuva,
        condicao: clima.condicao,
        referenciaEm: clima.referenciaEm,
      };

      try {
        await cadastrarProduto(produto);
      } catch {
        throw new Error('Não foi possível salvar o alimento. Confira se o backend está ligado e tente novamente.');
      }

      await consultarAlimentos();
    } finally {
      setSalvando(false);
    }
  }

  return {
    alimentos,
    carregando,
    salvando,
    erroConsulta,
    consultarAlimentos,
    cadastrarAlimento,
  };
}
