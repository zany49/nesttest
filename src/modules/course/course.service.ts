import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course} from '../../entities/course.entity'
import {CourseRepository} from '../../repository/course.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { getManager } from 'typeorm';
@Injectable()
export class CourseService {


    constructor(
        @InjectRepository(CourseRepository)
        private readonly courseRepository:CourseRepository
    ){}

    async getCourse(){
        try{
             const entitymanager = getManager()
            console.log("im here")
            const data = await entitymanager.query('select * from course c ')
            console.log("im here",data)
            return  {
                statusCode: 200,
                data
            }

        }catch(err){
            console.log("gfet course error--->",err)
            return {
                error: err,
                message: "Error on getting course"
            }
        }
    }


    async getCoursebyID(id){
        try{    
            console.log("im here",id)
            // const entitymanager = getManager()
            // const data = await entitymanager.query(`select * from course c where id =${id}`)
            const data = await this.courseRepository.findByIds(id)
            console.log("im here",data)
            return  {
                statusCode: 200,
                data
            }

        }catch(err){
            console.log("err get by id",err)
            return {
                error: err,
                message: "Error on getting course by"
            }
        }
    }

    async postcourse(createCourseDto:CreateCourseDto){
        try{
            // const entitymanager = getManager()
            const course = new Course()
            const {
                course_title,course_discription,course_price
            } = createCourseDto

            course.course_title = course_title,
            course.course_discription = course_discription,
            course.course_price = course_price

            const data = await this.courseRepository.save(course)
            console.log(data)
            return { 
                status : 200,
                data 
            }
        }catch(err){
                return {
                    error: err,
                    message: "Error on saving course"
                }

        }
    }


    async deleteOne(id){
        try{

            const entitymanager = getManager()
            console.log("im here")
            // const data = await entitymanager.query('select * from course c ')
            const data = await this.courseRepository.delete(id)
            console.log("im here",data)
            return  {
                message: "course deleted successfully"
            }
        }catch(err){

            console.log("err from deleteOne",err)
            return  {
                message: "Error while deleting course"

            }
        } 
    }





}
