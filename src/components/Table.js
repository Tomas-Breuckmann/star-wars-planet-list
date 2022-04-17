import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { data } = useContext(StarContext);
  const { namePlanet: { filterByName: { name } } } = useContext(StarContext);
  const { filters } = useContext(StarContext);
  const dataFilterName = data.filter((planet) => planet.name.includes(name));

  const handleFilter = (dataForFilter) => {
    const { column, comparison, value } = filters[0];
    // console.log(filters[0]);
    // console.log(typeof value);
    // console.log(dataForFilter);
    switch (comparison) {
    case 'maior que':
      return dataForFilter.filter((planet) => planet[column] > value);
    case 'menor que':
      return dataForFilter.filter((planet) => planet[column] < value);
    case 'igual a':
      return dataForFilter.filter((planet) => Number(planet[column]) === value);
    default:
      return dataForFilter;
    }
  };

  const dataWithFilters = filters.length > 0
    ? handleFilter(dataFilterName) : dataFilterName;
  // console.log('data com os filtros', dataWithFilters);

  return (
    <>
      <h1>StarWars Planet List</h1>
      <table>
        {/* <caption>Planet List</caption> */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {dataWithFilters.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
