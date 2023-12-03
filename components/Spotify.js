import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  redirectUri: 'http://www.example.com/callback'
});

function SpotifyComponent() {
  const [song, setSong] = useState(null);

  useEffect(() => {
    spotifyApi.clientCredentialsGrant().then(
      function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.getMyCurrentPlaybackState({})
          .then(function(data) {
            if (data.body && data.body.is_playing) {
              setSong(data.body.item.name);
            }
          }, function(err) {
            console.log('Something went wrong!', err);
          });
      },
      function(err) {
        console.log('Something went wrong when retrieving an access token', err);
      }
    );
  }, []);

  if (!song) {
    return null;
  }

  return (
    <div>
      Currently playing: {song}
    </div>
  );
}

export default SpotifyComponent;