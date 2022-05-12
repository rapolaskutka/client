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
          color="#0071e9"
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
          <div className="description">
            <h1>Title of exhibit</h1>
            <p>{data.disc}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Exhibit;
