import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios.get('/api/jokes')  // Changed the URL to use the proxy
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);  // Added an empty dependency array to avoid continuous requests

  return (
    <>
      <h1>chai and full stack</h1>
      <p>Jokes: {jokes.length}</p>
      {
        jokes.map((joke) => (  // Changed to return the JSX within the map
          <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>
        ))
      }
    </>
  );
}

export default App;
