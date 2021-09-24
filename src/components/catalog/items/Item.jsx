import { useEffect, useState } from 'react';
import { Img } from 'react-image';
import Loader from '../../loader/Loader.jsx';

export default function Item(props) {
  const {
    img, title, price, id,
  } = props;

  const [itemState, setItemState] = useState({ img: null });

  useEffect(() => setItemState({
    img:
    <Img src={img} title={title} loader={<Loader/>} unloader={<img src='./no_image.jpg'/>} />,
  }), []);

  return (
    <div className="col-4">
        <div className="card catalog-item-card">
            {itemState.img}
            <div className="card-body">
                <p className="card-text">{title}</p>
                <p className="card-text">{price} руб.</p>
                <a href={`/catalog/${id}`} className="btn btn-outline-primary">Заказать</a>
            </div>
        </div>
    </div>
  );
}
