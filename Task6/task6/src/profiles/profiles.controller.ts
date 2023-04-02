import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "../auth/dto/create-user.dto";
import {ProfilesService} from "./profiles.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import { RegisterDto } from './dto/register.dto';
import { ProfileDto } from './dto/profile.dto';
import { AuthorOrAdminGuard } from 'src/auth/author-or-admin.guard';

@Controller('users')
export class ProfilesController {

    constructor(private profilesService: ProfilesService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.profilesService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() registerDto: RegisterDto) {
        return this.profilesService.register(registerDto);
    }

    @Get()
    getAll() {
        return this.profilesService.getAllProfiles();
    }

    @UseGuards(AuthorOrAdminGuard)
    @Put('/:id')
    update(@Param('id') id: number,
            @Body() profileDto: ProfileDto) {
        return this.profilesService.update(id, profileDto);
    }

    @UseGuards(AuthorOrAdminGuard)
    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.profilesService.delete(id);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.profilesService.addRole(dto);
    }

}