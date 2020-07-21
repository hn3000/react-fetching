
import * as React from 'react';
import { FetchCache } from './fetch-cache';



export interface IFetchContextProps {
  cache: FetchCache;
}

export const FetchContext = React.createContext(new FetchCache(() => Promise.reject('please provide a context')));

