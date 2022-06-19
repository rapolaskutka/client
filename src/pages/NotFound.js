import React from 'react';

const Exhibit = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="description-background">
        <h1 className="margin-20">Eksponatas nerastas</h1>
      </div>
      <div style={{ position: 'absolute', bottom: '-5px' }}>
        <svg
          width={window.innerWidth}
          viewBox="0 0 375 302"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none">
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
  );
};

export default Exhibit;
