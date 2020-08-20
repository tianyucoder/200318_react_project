import { SAVE_SUBJECT_INFO } from "./constants";

export const saveSubjectInfo = subjectInfo => ({
  type: SAVE_SUBJECT_INFO,
  data: subjectInfo
});
