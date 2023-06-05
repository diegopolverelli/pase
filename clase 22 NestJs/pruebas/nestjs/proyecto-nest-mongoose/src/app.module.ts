import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { async } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import FirstMiddleware from './middleware/firstMiddleware';
import { UsersModule } from './users/users.module';

// @Module({
//   imports: [
//     MongooseModule.forRoot(
//       'mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase22',
//     ),
//     UsersModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// @Module({
//   imports: [
//     MongooseModule.forRoot(
//       'mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase22',
//     ),
//     UsersModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(FirstMiddleware)
//       .forRoutes({ path: '*', method: RequestMethod.ALL });
//   }
// }


@Module({
  imports: [
    UsersModule, ConfigModule.forRoot({
      envFilePath: './src/.env'
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async(config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL')
      })
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirstMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
