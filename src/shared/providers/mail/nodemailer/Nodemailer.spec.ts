import AppError from "@shared/errors/AppError";
import { IMailConfig } from "../models/IMail";
import Nodemailer from "./Nodemailer";
import { ISendMail } from "../models/IMail";
import nodemailer from "nodemailer";

let config: IMailConfig;
let sendMail: ISendMail;
let providerNodemailer: Nodemailer;

describe("Nodemailer", () => {
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

        providerNodemailer = new Nodemailer(config);
    });

    it("should be able send mail", async () => {
        jest.clearAllMocks();

        const mockResolveCreateTransport = jest
            .spyOn(nodemailer, "createTransport")
            .mockImplementation(
                jest.fn().mockReturnValue({
                    sendMail: jest.fn().mockReturnValue({
                        messageId: 1,
                    }),
                }),
            );

        jest.spyOn(nodemailer, "getTestMessageUrl").mockImplementation(
            jest.fn().mockReturnValue({}),
        );

        expect(providerNodemailer.sendMailSmtp(sendMail)).resolves.toEqual(
            expect.objectContaining({
                messageId: 1,
            }),
        );
        expect(mockResolveCreateTransport).toHaveBeenCalled();
    });

    it("should be able not send mail", async () => {
        jest.clearAllMocks();
        const mockRejectSendMail = jest
            .spyOn(nodemailer, "createTransport")
            .mockImplementation(
                jest.fn().mockReturnValue({
                    sendMail: jest.fn().mockImplementation(() => {
                        throw "Failed Send Mail";
                    }),
                }),
            );

        expect(
            providerNodemailer.sendMailSmtp(sendMail),
        ).rejects.toBeInstanceOf(AppError);
        expect(mockRejectSendMail).toHaveBeenCalled();
    });
});
