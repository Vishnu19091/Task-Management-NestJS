// Custom HttpExceptions for Tasks

import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadExistsError extends HttpException {
  constructor(message: string = 'AlreadyExists') {
    super(message, HttpStatus.CONFLICT);
  }
}

export class TaskIdNotFound extends HttpException {
  constructor(message: string = `TaskIdNotFound`) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
