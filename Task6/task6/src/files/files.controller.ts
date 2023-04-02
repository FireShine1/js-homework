import { Controller, Post } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private fileService: FilesService) {}

    @Post('/deleteUnused')
    deleteUnused() {
        return this.fileService.deleteUnused();
    }

}
