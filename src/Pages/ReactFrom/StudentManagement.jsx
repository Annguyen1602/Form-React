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
       
  
    <form className="d-flex my-2 my-lg-0 w-75">
      <input className="form-control me-sm-2 mb-2" type="text" placeholder="Search" onChange={(e)=>{
        let {value} = e.target;
        let arrSearch ='';
        arrSearch = this.props.arrStudent.forEach(student=>{
          return student.name;
        })
        console.log(arrSearch);
        


      }}/>
      <button className="btn btn-outline-success mb-2 " type="submit">Search</button>
    </form>
  


        <TableReact />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrStudent:state.studentManagementReducer.arrStudent
});

export default connect(mapStateToProps)(StudentManagement);
