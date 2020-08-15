//所有课时相关的请求都在此发出
import request from "@/utils/request";

const BASE_URL = "/admin/edu/lesson";

// 获取某章节下属所有的课时列表
export function reqAllLessonByChapter(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  });
}
// 给某个章节添加课时
export function reqAddLesson({chapterId,title,free,video}) {
  return request({
		url: `${BASE_URL}/save`,
		data:{chapterId,title,free,video},
    method: "POST",
  });
}

//批量删除课时数据
export function reqBatchRemoveLesson(idList) {
  return request({
		url: `${BASE_URL}/batchRemove`,
		data:{idList},
    method: "DELETE",
  });
}
