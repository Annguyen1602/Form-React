import React, { Component } from "react";
import { connect } from "react-redux";

class TableReact extends Component {

  renderTable = ()=>{
    
    let table = '';
    if(this.props.studentSearch.length === 0){
      table = this.props.arrStudent.map((student, index) => {
        return (
          <tr key={index}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.phoneNumber}</td>
            <td>{student.email}</td>
            <td>
              <button
                className="btn btn-danger me-2"
                onClick={() => {
                  const action = {
                    type: "DELETE_STUDENT",
                    payload: {
                      id: student.id,
                    },
                  };
                  this.props.dispatch(action);
                }}
              >
                Xoá
              </button>
              <button
                className="btn btn-info text-light"
                onClick={() => {
                  const action = {
                    type: "EDIT_STUDENT",
                    payload: {
                      student: student,
                    },
                  };
                  this.props.dispatch(action);
                }}
              >
                Chỉnh sửa
              </button>
            </td>
          </tr>
        );
      })
      
    }else{
      table = this.props.studentSearch.map((student, index) => {
      return (
        <tr key={index}>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.phoneNumber}</td>
          <td>{student.email}</td>
          <td>
            <button
              className="btn btn-danger me-2"
              onClick={() => {
                const action = {
                  type: "DELETE_STUDENT",
                  payload: {
                    id: student.id,
                  },
                };
                this.props.dispatch(action);
              }}
            >
              Xoá
            </button>
            <button
              className="btn btn-info text-light"
              onClick={() => {
                const action = {
                  type: "EDIT_STUDENT",
                  payload: {
                    student: student,
                  },
                };
                this.props.dispatch(action);
              }}
            >
              Chỉnh sửa
            </button>
          </td>
        </tr>
      );
    })}
    
return table
  }
  render() {
    return (
      <div className="card">
        <div
          className="card-header bg-dark text-light"
          style={{ fontSize: 20, fontWeight: "bold" }}
        >
          Bảng dữ liệu
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.renderTable()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrStudent: state.studentManagementReducer.arrStudent,
  studentSearch:state.studentManagementReducer.studentSearch,
});

export default connect(mapStateToProps)(TableReact);
