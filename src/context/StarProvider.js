import React, { useEffect, useState } from 'react';
import StarContext from './StarContext';

function StarProvider(props) {
  const [data, setData] = useState([]);
  const { children } = props;

  useEffect(() => {
    const getPlanet = async () => { // pegando os dados na API
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const responseJson = await response.json(); // dados totais
      const planets = responseJson.results; // pegando apenas os resultados que interessam
      planets.forEach((element) => { // eleiminando dos resultados a chave residents
        delete element.residents;
      });
      setData(planets);
      return planets;
    };
    getPlanet();
  }, []);

  return (
    <StarContext.Provider value={ { data, setData } }>
      {children}
    </StarContext.Provider>
  );
}

export default StarProvider;
