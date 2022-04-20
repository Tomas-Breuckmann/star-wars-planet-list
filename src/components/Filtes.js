import React, { useContext, useState } from 'react';
import StarContext from '../context/StarContext';
import style from './Filter.module.css';

const FILTERS = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
// console.log(FILTERS);

function Filters() {
  // global state
  const { namePlanet: { filterByName: { name } } } = useContext(StarContext);
  const { setNamePlanet } = useContext(StarContext);
  const { filters, setFilters, setOrder } = useContext(StarContext);
  // const { filterOrder, setFilterOrder } = useContext(StarContext);
  const renderWithoutFilters = filters.map((filter) => Object.values(filter)[0]);
  const FilterToRender = FILTERS.filter((filtr) => !renderWithoutFilters.includes(filtr));

  // local state
  const [filterValues, setFilterValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filterOrder, setFilterOrder] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

  const handleRemoveFilter = (filtr) => {
    const newFilters = filters.filter((obj) => obj.column !== filtr.column);
    setFilters(newFilters);
  };

  const handleFilterOrder = (value) => {
    setFilterOrder({
      order: { ...filterOrder.order, sort: value },
    });
  };

  return (
    <div className="body">

      <div className={ style.textFilter }>
        <label htmlFor="nameFilter">
          Name:
          {' '}
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

      <div className={ style.generalFilter }>
        <label htmlFor="columnFilter">
          Choose collumn:
          <select
            name="columnFilter"
            data-testid="column-filter"
            onChange={ (event) => setFilterValues({
              ...filterValues, column: event.target.value }) }
          >
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

      <div>
        <label htmlFor="filterSelectAscDes">
          <select
            name="filterSelectAscDes"
            data-testid="column-sort"
            onChange={ (event) => setFilterOrder({
              order: { ...filterOrder.order, column: event.target.value },
            }) }
          >
            <option name="population">population</option>
            <option name="orbital_period">orbital_period</option>
            <option name="diameter">diameter</option>
            <option name="rotation_period">rotation_period</option>
            <option name="surface_water">surface_water</option>
          </select>
        </label>
        <label name="ascDes" htmlFor="asc">
          Ascendente
          <input
            id="asc"
            type="radio"
            name="ascDes"
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ (event) => handleFilterOrder(event.target.value) }
          />
        </label>
        <label name="ascDes" htmlFor="des">
          Descendente
          <input
            id="des"
            type="radio"
            name="ascDes"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ (event) => handleFilterOrder(event.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => setOrder(filterOrder) }
        >
          Ordenar
        </button>
      </div>

      <div className={ style.activeFilters }>
        <div>
          {
            filters.map((filtr, index) => (
              <div key={ index } data-testid="filter" className={ style.activeOneFilter }>
                <p>
                  Filtro:
                  {' '}
                  { filtr.column }
                  {' '}
                  { filtr.comparison }
                  {' '}
                  { filtr.value }
                </p>
                <button
                  type="button"
                  // data-testid="button-remove-filters"
                  onClick={ () => handleRemoveFilter(filtr) }
                >
                  Remover
                </button>
              </div>
            ))
          }
        </div>
        <div>
          {
            filters.length > 0 && (
              <button
                type="button"
                className={ style.removeAll }
                data-testid="button-remove-filters"
                onClick={ () => setFilters([]) }
              >
                Remover filtros
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Filters;
