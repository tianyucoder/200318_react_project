import {reqChapterByCourseId} from '@/api/edu/chapter'//引入请求接口
import {reqAllLessonByChapter} from '@/api/edu/lesson'//引入请求接口
import {GET_CHAPTER_LIST,GET_LESSON_LIST_BY_CHAPTER} from './constants'

//获取章节列表(同步action，不暴露，给异步action用)
export const getChapterListSync = (chapterInfo)=>({
	type:GET_CHAPTER_LIST,
	data:chapterInfo
})

//获取章节列表异步action，暴露，给组件用
export const getChapterList = ({page,pageSize,courseId})=>{
	return (dispatch)=>{
		//1.发请求
		reqChapterByCourseId({page,pageSize,courseId}).then(
			//2.调用同步action
			chapterInfo=> dispatch(getChapterListSync(chapterInfo))
		)
	}
}

//获取课时列表(同步action，不暴露，给异步action用)
const getLessonListByChapterSync = ({chapterId,lessonList})=>({
	type:GET_LESSON_LIST_BY_CHAPTER,
	data:{chapterId,lessonList}
})

//获取课时列表的异步action，暴露，给组件用
export const getLessonListByChapter = (chapterId)=>{
	return (dispatch)=>{
		//1.发请求
		reqAllLessonByChapter(chapterId).then(
			//2.调用同步action
			lessonList => dispatch(getLessonListByChapterSync({lessonList,chapterId}))
		)
	}
}