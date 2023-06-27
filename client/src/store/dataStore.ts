import { makeObservable, observable, action } from "mobx";

interface UrlItem {
  id: string;
  initial_url: string;
  shortened_url: string;
  clicks: number;
}

class UrlStoreImpl {
  url: UrlItem[] = [];

  constructor() {
    makeObservable(this, {
      url: observable,
      addUrl: action,
    });
  }

  addUrl(
    id: string,
    initial_url: string,
    shortened_url: string,
    clicks: number
  ) {
    const url: UrlItem = {
      id,
      initial_url: initial_url,
      shortened_url,
      clicks,
    };
    this.url.push(url);
  }
}

export const UrlStore = new UrlStoreImpl();
