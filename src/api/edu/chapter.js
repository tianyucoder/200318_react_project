//所有章节相关的请求都在此发出
import request from "@/utils/request";

const BASE_URL = "/admin/edu/chapter";


// 获取某课程对应的章节信息(分页)
export function reqChapterByCourseId({page,pageSize,courseId}) {
  return request({
		url: `${BASE_URL}/${page}/${pageSize}`,
		params:{courseId},
    method: "GET",
  });
}
// 批量删除章节数据
export function reqBatchRemoveChapter(idList) {
  return request({
		url: `${BASE_URL}/batchRemove`,
		data:{idList},
    method: "DELETE",
  });
}
