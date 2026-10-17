export default function Mensagem({ tipo = 'sucesso', children }) {
  if (!children) {
    return null;
  }

  return (
    <p className={`mensagem ${tipo}`} role={tipo === 'erro' ? 'alert' : 'status'}>
      {children}
    </p>
  );
}
