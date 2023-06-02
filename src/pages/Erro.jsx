import { useNavigate } from 'react-router-dom';
import "../Styles/Erro.css";

function ErrorPage() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate('/');
  }

  function handleLogin() {
    navigate('/login');
  }

  return (
    <div className="error-container">
      <h1 className="error-title">Ops, ocorreu um erro!</h1>
      <p className="error-text">Desculpe, não foi possível processar a sua solicitação.</p>
      <p className="error-text">Esse erro pode ter ocorrido por diversos motivos, como, por exemplo:</p>
      <ul className="error-list">
        <li>A página solicitada não existe.</li>
        <li>É necessário fazer login para acessar a página.</li>
        <li>Houve um erro interno no servidor.</li>
      </ul>
      <p className="error-text">Se você já estiver logado, clique no botão abaixo para retornar à página inicial:</p>
      <button className="error-btn" onClick={handleGoBack}>Voltar para a Página Inicial</button>
      <p className="error-text">Se você ainda não estiver logado, clique no botão abaixo para fazer login:</p>
      <button className="error-btn" onClick={handleLogin}>Fazer Login</button>
    </div>
  );
}

export default ErrorPage;
