class CoursePurchasesService {
  // async create(createCoursePurchaseDto: CreateCoursePurchaseDto) {
  //   return await requestAPI.post(
  //     `${APP_API.coursePurchases}`,
  //     createCoursePurchaseDto,
  //   );
  // }
  // async getMany(params: FindManyCoursesDto = {}): Promise<CourseData[]> {
  //   return await requestAPI.get<CourseData[]>('/courses', {
  //     params,
  //   });
  // }
  // async count(params: FindAllCoursesDto = {}) {
  //   return await requestAPI.get<number>('/courses/count', {
  //     params,
  //   });
  // }
  // async getOneById(
  //   id: number,
  //   params: FindOneCourseDto = {},
  // ): Promise<CourseData> {
  //   return await requestAPI.get<CourseData>(`/courses/${id}`, { params });
  // }
  // async updateOne(id: number, values: UpdateCourseDto) {
  //   const { ...updateOptions } = values;
  //   await requestAPI.patch(`/courses/${id}`, updateOptions);
  // }
}

export const coursePurchasesService = new CoursePurchasesService();
