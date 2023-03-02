import SendMailService from "./SendMailService";
import ProviderNodemailer from "@shared/providers/mail/nodemailer/Nodemailer";
import { IMailConfig, ISendMail } from "../domain/models/IMail";

let sendMailService: SendMailService;
let config: IMailConfig;
let sendMail: ISendMail;
const callbackMock = jest.fn().mockImplementation(() => Promise.resolve());

describe("SendMailService", () => {
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

        sendMail = {
            from: "Test From",
            subject: "Test",
            text: "Test Mail",
            to: "test@test.com",
        };

        sendMailService = new SendMailService();
    });

    it("should be able send mail", () => {
        jest.clearAllMocks();
        const resolveMockSendMail = jest
            .spyOn(ProviderNodemailer.prototype, "sendMailSmtp")
            .mockImplementation(jest.fn());

        expect(
            sendMailService.execute(config, sendMail, callbackMock),
        ).resolves.toBe(undefined);
        expect(resolveMockSendMail).toHaveBeenCalled();
    });

    it("should be able not send mail", () => {
        jest.clearAllMocks();
        const rejectMockSendMail = jest
            .spyOn(ProviderNodemailer.prototype, "sendMailSmtp")
            .mockImplementation(() => {
                throw "Failed Send Mail";
            });

        expect(sendMailService.execute(config, sendMail, callbackMock)).rejects;
        expect(rejectMockSendMail).toHaveBeenCalled();
    });
});
