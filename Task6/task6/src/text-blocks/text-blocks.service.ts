import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "../files/files.service";
import { TextBlock } from './text-blocks.model';
import { TextBlockDto } from './dto/text-block.dto';

@Injectable()
export class TextBlocksService {

    constructor(@InjectModel(TextBlock) private textBlockRepository: typeof TextBlock,
                private fileService: FilesService) {}

    async getAll(group: string) {
        if (group) {
            return this.textBlockRepository.findAll({where: {group}});
        }
        return this.textBlockRepository.findAll();
    }

    async create(dto: TextBlockDto, image: any) {
        const fileName = await this.fileService.createFile(image);
        const block = await this.textBlockRepository.create({...dto, image: fileName})
        await this.fileService.createResource(fileName, "text_block", block.id);
        return block;
    }

    async update(id: number, dto: TextBlockDto, image) {
        if (image) {
            const block = await this.textBlockRepository.findByPk(id);
            this.fileService.setUnused(block.image);
            const fileName = await this.fileService.createFile(image);
            const newBlock = await this.textBlockRepository.update({...dto, image: fileName}, {where: {id}});
            await this.fileService.createResource(fileName, "text_block", id);
            return newBlock;
        }
        const block = await this.textBlockRepository.findByPk(id);
        return this.textBlockRepository.update({...dto, image: block.image}, {where: {id}});
    }

    async delete(id: number) {
        const block = await this.textBlockRepository.findByPk(id);
        this.fileService.setUnused(block.image);
        return this.textBlockRepository.destroy({where: {id}});
    }

}