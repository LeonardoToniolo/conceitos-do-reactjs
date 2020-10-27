import React, { useState,useEffect } from "react";
import api from "./services/api"

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(repositories => {
      setRepositories(repositories.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = await api.post('repositories', {
      title: `Desafio Node.JS ${Date.now()}`,
      url:"https://github.com/LeonardoToniolo/gostack-desafio-2", 
      techs: ["Node.JS","..."]
    })

    setRepositories([...repositories, newRepository.data])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
    const newRepositories = repositories.filter((item) => item.id !== id);
    setRepositories(newRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
        )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
