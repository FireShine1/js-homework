import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { ProfileDto } from "./profile.dto";

export class RegisterDto {

    readonly userDto: CreateUserDto;
    readonly profileDto: ProfileDto;
    
}