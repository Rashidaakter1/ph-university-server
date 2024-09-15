import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDept/academicDept.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { CourseRoutes } from "../modules/course/course.route";
import { SemesterRegistrationRoutes } from "../modules/semesterReg/semesterReg.route";
import { OfferedCourseRoutes } from "../modules/offeredCourse/offeredCourse.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { EnrolledCourseRoutes } from "../modules/enrolledCourse/enrolledCourse.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semester",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculty",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-dept",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/faculty",
    route: FacultyRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/semester-registrations",
    route: SemesterRegistrationRoutes,
  },
  {
    path: "/offered-courses",
    route: OfferedCourseRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/enrolled-course",
    route: EnrolledCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
