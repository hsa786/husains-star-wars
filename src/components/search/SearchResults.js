import React from 'react';

import { getMin, getMax, getPercent } from '../../helpers';

const SearchResults = ({ data }) => {
  // Render Planets
  const renderPlanets = () => {
    const arr = [];
    const min = getMin(data, 'population');
    const max = getMax(data, 'population');

    data.map((planet, i) => {
      const population = parseInt(planet.population);
      const percent = getPercent(population, min, max);

      let fontSize = (percent * (2 - 0.875) / 100) + 0.875;

      const opacity = isNaN(fontSize) ? 0.5 : 1;

      fontSize = isNaN(fontSize) ? 'inherit' : `${fontSize}rem`;      

      arr.push(
        <li className="d-inline-block planet" style={{ fontSize, opacity }} key={i}>{planet.name}</li>
      )      
    })

    return arr;
  }

  return (
    <div>
      <hr />
      <ul className="planets">
        {/* Render Planetss */}
        {renderPlanets()}
      </ul>
    </div>
  )
}

export default SearchResults;