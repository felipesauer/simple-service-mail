import AppError from "@shared/errors/AppError";
import { IMailConfig, ISendMail } from "../domain/models/IMail";
import ProviderNodemailer from "@shared/providers/mail/nodemailer/Nodemailer";
import { IResponseMail } from "../domain/models/IResponseMail";

class SendMailService {
    async execute(
        server: IMailConfig,
        content: ISendMail,
    ): Promise<IResponseMail> {
        try {
            return await new ProviderNodemailer(server).sendMailSmtp(content);
        } catch (error) {
            throw new AppError(`Error sending email, ${String(Error)}`, 500);
        }
    }
}

export default SendMailService;
