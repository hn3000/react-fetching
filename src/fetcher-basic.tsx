
import * as React from 'react';


export interface IFetcherRenderProps<T> {
  status: FetchStatus;
  data?: T;
  error?: any;
}

export interface fetcher<T> {
  (): Promise<T>;
}
export var EmptyFetch: fetcher<any> = () => Promise.resolve(null);
export enum FetchStatus  {
  FETCHING='fetching',
  RESULT='result',
  ERROR='error'
};

export interface IFetcherBasicProps<T> {
  fetch(): Promise<T>;
  renderComp?: React.ComponentType<IFetcherRenderProps<T>>
}


export interface IFetcherBasicState<T> {
  data?: T;
  error?: any;
  promise?: Promise<T> ;
  status: FetchStatus;
  fetch: () => Promise<T>;
}

export class FetcherBasic<T> extends React.Component<IFetcherBasicProps<T>, IFetcherBasicState<T>> {

  constructor(props: IFetcherBasicProps<T>, context: any) {
    super(props, context);
    this.state = this.updatedFetchState(props, {} as IFetcherBasicState<T>);
  }

  componentHasReceivedNewPropsOrState() {

  }
  componentDidUpdate() {
    const newState = this.updatedFetchState(this.props, this.state);
    if (newState !== this.state) {
      this.setState(newState);
    }
  }

  updatedFetchState(props: IFetcherBasicProps<T>, oldState: IFetcherBasicState<T>) {
    let { fetch, promise } = oldState;
    if (fetch !== this.props.fetch || promise == null) {
      fetch = this.props.fetch;
      const promise = fetch();
      promise.then(data => {
        if (this.state.promise === promise) {
          this.setState({data, error: undefined, status: FetchStatus.RESULT });
        }
      }).then(null, error => {
        if (this.state.promise === promise) {
          this.setState({error, data: undefined, status: FetchStatus.ERROR });
        }
      });
      return { ...oldState, promise, status: FetchStatus.FETCHING, fetch};
    }
    return oldState;
  }

  render() {
    let { data, error, status } = this.state;
    let { renderComp } = this.props;

    if (null != renderComp) {
      const Comp = renderComp;
      return <Comp {...{status, data, error}} />;
    }

    return null;
  }
}
