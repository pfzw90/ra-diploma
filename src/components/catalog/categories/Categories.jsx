import { useDispatch, useSelector, connect } from 'react-redux';
import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import {
  fetchData, changeCategory, resetCategory, getCategories,
} from '../../../actions/actionCreators';
import Loader from '../../loader/Loader.jsx';
import LoadButton from '../items/loadButton.jsx';

function Categories(props) {
  const { categoriesList, categoriesState } = useSelector((state) => state.categories);
  const { categoryId } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const firstLoad = () => {
    dispatch(fetchData(process.env.REACT_APP_CATEGORIES_URL, getCategories));
  };

  React.useEffect(() => {
    firstLoad();
  }, [dispatch]);

  const handleClick = (id) => {
    props.changeCategory(id);
  };

  const handleReset = () => {
    props.clearCategory();
  };

  switch (categoriesState) {
    case 'idle':
      return (
        <React.Fragment>
                <ul className="catalog-categories nav justify-content-center">
                <li className="nav-item">
                    <a className={`nav-link ${categoryId === null ? 'active' : ''}`} onClick={() => handleReset()} href="#">Все</a>
                </li>
                { categoriesList.map((c) => {
                  const active = (c.id === categoryId);
                  return (
                            <li className="nav-item" key={nanoid()}>
                                <a className={`nav-link ${active ? 'active' : ''}`} onClick={() => handleClick(c.id)} href="#">{c.title}</a>
                            </li>
                  );
                }) }
                </ul>
        </React.Fragment>
      );
    case 'loading':
      return <Loader/>;
    default:
      return <div className="error"><LoadButton currentState={categoriesState} fn={firstLoad}/> </div>;
  }
}

const mapStateToProps = (state) => {
  const { categoriesList, categoriesState } = state.categories;
  return {
    categoriesList,
    categoriesState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: (url, fn) => dispatch(fetchData(url, fn)),
  changeCategory: (id) => dispatch(changeCategory(id)),
  clearCategory: () => dispatch(resetCategory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
