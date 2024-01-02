import Layout from "../Layout/Layout.jsx";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

export default function Dashboard() {

    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers()
    }, []);

    function getUsers() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${import.meta.env.VITE_APP_URL}/get-user`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setUsers(result.users)
            })
            .catch(error => console.log('error', error));
    }

    function handleDelete(id){
        Swal.fire({
            icon: "question",
            title:`do you delete user Id is ${id}`,
            showCloseButton:true,
            showCancelButton:true
        }).then((result) => {
            if(result.isConfirmed){
                Swal.fire({
                    icon : "success"
                })
                const requestOptions = {
                    method: 'DELETE',
                    redirect: 'follow'
                };
                fetch(`${import.meta.env.VITE_APP_URL}/delete/${id}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result)
                        getUsers()
                    })
                    .catch(error => console.log('error', error));
            }
        })
    }


    return (
        <Layout headerTitle='App'>
            <div className={'col-lg-12'}>
                <div className={'row'}>
                    {Array.from({length: 4}, (_, i) => i).map((index) => (
                        <div className={'col-xxl-3 col-md-6'} key={index}>
                            <div className="card info-card sales-card">
                                <div className="filter">
                                    <a className="icon" href="#" data-bs-toggle="dropdown">
                                        <i className="fa-solid fa-circle-ellipsis"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Today</a></li>
                                    </ul>
                                </div>

                                <div className="card-body">
                                    <h5 className="card-title">Sales <span>| Today</span></h5>

                                    <div className="d-flex align-items-center">
                                        <div
                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="fa-solid fa-face-thermometer"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>145</h6>
                                            <span className="text-success small pt-1 fw-bold">12%</span> <span
                                            className="text-muted small pt-2 ps-1">increase</span>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={'card info-card sales-card p-0'}>
                            <div className={'card-body'}>
                                <h5 className={'card-title'}><i className="fa-sharp fa-solid fa-users me-2"></i>User List</h5>
                                <table className={'table table-bordered m-0'}>
                                    <thead>
                                    <tr>
                                        <th className={'text-center'} scope={'col'}>Id</th>
                                        <th scope={'col'}>Name</th>
                                        <th scope={'col'}>Email</th>
                                        <th className={'text-center'} scope={'col'}>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.length ? (
                                        users.map((user, index) => (
                                            <tr key={index}>
                                                <td className={'text-center'}>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td className={'text-center'}>
                                                    <Link className={'btn btn-sm btn-warning me-2'} to={`/edit/${user.id}`}>
                                                        <i className="fa-solid fa-pen-to-square me-2"></i>
                                                        <span>Edit</span>
                                                    </Link>
                                                    <button className={'btn btn-sm btn-danger'} onClick={()=>handleDelete(user.id)}>
                                                        <i className="fa-solid fa-trash me-2"></i>
                                                        <span>Delete</span>
                                                    </button>

                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <td colSpan="4">Loading users...</td>
                                    )
                                    }
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}