import { Course, ForumMessage } from "@/interfaces";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  where,
  getDoc,
  doc,
  collection,
  getDocs
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

export async function getUserCourses(userId: string): Promise<Course[]> {
  const courseQuery = query(collection(db, "courses"), where("usersEnrolled", "array-contains", userId));
  const courseDocsSnapshot = await getDocs(courseQuery);
  const courses: Course[] = [];
  courseDocsSnapshot.forEach((doc) => {
    const data = doc.data() as Course;
    courses.push(data);
  });
  return courses;
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
