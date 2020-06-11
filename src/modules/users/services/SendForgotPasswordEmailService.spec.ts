import AppError from '../../../shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmail from './SendForgotPasswordEmailService';

describe('sendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
