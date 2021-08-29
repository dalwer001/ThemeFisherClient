import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddStudent.css';

const AddStudent = () => {
    const [imageURL, setIMageURL] = useState(null);
    const { register } = useForm();
    const handleImageUpload = (e) => {
        const imageData = new FormData();
        imageData.set("key", "798ea45a777a4ccd52f1701860227c6b");
        imageData.append("image", e.target.files[0]);

        axios
            .post("https://api.imgbb.com/1/upload", imageData)
            .then(function (response) {
                setIMageURL(response.data.data.display_url);
                alert('Image Uploaded');
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
            "https://sheltered-meadow-35142.herokuapp.com/addStudent",
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
                        <div class="col-md-12">
                            <label className="fw-bold my-2">Upload Image</label>
                            <input type="file" onChange={handleImageUpload} class="form-control border-0" id="inputEmail4" placeholder="Upload your photo" required />
                            <small className="text-warning">*Just wait few sec to upload the image</small>
                        </div>
                        <div class="col-12">
                            <label className="fw-bold my-2">Name</label>
                            <input type="text" name="name" class="form-control border-0" id="name" {...register} placeholder="Enter Name" pattern="^[a-zA-Z ]*$" required />
                            <small className="text-warning">*only text</small>
                        </div>
                        <div className="row">
                            <div class="col-md-6">
                                <label className="fw-bold my-2">Id</label>
                                <input type="number" name="id" class="form-control border-0" min={0} id="inputEmail4" {...register} pattern="[0-9]*" inputMode="numeric" placeholder="Enter ID" required />
                                <small className="text-warning">*Only number</small>
                            </div>
                            <div class="col-md-6">
                                <label className="fw-bold my-2">Registration No.</label>
                                <input type="text" name="reg" class="form-control border-0" min={0} pattern="^[0-9a-zA-Z]*$" id="inputEmail4" {...register} placeholder="Enter Registration no." required />
                                <small className="text-warning">*Only text and number allow here</small>
                            </div>
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