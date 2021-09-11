import { useDispatch, useSelector, connect } from 'react-redux';
import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import {
  fetchData, resetCategory, resetOffset, getItems, resetItems,
} from '../../../actions/actionCreators';
import Loader from '../../loader/Loader.jsx';
import Item from './Item.jsx';

function Items() {
  const { itemsList, itemsState, lastFetched } = useSelector((state) => state.items);
  const { q, categoryId, offset } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const params = {};
  if (q) params.q = q;
  if (categoryId) params.categoryId = categoryId;
  const loadButton = (offset > 0 && offset % 6 === 0 && lastFetched);

  React.useEffect(() => {
    dispatch(resetOffset());
    dispatch(resetItems());
    dispatch(fetchData(process.env.REACT_APP_ITEMS_URL, getItems, params));
  }, [dispatch, categoryId, q]);

  const handleLoadMore = () => {
    dispatch(fetchData(process.env.REACT_APP_ITEMS_URL, getItems, { ...params, offset }));
  };

  return (
   <React.Fragment>
       { (itemsList.length > 0) ? (

                <><div className="row">
           {itemsList.map((i) => (
             <Item key={nanoid()}
               title={i.title} price={i.price} id={i.id} img={i.images} />))}
         </div><>
             {(loadButton) ? (<div className="text-center">
               <button className="btn btn-outline-primary" onClick={() => handleLoadMore()}>Загрузить ещё</button>
             </div>) : (null)}
           </></>

       ) : (null) }

      {
        itemsState === 'loading'
          ? (<Loader/>) : null
      }

      {
        itemsState.startsWith('error')
          ? (<div className="error">{itemsState}</div>) : null
      }

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
  resetCategory: () => dispatch(resetCategory()),
  resetItems: () => dispatch(resetItems()),
  loadMore: () => dispatch(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
