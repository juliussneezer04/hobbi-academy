import { Course, ForumDetails, ForumMessage } from "@/interfaces";
import { initializeApp } from "firebase/app";
import {
  User,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  arrayUnion,
  getDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  Unsubscribe,
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

// Initialize Firebase Auth
const auth = getAuth(app);

// Auth
export async function loginUser(
  email: string,
  password: string
): Promise<User> {
  // Check if user exists
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString) as User;
    return user;
  } else {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    localStorage.setItem("user", JSON.stringify(userCredential.user));
    return userCredential.user;
  }
}

export async function createUser(
  email: string,
  password: string
): Promise<User> {
  // Check if user exists
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString) as User;
    return user;
  } else {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    localStorage.setItem("user", JSON.stringify(userCredential.user));
    const collectionRef = collection(db, "users");
    await addDoc(collectionRef, {
      courses: [],
    });
    return userCredential.user;
  }
}

// DB
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

export async function getCourses(
  courseIds: string[]
): Promise<Course[] | never[]> {
  const results = await Promise.allSettled(
    courseIds.map(async (courseId) => {
      const courseDocRef = doc(db, "courses", courseId);
      const courseDoc = await getDoc(courseDocRef);
      if (courseDoc.exists()) {
        const data = { ...(courseDoc.data() as Course), id: courseId };
        return data;
      } else {
        return null;
      }
    })
  )
    .then((results) => {
      return results
        .map((result) => {
          if (result.status === "fulfilled") {
            const course = result.value as Course;
            return course;
          } else {
            return null;
          }
        })
        .filter((course) => course && course !== null) as Course[];
    })
    .catch((error) => {
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
};

/**
 * Returns courses that the user is enrolled in.
 */
export async function getUserCourses(
  userId: string
): Promise<Course[]> {
  const userCoursesDocRef = doc(db, "users", userId);
  const userCourseDoc = await getDoc(userCoursesDocRef);
  if (userCourseDoc.exists()) {
    const courseIds = userCourseDoc.data().courses as string[];
    const courses = await getCourses(courseIds);
    return courses;
  } else {
    return [];
  }
}

export async function getUserForums(userId: string) {
  const courses = await getUserCourses(userId);
  if (!courses) {
    return [];
  }
  const forumIds = courses.map((course) => course.forumId);
  const forums = await Promise.allSettled(
    forumIds.map((forumId) => {
      return getForumMessages(forumId);
    })
  ).then(
    (results) =>
      results
        .map((result) => (result.status === "fulfilled" ? result.value : null))
        .filter((forum) => forum !== null) as ForumDetails[]
  );

  return forums;
}

export async function getForumMessages(forumId: string): Promise<ForumDetails> {
  const forumDetailsDocRef = doc(db, "forums", forumId);
  const forumDetailsDocsSnapshot = await getDoc(forumDetailsDocRef);
  const forumDetails = forumDetailsDocsSnapshot.data() as { title: string };
  const forumMessagesDocsSnapshot = collection(
    db,
    "forums",
    forumId,
    "messages"
  );
  const messagesSnapshot = await getDocs(forumMessagesDocsSnapshot);
  const messages = messagesSnapshot.docs.map((doc) => {
    const data = doc.data() as ForumMessage;
    return data;
  });

  return {
    ...forumDetails,
    id: forumId,
    messages,
  };
}

export function subscribeToForum(
  forumId: string,
  callbackFn: (snapshot: QuerySnapshot<DocumentData>) => void
): Unsubscribe {
  const q = query(collection(db, "forums", forumId, "messages"));
  return onSnapshot(q, callbackFn);
}

export async function addForumMessage(forumId: string, message: ForumMessage) {
  const forumMessagesDocsSnapshot = collection(
    db,
    "forums",
    forumId,
    "messages"
  );
  await addDoc(forumMessagesDocsSnapshot, message);
}
