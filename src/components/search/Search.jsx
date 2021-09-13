import React from 'react';
import { connect } from 'react-redux';
import {
  changeSearch, toggleSearchOpacity, initSearch, resetQuery,
} from '../../actions/actionCreators';

function Search(props) {
  const handleChange = (ev) => {
    const { value } = ev.target;
    props.onChange(value);
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    const { value, hidden } = props;
    props.onClick(hidden, value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    props.onSubmit(props.value);
  };

  const onLeave = () => {
    props.onLeave(props.value);
  };

  return (
    <React.Fragment>
    {props.header ? (<div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleClick}></div>) : null}
    <form data-id="search-form" className={`${props.prefix}-search-form form-inline ${(props.hidden && props.header) ? 'invisible' : ''}`}
          onSubmit={handleSubmit}>
        <input className="form-control" placeholder="Поиск" value={props.value} onChange={handleChange} name="search" onBlur={onLeave}/>
    </form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { value, hidden } = state.search;
  return { value, hidden };
};

const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch(changeSearch(value)),
  onClick: (hidden, value) => {
    if (hidden || !value.length) dispatch(toggleSearchOpacity());
    else dispatch(initSearch(value));
  },
  onSubmit: (value) => {
    if (!value.length) dispatch(resetQuery());
    else dispatch(initSearch(value));
  },
  onLeave: (value) => {
    if (!value) dispatch(toggleSearchOpacity());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
