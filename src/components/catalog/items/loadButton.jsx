import React from 'react';

export default function LoadButton(props) {
  const err = props.currentState.startsWith('error');
  const buttonText = (props.lastFetched && !err) ? 'Загрузить еще' : 'Повторить попытку';

  return (
    (err || props.lastFetched === true)
      ? (
          <div className="text-center">
          { err ? <div className="error">Ошибка загрузки</div> : (null)}
          <button className="btn btn-outline-primary" onClick={() => props.fn()} disabled={(props.currentState === 'loading')}>
            {props.currentState === 'loading' ? (<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : buttonText}
          </button>
        </div>
      ) : (null)
  );
}
