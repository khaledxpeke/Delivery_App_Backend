import _ from 'lodash';

import UserModel from '../models/user.model';
import { createToken } from '../helpers/auth';
import { Result, SignupArgsType, UserFuncType } from '../interfaces';
import { Body, Controller, Get, Post, Route, Tags } from 'tsoa';
import userModel from '../models/user.model';
import { AnyNaptrRecord } from 'dns';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';


@Route("/user")
@Tags("Users")
export default class UserController extends Controller {

  async signupUser(@Body() args: SignupArgsType): Promise<Result> {
    const { email, lastname, name, code, role, vehicule } = args;
    const ifAlreadyExist = await UserModel.findOne({
      email,
    });
    if (ifAlreadyExist) {
      return {
        error: 'Email Already Exist',
        data: null,
      };
    }

    const user = await new UserModel({
      email,
      lastname, name, code,
      role, vehicule
    }).save();

    return {
      error: null,
      data: user,
    };
  }

  @Post('/login')

  async loginUser(@Body() args: any): Promise<Result> {
    const { code } = args;

    let user
    if (code) {
      user = await UserModel.findOne({
        code,
      }).populate('vehicule')
    }

    if (_.isEmpty(user)) {
      return {
        error: 'user_does_not_exist',
        data: null,
      };
    }

    const data = {
      token: createToken(user),
      user
    };

    return {
      error: null,
      data,
    };
  }


  async user(args: UserFuncType): Promise<Result> {
    const { userId } = args;
    const user = await UserModel.findOne({
      _id: userId,
    }).populate('vehicule');

    return {
      error: null,
      data: user,
    };

  }

  @Get('/profile/{userId}')

  async getUserProfile(userId: any): Promise<Result> {
    const user = await UserModel.findOne({
      _id: userId,
    }).populate('vehicule');

    return {
      error: null,
      data: user,
    };
  }

  @Get('/')
  async getAllUsers(): Promise<Result> {
    const result = await UserModel.find({});

    return {
      error: null,
      data: result,
    };
  }

  async ConfirmCode(userId: any, codeVerif: any): Promise<any> {
    const result = await userModel.findById(userId).populate({
      path: "user",
      match: {
        code: codeVerif
      }
    });
    return {
      error: null,
      data: result
    };

  }

  async updateProfile(userId: any, newName: any, newEmail: any, newAddress: any, newPhone: any, newImage: any): Promise<any> {
    const id = await UserModel.findOne({
      _id: userId,
    });

    const filter = { _id: id };
    const update = { name: newName, email: newEmail, address: newAddress, phone: newPhone, image: newImage };
    let user = await userModel.findById(userId);
    const result = await userModel.updateOne(filter, update, {
    })
    if (user) {
      user.name = newName,
        user.email = newEmail,
        user.address = newAddress,
        user.phone = newPhone,
        user.image = newImage,
        await user?.save();
    }
    return {
      error: null,
      data: result
    };
  }

  async updateCode(userId: any, newCode: any): Promise<any> {
    const id = await UserModel.findOne({
      _id: userId,
    });

    const filter = { _id: id };
    const update = { code: newCode };
    let user = await userModel.findById(userId);
    const result = await userModel.updateOne(filter, update, {
    })
    if (user) {
      user.code = newCode,
        await user?.save();
    }
    return {
      error: null,
      data: result
    };
  }


  @Post('/forget')
  async forgetPassword(@Body() args: any): Promise<any> {
    const { email } = args;
    let user
    if (email) {
      user = await UserModel.findOne({
        email,
      })
    }
    if (_.isEmpty(user)) {
      return {
        error: 'user_does_not_exist',
        data: null,
      };
    }
    const data1 = {
      user
    };
    const emailBody = "Votre code de Grabit est: " + data1.user?.code;
    const hostname = "smtp.gmail.com";
    const sender = "khaledbouajila5481@gmail.com";
    const password = "mkfplltzywmbjrfx";

    const transporter = nodemailer.createTransport({
      host: hostname,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: sender,
        pass: password,
      },
      logger: true,
    });

    transporter.use('compile',hbs({
      viewEngine: {
        extname: '.handlebars',
        layoutsDir: './src/api/views',
        defaultLayout : 'index',
    },
    viewPath:'./',
    }));

    const mailOptions={
      from: sender,
      to: email,
      subject: "Grabit: Code",
      text: "",
      // html: emailBody,
      // headers: { 'x-cloudmta-class': 'standard' },
      template:'/src/api/views/index',
      context:{
        code:data1.user?.code,
        name:data1.user?.name,
      }
    }
    const info = transporter.sendMail(
      mailOptions
    );
    console.log(info)
    const data = {
      info
    };
    return {
      error: null,
      data,
    };
  }

}


