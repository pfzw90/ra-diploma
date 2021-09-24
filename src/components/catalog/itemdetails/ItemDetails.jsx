import { useDispatch, useSelector, connect } from 'react-redux';
import React from 'react';
import { Img } from 'react-image';
import { nanoid } from '@reduxjs/toolkit';
import {
  changeQuantity,
  fetchData, getItemDetails,
  selectSize, addToCart,
} from '../../../actions/actionCreators';
import Loader from '../../loader/Loader.jsx';
import LoadButton from '../../loadbutton/loadButton.jsx';

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
    props.changeQuantity('inc');
  };

  const handleDecQuantity = () => {
    props.changeQuantity('dec');
  };

  const handleSelectSize = (size) => {
    dispatch(props.selectSize(size));
  };

  const handleBuy = (size, quantity) => {
    props.addToCart({
      id: itemData.id,
      price: itemData.price,
      title: itemData.title,
      size,
      quantity,
    });
    props.changeQuantity('reset');
  };

  if (itemState === 'idle' || itemState === 'additem') {
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
                                <div className="text-center">
                                    <p>Размеры в наличии:
                                    {avaliableSizes.map((s) => <span className={`catalog-item-size ${s === selectedSize ? 'selected' : ''}`} key={nanoid()} onClick={() => handleSelectSize(s)}>{s}</span>)}</p>
                                    <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                            <button className="btn btn-secondary" onClick={() => handleDecQuantity()} disabled={selectedQuantity === 1}>-</button>
                                            <span className="btn btn-outline-primary">{selectedQuantity}</span>
                                            <button className="btn btn-secondary" onClick={() => handleIncQuantity()} disabled={selectedQuantity === 10}>+</button>
                                        </span>
                                    </p>
                                </div>
                            <button className={`btn ${itemState === 'idle' ? 'btn-danger' : 'btn-success'} btn-block btn-lg`}
                                    onClick={() => handleBuy(selectedSize, selectedQuantity)}
                                    disabled={itemState !== 'idle'}>
                                    {itemState === 'idle' ? 'В корзину' : 'Добавлено'}
                            </button>
                            </React.Fragment>
                            ) : null }
                        </div>
                    </div>
                </section>
        </React.Fragment>
    );
  }
  if (itemState === 'loading') {
    return <Loader/>;
  }
  return <LoadButton currentState={itemState} fn={firstLoad}/>;
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
  addToCart: (item) => {
    dispatch(addToCart(item));
    dispatch(changeQuantity('reset'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
