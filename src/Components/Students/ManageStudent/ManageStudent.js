import React from 'react';
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import "./ManageStudent.css";
import { Form, FormControl } from 'react-bootstrap';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';



const StyledTableCell = withStyles((theme) => ({
    head: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const ManageStudent = () => {

    const classes = useStyles();
    const history = useHistory();

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const studentData = async () => {
            const res = await axios.get("https://sheltered-meadow-35142.herokuapp.com/students")
            setStudents(res.data);
        }
        studentData();
    }, []);

    const handleDelete = async(id) => {
        const res = await axios.delete(`https://sheltered-meadow-35142.herokuapp.com/deleteStudent/${id}`);
        if (res) {
            reload();
            alert("Student deleted successfully");
        }
    }

    const reload = () => {
        const load = async () => {
            const res = await axios.get(`https://sheltered-meadow-35142.herokuapp.com/students`);
            setStudents(res.data);
        }
        load();
    }

    const handleUpdate = (id) => {
        history.push(`/updateStudent/${id}`);
    }


    const [nameOrder, setNameOrder] = useState("ASC");
    const sortName = (col) => {
        if (nameOrder === "ASC") {
            const sort = [...students].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setStudents(sort);
            setNameOrder("DSC");
        }
        if (nameOrder === "DSC") {
            const sort = [...students].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setStudents(sort);
            setNameOrder("ASC");
        }
    };

    const [idOrder, setIdorder] = useState("ASC");
    const sortId = () => {
        if (idOrder === "ASC") {
            const sort = [...students].sort((a, b) =>
                (a === b ? 0 : a < b ? -1 : 1) * (a > b ? 1 : -1));
            setStudents(sort);
            setIdorder("DSC");
        }
        if (idOrder === "DSC") {
            const sort = [...students].sort((a, b) =>
                (a === b ? 0 : a > b ? -1 : 1) * (a < b ? 1 : -1));
            setStudents(sort);
            setIdorder("ASC");
        }
    }

    const [regOrder, setRegorder] = useState("ASC");
    const sortReg = () => {
        if (regOrder === "ASC") {
            const sort = [...students].sort((a, b) =>
                (a === b ? 0 : a < b ? -1 : 1) * (a > b ? 1 : -1));
            setStudents(sort);
            setRegorder("DSC");
        }
        if (regOrder === "DSC") {
            const sort = [...students].sort((a, b) =>
                (a === b ? 0 : a > b ? -1 : 1) * (a < b ? 1 : -1));
            setStudents(sort);
            setRegorder("ASC");
        }
    }



    return (
        <section>
            <div className='container'>
                <div className="p-5">
                    <h1 className="fw-bold text-center">Student List</h1>
                    <Form className="d-flex my-2 col-md-3">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="search-button "
                            aria-label="Search"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        {/* <button className="btn btn-outline-info mx-2">Search</button> */}
                    </Form>
                    <Table className={classes.table} aria-label="customized table" className="shadow">
                        <TableHead style={{ backgroundColor: "#0B4C61" }}>
                            <TableRow>
                                <StyledTableCell align="center" onClick={() => sortId('id')}>Id {idOrder === 'DSC' ? <ArrowUpwardIcon className="text-white" /> : <ArrowDownwardIcon className="text-white" />} </StyledTableCell>
                                <StyledTableCell align="center" onClick={() => sortReg('reg')}>Registration {regOrder === 'DSC' ? <ArrowUpwardIcon className="text-white" /> : <ArrowDownwardIcon className="text-white" />} </StyledTableCell>
                                <StyledTableCell align="center">Image</StyledTableCell>
                                <StyledTableCell align="center" onClick={() => sortName('name')}>Name {nameOrder === 'DSC' ? <ArrowUpwardIcon className="text-white" /> : <ArrowDownwardIcon className="text-white" />} </StyledTableCell>

                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.filter((value) => {
                                if (search === "") {
                                    return value;
                                } else if (
                                    value.name.toLowerCase().includes(search.toLowerCase()) ||
                                    value.reg.toLowerCase().includes(search.toLowerCase()) ||
                                    value.id.toLowerCase().includes(search.toLowerCase())
                                ) {
                                    return value;
                                }
                            })
                                .map((student) => (
                                    <StyledTableRow key={student.name}>
                                        <StyledTableCell align="center">{student.id}</StyledTableCell>
                                        <StyledTableCell align="center">{student.reg}</StyledTableCell>
                                        <StyledTableCell align="center" scope="row">
                                            <img
                                                style={{ width: "5rem", height: "5rem" }}
                                                src={student.image}
                                                alt=""
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{student.name}</StyledTableCell>

                                        <StyledTableCell align="center">
                                            <button className=" btn update-button fw-bold mx-2" onClick={() => handleUpdate(student._id)} >Edit</button>
                                            <button className=" btn  delete-button fw-bold mx-2" onClick={() => handleDelete(student._id)}>delete</button>
                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section>
    );
};

export default ManageStudent;