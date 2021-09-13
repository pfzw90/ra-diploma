import { useDispatch, useSelector, connect } from 'react-redux';
import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import {
  fetchData, resetOffset, getItems, resetItems,
} from '../../../actions/actionCreators';
import Item from './Item.jsx';
import LoadButton from './loadButton.jsx';
import Loader from '../../loader/Loader.jsx';

function Items() {
  const { itemsList, itemsState, lastFetched } = useSelector((state) => state.items);
  const { q, categoryId, offset } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const params = {};
  if (q) params.q = q;
  if (categoryId) params.categoryId = categoryId;
  const loadMore = (offset > 0 && offset % 6 === 0 && lastFetched);

  const firstLoad = () => {
    dispatch(resetOffset());
    dispatch(resetItems());
    dispatch(fetchData(process.env.REACT_APP_ITEMS_URL, getItems, params));
  };

  React.useEffect(() => {
    firstLoad();
  }, [dispatch, categoryId, q]);

  const nextLoad = () => {
    dispatch(fetchData(process.env.REACT_APP_ITEMS_URL, getItems, { ...params, offset }));
  };

  return (
  <React.Fragment>
    { (itemsList.length > 0) ? (
                <div className="row">
                {itemsList.map((i) => (
                <Item key={nanoid()}
                  title={i.title} price={i.price} id={i.id} img={i.images} />))}
                </div>
    ) : (null) }

    {!lastFetched && itemsState === 'loading' ? <Loader/> : null}

    <LoadButton fn={(loadMore ? nextLoad : firstLoad)}
                  currentState={itemsState}
                  lastFetched={lastFetched} key={nanoid()}/>
  </React.Fragment>

  );
}

const mapStateToProps = (state) => {
  const { itemsList, itemsState } = state.items;
  return {
    itemsList,
    itemsState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: (url, fn, opts) => dispatch(fetchData(url, fn, opts)),
  resetOffset: () => dispatch(resetOffset()),
  resetItems: () => dispatch(resetItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
