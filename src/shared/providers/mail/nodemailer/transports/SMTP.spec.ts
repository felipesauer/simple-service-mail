import { IMailConfig } from "../../models/IMail";
import { createTransport } from "nodemailer";
import smtp from "./SMTP";

let config: IMailConfig;

describe("SMTP", () => {
    beforeAll(() => {
        config = {
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "test",
                pass: "test123",
            },
        };
    });

    it("should be able crate transport", () => {
        const createTransportSmtp = smtp(config);
        expect(createTransportSmtp).toEqual(
            expect.objectContaining({
                sendMail: createTransport(config).sendMail,
            }),
        );
    });
});
