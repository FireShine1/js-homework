import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { Resource } from './files.model';

@Injectable()
export class FilesService {

    constructor(@InjectModel(Resource) private resourceRepository: typeof Resource) {}

    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createResource(fileName: string, essenceTable: string, essenceId: number) {
        this.resourceRepository.create({name: fileName, essenceTable: essenceTable, essenceId: essenceId, created: Date.now()});
    }

    async setUnused(name: string) {
        this.resourceRepository.update({essenceTable: null, essenceId: null}, {where: {name}});
    }

    async deleteUnused() {
        const resources = await this.resourceRepository.findAll();
        const resourcesToDelete = resources.filter(resource => !resource.essenceId
                                                            && !resource.essenceTable
                                                            && Date.now() - resource.created > 3600 * 1000);
        for (let resource of resourcesToDelete) {
            this.resourceRepository.destroy({where: {name: resource.name}});
            const filePath = path.resolve(__dirname, '..', 'static');
            fs.rmSync(path.join(filePath, resource.name));
        }
    }

}