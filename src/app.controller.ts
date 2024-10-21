import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @Get(['/', '/health'])
  @ApiOperation({ summary: 'Health check endpoint' })
  health(): string {
    return 'OK';
  }
}
