import MailSend from "./mail.send";
import MailController from "../controllers/MailController";

let mailSend: MailSend;

describe("mail.send", () => {
    beforeAll(() => {
        const sendMailMock = jest
            .spyOn(MailController.prototype, "sendMail")
            .mockImplementation(jest.fn());

        const callbackPublishQueueMock = jest
            .spyOn(MailSend.prototype, "callbackPublishQueue")
            .mockImplementation(jest.fn());

        mailSend = new MailSend();
    });

    it("should be able execute mail", async () => {});
});
