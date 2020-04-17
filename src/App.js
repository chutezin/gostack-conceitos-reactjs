import React, { useState, useEffect} from "react";
import api from "./services/api";
import "./styles.css";




function App() {

  const [repositories, setRepositories] = useState( [] );


  useEffect( () => {
    api.get('repositories').then( response => {
     setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

  const response = await api.post('repositories', {
    title: `Novo repo ${ Date.now() }`,
    url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
    techs: ["NodeJs", "Javascripts"]
  });
  const repository = response.data;
  setRepositories([...repositories, repository ]);

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    const filteredRepos = repositories.filter( o => { 
      if( o.id !== id ){
        return o
      }
      return null; 
    });

    setRepositories(filteredRepos);
    
   
  }

  return (
    <div>
      <ul data-testid="repository-list">
      { repositories.map( repository => {  
         return   <li key={ repository.id }>
            {repository.title}  
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
      })

      }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
