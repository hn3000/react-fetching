import { FetcherBasic, IFetcherRenderProps } from './fetcher-basic';

import * as React from 'react';

export { FetchStatus } from './fetcher-basic';

export interface IFetcherSimpleProps<T> {
  url: string;
  fetchOptions?: RequestInit;
  renderComp: React.ComponentType<IFetcherRenderProps<T>>
}
export interface IFetcherCache<T> {
  url: string;
  fetch: () => Promise<T>;
}
export class FetcherSimple<T> extends React.Component<IFetcherSimpleProps<T>> {

  private _cache: IFetcherCache<T>;
  constructor(props: IFetcherSimpleProps<T>, context: any) {
    super(props, context);
    this._cache = this.createFetcher();
  }

  maybeCreateFetcher() {
    if (this._cache.url !== this.props.url) {
      this._cache = this.createFetcher();
    }
  }

  createFetcher(): IFetcherCache<T> {
    let {
      url,
      fetchOptions = { credentials: 'include' } as RequestInit
    } = this.props;

    return {
      url,
      fetch: () => fetch(url, fetchOptions).then(unpackResponse) as Promise<T>
    };
  }

  render() {
    this.maybeCreateFetcher();
    let { renderComp } = this.props;
    let { fetch } = this._cache;

    return <FetcherBasic {...{renderComp, fetch}} />
  }
}

function unpackResponse(res: Response) {
  if (res.status >= 400) {
    throw new Error(`http status ${res.status} ${res.statusText}`);
  }
  return res.json();
}
