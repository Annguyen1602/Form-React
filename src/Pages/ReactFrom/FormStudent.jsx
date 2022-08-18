import React, { Component } from "react";
import { connect } from "react-redux";

class FormStudent extends Component {
  

  handleChange = (e) => {
    
    const action = {
      type: "HANDLE_CHANGE",
      payload: {
        id: e.target.id,
        value: e.target.value,
        dataType: e.target.getAttribute("data-type"),
      },
    };
    this.props.dispatch(action);
  };
  createStudent = (newArrStudent) => {
    const action = {
      type: "CREATE_STUDENT",
      payload: {
        newArrStudent,
      },
    };
    this.props.dispatch(action);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { studentInfo, errors } = this.props.studentInfo;
    let valid = true;
    for (let key in errors) {
      if (errors[key] !== "") {
        valid = false;
        break;
      }
    }
    for (let key in studentInfo) {
      if (studentInfo[key] === "") {
        errors[key] = key + " không được bỏ trống";
        valid = false;
      }
    }
    if (!valid) {
      alert("Dữ liệu không hợp lệ");
      const action = {
        type: "HANDLE_SUBMIT",
        payload: {
          errors,
        },
      };
      this.props.dispatch(action);
      return;
    }
    this.createStudent(studentInfo);
    alert("Tạo sinh viên thành công");
  };

//  componentWillReceiveProps(newProps){
//   console.log(newProps);
//   const action ={
//     type:"HANDLE_LIFECYCLE",
//     payload:{
//       studentInfo:newProps.studentEdit
//     }
//   }
//   this.props.dispatch(action)
  

//  }
// static getDerivedStateFromProps(newProps,currentState){
//   console.log(newProps);
//   console.log(currentState);
//   return newProps
// }

  render() {
    let { id, name, phoneNumber, email } = this.props.studentErrors;

    return (
      <div>
        <form className="card" onSubmit={this.handleSubmit}>
          <div
            className="card-header bg-dark text-light"
            style={{ fontSize: 20, fontWeight: "bold" }}
          >
            Thông tin sinh viên
          </div>
          <div className="card-body row">
            <div className="col-6">
              <div className="form-group">
                <p>Mã Sinh Viên</p>
                <input
                  value={this.props.studentEdit.id}
                  data-type="id"
                  id="id"
                  name="id"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <p className="text-danger">{id}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <p>Họ tên</p>
                <input
                  value={this.props.studentEdit.name}
                  data-type="name"
                  id="name"
                  name="id"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <p className="text-danger">{name}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <p>Số điện thoại</p>
                <input
                  value={this.props.studentEdit.phoneNumber}
                  data-type="number"
                  id="phoneNumber"
                  name="id"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <p className="text-danger">{phoneNumber}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <p>Email</p>
                <input
                  value={this.props.studentEdit.email}
                  data-type="email"
                  id="email"
                  name="id"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <p className="text-danger">{email}</p>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-success">
              Thêm sinh viên
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  studentErrors: state.studentManagementReducer.errors,
  studentInfo:state.studentManagementReducer.studentInfo,
  studentEdit: state.studentManagementReducer.studentEdit,
  
});

export default connect(mapStateToProps)(FormStudent);
