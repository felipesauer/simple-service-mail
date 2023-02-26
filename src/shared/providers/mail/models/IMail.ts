export interface IMailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}

export interface ISendMail {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export interface IResponseMail {
    messageId: string;
    info: string | false;
}

export interface IMail {
    config: IMailConfig;
    sendMailSmtp: (args: ISendMail) => Promise<IResponseMail>;
}
