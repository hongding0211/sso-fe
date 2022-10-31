import {IApi} from "./types";

export default class Requester<T extends IApi> {
  res: T['IRes'] | undefined = undefined

  url: string


  constructor(url: string) {
    this.url = url
  }

  post(payload: T['IReq']): Promise<T['IRes']> {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then(res => res.json())
  }

  get(payload: T['IReq']): Promise<T['IRes']> {
    const newUrl = this.url + '?' + Object.entries(payload).map(([k, v]) => `${k}=${v}`).join('&')
    return fetch(newUrl, {
      method: 'GET',
      credentials: 'include',
    }).then(res => res.json())
  }
}
