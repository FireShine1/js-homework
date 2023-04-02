import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Resource } from './files.model';
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    SequelizeModule.forFeature([Resource]),
  ],
  exports: [FilesService],
})
export class FilesModule {};