import { Course } from "../../course/entities/course.entity";

interface IgetClassesNumInCours {
    numClassInCourse: number, numClassesInCourse: number
}

export const getClassesNumInCourse = async (classCourses: Course, class_id?: number | undefined): Promise<IgetClassesNumInCours> => {
    let numClassesInCourse = 0;
    let countClasses = 1;
    let numClassInCourse = 0
    for (let i = 0; i < classCourses["sections"].length; i++) {
        const classesInSection = await classCourses["sections"][i]["classes"]
        numClassesInCourse += classesInSection.length
        for (let j = 0; j < classesInSection.length; j++) {
            if (class_id && class_id === classesInSection[j].id) numClassInCourse = countClasses
            countClasses++
        }
    }

    return { numClassInCourse, numClassesInCourse }
}