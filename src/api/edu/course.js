//所有课程相关的请求都在此发出
import request from "@/utils/request";

const BASE_URL = "/admin/edu/course";

// 获取课程一级分类数据(分页)
export function reqAllCourse() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}
//查询课程
export function reqSearchCourse({page=1,limit=5,teacherId,subjectId,subjectParentId,title}) {
  return request({
		url: `${BASE_URL}/${page}/${limit}`,
		params:{teacherId,subjectId,subjectParentId,title},
    method: "GET",
  });
}
// 获取所有课程一级分类数据
export function reqAllNo1Subject() {
  return request({
    url: `/admin/edu/subject`,
    method: "GET",
  });
}
// 通过一级分类id，获取该一级分类下属的二级分类
export function reqAllNo2SubjectById(parentId) {
  return request({
    url: `/admin/edu/subject/get/${parentId}`,
    method: "GET",
  });
}
