import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { User } from "./auth/auth.model";
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { Profile } from "./profiles/profiles.model";
import { ProfilesModule } from './profiles/profiles.module';
import { Role } from "./roles/roles.model";
import { RolesModule } from './roles/roles.module';
import { UserRoles } from "./roles/user-roles.model";
import { TextBlock } from "./text-blocks/text-blocks.model";
import { TextBlocksModule } from "./text-blocks/text-blocks.module";
import { Resource } from "./files/files.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
           envFilePath: `.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve( __dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Profile, TextBlock, Resource],
            autoLoadModels: true
        }),
        ProfilesModule,
        RolesModule,
        AuthModule,
        FilesModule,
        TextBlocksModule,
    ]
})
export class AppModule {};