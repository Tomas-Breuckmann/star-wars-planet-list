import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';

function StarProvider(props) {
  const [data, setData] = useState([]);
  const [namePlanet, setNamePlanet] = useState({ filterByName: { name: '' } });
  const [filters, setFilters] = useState([]);
  const [order, setOrder] = useState({ order: { column: 'name', sort: 'ASC' } });
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

  const dados = {
    data,
    setData,
    namePlanet,
    setNamePlanet,
    filters,
    setFilters,
    order,
    setOrder,
  };

  return (
    <StarContext.Provider
      value={ dados }
    >
      {children}
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
