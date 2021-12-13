import { Op } from "sequelize";
import { Inject, Service } from "typedi";
import { Logger as _Logger } from "winston";
import { IAppointment } from "../interfaces/IAppointment";
import { IUserInputDTO } from "../interfaces/IUser";
import Lesson from "../models/Lesson.model";
import Timeslot from "../models/Timeslot.model";
import User from "../models/User.model";
import getFriday from "../util/getFriday";
import getMonday from "../util/getMonday";

@Service()
export default class AppointmentService {
  constructor(
    @Inject("appointmentModel") private appointmentModel: Models.Appointment,
    @Inject("logger") private logger: _Logger
  ) {}

  public async GetAllFromCurrentWeek(
    inputUserDTO: Partial<IUserInputDTO>
  ): Promise<{ appointments: IAppointment[] }> {
    try {
      this.logger.silly("Fetching appointments from db");

      const appointmentRecord = await this.appointmentModel.findAll({
        where: {
          [Op.and]: [
            { "$timeslot.startdate$": { [Op.gte]: getMonday(new Date()) } },
            { "$timeslot.startdate$": { [Op.lte]: getFriday(new Date()) } },
          ],
          [Op.or]: [
            { userId: inputUserDTO._id },
            { "$timeslot.lesson.userId$": inputUserDTO._id },
          ],
        },
        include: this.appointmentIncludes(),
      });

      const appointments: IAppointment[] = appointmentRecord.map(
        (appointment) => appointment.toJSON() as IAppointment
      );

      return { appointments };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /**
   * Data forms
   */

  private appointmentIncludes() {
    return [
      {
        model: Timeslot,
        attributes: [],
        as: "timeslot",
        include: [
          {
            model: Lesson,
            attributes: ["userId"],
            as: "lesson",
          },
        ],
      },
    ];
  }
}
