import { FetcherBasic } from './fetcher-basic';

import * as React from 'react';


export interface IFetcherSimpleProps<T> {
  url: string;
  fetchOptions?: RequestInit;
  render(data?: T, error?: any, loading?: boolean): JSX.Element;
}
export interface IFetcherSimpleState<T> {
  url: string;
  fetcher: () => Promise<T>;
}
export class FetcherSimple<T> extends React.Component<IFetcherSimpleProps<T>, IFetcherSimpleState<T>> {

  constructor(props: IFetcherSimpleProps<T>, context: any) {
    super(props, context);
    this.state = this.createFetcher();
  }

  componentDidUpdate() {
    this.maybeCreateFetcher();
  }

  maybeCreateFetcher() {
    if (this.state.url !== this.props.url) {
      this.setState(this.createFetcher);
    }
  }

  createFetcher(): IFetcherSimpleState<T> {
    let { url, fetchOptions = { credentials: 'include' } as RequestInit } = this.props;
    let fetcher = () => fetch(url, fetchOptions).then(unpackResponse) as Promise<T>;
    return { url, fetcher };
  }

  render() {
    let { render } = this.props;
    let { fetcher } = this.state;

    return <FetcherBasic render={render} fetch={fetcher}/>
  }
}

function unpackResponse(res: Response) {
  if (res.status >= 400) {
    throw new Error(`http status ${res.status} ${res.statusText}`);
  }
  return res.json();
}
