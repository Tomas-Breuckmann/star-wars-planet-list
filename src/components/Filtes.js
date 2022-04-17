import React, { useContext, useState } from 'react';
import StarContext from '../context/StarContext';

const FILTERS = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
// console.log(FILTERS);

function Filters() {
  // globa state
  const { namePlanet: { filterByName: { name } } } = useContext(StarContext);
  const { setNamePlanet } = useContext(StarContext);
  const { filters, setFilters } = useContext(StarContext);
  const renderWithoutFilters = filters.map((filter) => Object.values(filter)[0]);
  // console.log(renderWithoutFilters);
  const FilterToRender = FILTERS.filter((filtr) => !renderWithoutFilters.includes(filtr));
  // console.log(FilterToRender);
  // local state
  const [filterValues, setFilterValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  // console.log('local filter', filterValues);
  // console.log('global filters', filters);

  return (
    <>
      <h1>Filters</h1>
      <div>
        <label htmlFor="nameFilter">
          Name:
          <input
            type="text"
            name="nameFilter"
            data-testid="name-filter"
            onChange={ (event) => setNamePlanet({
              filterByName: { name: event.target.value } }) }
            value={ name }
          />
        </label>
      </div>
      <div>
        <label htmlFor="columnFilter">
          Choose collumn:
          <select
            name="columnFilter"
            data-testid="column-filter"
            onChange={ (event) => setFilterValues({
              ...filterValues, column: event.target.value }) }
          >
            {/* <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option> */}
            {
              FilterToRender.map((filtr, index) => (
                <option key={ index } value={ filtr }>{ filtr }</option>))
            }
          </select>
        </label>
        <label htmlFor="comparisonFilter">
          Choose comparison type:
          <select
            name="comparisonFilter"
            data-testid="comparison-filter"
            onChange={ (event) => setFilterValues({
              ...filterValues, comparison: event.target.value }) }
          >
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
            <option value="menor que">menor que</option>
          </select>
        </label>
        <label htmlFor="valueFilter">
          Choose value:
          <input
            data-testid="value-filter"
            type="number"
            name="valueFilter"
            value={ filterValues.value }
            onChange={ (event) => setFilterValues({
              ...filterValues, value: Number(event.target.value) }) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => setFilters([...filters, filterValues]) }
        >
          Filtrar
        </button>
      </div>
    </>
  );
}

export default Filters;
