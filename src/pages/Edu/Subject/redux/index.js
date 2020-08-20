//该文件就是想对action和reducer进行一次统一的汇总
//以后无论是需要action还是reducer均到此来取
import subjectInfo from './reducer'
import {saveSubjectInfo} from './action'

export {subjectInfo,saveSubjectInfo}