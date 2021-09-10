import { Img } from 'react-image';
import Loader from '../../loader/Loader.jsx';

export default function Item(props) {
  return (
    <div className="col-4">
        <div className="card catalog-item-card">
            <Img src={props.img}
            loader={<Loader/>}
            unloader={<img src="/no_image.jpg" alt="Загрузка изображения не удалась"/>}
                 className="card-img-top img-fluid" alt={props.name}/>
            <div className="card-body">
                <p className="card-text">{props.title}</p>
                <p className="card-text">{props.price} руб.</p>
                <a href={`/catalog/${props.id}`} className="btn btn-outline-primary">Заказать</a>
            </div>
        </div>
    </div>
  );
}