import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    
    const { id } = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then((response) => {
                    setFirstName(response.data.firstName || response.data.first_name);
                    setLastName(response.data.lastName || response.data.last_name);
                    setEmail(response.data.email);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstName, lastName, email };

            if (id) {
                updateEmployee(id, employee)
                    .then(() => navigate('/employees'))
                    .catch(error => console.error(error));
            } else {
                createEmployee(employee)
                    .then((response) => {
                        navigate('/employees');
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors }

        if (firstName.trim()) {
            errorsCopy.firstName = ''
        } else {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = ''
        } else {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = ''
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        return (
            <h2 className='text-center'>
                {id ? 'Update Employees' : 'Add Employees'}
            </h2>
        )
    }

    return (
        <div className='container'>
            <br /><br />

            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    
                    <div className='card shadow'>

                        {pageTitle()}

                        <div className='card-body'>
                            <form onSubmit={saveOrUpdateEmployee}>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>First Name</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Employee First Name'
                                        value={firstName}
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    {errors.firstName && (
                                        <div className='invalid-feedback'>{errors.firstName}</div>
                                    )}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Last Name</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Employee Last Name'
                                        value={lastName}
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    {errors.lastName && (
                                        <div className='invalid-feedback'>{errors.lastName}</div>
                                    )}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Email</label>
                                    <input
                                        type='email'
                                        placeholder='Enter Valid Email'
                                        value={email}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && (
                                        <div className='invalid-feedback'>{errors.email}</div>
                                    )}
                                </div>

                                <button type='submit' className='btn btn-success w-100'>
                                    Submit
                                </button>

                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent