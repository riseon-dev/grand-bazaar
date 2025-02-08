import {
  //Body,
  Controller,
  //Post, Req, Res, UseGuards
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor() {} //private readonly clientService: ClientService

  // @Get('/profile')
  // @UseGuards(JwtGuard)
  // async getProfile(@Req() req, @Res() res) {
  //
  //   console.log(req)
  //   const client: clientInterface = {
  //     username: req.user.username,
  //     ethAddress: req.user.ethAddress,
  //   };
  //
  //
  //   return res.status(200).send(client);
  // }
}
