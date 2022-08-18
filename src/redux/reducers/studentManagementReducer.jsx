const stateDefault = {
  studentInfo: {
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
  },
  errors: {
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
  },
  arrStudent: [
    {
      id: "6",
      name: "An",
      phoneNumber: "9049999",
      email: "annguyen@gmail.com",
    },
  ],
  studentEdit: {
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
  },
};

export const studentManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "HANDLE_CHANGE": {
      let { id, value, dataType } = action.payload;

      let newValue = { ...state.studentInfo };
      newValue[id] = value;
      let newErrors = { ...state.errors };
      let mess = "";
      if (value.trim() === "") {
        mess = id + " không được bỏ trống";
      } else {
        if (dataType === "name") {
          let regexName =
            /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
          if (!regexName.test(value)) {
            mess = id + " không đúng định dạng, vui lòng thử lại";
          }
        }
        if (dataType === "number") {
          let regexNumber = /^\d+$/;
          if (!regexNumber.test(value)) {
            mess = id + " không đúng định dạng, vui lòng thử lại";
          }
        }
        if (dataType === "email") {
          let regexEmail =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!regexEmail.test(value)) {
            mess = id + " không đúng định dạng, vui lòng thử lại";
          }
        }
      }
      newErrors[id] = mess;
      state.studentInfo = newValue;
      state.errors = newErrors;
      return { ...state };
    }
    case "HANDLE_SUBMIT": {
      let { errors } = action.payload;
      let newErrors = { ...state.errors };
      newErrors = errors;
      state.errors = newErrors;
      return { ...state };
    }
    case "CREATE_STUDENT": {
      let { newArrStudent } = action.payload;
      let newArr = [...state.arrStudent];
      newArr.push(newArrStudent);
      state.arrStudent = newArr;
      return { ...state };
    }
    case "DELETE_STUDENT": {
      let { id } = action.payload;
      let newArrStudent = [...state.arrStudent];
      let newArr = newArrStudent.filter((student) => student.id !== id);
      state.arrStudent = newArr;
      return { ...state };
    }
    case "EDIT_STUDENT": {
      let { student } = action.payload;
      let newEdit = { ...state.studentEdit };
      newEdit = student;
      state.studentEdit = newEdit;
      return { ...state };
    }
    // case "HANDLE_LIFECYCLE":{
    //   let {studentInfo} = action.payload;
    //   let newEdit = {...state.studentInfo}
    //   newEdit = studentInfo;
    //   state.studentInfo = newEdit;
    //   return {...state}
    // }
    default:
      return state;
  }
};
