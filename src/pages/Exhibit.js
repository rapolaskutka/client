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
  const [image, setImage] = useState(false);
  const params = useParams();
  useEffect(() => {
    fetch('/api/v1/page/' + params.exhibitId)
      .then((response) => {
        if (!response.ok) {
          setNotFound(true);
        }
        return response.json();
      })
      .then((actualData) => {
        setData({
          code: actualData.code,
          disc: actualData.disc
        });

        import(`../../../src/public/uploads/panoramas/${actualData.image_name}`)
          .then((img) => setImage(img.default))
          .then(() => setLoading(false));
      });
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
            image={image}
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
