import { CourseCategory } from "./constants";

export interface Course {
  category: CourseCategory;
  title: string;
  description: string;
  courseVideoName: string;
}

export interface CourseUser {
  email: string;
  name: string;
  courses: string[];
}

export interface ForumMessage {
  forumId: string;
  id: string;
  message: string;
  authorId: string;
  timestamp: Date;
}
