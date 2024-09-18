import { Course } from "../../course/entities/course.entity";

export const getClassesNumInCourse = async (classCourses:Course, class_id:number) =>{
    let numClassesInCourse = 0;
    let countClasses = 1;
    let numClassInCourse = 0
    for(let i=0; i < classCourses["sections"].length; i++){
        const classesInSection = await classCourses["sections"][i]["classes"]
        numClassesInCourse += classesInSection.length
        for(let j=0; j < classesInSection.length; j++){
            if(class_id === classesInSection[j].id)numClassInCourse=countClasses
            countClasses++
        }
    }
    // console.log(`course with id ${classCourses["id"]} has ${numClassesInCourse} classes`)
    // console.log(`The class with id ${class_id} is the class #${numClassInCourse}`)
    return {numClassInCourse, numClassesInCourse}
}