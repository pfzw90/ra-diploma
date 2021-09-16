import { useDispatch, useSelector, connect } from 'react-redux';
import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import {
  fetchData, getTopSales,
} from '../../../actions/actionCreators';
import Loader from '../../loader/Loader.jsx';
import Item from '../items/Item.jsx';
import LoadButton from '../../loadbutton/loadButton.jsx';

function TopSales() {
  const { topsalesList, topsalesState } = useSelector((state) => state.topsales);
  const dispatch = useDispatch();
  console.log(topsalesState);

  const firstLoad = () => {
    dispatch(fetchData(process.env.REACT_APP_TOP_SALES_URL, getTopSales));
  };

  React.useEffect(() => {
    firstLoad();
  }, [dispatch]);

  return (
    <React.Fragment>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
          {(topsalesState === 'idle')
            ? (
                <React.Fragment>
                        <div className="row">
                        { topsalesList.map((i) => (
                        <Item key={nanoid()} title={i.title}
                        price={i.price} id={i.id} img={i.images[0]}/>)) }
                        </div>

                </React.Fragment>
            )
            : (null) }

          {(topsalesState === 'loading') ? (<Loader/>) : (null) }
          {(topsalesState.startsWith('error')) ? (<LoadButton currentState={topsalesState} fn={firstLoad}/>) : (null) }
    </section>
  </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { topsalesList, topsalesState } = state.topsales;
  return {
    topsalesList,
    topsalesState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: (url, fn) => dispatch(fetchData(url, fn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopSales);
