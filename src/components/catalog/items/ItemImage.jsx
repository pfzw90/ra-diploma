/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import Loader from '../../loader/Loader.jsx';

const InitialState = { state: 'idle', img: null };

const testImage = (url) => new Promise((resolve) => {
  const img = new Image();
  img.src = url;
  img.onload = () => resolve(true);
  img.onerror = () => resolve(false);
});

export default function ItemImage(props) {
  console.log(props);
  const [imageState, setImageState] = useState(InitialState);

  useEffect(() => {
    setImageState((state) => ({ ...state, state: 'loading' }));
    let imgOk;
    for (let i = 0; i < props.img.length; i += 1) {
      if (!imgOk) {
        testImage(props.img[i]).then((result) => {
          imgOk = result;
        });
        if (imgOk) setImageState(({ img: props.img[i], state: 'idle' }));
      }
    }
    if (!imgOk) setImageState(InitialState);
  },
  [props]);

  if (imageState.state === 'loading') return <Loader/>;
  const img = imageState.img || process.env.REACT_APP_NO_IMAGE_URL;
  return (
    <img src={img} alt={props.title}/>
  );
}
