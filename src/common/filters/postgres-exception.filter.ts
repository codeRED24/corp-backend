import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, NotFoundException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorDetail = exception.message;

    if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
      errorDetail = exception.message;
    } else if (exception.code) {
        switch (exception.code) {
            case '23505': // unique_violation
              status = HttpStatus.CONFLICT;
              message = 'Duplicate key value violates unique constraint';
              errorDetail = exception.detail;
              break;
            case '23503': // foreign_key_violation
              status = HttpStatus.BAD_REQUEST;
              message = 'Foreign key constraint violation';
              errorDetail = exception.detail;
              break;
            case '22P02': // invalid_text_representation
              status = HttpStatus.BAD_REQUEST;
              message = 'Invalid input syntax';
              errorDetail = exception.detail;
              break;
            // Add more cases for other PostgreSQL error codes as needed
          }
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: errorDetail,
    });
  }
}