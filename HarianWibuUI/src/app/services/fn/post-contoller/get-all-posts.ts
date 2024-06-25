/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponsePostResponse } from '../../models/page-response-post-response';

export interface GetAllPosts$Params {
  page?: number;
  size?: number;
}

export function getAllPosts(http: HttpClient, rootUrl: string, params?: GetAllPosts$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePostResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllPosts.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponsePostResponse>;
    })
  );
}

getAllPosts.PATH = '/api/posts';
