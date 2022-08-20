import React, { Component } from "react";
import { connect } from "react-redux";
import FormStudent from "./FormStudent";
import TableReact from "./TableReact";

class StudentManagement extends Component {
  state = {
    studentInfo: {
      id: "",
      name: "",
      phoneNumber: "",
      email: "",
    },
    studentEdit: {
      id: "",
      name: "",
      phoneNumber: "",
      email: "",
    },
  };
  render() {
    return (
      <div className="container">
        <h3>Quản lý sinh viên</h3>
        <div className="mb-4">
          <FormStudent />
        </div>
        <TableReact />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(StudentManagement);
