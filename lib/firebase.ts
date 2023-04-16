import { Course, ForumMessage } from "@/interfaces";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  arrayUnion,
  getDoc,
  doc,
  collection,
  getDocs,
  updateDoc
} from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "hobbi-academy.firebaseapp.com",
  projectId: "hobbi-academy",
  storageBucket: "hobbi-academy.appspot.com",
  messagingSenderId: "848566576098",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export async function getCourse(courseId: string): Promise<Course | null> {
  const courseDocRef = doc(db, "courses", courseId);
  const courseDoc = await getDoc(courseDocRef);
  if (courseDoc.exists()) {
    const data = courseDoc.data() as Course;
    return data;
  } else {
    return null;
  }
}

export async function getCourses(courseIds: string[]): Promise<Course[] | never[]> {
  const results = await Promise.allSettled(courseIds.map(async (courseId) => {
    const courseDocRef = doc(db, "courses", courseId);
    const courseDoc = await getDoc(courseDocRef);
    if (courseDoc.exists()) {
      const data = { ...courseDoc.data() as Course, id: courseId };
      return data;
    } else {
      return null;
    }
  })).then((results) => {
    return results.map((result) => {
      if (result.status === "fulfilled") {
        const course = result.value as Course;
        return course;
      } else {
        return null;
      }
    }).filter(course => course && course !== null) as Course[];
  }).catch((error) => {
    console.error(error);
    return [];
  });

  return results;
}

export const enrollInCourse = async (userId: string, courseId: string) => {
  const userCoursesDocRef = doc(db, "users", userId);
  await updateDoc(userCoursesDocRef, {
    courses: arrayUnion(courseId),
  });
}

/**
 * Returns courses that the user is enrolled in.
 */
export async function getUserCourses(userId: string): Promise<Course[] | never[]> {
  const userCoursesDocRef = doc(db, "users", userId);
  const userCourseDoc = await getDoc(userCoursesDocRef);
  if (userCourseDoc.exists()) {
    const courseIds = userCourseDoc.data() as string[];
    const courses = await getCourses(courseIds);
    return courses;
  } else {
    return [];
  }
}

export async function getForumMessages(forumId: string): Promise<ForumMessage[]> {
  const forumMessagesDocRef = collection(db, "forums", forumId);
  const forumMessagesDocsSnapshot = await getDocs(forumMessagesDocRef);
  const messages: ForumMessage[] = [];
  forumMessagesDocsSnapshot.forEach((doc) => {
    const data = doc.data() as ForumMessage;
    messages.push(data);
  });
  return messages;
}
