import Rabbitmq, { IConsuming } from "../Rabbitmq";
import { IQueues } from "../models/IQueues";
import MailSend from "@modules/mail/infra/http/consumers/mail.send";

class Queues implements IQueues {
    readonly queues: IConsuming[] = [];

    use(payload: IConsuming) {
        this.queues.push(payload);
    }

    async start() {
        this.queues.forEach(async payload => await Rabbitmq.consuming(payload));
    }
}

const QueuesConsuming = new Queues();

QueuesConsuming.use({
    queue: "mail.send",
    callback: async message => await new MailSend().execute(message),
});

export default QueuesConsuming;
