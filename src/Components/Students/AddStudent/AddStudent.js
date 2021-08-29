import axios from 'axios';
import React, { useState } from 'react';
import './AddStudent.css';

const AddStudent = () => {
    const [imageURL, setIMageURL] = useState(null);

    const handleImageUpload = (e) => {
        const imageData = new FormData();
        imageData.set("key", "798ea45a777a4ccd52f1701860227c6b");
        imageData.append("image", e.target.files[0]);

        axios
            .post("https://api.imgbb.com/1/upload", imageData)
            .then(function (response) {
                setIMageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const studentData = {
            image: imageURL,
            name: e.target.name.value,
            id: e.target.id.value,
            reg: e.target.reg.value
        };

        const res = await axios.post(
            "http://localhost:5000/addStudent",
            studentData
        )
        try {
            if (res.status === 422) {
                window.alert("Already Student Exist");
            }
            else {
                e.target.reset();
                window.alert("Student added successfully");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section>
            <div className='container'>
                <div className="col-sm-12 col-md-12 col-lg-12 m-5">
                    <form class="row g-3 p-5 contact-form" onSubmit={handleSubmit}>
                        <h1 className="section-header text-center fw-bolder text-primary">Add Student</h1>
                        <div className="d-flex">
                            <div className="short-underLine">
                            </div>
                            <div className="long-underLine">
                            </div>
                        </div>
                        <div class="col-12">
                            <input type="text" name="name" class="form-control border-0" id="name" placeholder="Enter Name" required />
                        </div>
                        <div class="col-md-12">
                            <input type="text" name="id" class="form-control border-0" id="inputEmail4" placeholder="Enter ID" required />
                        </div>
                        <div class="col-md-12">
                            <input type="text" name="reg" class="form-control border-0" id="inputEmail4" placeholder="Enter Reg" required />
                        </div>
                        <div class="col-md-12">
                            <input type="file" onChange={handleImageUpload} class="form-control border-0" id="inputEmail4" placeholder="Upload your photo" required />
                        </div>
                        <div class="col-md-12">
                            <button type="submit" class="contact-btn">Submit Now</button>
                        </div>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default AddStudent;