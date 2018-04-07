
import * as React from 'react';

export interface fetcher<T> {
  (): Promise<T>;
}
export var EmptyFetch: fetcher<any> = () => Promise.resolve(null);

export interface IFetcherBasicProps<T> {
  fetch(): Promise<T>;
  render(data?: T, error?: any, loading?: boolean): JSX.Element;
}

export class FetcherBasic<T> extends React.Component<IFetcherBasicProps<T>> {
  state: { data?: T, error?: any, promise?: Promise<T> } = {
    data: undefined,
    error: undefined,
    promise: undefined
  };

  private _fetch = EmptyFetch;

  componentDidMount() {
    this.maybeFetch();
  }

  componentDidUpdate() {
    this.maybeFetch();
  }

  maybeFetch() {
    if (this._fetch !== this.props.fetch || this.state.promise == null) {
      this._fetch = this.props.fetch;
      let promise = this._fetch();
      promise.then(data => {
        if (this.state.promise === promise) {
          this.setState({data, error: null });
        }
      }).then(null, error => {
        if (this.state.promise === promise) {
          this.setState({error, data: null });
        }
      });
      this.setState({promise});
    }
  }

  render() {
    let { data, error, promise } = this.state;
    let { render } = this.props;
    //console.log(this.props, this.state);
    return render(data, error, !data && !error && (null != promise));
  }
}
