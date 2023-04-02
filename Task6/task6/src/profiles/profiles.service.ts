import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "../auth/auth.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "../auth/dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from './dto/register.dto';
import { Profile } from './profiles.model';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfilesService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                @InjectModel(Profile) private profileRepository: typeof Profile,
                private roleService: RolesService,
                private authService: AuthService) {};

    async login(userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    //Получаем объекты и для юзера (аутентификация) и для профиля
    async register(registerDto: RegisterDto) {
        const {userDto, profileDto} = registerDto;
        //сначала пробуем зарегистрировать юзера
        const {token, user} = await this.authService.register(userDto);
        //если все хорошо, то создаем профиль
        const profile = await this.profileRepository.create(profileDto);
        //и присваиваем ему юзера
        await profile.$set('user', user.id);
        profile.user = user;
        return {token, profile};
    }

    async getAllProfiles() {
        const users = await this.profileRepository.findAll();
        return users;
    }

    async getById(id: number) {
        const profile = await this.profileRepository.findByPk(id, {include: {all: true}});
        return profile;
    }

    async update(id: number, newProfile: ProfileDto) {
        return this.profileRepository.update(newProfile, {where: {id}});
    }

    async delete(id: number) {
        return this.profileRepository.destroy({where: {id}});
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

}