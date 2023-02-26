import { IMailConfig, ISendMail } from "@modules/mail/domain/models/IMail";
import SendMailService from "@modules/mail/services/SendMailService";

class MailController {
    async sendMail(
        server: IMailConfig,
        content: ISendMail,
        callback: (args: object) => Promise<void>,
    ) {
        try {
            const response = await new SendMailService().execute(
                server,
                content,
            );
            await callback({
                message: "Email triggered successfully",
                statusCode: 201,
                ...response,
            });
        } catch (error) {
            await callback({
                message: error,
            });
        }
    }
}

export default MailController;
