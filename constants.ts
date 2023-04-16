export enum CourseCategory {
  BUILD_YOUR_OWN = "Build Your Own",
  TEXTILE_ARTS = "Textile Arts",
  CRAFTS_AND_DIY = "Crafts & DIY",
}

export const COURSE_CATEGORY_TO_COLOR: {
  [key in CourseCategory]: string;
} = {
  [CourseCategory.BUILD_YOUR_OWN]: "#FF0000",
  [CourseCategory.TEXTILE_ARTS]: "#008000",
  [CourseCategory.CRAFTS_AND_DIY]: "#40E0D0",
};


