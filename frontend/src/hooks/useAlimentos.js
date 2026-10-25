import { useCallback, useEffect, useState } from 'react';
import { cadastrarProduto, listarProdutos } from '../services/produtoService.js';

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
      await cadastrarProduto(nome);
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
