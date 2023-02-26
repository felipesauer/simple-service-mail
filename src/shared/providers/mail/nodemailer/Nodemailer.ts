import { getTestMessageUrl } from "nodemailer";
import AppError from "@shared/errors/AppError";
import smtp from "./transports/SMTP";
import { IMail, IMailConfig, ISendMail, IResponseMail } from "../models/IMail";

class Nodemailer implements IMail {
    constructor(public config: IMailConfig) {}

    async sendMailSmtp(args: ISendMail): Promise<IResponseMail> {
        const transport = smtp(this.config);

        try {
            const info = await transport.sendMail(args);
            return {
                messageId: info.messageId,
                info: getTestMessageUrl(info),
            };
        } catch (error) {
            throw new AppError(String(error), 500);
        }
    }
}

export default Nodemailer;
