import {combineReducers} from "redux";
import loading from "./loading";
import token from "./login";
import language from './language'
import {user} from "@/components/Authorized/redux";
import {userList} from "@/pages/Acl/User/redux";
import {roleList} from "@/pages/Acl/Role/redux";
import {menuList} from "@/pages/Acl/Permission/redux";
import {chapterInfo} from '@/pages/Edu/Chapter/redux'
import {subjectInfo} from '@/pages/Edu/Subject/redux'

export default combineReducers({
  loading,
  user,
	token,
  userList,
  roleList,
	menuList,
	chapterInfo,
	subjectInfo,
	language
});
