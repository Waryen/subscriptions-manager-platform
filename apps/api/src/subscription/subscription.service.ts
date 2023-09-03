import { Injectable } from '@nestjs/common';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import { UpdateSubscriptionInput } from './dto/update-subscription.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from './entities/subscription.schema';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>
  ) {}

  async create(
    createSubscriptionInput: CreateSubscriptionInput
  ): Promise<Subscription> {
    const subscription = new this.subscriptionModel(createSubscriptionInput);
    return subscription.save();
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionModel.find().exec();
  }

  async findOne(id: string): Promise<Subscription> {
    return this.subscriptionModel.findById(id).exec();
  }

  update(
    id: string,
    updateSubscriptionInput: UpdateSubscriptionInput
  ): Promise<Subscription> {
    return this.subscriptionModel
      .findByIdAndUpdate(id, updateSubscriptionInput)
      .exec();
  }

  remove(id: string): Promise<Subscription> {
    return this.subscriptionModel.findByIdAndRemove(id).exec();
  }
}
