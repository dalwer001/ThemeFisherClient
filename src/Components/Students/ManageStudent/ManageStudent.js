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
            const res = await axios.get("http://localhost:5000/students")
            setStudents(res.data);
        }
        studentData();
    }, []);


    const handleDelete = (id) => {
        const res = axios.delete(`http://localhost:5000/deleteStudent/${id}`);
        if (res) {
            reload();
            alert("Student deleted successfully");
        }
    }

    const reload =  () => {
        const load = async () =>{
            const res = await axios.get(`http://localhost:5000/students`);
        setStudents(res.data);
        }
        load();
    }

    const handleUpdate = (id) => {
        history.push(`/updateStudent/${id}`);
    }
    // const [sortConfig, setSortConfig] = React.useState(null);

    // const sortedItems = React.useMemo(() => {
    //     let sortableItems = [...students];
    //     if (sortConfig !== null) {
    //         sortableItems.sort((a, b) => {
    //             if (a[sortConfig.key] < b[sortConfig.key]) {
    //                 return sortConfig.direction === 'ascending' ? -1 : 1;
    //             }
    //             if (a[sortConfig.key] > b[sortConfig.key]) {
    //                 return sortConfig.direction === 'ascending' ? 1 : -1;
    //             }
    //             return 0;
    //         });
    //     }
    //     return sortableItems;
    // }, [students, sortConfig]);

    // const requestSort = (key) => {
    //     let direction = 'ascending';
    //     if (
    //         sortConfig &&
    //         sortConfig.key === key &&
    //         sortConfig.direction === 'ascending'
    //     ) {
    //         direction = 'descending';
    //     }
    //     setSortConfig({ key, direction });
    // };


    const [order, setOrder] = useState("ASC");
    const sorting = (col) => {
        if (order === "ASC") {
            const sort = [...students].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setStudents(sort);
            setOrder("DSC");
        }
        if (order === "DSC") {
            const sort = [...students].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setStudents(sort);
            setOrder("ASC");
        }
    };

    // const [order, setOrder] = useState(true);
    // const handleSort= (col) => {
    //     if (order === "ASC") {
    //         let sort = [...students].sort((a, b) =>
    //             a[col] > b[col]
    //         );
    //         setStudents(sort);
    //         setOrder("DSC");
    //     }
    //     if(order === "DSC")
    //     {
    //         let sort = [...students].sort((a, b) =>
    //             b[col] < a[col]
    //         );
    //         setStudents(sort);
    //         setOrder("ASC");
    //     }
    // };


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
                                <StyledTableCell align="center" onClick={() => sorting('id')}>Id</StyledTableCell>
                                <StyledTableCell align="center" onClick={() => sorting('reg')}>Registration</StyledTableCell>
                                <StyledTableCell align="center">Image</StyledTableCell>
                                <StyledTableCell align="center" onClick={() => sorting('name')}>Name</StyledTableCell>

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