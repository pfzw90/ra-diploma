import { Img } from 'react-image';
import Loader from '../../loader/Loader.jsx';

export default function Item(props) {
  const {
    img, title, price, id,
  } = props;
  return (
    <div className="col-4">
        <div className="card catalog-item-card">
            <Img src={img}
            loader={<Loader/>}
            unloader={<img src="/no_image.jpg" alt="Загрузка изображения не удалась"/>}
                 className="card-img-top img-fluid" alt={title}/>
            <div className="card-body">
                <p className="card-text">{title}</p>
                <p className="card-text">{price} руб.</p>
                <a href={`/catalog/${id}`} className="btn btn-outline-primary">Заказать</a>
            </div>
        </div>
    </div>
  );
}
