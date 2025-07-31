import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt ,Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'
        })
    }

    async validate(payload: any) {
        return { id: payload.userId, email: payload.email}
    }
}