import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private accountService: AccountService) {}

  async validateUser(username, password) {
    const user = await this.accountService.findOneByUsername(username);
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return user;
      }
    }
    return null;
  }

  async createUser(username, email, password, label) {
    const user = await this.accountService.createAccount(
      username,
      email,
      password,
      label
    );
    return user;
  }
}