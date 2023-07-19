import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          message:
            typeof data === 'string' || typeof data === 'number'
              ? data
              : data.message || '',
          data:
            typeof data !== 'string' ? _.omit(data, ['pager', 'message']) : [],
          status: true,
          pager: data.pager || {},
        };
      }),
    );
  }
}
