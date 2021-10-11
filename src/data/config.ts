type Schema = "http" | "https";

export interface URLConfig {
  schema: Schema,
  host: string,
  port: number,
}

export const urlTemplate = "{schema}://{host}:{port}";
export const urlTemplateDefaultPort = "{schema}://{host}";

export class URLBuilder {
  _url: string;
  
  constructor( private _urlConfig: URLConfig ) {
    if (_urlConfig.port && _urlConfig.port !== 80) {
      this._url = urlTemplate
        .replace("{schema}", _urlConfig.schema)
        .replace("{host}", _urlConfig.host)
        .replace("{port}", '' + _urlConfig.port);
    } else {
      this._url = urlTemplateDefaultPort
        .replace("{schema}", _urlConfig.schema)
        .replace("{host}", _urlConfig.host);
    }
  }

  public get urlConfig() { return this._urlConfig; }

  public get url() { return this._url; }
}
