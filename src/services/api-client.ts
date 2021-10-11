import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export abstract class ApiClient {
  protected ccConfig = {
    schema: "http",
    host: "localhost",
    port: "80",
  };

  private apiHostUrl: string | undefined;

  public get baseApiHostUrl() {
    let url = this.apiHostUrl;
    if (!url)
      url = "{schema}://{host}:{port}"
        .replace("{schema}", this.ccConfig.schema)
        .replace("{host}", this.ccConfig.host)
        .replace("{port}", this.ccConfig.port);
    return url;
  }
  public set baseApiHostUrl(url: string) {
    this.apiHostUrl = url;
  }

  protected abstract get baseUrl(): string;

  protected _axios!: AxiosInstance;
  protected get axios(): AxiosInstance {
    if (!this._axios)
      this._axios = Axios.create({
        baseURL: this.baseUrl,
      });
    return this._axios;
  }

  constructor() {
  }  
}