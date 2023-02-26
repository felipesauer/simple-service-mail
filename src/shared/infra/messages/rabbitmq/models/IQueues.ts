import { IConsuming } from "../Rabbitmq";
import Joi from "joi";

export interface IQueues {
    queues: IConsuming[];
    use(payload: IConsuming): void;
    start(): Promise<void>;
}

export interface IQueueRoute {
    schema: Joi.ObjectSchema;
    execute(message: string): Promise<void>;
    callbackPublishQueue(args: object): Promise<void>;
}
