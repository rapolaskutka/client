import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { Pannellum } from 'pannellum-react';
import { Circles } from 'react-loader-spinner';

/* eslint-disable */

const Exhibit = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const params = useParams();

  //const serverUrl = "http://nginx"
  const serverUrl = 'http://159.223.220.139';

  useEffect(() => {
    fetch(`${serverUrl}/api/v1/page/${params.exhibitId}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setData({
          code: json.code,
          disc: json.disc,
          name: json.name,
          imageName: json.image_name,
          type: json.type,
          audioName: json.audio_name
        });
      })
      .then(() => setLoading(false))
      .catch(() => setNotFound(true));
  }, []);
  if (notFound) return <NotFound />;
  return (
    <>
      {loading ? (
        <Circles
          height="100"
          width="100"
          wrapperStyle={{
            height: '100vh',
            width: '100vw',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          color="#2AD2AA"
        />
      ) : (
        <div>
          {data.type === 'regular' && (
            <img
              src={`${serverUrl}/uploads/panoramas/${data.imageName}`}
              style={{width:"100vw", height: "66vh"}}
            />
          )}
          {data.type === 'panorama' && (
            <Pannellum
              width="100vw"
              height="66vh"
              image={`${serverUrl}/uploads/panoramas/${data.imageName}`}
              autoLoad
              showControls={false}
              disableKeyboardCtrl
              orientationOnByDefault={true}
            />
          )}

          <div className="description-background">
            {data.audioName &&
            <audio id="player" controls style={{width: "100%"}}>
              <source src={`${serverUrl}/uploads/audio/${data.audioName}`} type="audio/mpeg"></source>
            </audio>}
            {data.audioName &&
            <div className="spacer"></div>}
            <h1 className="margin-10">{data.name}</h1>
            <div className="margin-10">{data.disc}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Exhibit;
