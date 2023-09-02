import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import {
  SubscriptionRate,
  SubscriptionStatus,
} from '@subscriptions-manager-platform/stores';

const uri =
  process.env.NODE_ENV === 'development'
    ? process.env.DB_DEV
    : process.env.DB_PROD;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(uri),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UserModule,
    SubscriptionModule,
  ],
})
export class AppModule {
  constructor() {
    registerEnumType(SubscriptionRate, {
      name: 'SubscriptionRate',
    });
    registerEnumType(SubscriptionStatus, {
      name: 'SubscriptionStatus',
    });
  }
}
