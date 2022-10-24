import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import {CreateCourseDto} from './dto/create-course.dto'

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  
  @Get('/getCourse')
  async getCourse (){
   return await this.courseService.getCourse()
  }

  @Get('/getCourse/:id')
  async getCoursebyID (
    @Param('id', ParseUUIDPipe) id : string
  ){
    console.log("id------>",id)
    return await this.courseService.getCoursebyID(id)
  }

  @Post('/postCourse')
  async postcourse(
    @Body() createCourseDto:CreateCourseDto
  ){
    return await this.courseService.postcourse(createCourseDto)
  }



  @Delete('/deleteCourse/:id')
  async deleteOne (
    @Param('id', ParseUUIDPipe) id : string
  ){
    console.log("id------>",id)
    return await this.courseService.deleteOne(id)
  }









}

