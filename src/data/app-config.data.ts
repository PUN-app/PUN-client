import { URLConfig, URLBuilder } from "./config";

export class AppConfig {
  private _urlBuilder: URLBuilder;
  
  constructor(
      _appConfig: URLConfig,
    ) {
      this._urlBuilder = new URLBuilder(_appConfig );
    }

  public get urlBuilder(): URLBuilder {
    return this._urlBuilder;
  }
  
  public get appUrl(): string {
    return this.urlBuilder.url;
  }

}
