
import { JsonReference } from '@hn3000/json-ref';

export class FetchCache {
  private _cache: { [url: string] : Promise<any>} = {};

  constructor(private _fetchFun: (url: string) => Promise<any>) {
    this.fetch = this.fetch.bind(this);
  }

  fetch(jsonRef: string): Promise<any> {
    const ref = new JsonReference(jsonRef);
    const url = ref.filename;
    if (null == this._cache[jsonRef]) {
      if (null == this._cache[url]) {
        this._cache[url] = this._fetchFun(url);
      }
      this._cache[jsonRef] = this._cache[url].then(x => ref.pointer.getValue(x));
    }

    return this._cache[jsonRef];
  }

  clear() {
    this._cache = {};
  }
}
