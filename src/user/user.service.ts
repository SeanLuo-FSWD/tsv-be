import {
  Injectable,
  HttpException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, // InjectModel is the part that make use of UserSchema from MongooseModule.forFeature .
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ payload: UserDocument } | { issue: string }> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const createUserObj = { ...createUserDto, password: passwordHash };
    const createdUser = new this.userModel(createUserObj);
    try {
      return { payload: await createdUser.save() };
    } catch (error) {
      return { issue: error.message };
    }
  }

  async findAll(): Promise<{ payload: UserDocument[] } | { issue: string }> {
    try {
      return { payload: await this.userModel.find().exec() };
    } catch (error) {
      return { issue: error.message };
    }
  }

  async findOneByEmailPw(email: string, pw: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) return null;
    const isMatch = await bcrypt.compare(pw, user.password);
    console.log('user.service.ts findOneByEmailPw');
    console.log(isMatch);
    if (isMatch) return user;
    return null;
  }

  findOneById(id: string) {
    return 'to implement';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
