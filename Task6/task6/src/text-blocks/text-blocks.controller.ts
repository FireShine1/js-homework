import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { TextBlockDto } from './dto/text-block.dto';
import { TextBlocksService } from './text-blocks.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('textBlocks')
export class TextBlocksController {

    constructor(private textBlockService: TextBlocksService) {}

    @Get()
    getAll(@Query('group') group: string) {
        return this.textBlockService.getAll(group);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createTextBlock(@Body() dto: TextBlockDto,
                    @UploadedFile() image) {
        return this.textBlockService.create(dto, image)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    update(@Param('id') id: number,
            @Body() textBlockDto: TextBlockDto,
            @UploadedFile() image) {
        return this.textBlockService.update(id, textBlockDto, image);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.textBlockService.delete(id);
    }

}