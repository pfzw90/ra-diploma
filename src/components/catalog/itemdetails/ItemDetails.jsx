import { useDispatch, useSelector, connect } from 'react-redux';
import React from 'react';
import { Img } from 'react-image';
import { nanoid } from '@reduxjs/toolkit';
import {
  changeQuantity,
  fetchData, getItemDetails,
  selectSize,
} from '../../../actions/actionCreators';
import Loader from '../../loader/Loader.jsx';
import LoadButton from '../items/loadButton.jsx';

function ItemDetails(props) {
  const {
    itemData, itemState, selectedSize, selectedQuantity, avaliableSizes,
  } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  const firstLoad = () => {
    dispatch(fetchData(`${process.env.REACT_APP_ITEMS_URL}/${props.match.params.id}`, getItemDetails));
  };

  React.useEffect(() => {
    firstLoad();
  }, [dispatch, props.match.params.id]);

  const handleIncQuantity = () => {
    props.changeQuantity(true);
  };

  const handleDecQuantity = () => {
    props.changeQuantity(false);
  };

  const handleSelectSize = (size) => {
    dispatch(props.selectSize(size));
  };

  switch (itemState) {
    case 'idle':
      return (
        <React.Fragment>
                   <section className="catalog-item">
                    <h2 className="text-center">{itemData.title}</h2>
                    <div className="row">
                        <div className="col-5">
                            <Img src={itemData.images} loader={<Loader/>}
                            unloader={<img src="/no_image.jpg" alt="Загрузка изображения не удалась"/>}
                            className="img-fluid" alt=""/>
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Артикул</td>
                                        <td>{itemData.sku}</td>
                                    </tr>
                                    <tr>
                                        <td>Производитель</td>
                                        <td>{itemData.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <td>Цвет</td>
                                        <td>{itemData.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Материалы</td>
                                        <td>{itemData.material}</td>
                                    </tr>
                                    <tr>
                                        <td>Сезон</td>
                                        <td>{itemData.season}</td>
                                    </tr>
                                    <tr>
                                        <td>Повод</td>
                                        <td>{itemData.reason}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {(avaliableSizes) ? (
                            <React.Fragment>
                                <div class="text-center">
                                    <p>Размеры в наличии:
                                    {avaliableSizes.map((s) => <span className={`catalog-item-size ${s === selectedSize ? 'selected' : ''}`} key={nanoid()} onClick={() => handleSelectSize(s)}>{s}</span>)}</p>
                                    <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                            <button className="btn btn-secondary" onClick={() => handleDecQuantity()} disabled={selectedQuantity === 1}>-</button>
                                            <span className="btn btn-outline-primary">{selectedQuantity}</span>
                                            <button className="btn btn-secondary" onClick={() => handleIncQuantity()} disabled={selectedQuantity === 10}>+</button>
                                        </span>
                                    </p>
                                </div>
                            <button className="btn btn-danger btn-block btn-lg">В корзину</button>
                            </React.Fragment>
                            ) : null }
                        </div>
                    </div>
                </section>
        </React.Fragment>
      );
    case 'loading':
      return <Loader/>;
    default:
      return <LoadButton currentState={itemState} fn={firstLoad}/>;
  }
}

const mapStateToProps = (state) => {
  const {
    itemData, itemState, selectedQuantity, selectedSize,
  } = state.item;
  return {
    itemData,
    itemState,
    selectedQuantity,
    selectedSize,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: (url, fn) => dispatch(fetchData(url, fn)),
  changeQuantity: (inc) => dispatch(changeQuantity(inc)),
  selectSize: (size) => dispatch(selectSize(size)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
