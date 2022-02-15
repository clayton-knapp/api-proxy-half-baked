import React from 'react';

export default function YelpList({ yelpResults }) {
  return (
    <div className='yelp-items'>
      {
        yelpResults.map((yelpItem, i)=> 
          <div key={yelpItem + i} className='yelp-item'>
            <h3>{yelpItem.name}</h3>
            <p>{yelpItem.location.address1}</p>
            <img src={yelpItem.image_url}></img>
          </div>
        )
      }
    </div>
  );
}
