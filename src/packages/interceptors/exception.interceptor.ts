import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((err) => {
        throw new HttpException(
          {
            message: err.response?.message || err.message || '',
            data: [],
            status: false,
            pager: {},
          },
          err?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
