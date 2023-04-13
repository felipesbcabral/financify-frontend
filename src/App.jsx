import React, { useState } from 'react';

// Componente de tela de adicionar item
function AdicionarItem({ adicionarItem }) {
  const [item, setItem] = useState('');
  const [valor, setValor] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (item && valor) {
      adicionarItem(item, parseFloat(valor));
      setItem('');
      setValor('');
    } else {
      alert('Por favor, preencha o nome do item e o valor.');
    }
  };

  return (
    <div>
      <h2>Adicionar Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemInput">Item:</label>
          <input
            type="text"
            id="itemInput"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="valorInput">Valor:</label>
          <input
            type="number"
            id="valorInput"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

// Componente de tela de listar itens
function ListarItens({ itens, editarItem }) {
  return (
    <div>
      <h2>Listar Itens</h2>
      <ul>
        {itens.map((item, index) => (
          <li key={index}>
            {item.item} - R$ {item.valor}
            <button onClick={() => editarItem(index)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente de App
function App() {
  const [itens, setItens] = useState([]);

  // Função para adicionar um novo item
  const adicionarItem = (item, valor) => {
    const novoItem = { item, valor };
    setItens([...itens, novoItem]);
  };

  // Função para editar um item existente
  const editarItem = (index) => {
    const itemAtualizado = prompt('Digite o novo nome do item:');
    const valorAtualizado = parseFloat(prompt('Digite o novo valor do item:'));
    const itensAtualizados = [...itens];
    itensAtualizados[index] = { item: itemAtualizado, valor: valorAtualizado };
    setItens(itensAtualizados);
  };

  return (
    <div>
      <h1>Controle Financeiro</h1>
      <AdicionarItem adicionarItem={adicionarItem} />
      <ListarItens itens={itens} editarItem={editarItem} />
    </div>
  );
}

export default App;
