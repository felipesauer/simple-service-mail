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

export interface IRequestMail {
    server: IMailConfig;
    content: ISendMail;
}
