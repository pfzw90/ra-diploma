import React from 'react';

export default class LoadButton extends React.Component {
  constructor(props) {
    super(props);
    this.err = props.currentState.startsWith('error');
    this.lastFetched = props.lastFetched;
    this.buttonText = (props.lastFetched) ? 'Загрузить еще' : 'Повторить попытку';
    this.currentState = props.currentState;
    this.state = { count: 5 };
    this.reload = () => {
      clearInterval(this.timer);
      props.fn();
    };
  }

  componentDidMount() {
    if (this.err) {
      this.timer = setInterval(() => {
        if (this.state.count === 1) this.reload();
        else this.setState((prev) => ({ count: prev.count - 1 }));
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      (this.err || this.lastFetched === true)
        ? (
          <div className="text-center">
          { this.err ? <div className="error">Ошибка загрузки</div> : (null)}
          <button className="btn btn-outline-primary" onClick={() => this.reload()} disabled={(this.currentState === 'loading')}>
          {this.currentState === 'loading' ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : this.buttonText}
          </button>
          { this.err
            ? <div>Автоматическая перезагрузка через {this.state.count} секунд</div> : null}
        </div>
        ) : (null)
    );
  }
}
