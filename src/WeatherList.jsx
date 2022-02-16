import React from 'react';

export default function WeatherList({ weatherResults }) {
  function usableDate(secondsSince1970) {
    const dateObj = new Date(secondsSince1970 * 1000);
    const dateString = dateObj.toDateString();
    // console.log(dateString);

    return dateString;
  }


  return (
    <div>
      {
        weatherResults.map((eachDay, i) =>
          <div key={eachDay + i} className='weather-item'>
            <h3>{usableDate(eachDay.dt)}</h3>
            <img src={`http://openweathermap.org/img/wn/${eachDay.weather[0].icon}@2x.png`} alt="" />
            <h4>Temp: {eachDay.temp.day}</h4>
            <h4>Clouds: {eachDay.clouds}%</h4>
            <h4>Chance Rain: {eachDay.pop}%</h4>
          </div>
        )
      }
    </div>
  );
}
