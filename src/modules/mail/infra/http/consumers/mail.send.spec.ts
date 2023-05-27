import MailSend from "./mail.send";
import MailController from "../controllers/MailController";

jest.mock("@shared/infra/messages/rabbitmq/Rabbitmq", () => jest.fn());

let mailSend: MailSend;
let messageMock: string;

describe("mail.send", () => {
    beforeAll(() => {
        jest.spyOn(MailController.prototype, "sendMail").mockResolvedValue();

        jest.spyOn(
            MailSend.prototype,
            "callbackPublishQueue",
        ).mockResolvedValue();

        messageMock =
            '{"server":{"host":"smtp.gmail.com","port":465,"secure":1,"auth":{"user":"user@user.com","pass":"user123"}},"content":{"from":"Test Mail 👻","to":"test@test.com","subject":"Test","text":"Test Mail"}}';

        mailSend = new MailSend();
    });

    it("should be able execute mail", () => {
        expect(mailSend.execute(messageMock)).resolves;
    });

    it("should not be able execute mail", () => {
        expect(mailSend.execute("")).rejects;
    });
});
