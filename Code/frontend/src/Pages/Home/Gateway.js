import React from 'react';
import './Gateway.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import backendurl from './backendUrl';
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";

const Gateway = () => {
    const Axios = axios.create({baseURL: `${backendurl}`})
    Axios.interceptors.request.use((req) => {
        if(sessionStorage.getItem('profile')) {
            req.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem('profile')).token}`
        }
        return req
    })
    const [role,setRole] = useState('');
    const [username,setUsername] = useState('');
    const [gatewayList,setGatewayList] = useState([]);
    const history = useNavigate();

    useEffect(()=>{
        setRole(parseInt(sessionStorage.getItem("Role"), 10));
        setUsername(sessionStorage.getItem("UserName"));
        getGateMaintainData();
    },[]); 

    const goBack = () =>{
        history(-1);
    }

    const FunStatus = (e) =>{
        if(e==='active'){
            return 1;
        }
        else if(e==='inactive'){
            return 2;
        }
        else{
            return 0;
        }
    }

    const getGateMaintainData = () =>{
        Axios.get(`/airport/get/gates`,)
        .then((response)=>{
            setGatewayList(response.data);
        })
        .catch(err =>{
            console.log(err.response);
        })
    }

    const updateGateStatus = (e) =>{
        Axios.put(`/airport/update/gate/${e}`)
        .then((response)=>{
            setGatewayList(response.data);
            getGateMaintainData();
        })
        .catch(err =>{
            console.log(err.response);
        })

    }
    const fun = (event,a) =>{
        updateGateStatus(a.id);
    }


    return(
        <div>
            <Header/>
            <div>
                </div>

                    <button type="button" style={{margin:'20px'}} class="btn btn-primary" onClick={() => goBack()}>Return</button>
            <div style={{width:'90vw',margin:'auto',marginTop:'10vh'}}>
                <label style={{fontSize:'20px'}}>Gate Maintenance</label>
                <table class="table table-hover table-dark">
                    <thead class="thead-dark">
                        <tr>
                            <th>Gate Name</th>
                            <th>Status</th>
                            <th>Terminal Name</th>
                            <th>Action</th>
                        </tr>

                    </thead>
                    {gatewayList && gatewayList.length > 0 && gatewayList.map((data)=>(
                    <tbody>
                        <tr>
                            <th>{data.name}</th>
                            <th>{data.status}</th>
                            <th>{data.terminal.name}</th>
                            <th>
                                {data.status === 'active'?
                                <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" defaultChecked={true} role="switch" onChange={(e) => {fun(e, data); }}  id="flexSwitchCheckDefault"/>
                                <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                                </div>:

                                data.status === 'inactive'?
                                
                                                                <div class="form-check form-switch">
                                                                <input class="form-check-input" type="checkbox" role="switch" onChange={(e) => {fun(e, data); }}  id="flexSwitchCheckDefault"/>
                                                                <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                                                                </div>:
                                                                 <div class="form-check form-switch">
                                                                 <input class="form-check-input" type="checkbox" role="switch" onChange={(e) => {fun(e, data); }}  id="flexSwitchCheckDefault" disabled="disabled" checked/>
                                                                 <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                                                                 </div>

                            }
                            </th>
                        </tr>
                    </tbody>
                        ))}
                </table>
            </div>
        </div>
    )
}

export default Gateway;