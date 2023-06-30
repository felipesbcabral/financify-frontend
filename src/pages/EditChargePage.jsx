import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditChargePage = () => {
  const { chargeId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharge = async () => {
      try {
        const response = await axios.get(`/charge/${chargeId}`);
        const charge = response.data;
        setName(charge.name);
        setDescription(charge.description);
        setDueDate(formatDate(charge.dueDate));
        setValue(charge.value);
        setStatus(charge.status);
      } catch (error) {
        console.error("Error fetching charge:", error);
      }
    };

    fetchCharge();
  }, [chargeId]);

  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleValueChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setValue(value);
      return;
    }
    const valueWithoutSeparators = value.replace(/\./g, "").replace(/,/g, ".");
    const regex = /^[0-9]*([.,][0-9]*)?$/;
    if (!regex.test(valueWithoutSeparators)) {
      toast.warning("O valor deve conter apenas números e um separador decimal.");
      return;
    }
    if (value < 0) {
      toast.warning("O valor não pode ser menor que zero.");
      return;
    }
    const numberValue = parseFloat(valueWithoutSeparators);
    if (isNaN(numberValue)) {
      toast.warning("O valor deve ser um número válido.");
      return;
    }
    const formattedValue = numberValue.toLocaleString("pt-BR", {
      maximumFractionDigits: 20,
    });
    setValue(formattedValue);
  };  

  const handleValueBlur = (event) => {
    const value = event.target.value;
    if (value === "") {
      setValue("");
      return;
    }
    const valueWithoutSeparators = value.replace(/\./g, "").replace(/,/g, ".");
    const numberValue = parseFloat(valueWithoutSeparators);
    if (isNaN(numberValue)) {
      toast.warning("O valor deve ser um número válido.");
      return;
    }
    const formattedValue = numberValue.toLocaleString("pt-BR");
    setValue(formattedValue);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleCancel = () => {
    navigate("/home");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedCharge = {
      name,
      description,
      dueDate,
      value: parseFloat(value),
      status,
    };

    try {
      await axios.put(`/charge/${chargeId}`, updatedCharge);
      navigate("/home", {
        state: { successMessage: "Cobrança atualizada com sucesso." },
      });
    } catch (error) {
      console.error("Error updating charge:", error);
      toast.error(
        "Erro ao atualizar a cobrança. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                E
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Editar cobrança</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                   Edite sua cobrança caso queira atualizar algum dado.
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Título:</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Título da cobrança"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Descrição:</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Descrição da cobrança"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="leading-loose">Data de vencimento:</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
                      <input
                        type="date"
                        className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        value={dueDate}
                        onChange={handleDueDateChange}
                        placeholder="25/02/2020"
                      />
                      <div className="absolute left-3 top-2">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            trokelinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Valor:</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      value={value}
                      onChange={handleValueChange}
                      onBlur={handleValueBlur}
                      placeholder="Valor da cobrança"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="leading-loose">Status:</label>
                    <select
                      className="pl-4 pr-8 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      value={status}
                      onChange={handleStatusChange}
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Pago">Pago</option>
                      <option value="Expirado">Expirado</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none bg-gray-100 hover:bg-gray-200"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      trokelinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      trokelinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      trokelinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-blue-600"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      trokelinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditChargePage;
