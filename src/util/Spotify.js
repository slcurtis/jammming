const clientId = 'a3edfc23f41c4640bc6e4beee4970563';
const redirectUri = 'http://localhost:3000/callback';

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken){
      return accessToken;
    }

    const newToken = window.location.href.match(/access_token=([^&]*)/);
    const expirationTime = window.location.href.match(/expires_in=([^&]*)/);

    if (newToken && expirationTime) {
      accessToken = newToken[1];
      const expiresIn = Number(expirationTime[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      let accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=${redirectUri}`;
      window.location = accessURL;
    }
  },

  search(searchTerm) {
    let accessToken = Spotify.getAccessToken();
    let headers = {Authorization: `Bearer ${accessToken}`};
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {headers: headers}).then(response => {

      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => {
      console.log(networkError.message);
  }).then(jsonResponse => {
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri}));
  });
},

//create and save a playlist
savePlaylist(playlistName, trackURIs) {
    if (!playlistName && !trackURIs.length) {
      return;
     }
      const accessToken = Spotify.getAccessToken();

    //get user's ID
      let headers = {
        Authorization: `Bearer ${accessToken}`
      };
      let userID = '';
      fetch(`https://api.spotify.com/v1/me`, {headers: headers}).then(response => {
          return response.json();
        }).then(jsonResponse => {
       if (!jsonResponse.id) {
         return;
       }

        userID = jsonResponse.id;

      //create a playlist with a name and return its ID
        let playlistID = '';
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({name: playlistName})
            }).then(response => {
                  if (response.ok) {
                    return response.json();
                  }
                  //throw new Error('Request failed!');
                //}, networkError => {
                //  console.log(networkError.message);
                }).then(jsonResponse => {
                //  playlistID = jsonResponse.id;
                  return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({uris: trackURIs})
                  }).then(response => {
                    if (response.ok) {
                      return response.json();
                    }
                  //  throw new Error('Request failed!');
                //  }, networkError => {
                //    console.log(networkError.message);
                  }).then(jsonResponse => jsonResponse);
                });
              });
            }
          }




export default Spotify;
