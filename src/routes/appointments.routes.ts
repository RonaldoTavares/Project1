import { response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

const appointmentsRouter = Router();

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

appointmentsRouter.get('/', (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const {provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider: provider,
    });
    console.log(appointment)
    return response.json(appointment);
  }
  catch (err){
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
