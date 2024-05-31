"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Course {
    course_id: number;
    name: string;
    description: string;
  }
  
  interface CourseContextType {
    courses: Course[];
    loading: boolean;
    error: string | null;
    fetchCourses: () => void;
  }

  const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourseContext = (): CourseContextType => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = () => {
    setLoading(true);
    fetch("http://localhost:4000/api/course/getAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          throw new Error("Data is not an array");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading, error, fetchCourses }}>
      {children}
    </CourseContext.Provider>
  );
};