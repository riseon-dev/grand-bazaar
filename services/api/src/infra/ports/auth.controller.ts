import {
  // Body,
  Controller,
  // Get,
  // Post,
  // Req,
  // Res,
  // UseGuards,
} from '@nestjs/common';

@Controller('auth')
export class ClientController {
  constructor() {} //  private readonly clientService: ClientService

  // @Get("nonce")
  // //get nonce req and response decorators
  // async getNonce(@Req() req: Request, @Res() res: Response) {
  //   const nonce = await this.ethereumService.getNonce();
  //   console.log(nonce);
  //
  //   return res.status(200).json({ nonce });
  // }

  //
  // @UseGuards(SiweAuthGuard)
  // @Post("/signup")
  // async signup(@Body() clientData: clientInterface, @Req() req, @Res() res) {
  //   console.log(clientData, "DATA")
  //   if (!clientData.username || !clientData.ethAddress) {
  //     return res.status(422).send('Missing fields');
  //   }
  //
  //
  //   try {
  //
  //     //add user to db
  //
  //     //then send back access token and refresh token
  //
  //     const client = await this.clientService.insertClient(clientData);
  //     console.log("done inserting client", client)
  //
  //
  //
  //     console.log("creating access")
  //
  //     const { token, refresh } = await this.clientService.generateAccessToken(clientData);
  //
  //
  //     return res.status(200).send({ access_token: token, refresh_token: refresh });
  //
  //   }
  //
  //
  //
  //
  //   catch (error) {
  //     if (error instanceof QueryFailedError) {
  //
  //       return res.status(422).send('user already exists');
  //
  //     }
  //
  //     return res.status(500).send('Something went wrong');
  //
  //
  //   }
  //
  //
  //
  // }
  //
  //
  // @UseGuards(RefreshJwtGuard)
  // @Post('refresh')
  // async refresh(@Req() req, @Res() res) {
  //
  //   console.log(req.user.ethAddress,"reqqqqq")
  //   const client: clientInterface = {
  //     ethAddress: req.user.ethAddress,
  //   }
  //
  //   const { token, refresh } = await this.clientService.generateAccessToken(client);
  //   return res.status(200).send({ access_token: token, refresh_token: refresh });
  //
  // }
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // @UseGuards(SiweAuthGuard)
  // @Post("signin")
  // async login(@Body() clientData: clientInterface, @Req() req, @Res() res) {
  //   if (!clientData.ethAddress) {
  //     return res.status(422).send('Missing fields');
  //   }
  //
  //   try {
  //     const client = await this.clientService.findByAddress(clientData.ethAddress);
  //
  //     if (!client) {
  //       return res.status(422).send('user not found');
  //     }
  //
  //     const { token, refresh } = await this.clientService.generateAccessToken(client);
  //
  //     return res.status(200).send({ access_token: token, refresh_token: refresh });
  //   }
  //   catch (error) {
  //     return res.status(500).send('Something went wrong');
  //   }
  // }
}
