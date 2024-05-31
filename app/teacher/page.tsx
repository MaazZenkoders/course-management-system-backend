import React from 'react'
import Layout from './layout'
import TeacherCourses from './courses/page'
import { CourseProvider } from '../context/coursecontext'

const Teacher = () => {
  return (
    <div>
      <CourseProvider>
      <TeacherCourses/>
    </CourseProvider>
    </div>
  )
}

export default Teacher