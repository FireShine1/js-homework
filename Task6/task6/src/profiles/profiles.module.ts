import {forwardRef, Module} from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../auth/auth.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import { Profile } from './profiles.model';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Profile]),
      RolesModule,
      forwardRef(() => AuthModule),
  ],
    exports: [
        ProfilesService,
    ]
})
export class ProfilesModule {};