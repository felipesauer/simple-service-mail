import { Options } from "amqplib";

interface IMessagesConfig {
    config: {
        rabbitmq: {
            optionsConnect: Options.Connect;
            exchange: string;
            replyTo: string;
        };
    };
}

export default {
    config: {
        rabbitmq: {
            optionsConnect: {
                hostname: process.env.MESSAGE_AMQP_HOSTNAME,
                port: Number(process.env.MESSAGE_AMQP_PORT),
                username: process.env.MESSAGE_AMQP_USERNAME,
                password: process.env.MESSAGE_AMQP_PASSWORD,
            },
            exchange: process.env.MESSAGE_AMQP_EXCHANGE,
            replyTo: process.env.MESSAGE_AMQP_REPLYTO,
        },
    },
} as IMessagesConfig;
