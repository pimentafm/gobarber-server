import ISentMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISentMailDTO): Promise<void>;
}
