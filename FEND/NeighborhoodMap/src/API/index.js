// Helper file containing api call functions
// Forrest's walk-through:  https://www.youtube.com/watch?v=Dj5hzKBxCBI
// API Docs https://developer.foursquare.com/docs/api/venues/details

class Helper {
  static baseURL() {
    return 'https://api.foursquare.com/v2';
  } 

  static auth() {
    const keys={
      client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
      client_secret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
      v:'20180905'
    }

    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join('&');
    }

    static urlBuilder(urlPrams) {
      if(!urlPrams){
        return ''
      }
    
    return Object.keys(urlPrams)
      .map(key => `${key}=${urlPrams[key]}`)
      .join('&')
  }

  static headers() {
    return {
      Accept: 'application/json'
    };
  }

  static simpleFetch(endPoint, method, urlPrams) {
    let requestData={
      method, 
      headers: Helper.headers()
    };

    return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
      urlPrams
      )}`, 
      requestData)
      // check the API results for quota code 429
      .then(res => {
        console.log(res.status)
          if (res.status === 429) {
            return Promise.reject(new Error('Foursquare daily quota reached. Try again tomorrow.'));
          } else {
            return res;
          }
        })
        .then(res => res.json())
      // .then(res => res.json())
      // .catch(error => {
      //   alert(
      //     'Encountered an error while trying to fetch data from Foursquare' + error.message
      //   );
      // });
    }
}

export default class FourSquare {
  static search(urlPrams) {
    return Helper.simpleFetch('/venues/search', 'GET', urlPrams);
  }

  static getVenueDetails(VENUE_ID){
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, 'GET')
  }
}