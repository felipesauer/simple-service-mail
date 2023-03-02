import { IMailConfig, ISendMail } from "@modules/mail/domain/models/IMail";
import SendMailService from "@modules/mail/services/SendMailService";

class MailController {
    async sendMail(
        server: IMailConfig,
        content: ISendMail,
        callback: (args: object) => Promise<void>,
    ) {
        await new SendMailService().execute(server, content, callback);
    }
}

export default MailController;
