import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { data } = useContext(StarContext);
  const { namePlanet: { filterByName: { name } } } = useContext(StarContext);
  const { filters } = useContext(StarContext);
  const { order } = useContext(StarContext);
  // console.log(order);
  const dataFilterName = data.filter((planet) => planet.name.includes(name));

  const handleFilter = (dataForFilter) => {
    let aux = dataForFilter;
    filters.forEach((filtr) => {
      const { column, comparison, value } = filtr;
      switch (comparison) {
      case 'maior que':
        aux = aux.filter((planet) => planet[column] > value);
        break;
      case 'menor que':
        aux = aux.filter((planet) => planet[column] < value);
        break;
      case 'igual a':
        aux = aux.filter((planet) => Number(planet[column]) === value);
        break;
      default:
        break;
      }
    });
    return aux;
  };

  const dataWithFilters = filters.length > 0
    ? handleFilter(dataFilterName) : dataFilterName;

  const handleSort = (array) => {
    const mOne = -1;
    const resposta = array.sort((a, b) => {
      // console.log(a.name, b.name);
      const fa = a.name.toLowerCase();
      const fb = b.name.toLowerCase();
      if (fa < fb) {
        return mOne;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    return resposta.reverse();
  };

  const handleOrder = () => {
    // console.log('estou no use effect da table', order);
    // console.log(dataWithFilters);
    const { column, sort } = order.order;
    const numbers = dataWithFilters.filter((planet) => planet[column] !== 'unknown');
    const notNumbers = dataWithFilters.filter((planet) => planet[column] === 'unknown');
    // fazer um if ternario aquo com se column==='name' fazer somente o sort
    const newa = column === 'name'
      ? handleSort(numbers)
      : numbers.sort((a, b) => Number(b[column]) - Number(a[column]));
    // console.log(newa);
    const newReverse = sort === 'ASC' ? newa.reverse() : newa;
    return [...newReverse, ...notNumbers];
  };
  const dataToRender = handleOrder();

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
          {dataToRender.map((planet, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{planet.name}</td>
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
