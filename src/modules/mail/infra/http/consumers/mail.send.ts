import Joi from "joi";
import AppError from "@shared/errors/AppError";
import { ISendMail, IMailConfig } from "@modules/mail/domain/models/IMail";
import { IQueueRoute } from "@shared/infra/messages/rabbitmq/models/IQueues";
import Rabbitmq from "@shared/infra/messages/rabbitmq/Rabbitmq";
import MailController from "../controllers/MailController";
import messages from "@config/messages";

export interface IRequestMail {
    server: IMailConfig;
    content: ISendMail;
}

class MailSend implements IQueueRoute {
    readonly schema: Joi.ObjectSchema;

    constructor() {
        this.schema = Joi.object({
            server: Joi.object({
                host: Joi.string().required(),
                port: Joi.number().required(),
                secure: Joi.boolean().required(),
                auth: Joi.object({
                    user: Joi.string().required(),
                    pass: Joi.string().required(),
                }),
            }).required(),
            content: Joi.object({
                from: Joi.string().required(),
                to: Joi.string().required().email({
                    multiple: true,
                }),
                subject: Joi.string().required(),
                text: Joi.string().required(),
                html: Joi.string(),
            }).required(),
        });
    }

    async execute(message: string): Promise<void> {
        try {
            const convert = JSON.parse(message);
            const value: IRequestMail = await this.schema.validateAsync(
                convert,
            );
            await new MailController().sendMail(
                value.server,
                value.content,
                this.callbackPublishQueue,
            );
        } catch (error) {
            if (error instanceof Joi.ValidationError) {
                const listRequired = (error as Joi.ValidationError).details.map(
                    e => e.message,
                );
                await this.callbackPublishQueue(
                    new AppError(listRequired.join(", ")),
                );
            } else await this.callbackPublishQueue(new AppError(String(error)));
        }
    }

    async callbackPublishQueue(args: object): Promise<void> {
        await Rabbitmq.publish({
            exchange: messages.config.rabbitmq.exchange,
            message: JSON.stringify(args),
            queue: messages.config.rabbitmq.replyTo,
        });
    }
}

export default MailSend;
