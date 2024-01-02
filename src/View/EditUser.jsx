import Layout from "../Layout/Layout.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function EditUser(){
    const id = useParams()
    const [user, setUser] = useState({ id: "", name: "", email: "" });
    console.log(id.id)

    useEffect(() => {
        getUserId()
    }, []);

    const getUserId = () => {
        const Id = id.id
        console.log(Id)
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(`${import.meta.env.VITE_APP_URL}/edit/${Id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setUser(result.user)
            })
            .catch(error => console.log('error', error));
    }

    function handleEdit(ID){
        const requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };
        fetch(`${import.meta.env.VITE_APP_URL}/update/${ID}?name=${user.name}&email=${user.email}`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    console.log('user',user)
    return (
        <Layout headerTitle={'Edit'}>
            <div className={'row'}>
                <div className={'card p-0'}>
                    <div className={'card-body'}>
                        <h5 className={'card-title'}><i className="fa-solid fa-user-pen me-2"></i>Edite</h5>
                        <div className={'row'}>
                            <div className={'col-lg-4'}>
                                <label>User Id</label>
                                <input type="number" className={'form-control'} id={'Id'} value={user.id} readOnly={true}/>
                            </div>
                            <div className={'col-lg-4'}>
                                <label>User Name</label>
                                <input type="name" className={'form-control'} id={'name'} value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}/>
                            </div>
                            <div className={'col-lg-4'}>
                                <label>User Email</label>
                                <input type="email" className={'form-control'} id={'email'} value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                            </div>
                            <div className={'col-lg-12 text-end'}>
                                <button className={'btn btn-primary mt-3'} onClick={()=>handleEdit(user.id)}>submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EditUser