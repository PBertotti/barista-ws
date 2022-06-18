import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.schema';
import { AccessDTO } from './dto/auth-access.dto';
import { JwtService } from 'src/core/helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  filterResults(result: any) {
    const res = JSON.parse(JSON.stringify(result));
    delete res.__v;
    delete res.password;

    return res;
  }

  async access(accessDTO: AccessDTO) {
    const registeredUser = await this.userModel.findOne({
      email: accessDTO.email,
    });

    // Check if the user exists
    if (!registeredUser) {
      throw new PreconditionFailedException('User does not exist');
    }

    const passwordMatches = await bcrypt.compare(
      accessDTO.password,
      registeredUser.password,
    );

    if (passwordMatches === true) {
      const accessToken = await this.jwtService.get(
        {
          _id: registeredUser._id,
          email: registeredUser.email,
          name: registeredUser.name,
        },
        '365d',
      );

      return {
        userData: this.filterResults(registeredUser),
        accessToken: accessToken,
      };
    }

    throw new UnauthorizedException('Incorrect Password');
  }
}
