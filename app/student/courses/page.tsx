"use client";
import { useEffect, useState } from "react";
import {useCourseContext} from '../../context/coursecontext'

interface Course {
  course_id: number;
  name: string;
  description: string;
}

const StudentCourses: React.FC = () => {
  const { courses, loading, error } = useCourseContext();
  const [student_id, setstudent_id] = useState("");
  const [course_id, setcourse_id] = useState("");
  const [showModal, setShowModal] = useState(false);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const enrollmentData = {
    student_id,
    course_id,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await fetch(
        "http://localhost:4000/api/enrollment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enrollmentData),
        }
      );

      if (!response.ok) {
        throw new Error("Enrollment failed");
      }

      const responseData = await response.json()
      console.log(responseData)
      setShowModal(false)
      alert("Enrolled successfully")
    } catch (error) {
      console.error("Error while enrolling.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 mb-4">
      <h1 className="text-3xl font-bold text-center mb-4">OUR COURSES</h1>
      <p className="text-lg text-center mb-6">
        Explore a variety of courses we offer to enhance your skills and
        knowledge.
      </p>

      <div className="flex gap-4 flex-wrap">
        {courses.map((course, index) => (
          <div className="card mt-10 w-96 bg-blue-400 text-primary-content">
            <div className="card-body">
              <h2 className="card-title">{course.name}</h2>
              <p>{course.description}</p>
              <div className="card-actions justify-end">
                <button className="btn" onClick={() => setShowModal(true)}>
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-md z-50">
            <h2 className="text-xl font-bold mb-4">Enroll</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="studentId"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Student ID:
                </label>
                <input
                  type="text"
                  id="studentId"
                  className="input border"
                  onChange={(e) => setstudent_id(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="courseId"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Course ID:
                </label>
                <input
                  type="text"
                  id="courseId"
                  className="input border"
                  onChange={(e) => setcourse_id(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" >
                Enroll
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-0 right-0 p-2 m-2 bg-red-600"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
