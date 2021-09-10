import { useDispatch, useSelector, connect } from 'react-redux';
import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import {
  fetchData, resetCategory, resetOffset, getItems, resetItems,
} from '../../../actions/actionCreators';
import Loader from '../../loader/Loader.jsx';
import Item from './Item.jsx';

function Items() {
  const { itemsList, itemsState } = useSelector((state) => state.items);
  const { q, categoryId } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const params = {};
    if (q) params.q = q;
    if (categoryId) params.categoryId = categoryId;
    dispatch(resetOffset());
    dispatch(resetItems());
    dispatch(fetchData(process.env.REACT_APP_ITEMS_URL, getItems, params));
  }, [dispatch, categoryId, q]);

  switch (itemsState) {
    case 'idle':
      return (
        <React.Fragment>

                <div class="row">
                { itemsList.map((i) => (
                <Item key={nanoid()}
                title={i.title} price={i.price} id={i.id} img={i.images}/>)) }
                </div>

        </React.Fragment>
      );
    case 'loading':
      return <Loader/>;
    default:
      return <div className="error">{itemsState}</div>;
  }
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
  resetCategory: () => dispatch(resetCategory()),
  resetItems: () => dispatch(resetItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
