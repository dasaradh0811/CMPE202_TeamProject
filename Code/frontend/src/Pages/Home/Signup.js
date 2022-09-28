import React from 'react';
import { useState,useEffect } from 'react';


const Signup = () =>{

    const [data,setData] = useState();
    const [radio,setRadio] = useState();
    const [role,setRole] = useState('');
    const [username,setUsername] = useState('');
    const [gatewayList,setGatewayList] = useState([]);

    useEffect(()=>{
        setRole(sessionStorage.getItem("Role"));
        setUsername(sessionStorage.getItem("UserName"));
        // getData();
        // getGateMaintainData();
    },[]);


    return(
        <div>BaggageCarousel

            <div class="Container">
                <div class="row navbar">
                    <div class="col-4">Airport</div>
                    <div class="col-4"></div>
                    <div class="col-4">
                        <div class="row">
                            <div class="col">
                                {role==='1'?
                                    <button type="submit" className="btn btn-primary" >Gateway maintenance 🚪</button>:

                                }
                            </div>
                            Auth-form {
                            width: 420px;
                            box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
                            padding-top: 30px;
                            padding-bottom: 20px;
                            border-radius: 8px;
                            background-color: white;
                        }

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup;
