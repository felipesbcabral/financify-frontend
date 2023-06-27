import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate("/");
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-fixed bg-cover bg-bottom error-bg">
      <div className="container">
        <div className="row">
          <div className="col-sm-8 offset-sm-2 text-red-600 text-center -mt-52">
            <div className="relative">
              <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
              <span className="absolute top-0 -ml-12 text-red-600 font-semibold">
                Oops!
              </span>
            </div>
            <h5 className="text-red-600 font-semibold -mr-10 -mt-3">
              Page not found
            </h5>
            <p className="text-red-600 mt-2 mb-6">
              We are sorry, but the page you requested was not found.
            </p>
            <div className="flex flex-col">
              <button
                className="bg-primary-600 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg mb-4"
                onClick={handleGoBack}
              >
                Vá para a página inicial
              </button>
              <button
                className="bg-primary-600 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg"
                onClick={handleLogin}
              >
                Vá para o login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
