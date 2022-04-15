import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function Filters() {
  const { namePlanet: { filterByName: { name } } } = useContext(StarContext);
  const { setNamePlanet } = useContext(StarContext);
  // console.log(name);

  const handleChange = (event) => {
    // console.log('estou na handleChange');
    setNamePlanet({ filterByName: { name: event.target.value } });
  };

  return (
    <>
      <h1>Filters</h1>
      <label htmlFor="nameFilter">
        <input
          type="text"
          name="nameFilter"
          data-testid="name-filter"
          onChange={ handleChange }
          value={ name }
        />
      </label>
    </>
  );
}

export default Filters;
