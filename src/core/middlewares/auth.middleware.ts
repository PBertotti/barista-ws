import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '../helpers';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: any, res: any, next: () => void) {
    try {
      const bearerHeader =
        req.body.token || req.query.token || req.headers.authorization;
      const accessToken = bearerHeader && bearerHeader.split(' ')[1];

      const decoded = await this.jwtService.decode(accessToken);

      if (!decoded) {
        throw 'Invalid token';
      }

      req.auth = { ...req.auth, ...decoded };
      next();
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}
