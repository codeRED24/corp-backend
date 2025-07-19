import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
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
          status = HttpStatus.NOT_FOUND;
          const fkError = this.parseForeignKeyError(exception);
          message = fkError.message;
          errorDetail = fkError.detail;
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

  private parseForeignKeyError(exception: any): {
    message: string;
    detail: string;
  } {
    const detail = exception.detail || '';
    const constraint = exception.constraint || '';

    // Parse the detail message to extract table and column info
    // Example: "Key (category_id)=(999) is not present in table \"categories\"."

    if (detail.includes('category_id') && detail.includes('categories')) {
      return {
        message: 'Category does not exist',
        detail: 'The specified category ID was not found',
      };
    }

    if (detail.includes('vendor_id') && detail.includes('vendor')) {
      return {
        message: 'Vendor does not exist',
        detail: 'The specified vendor ID was not found',
      };
    }

    if (detail.includes('user_id') && detail.includes('users')) {
      return {
        message: 'User does not exist',
        detail: 'The specified user ID was not found',
      };
    }

    if (detail.includes('product_id') && detail.includes('products')) {
      return {
        message: 'Product does not exist',
        detail: 'The specified product ID was not found',
      };
    }

    if (detail.includes('variant_id') && detail.includes('product_variants')) {
      return {
        message: 'Product variant does not exist',
        detail: 'The specified variant ID was not found',
      };
    }

    if (detail.includes('interest_id') && detail.includes('interest_type')) {
      return {
        message: 'Interest type does not exist',
        detail: 'The specified interest ID was not found',
      };
    }

    if (detail.includes('coupon_id') && detail.includes('coupons')) {
      return {
        message: 'Coupon does not exist',
        detail: 'The specified coupon ID was not found',
      };
    }

    if (detail.includes('order_id') && detail.includes('orders')) {
      return {
        message: 'Order does not exist',
        detail: 'The specified order ID was not found',
      };
    }

    // Fallback for unhandled foreign key violations
    return {
      message: 'Referenced record does not exist',
      detail: detail || 'Foreign key constraint violation',
    };
  }
}
