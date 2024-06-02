"use client";
import { useState } from "react";
import { useCourseContext } from "../../context/coursecontext";

const TeacherCourses = () => {
  const { courses, loading, error } = useCourseContext();
  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState<number | undefined>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/course/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error("Creation failed");
      }

      setShowCreateModal(false);
      const responseData = await response.json();
      console.log(responseData);
      alert("Course created successfully");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/course/update/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, description, courseId }),
        }
      );

      if (!response.ok) {
        throw new Error("Updation failed");
      }
      const responseData = await response.json();
      console.log(responseData);
      alert("Course updated successfully");
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/course/delete/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, courseId }),
        }
      );

      if (!response.ok) {
        throw new Error("Deletion failed");
      }
      const responseData = await response.json();
      console.log(responseData);
      alert("Course deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="flex flex-col mt-10 items-center justify-center">
      <div className="flex flex-row gap-4">
        <button
          className="btn btn-success p-3"
          onClick={() => setShowCreateModal(true)}
        >
          CREATE COURSE
        </button>
        <button
          className="btn btn-info p-3"
          onClick={() => setShowUpdateModal(true)}
        >
          UPDATE COURSE
        </button>
        <button
          className="btn btn-error p-3"
          onClick={() => setShowDeleteModal(true)}
        >
          DELETE COURSE
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-2 mt-10">OUR COURSES</h1>
      <div className="flex gap-4 flex-wrap mr-4 mb-8">
        {courses.map((course, index) => (
          <div className="card mt-10 w-96 bg-blue-400 text-primary-content">
            <div className="card-body">
              <h2 className="card-title">{course.name}</h2>
              <p>{course.description}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-md z-50">
            <h2 className="text-xl font-bold mb-4">CREATE COURSE</h2>
            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label
                  htmlFor="studentId"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  NAME:
                </label>
                <input
                  type="text"
                  id="studentId"
                  value={name}
                  className="input border"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="courseId"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  DESCRIPTION:
                </label>
                <input
                  type="text"
                  id="courseId"
                  value={description}
                  className="input border"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                CREATE
              </button>
            </form>
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-0 right-0 p-2 m-2 bg-red-600 rounded"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-md z-50">
            <h2 className="text-xl font-bold mb-4">UPDATE COURSE</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label
                  htmlFor="studentId"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  COURSE ID:
                </label>
                <input
                  type="text"
                  id="courseId"
                  value={courseId}
                  className="input border"
                  onChange={(e) =>
                    setCourseId(
                      e.target.value ? parseInt(e.target.value, 10) : undefined
                    )
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="courseId"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  NAME:
                </label>
                <input
                  type="text"
                  id="courseId"
                  value={name}
                  className="input border"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="courseId"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  DESCRIPTION:
                </label>
                <input
                  type="text"
                  id="courseId"
                  value={description}
                  className="input border"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                UPDATE
              </button>
            </form>
            <button
              onClick={() => setShowUpdateModal(false)}
              className="absolute top-0 right-0 p-2 m-2 bg-red-600 rounded"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-md z-50">
            <h2 className="text-xl font-bold mb-4">DELETE COURSE</h2>
            <form onSubmit={handleDelete}>
              <div className="mb-4">
                <label
                  htmlFor="studentId"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  COURSE ID:
                </label>
                <input
                  type="text"
                  id="studentId"
                  value={courseId}
                  className="input border"
                  onChange={(e) =>
                    setCourseId(
                      e.target.value ? parseInt(e.target.value, 10) : undefined
                    )
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="courseId"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  NAME:
                </label>
                <input
                  type="text"
                  id="courseId"
                  value={name}
                  className="input border"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                DELETE
              </button>
            </form>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-0 right-0 p-2 m-2 bg-red-600 rounded"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;
