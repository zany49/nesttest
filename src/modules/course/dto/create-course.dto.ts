import {IsNotEmpty, IsString} from 'class-validator'



export class CreateCourseDto {
    @IsNotEmpty()
    @IsString()
    course_title: string;

    @IsNotEmpty()
    @IsString()
    course_discription: string;

    @IsNotEmpty()
    @IsString()
    course_price: string;
}