import dotenv from "dotenv";
dotenv.config({
    path: `${process.cwd()}/tests/.env.development`,
});

import amqplib, { Options } from "amqplib";

class AppIntegrationMock {
    private connect: Options.Connect;
    private channel: amqplib.Channel;
    private config: {
        exchange: string;
        replyto: string;
        queue: string;
    };
    private serverMail: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
    };
    private contentMail: {
        from: string;
        to: string;
        subject: string;
        text: string;
        html?: string;
    };

    constructor() {
        this.connect = {
            hostname: process.env.DEV_MESSAGE_AMQP_HOSTNAME,
            port: Number(process.env.DEV_MESSAGE_AMQP_PORT),
            username: process.env.DEV_MESSAGE_AMQP_USERNAME,
            password: process.env.DEV_MESSAGE_AMQP_PASSWORD,
        };

        this.config = {
            exchange: String(process.env.DEV_MESSAGE_AMQP_EXCHANGE),
            replyto: String(process.env.DEV_MESSAGE_AMQP_REPLYTO),
            queue: String(process.env.DEV_MESSAGE_AMQP_QUEUE),
        };

        this.serverMail = {
            host: String(process.env.DEV_SERVER_MAIL_HOST),
            port: Number(process.env.DEV_SERVER_MAIL_PORT),
            secure: Boolean(process.env.DEV_SERVER_MAIL_SECURE),
            auth: {
                user: String(process.env.DEV_SERVER_MAIL_USER),
                pass: String(process.env.DEV_SERVER_MAIL_PASS),
            },
        };

        this.contentMail = {
            from: "Test Mail 👻",
            to: String(process.env.DEV_SERVER_MAIL_TO),
            subject: "Test",
            text: "Test Mail",
            html: "<p>Test Mail</p>",
        };

        this.channel;

        this.initialize();
    }

    async initialize() {
        try {
            const connected = await amqplib.connect(this.connect);
            this.channel = await connected.createChannel();

            console.log("Service connected in amqp");

            await this.publish();
            await this.consuming();
        } catch (error) {
            console.error(error);
        }
    }

    async publish() {
        console.log("Start Test");

        setInterval(async () => {
            const mock = {
                server: this.serverMail,
                content: this.contentMail,
            };

            this.channel.publish(
                this.config.exchange,
                this.config.queue,
                Buffer.from(JSON.stringify(mock)),
            );
        }, 1000);
    }

    async consuming() {
        await this.channel.consume(
            this.config.replyto,
            message => console.log(message?.content.toString()),
            { noAck: true },
        );
    }
}

new AppIntegrationMock();
