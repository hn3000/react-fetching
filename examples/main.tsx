
console.log('main');

import { FetcherSimple } from '../src/fetcher-simple';
console.log('fetcher loaded', FetcherSimple);


import * as React from 'react';
console.log('react loaded', React);

import * as ReactDOM from 'react-dom';
import { FetcherBasic, IFetcherRenderProps } from '../src';


console.log(React, ReactDOM, FetcherSimple);

var count = 0;

function run() {
  ReactDOM.render(
    <div>
      <div><button onClick={prevPage}>&lt;</button><button onClick={nextPage}>&gt;</button></div>
      <hr />
      <FetcherSimple url={`http://localhost?q=${count}`} renderComp={RenderComp} />
      <hr />
      <FetcherBasic fetch={delay(400, { count }, null)} renderComp={RenderComp} />
      <hr />
      <FetcherBasic fetch={delay(600, null, `some error (${count})`)} renderComp={RenderComp} />
    </div>,
    document.getElementsByTagName('div')[0]
  );
}

run();

function prevPage() {
  count -= 1;
  run();
}
function nextPage() {
  count += 1;
  run();
}

function RenderComp(props: IFetcherRenderProps<any>): JSX.Element {
  let { data, error, status } = props;
  console.log(`data: ${data}, error: ${error}, status: ${JSON.stringify(status)}`);
  return (
    <div>
      <div>{`data: ${JSON.stringify(data)}`}</div>
      <div>{`error: ${error}`}</div>
      <div>{`status: ${status}`}</div>
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
