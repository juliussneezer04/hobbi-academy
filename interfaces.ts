import { CourseCategory } from "./constants";

export interface Course {
  id: string;
  category: CourseCategory;
  title: string;
  description: string;
  courseVideoName: string;
  forumId: string;
}

export interface CourseUser {
  email: string;
  name: string;
  courses: string[];
}

export interface ForumDetails {
  id: string;
  title: string;
  messages: ForumMessage[];
}

export interface ForumMessage {
  content: string;
  author: string;
}
