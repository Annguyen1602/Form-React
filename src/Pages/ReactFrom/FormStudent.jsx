import React, { Component } from "react";
import { connect } from "react-redux";

class FormStudent extends Component {
  state = {
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
  };

  handleChange = (e) => {
    let { id, value } = e.target;
    let dataType = e.target.getAttribute("data-type");
    let newValue = { ...this.state.studentInfo };
    newValue[id] = value;
    let newErrors = { ...this.state.errors };
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
    this.setState({
      studentInfo: newValue,
      errors: newErrors,
    });
  };
  createStudent = (newArrStudent) => {
    const action = {
      type: "CREATE_STUDENT",
      payload: {
        newArrStudent: newArrStudent,
      },
    };
    this.props.dispatch(action);
    
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { studentInfo, errors } = this.state;
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
      this.setState({
        errors: errors,
      });
      return;
    }
    this.createStudent(studentInfo);
    alert("Tạo sinh viên thành công");
    
    
    
  };

  // static getDerivedStateFromProps(newProps, currentState) {
  //   if (newProps.studentEdit.id !== currentState.studentInfo.id) {
  //     currentState.studentInfo = newProps.studentEdit
  //   }
  //   return null;
  // }
  componentWillReceiveProps(newProps) {
    this.setState({
      studentInfo: newProps.studentEdit,
    });
  }

  render() {
    let { id, name, phoneNumber, email } = this.state.errors;

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
                  value={this.state.studentInfo.id}
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
                  value={this.state.studentInfo.name}
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
                  value={this.state.studentInfo.phoneNumber}
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
                  value={this.state.studentInfo.email}
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
            <button
              type="button"
              className="btn btn-danger ms-2"
              onClick={() => {
                const action = {
                  type: "UPDATE_STUDENT",
                  payload: {
                    studentInfo: this.state.studentInfo,
                  },
                };
                this.props.dispatch(action);
              }}
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  studentEdit: state.studentManagementReducer.studentEdit,
});

export default connect(mapStateToProps)(FormStudent);
