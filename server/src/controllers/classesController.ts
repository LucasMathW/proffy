import {Request, Response} from 'express'

import db from "../database/connections";
import convertyHourToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;  
}

export default class classesController {
    async index(req:Request, res:Response){

        console.log(req.query);
      
      const filters = req.query;

      const week_day = filters.week_day as string;
      const subject = filters.subject as string;
      const time = filters.time as string;
      
      if(!filters.week_day || !filters.subject || !filters.time){
          return res.status(400).json({
              error: "Missing  filters to search classes"
          })
      }

      const timesInMinutes = convertyHourToMinutes(time)

      const classes = await db('classes')
        .whereExists(
            function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [ Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timesInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timesInMinutes])
                })
        .where('classes.subject', '=',  subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);

        
        
        return res.json(classes);
 
    } 

    async create(req:Request, res:Response) {
        const {
            name,
            avatar,
            whatsApp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
    
        const trx = await db.transaction();
    
        try{
            const insertedUserIds = await trx('users').insert({
                name,
                avatar,
                whatsApp,
                bio
           });
       
           const user_id = insertedUserIds[0]
       
           const insertedClassesIds = await trx('classes').insert({
               subject,
               cost,
               user_id,
           });
       
           const class_id  = insertedClassesIds[0]
       
           const classSchedule = schedule.map((scheduleItem: ScheduleItem) =>{
               return{
                   class_id,
                   week_day: scheduleItem.week_day,
                   from: convertyHourToMinutes(scheduleItem.from),
                   to: convertyHourToMinutes(scheduleItem.to)
               }
           }) 
        
            await trx('class_schedule').insert(classSchedule)
       
            await trx.commit();
    
            return res.status(201).send();

        }catch(err){
    
            await trx.rollback();
            return res.status(400).json({
                error: "Unexpected error while creating new class"
            });
        }
    }

}