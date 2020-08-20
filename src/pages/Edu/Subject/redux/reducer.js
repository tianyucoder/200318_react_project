import {SAVE_SUBJECT_INFO} from './constants'

const initState = {total:0,items:[]}
export default function subjectReducer (preState=initState,action){
		const {type,data} = action
		switch (type) {
			case SAVE_SUBJECT_INFO:
				return data
			default:
				return preState
		}
}