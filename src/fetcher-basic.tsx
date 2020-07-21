
import * as React from 'react';


export interface IFetcherRenderProps<T> {
  status: FetchStatus;
  data?: T;
  error?: any;
  start?: number;
  end?: number;
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
  render?: React.ComponentType<IFetcherRenderProps<T>>
}


export interface IFetcherBasicState<T> {
  data?: T;
  error?: any;
  promise?: Promise<T> ;
  status: FetchStatus;
  start?: number;
  end?: number;
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
      const start = Date.now();
      promise.then(data => {
        if (this.state.promise === promise) {
          this.setState({
            data,
            error: undefined,
            status: FetchStatus.RESULT,
            end: Date.now()
          });
        }
      }).then(null, error => {
        if (this.state.promise === promise) {
          this.setState({
            error,
            data: undefined,
            status: FetchStatus.ERROR,
            end: Date.now()
          });
        }
      });
      return {
        ...oldState,
        promise,
        status: FetchStatus.FETCHING,
        fetch,
        start
      };
    }
    return oldState;
  }

  render() {
    let { data, error, status, start, end } = this.state;
    let { render } = this.props;

    if (null != render) {
      const Comp = render;
      return <Comp {...{status, data, error, start, end}} />;
    }

    return null;
  }
}
