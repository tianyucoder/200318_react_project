import { CHANGE_LANGUAGE } from "../constants/language";

const initState = 'zh_CN';
export default function loading(prevState = initState, action) {
	const {type,data} = action
  switch (type) {
    case CHANGE_LANGUAGE:
      return data;
    default:
      return prevState;
  }
}
