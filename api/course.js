export function getCourseListApi(query) {
  return useHttpGet("courseList", "/course/list", { query });
}

export function getCourseDetailApi(query = {}) {
  return useHttpGet("courseRead", "/course/read", { query });
}

export function getHottCourseListApi() {
  return useHttpGet("hottCourseList", "/hot");
}
