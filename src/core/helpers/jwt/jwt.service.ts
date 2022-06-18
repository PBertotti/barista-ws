import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jose from 'jose';
import * as crypto from 'crypto';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  async get(payload, duration = '1d') {
    const data = JSON.parse(JSON.stringify(payload));
    const key = crypto.createSecretKey(
      this.configService.get('constants.secret_key'),
      'utf-8',
    );

    const token = await new jose.SignJWT(data)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(this.configService.get('constants.backend_app_name'))
      .setAudience(this.configService.get('constants.frontend_app_name'))
      .setExpirationTime(duration)
      .sign(key);

    return token;
  }

  async decode(token: string) {
    const key = crypto.createSecretKey(
      this.configService.get('constants.secret_key'),
      'utf-8',
    );
    let payload: any;
    try {
      ({ payload } = await jose.jwtVerify(token, key, {
        issuer: this.configService.get('constants.backend_app_name'),
        audience: this.configService.get('constants.frontend_app_name'),
      }));
    } catch (error) {
      payload = false;
    }

    return payload;
  }
}
