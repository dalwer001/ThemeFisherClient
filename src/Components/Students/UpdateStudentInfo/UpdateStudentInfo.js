import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './UpdateStudentInfo.css';

const UpdateStudentInfo = () => {
    const [imageURL, setImageURL] = useState(null);
    const [imageStatus, setImageStatus] = useState();
    const [dataStatus, setDataStatus] = useState(false);
    const [name, setName] = useState("");
    const [reg, setReg] = useState("");
    const [studentId, setStudentId] = useState("");
    const [studentInfo, setStudentInfo] = useState([]);
    const [image, setImage] = useState('');

    const { id } = useParams();
    const history = useHistory();


    useEffect(() => {
        const loadData = async () => {
            const res = await axios.get(`https://sheltered-meadow-35142.herokuapp.com/updateStudent/${id}`)
            setStudentInfo(res.data);
        }
        loadData();
    }, [id]);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleReg = (e) => {
        setReg(e.target.value);
    };

    const handleId = (e) => {
        setStudentId(e.target.value);
    };
    const handleImage = () => {
        setImage(imageURL || studentInfo.image);
    }
    const handleStudentClick = async (id) => {
        const updateStudent = {
            id,
            name: name || studentInfo.name,
            reg: reg || studentInfo.reg,
            studentId: studentId || studentInfo.id,
            image: imageURL || studentInfo.image
        };
        const res = await axios.patch(`https://sheltered-meadow-35142.herokuapp.com/updateStudentInfo/${id}`, updateStudent)
        if (res) {
            setDataStatus(res);
            alert("Student information Updated");
            history.push("/manageStudent");
        }
    };
    const handleImageUpload = async (e) => {
        const imageData = new FormData();
        imageData.set("key", "798ea45a777a4ccd52f1701860227c6b");
        imageData.append("image", e.target.files[0]);

        axios
            .post("https://api.imgbb.com/1/upload", imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
                setImageStatus(true);
                if (response) {
                    alert("Image Uploaded Successfully");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleStudentInfoSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section>
            <div className='container'>
                <div className="col-sm-12 col-md-12 col-lg-12 m-5">
                    <form class="row g-3 p-5 contact-form" onSubmit={handleStudentInfoSubmit}>
                        <h1 className="section-header text-center fw-bolder text-primary">Update Student</h1>
                        <div class="col-md-12">
                            <label className="fw-bold my-2">Upload Image</label>
                            <input type="file" class="form-control border-0" onChange={handleImageUpload} onBlur={handleImage} defaultValue={studentInfo.image} id="inputEmail4" placeholder="Upload your photo"/>
                            <div className="p-2">
                                <img src={studentInfo.image} alt="student_img" className="student_image" />
                            </div>
                        </div>
                        <div class="col-12">
                            <label className="fw-bold my-2">Name</label>
                            <input type="text" name="name" class="form-control border-0"
                                defaultValue={studentInfo.name} id="name" onBlur={handleName} pattern="^[a-zA-Z]*$" placeholder="Enter Name" required />
                        </div>
                        <div class="col-md-12">
                            <label className="fw-bold my-2">Id</label>
                            <input type="text" name="studentId" class="form-control border-0"
                                defaultValue={studentInfo.id} onBlur={handleId} id="inputEmail4" placeholder="Enter ID" min={0} pattern="[0-9]*" inputMode="numeric" required />
                        </div>
                        <div class="col-md-12">
                        <label className="fw-bold my-2">Registration No.</label>
                            <input type="text" name="reg"
                                defaultValue={studentInfo.reg} onBlur={handleReg} min={0} pattern="^[0-9a-zA-Z]*$" class="form-control border-0" id="inputEmail4" placeholder="Enter Registration" required />
                        </div>
                        <div class="col-md-12">
                            <button type="submit" onClick={() => handleStudentClick(studentInfo._id)} class="contact-btn">Update Now</button>
                        </div>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default UpdateStudentInfo;