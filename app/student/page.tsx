"use client"
import React from 'react'
import StudentCourses from './courses/page'
import Layout from './layout'
import { CourseProvider } from '../context/coursecontext'

const Student : React.FC = () => {
  return (
    <div>
      <CourseProvider>
          <StudentCourses/>
      </CourseProvider>
    </div>
  )
}

export default Student