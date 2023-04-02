import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesModule } from "../files/files.module";
import { User } from "../auth/auth.model";
import { TextBlocksController } from './text-blocks.controller';
import { TextBlock } from './text-blocks.model';
import { TextBlocksService } from './text-blocks.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TextBlocksService],
  controllers: [TextBlocksController],
  imports: [
      SequelizeModule.forFeature([User, TextBlock]),
      FilesModule,
      AuthModule
  ]
})
export class TextBlocksModule {};