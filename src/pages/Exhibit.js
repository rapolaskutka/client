import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { Pannellum } from 'pannellum-react';
import { Circles } from 'react-loader-spinner';

const Exhibit = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const params = useParams();

  //const serverUrl = "http://nginx" // will ovveride this later wit
  const serverUrl = 'http://localhost'; // will ovveride this later wit

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
          imageName: json.image_name
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
          <Pannellum
            width="100vw"
            height="66vh"
            image={`${serverUrl}/uploads/panoramas/${data.imageName}`}
            autoLoad
            showControls={false}
            disableKeyboardCtrl
            orientationOnByDefault={true}
          />
          <div className="description-background">
            <h1 className="margin-20">{data.name}</h1>
            <div className="margin-10">{data.disc}</div>
          </div>
          <div style={{ position: 'absolute', bottom: '-5px' }}>
            <svg
              width={window.innerWidth}
              viewBox="0 0 375 302"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M-74 343.863C-74 343.863 -74.0001 0 174 171.931C422 343.863 422 0 422 0L422 343.863L-74 343.863Z"
                fill="#2AD2AA"
              />
              <path
                d="M-74 381C-74 381 -74 37.1372 174 209.069C422 381 422 37.1372 422 37.1372L422 381L174 381L-74 381Z"
                fill="#4EA095"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default Exhibit;
