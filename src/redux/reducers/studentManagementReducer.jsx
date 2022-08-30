const stateDefault = {
  arrStudent: [
    {
      id: "6",
      name: "An",
      phoneNumber: "9049999",
      email: "annguyen@gmail.com",
    },
    {
      id: "7",
      name: "Gấm",
      phoneNumber: "0947791696",
      email: "gamnguyen@gmail.com",
    },
  ],
  studentEdit: {
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
  },
  studentSearch: [
    
  ],
};

export const studentManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "CREATE_STUDENT": {
      let { newArrStudent } = action.payload;
      let newArr = [...state.arrStudent];
      newArr.push(newArrStudent);
      console.log(newArr);
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
    case "UPDATE_STUDENT": {
      let { studentInfo } = action.payload;
      let newStudent = [...state.arrStudent];
      let index = newStudent.findIndex(
        (student) => student.id === studentInfo.id
      );
      newStudent[index] = studentInfo;
      state.arrStudent = newStudent;
      return { ...state };
    }
    case "SEARCH": {
      let { arrResult } = action;
      let arrSearch = [...state.studentSearch];
      arrSearch = arrResult;
      state.studentSearch = arrSearch
      return { ...state };
    }
    default:
      return state;
  }
};
