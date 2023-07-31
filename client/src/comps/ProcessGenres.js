import React from 'react';
const edmSubGenres = [
  'house', 
  'complextro', 
  'edm', 
  'dubstep', 
  'techno', 
  'gaming', 
  'bass', 
  'electronic', 
  'trance',
  'brostep',
  'progressive',
  'dance'
];

const ProcessGenres = (topArtists) => {
  let topGenresList = [];
  topArtists.forEach(artist => {
    artist.genres.forEach(genre => {
      const index = topGenresList.findIndex((item) => item.name === genre);
      if(index === -1) {
        topGenresList.push({name: genre, value: 1});
      } else {
        topGenresList[index].value++;
      }
    })
  })
  topGenresList = genreArrayFilter(topGenresList, edmSubGenres);
  const sortedData = [...topGenresList].sort((a, b) => b.value - a.value);
  return sortedData;
}

const genreArrayFilter = (genreArray, edmSubGenres) => {
  let finalArray = [
    {name: 'edm', value: 0, color: 'rgba(0,212,255,1)'},
    {name: 'r&b', value: 0, color: 'rgba(0,58,152,1)'},
    {name: 'pop', value: 0, color: 'rgba(252,103,238,1)'},
    {name: 'hip hop', value: 0, color: 'rgba(251,0,0,1)'},
    {name: 'rap', value: 0, color: 'rgba(251,0,0,1)'},
    {name: 'indie', value: 0, color: 'rgba(255,173,0,1)'},
    {name: 'country', value: 0, color: 'rgba(255,173,0,1)'},
    {name: 'soul', value: 0, color: 'rgba(245,0,221,1)'},
    {name: 'alternative', value: 0, color: 'black'},
    {name: 'rock', value: 0, color: 'rgba(255,0,0,1)'},
    {name: 'k-pop', value: 0, color: 'rgba(251,29,253,1)'},
    {name: 'worship', value: 0, color: 'white'},
  ];

  genreArray.forEach((item) => {
    //checks if it is an edm subgenre first
    let edmSubFound = false;
    edmSubGenres.forEach((edmSub) => {
      if(item.name.includes(edmSub)) {
        finalArray[0].value++;
        edmSubFound = true;
      }
    })
    //breaks here and moves onto the next item if an edm sub genre is found
    if(edmSubFound) {
      return;
    }

    let overArchFound = false;
    finalArray.forEach((overArch) => {
      if(item.name.includes(overArch.name)) {
        overArch.value++;
        overArchFound = true;
      }
    })

    if(overArchFound) {
      return;
    }

    /*
    if it is not a subgenre or not an overarch, it is its own genre,
    so we push to final array
    */

    finalArray.push({name: item.name, value: item.value, color: 'black'});
  })
  return finalArray;
}

export default ProcessGenres;