import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ProfilesModule} from "../profiles/profiles.module";
import {JwtModule} from "@nestjs/jwt";
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './auth.model';
import { Profile } from 'src/profiles/profiles.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  providers: [AuthService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Profile]),
      forwardRef(() => ProfilesModule),
      RolesModule,
      JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
          expiresIn: '24h'
        }
      })
  ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {};