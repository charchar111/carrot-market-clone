export interface IResponse {
  ok: boolean | undefined;
}

export interface IFormCommunityWrite {
  title: string;
  content: string;
}

export interface IResponseCommunityWrite extends IResponse {
  post?: { id: number };
}
