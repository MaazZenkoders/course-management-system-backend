"use client"
import React from 'react'
import StudentCourses from './courses/page'
import Layout from './layout'

const Student : React.FC = () => {
  return (
    <div>
      <Layout>
          <StudentCourses/>
      </Layout>
    </div>
  )
}

export default Student