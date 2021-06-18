import { Injectable, NotFoundException } from '@nestjs/common';
import { LocalUserDto } from './dto/local-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async userCreate(userObj: User) {
    const createdUser = new this.userModel(userObj);
    try {
      const savedUser = await createdUser.save();
      console.log('444444444444444444');
      console.log(savedUser._id);
      return savedUser;
    } catch (err) {
      console.log('error in user.service.ts - userCreate');
      console.log(err.message);
      throw new NotFoundException(err.message);
    }
  }

  async localRegister(createUserDto: LocalUserDto) {
    console.log('localRegister');

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    console.log('createUserDto.password');
    console.log(createUserDto.password);

    let createUserObj = {
      ...createUserDto,
      password: passwordHash,
      userId: uuid(),
      accountType: 'local',
    };

    console.log(createUserObj);
    console.log('createUserObj');

    this.userCreate(createUserObj);
  }

  async findAll(): Promise<{ payload: UserDocument[] } | { issue: string }> {
    try {
      return { payload: await this.userModel.find().exec() };
    } catch (error) {
      return { issue: error.message };
    }
  }

  async verifyLogin(email: string, pw: string): Promise<UserDocument> {
    console.log('user.service.ts findOneByEmailPw');
    console.log(email);
    console.log(pw);

    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) return null;
    console.log('user');
    console.log(user);
    const userObj = user.toObject();

    const isMatch = await bcrypt.compare(pw, userObj.password);
    if (isMatch) return user;
    return null;
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id).select('-password -__v');
    return user;
  }

  async findOneByType(filter: { [key: string]: string }) {
    console.log('findOneByType findOneByType : filter');

    console.log(filter);

    const user = await this.userModel.findOne(filter);
    console.log('user');

    console.log(user);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
