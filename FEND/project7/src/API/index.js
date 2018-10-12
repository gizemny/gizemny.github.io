// Helper file containing api call functions
// Forrest's walk-through:  https://www.youtube.com/watch?v=Dj5hzKBxCBI
// API Docs https://developer.foursquare.com/docs/api/venues/details

class Helper {
  static baseURL() {
    return 'https://api.foursquare.com/v2';
  } 

  static auth() {
    const keys={
      client_id: 'FZJEIKTWA0SBSEHBRPXWEEK0QDQ0YPRXW0AWMDVQR4JWQE3V',
      client_secret: 'E0BY1JJE12A0I2DNZL5QIBPGTGQHRRJTBIQSDKJETOGN4KGQ',
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
    requestData
    ).then(res => res.json())
    .catch(error => {
      alert(
        'Encountered an error while trying to fetch data from Foursquare' + error
      );
    });
  }
}

export default class SquareAPI {
  static search(urlPrams) {
    return Helper.simpleFetch('/venues/search', 'GET', urlPrams);
  }

  static getVenueDetails(VENUE_ID){
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, 'GET')
  }
}