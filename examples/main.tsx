
console.log('pasring main');

import { FetcherSimple } from '../src/fetcher-simple';
console.log('fetcher loaded', FetcherSimple);


import * as React from 'react';
console.log('react loaded', React);

import * as ReactDOM from 'react-dom';
import { FetcherBasic } from '../src';


console.log(React, ReactDOM, FetcherSimple);

ReactDOM.render(
  <div>
    <FetcherSimple url="http://localhost" render={renderFun} />
    <hr />
    <FetcherBasic fetch={delay(2000, {}, null)} render={renderFun} />
    <hr />
    <FetcherBasic fetch={delay(2000, null, "some error")} render={renderFun} />
  </div>,
  document.getElementsByTagName('div')[0]
);


function renderFun(data?: any, error?: any, loading = false) {
  //console.log(`data: ${data}, error: ${error}, loading: ${loading}`);
  return (
    <div>
      <div>{`data: ${null != data}`}</div>
      <div>{`error: ${null != error}`}</div>
      <div>{`loading: ${!!loading}`}</div>
    </div>
  );
}

function delay(timeout: number, data: any, error: any): () => Promise<any> {
  return () => new Promise((res, rej) => {
    window.setTimeout(() => {
      if (null != data) res(data);
      else rej(error);
    }, timeout);
  });
}
