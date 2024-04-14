const BASE_URL = 'https://api.pexels.com/';
import {KEY} from '../Key';

export const NEW_PHOTOS = 'v1/curated';
export const SEARCH_PHOTOS = 'v1/search';
export const SEARCH_VIDEOS = 'videos/search';
export const POPULAR_VIDEOS = 'videos/popular';

export const getData = async (endPoint, rest) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', KEY);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const res = await fetch(`${BASE_URL}${endPoint}${rest}`, requestOptions);
  const json = await res.json()
  return json;
};

// export const searchData = async (endPoint, q) => {
//   const myHeaders = new Headers();
//   myHeaders.append(
//     'Authorization',
//     KEY,
//   );

//   const requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow',
//   };

//   const res = await fetch(`${BASE_URL}${endPoint}?query=${q}&per_page=10`, requestOptions);
//   const json = await res.json();
//   return json;
// };


export const searchData = async (endPoint, q) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', KEY);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const res = await fetch(
    BASE_URL + endPoint + `?query=${q}&per_page=10`,
    requestOptions,
  );
  const json = await res.json();
  return json;
};