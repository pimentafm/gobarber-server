import AppError from '../../../shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentsService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointmment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointmments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
