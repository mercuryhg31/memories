import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { AccountService } from './account.service';
  import { MeService } from './me.service'
  
  @Controller('account')
  export class AccountController {
    constructor(private _accountService: AccountService, private meService: MeService ) {
    }
  
   // @UseGuards(AuthenticatedGuard)
    @Get('me')
    getCurrentUser(req) {
      const data = this.meService.getCurrentUser(req.account);
      return data;
    }
  
 //   @UseGuards(AuthenticatedGuard)
    @Get(':username')
    async findOneByUsername(username) {
      const user = await this._accountService.findOneByUsername(username);
      return user;
    }

    @Get(':id')
    async findOneById(id) {
      const user = await this._accountService.findOneById(id);
      return user;
    }

    @Get()
    async createAccount(username, password, email, bio){
      const creation = await this._accountService.createAccount(username,password,email,bio);
      return creation;
    }
  }
  