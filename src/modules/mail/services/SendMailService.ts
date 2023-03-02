import AppError from "@shared/errors/AppError";
import { IMailConfig, ISendMail } from "../domain/models/IMail";
import ProviderNodemailer from "@shared/providers/mail/nodemailer/Nodemailer";

class SendMailService {
    async execute(
        server: IMailConfig,
        content: ISendMail,
        callback: (args: object) => Promise<void>,
    ): Promise<void> {
        try {
            const result = await new ProviderNodemailer(server).sendMailSmtp(
                content,
            );
            await callback({
                message: "Email triggered successfully",
                statusCode: 201,
                ...result,
            });
        } catch (error) {
            await callback(
                new AppError(`Error sending email, ${String(Error)}`, 500),
            );
        }
    }
}

export default SendMailService;
