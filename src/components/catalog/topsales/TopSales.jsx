import { useDispatch, useSelector, connect } from 'react-redux';
import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import {
  fetchData, getTopSales,
} from '../../../actions/actionCreators';
import Loader from '../../loader/Loader.jsx';
import Item from '../items/Item.jsx';

function TopSales() {
  const { topsalesList, topsalesState } = useSelector((state) => state.topsales);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchData(process.env.REACT_APP_TOP_SALES_URL, getTopSales));
  }, [dispatch]);

  switch (topsalesState) {
    case 'idle':
      return (
        <React.Fragment>
                <section className="top-sales">
                    <h2 className="text-center">Хиты продаж!</h2>

                    <div class="row">
                { topsalesList.map((i) => (
                <Item key={nanoid()} title={i.title}
                price={i.price} id={i.id} img={i.images[0]}/>)) }
                </div>
                </section>
        </React.Fragment>
      );
    case 'loading':
      return <Loader/>;
    default:
      return <div className="error">{topsalesState}</div>;
  }
}

const mapStateToProps = (state) => {
  const { topsalesList, topsalesState } = state.categories;
  return {
    topsalesList,
    topsalesState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: (url, fn) => dispatch(fetchData(url, fn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopSales);
