import { createTransport } from "nodemailer";
import { IMailConfig } from "../../models/IMail";

function smtp(config: IMailConfig) {
    return createTransport(config);
}

export default smtp;
