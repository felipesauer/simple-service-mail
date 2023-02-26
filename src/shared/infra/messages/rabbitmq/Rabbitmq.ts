import { IMassagesConnect, IMassagesHandle } from "../models/IMessages";
import MessagesConfig from "@config/messages";
import amqplib from "amqplib";
import Queue from "./queues/Queues";

export interface IPublish {
    exchange: string;
    queue: string;
    message: string;
}

export interface IConsuming {
    queue: string;
    callback: (args: string) => Promise<void>;
}

class RabbitmqConnect implements IMassagesConnect {
    public channel: amqplib.Channel;

    constructor() {
        this.initialize();
    }

    async initialize(): Promise<void> {
        try {
            const connected = await amqplib.connect(
                MessagesConfig.config.rabbitmq.optionsConnect,
            );
            this.channel = await connected.createChannel();

            console.log("Service connected in amqp");

            await Queue.start();
        } catch (error) {
            console.error(error);
        }
    }

    async disconnect() {
        await this.channel.close();
    }
}

class RabbitmqHandle
    extends RabbitmqConnect
    implements IMassagesHandle<IPublish, IConsuming>
{
    constructor() {
        super();
    }

    async publish(payload: IPublish): Promise<boolean> {
        return this.channel.publish(
            payload.exchange,
            payload.queue,
            Buffer.from(payload.message),
        );
    }

    async consuming(payload: IConsuming): Promise<void> {
        await this.channel.consume(
            payload.queue,
            async message =>
                await payload.callback(message?.content.toString() || ""),
            { noAck: true },
        );
    }
}

export default new RabbitmqHandle();
