import React from 'react';
import { useState,useEffect } from 'react';
import backendurl from "./backendUrl";


const Schedule = () =>{


    const [username,setUsername] = useState('');
    const [gatewayList,setGatewayList] = useState([]);

    useEffect(()=>{
        setRole(sessionStorage.getItem("Role"));
        setUsername(sessionStorage.getItem("UserName"));
        // getData();
        // getGateMaintainData();
    },[]);

    background-color:sandybrown;
    border-radius:10px;
    margin:auto;
    margin-top:20vh;
    color:text;


    const usernameFun = event =>{
        setIsUsername(event.target.value);
    }

    const handleRole= event =>{
        console.log("ROLE VAL:::",event.target.value);
        window.sessionStorage.setItem("Role",event.target.value);
    }
    const getAirportSchedule = () =>{
        Axios.get(`${backendurl}/airport-schedules/${hours}`,)
            .then((response) => {
                console.log("AAAA:",response.data);
                setAirportSchedule(response.data);
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    const postBaggage = () =>{
        Axios.post(`${backendurl}/airport/assign/baggage-carousel`)
            .then((response) =>{
                console.log("Success:",response);
                alert("Successfully Assigned Baggage 👍");
                getAirportSchedule();
            })
            .catch(err => {
                console.log(err.response);
            })
    }
    <div>
        <div class="Container">
            <div class="row navbar">
                <div class="col-4">Airport</div>
                <div class="col-4"></div>
                <div class="col-4">
                    <div class="row">
                        <div class="col">
                            {/* {role==='1'?
                                    <button type="submit" className="btn btn-primary" onClick={navigateToGateway}>Gateway maintenance 🚪</button>:
                                    <div></div>
                                    // <button type="submit" className="btn btn-primary" onClick={navigateToGateway}>Airline Employee ✈️👨‍✈️</button>
                                } */}
                        </div>
                        {role !=='1' || role !== '2'?<div class="col usernameclass">Hi Guest 👋</div>:<div class="col usernameclass">Hi {username} 👋</div>}
                        {/* <div class="col usernameclass">Hi {username} 👋</div> */}
                    </div>
                </div>
            </div>
        </div>
        <div style={{width:'90vw', margin:'auto',marginTop:'10vh'}}>
            <div style={{float: 'right'}}>

                {role ==='1'?
                    <div>
                        <button type="submit" style ={{marginRight:'10px'}}className="btn btn-primary" onClick={navigateToGateway}>Gateway maintenance 🚪</button>
                        <button class="btn btn-primary" style={{marginRight:'10px'}} onClick={postBaggage}>Baggage Carousel</button>

                    </div>:
                    <div></div>
                }

    const validate = () => {
        if(validator.isEmail(isUsername)){
            setValidateEmail(true);
        }
        else {
            setValidateEmail(false);
        }
        label {
            font-size: 14px;
            font-weight: 600;
            color: rgb(34, 34, 34);
        }
    .
    return(
        <div>BaggageCarousel

            <div class="Container">
                <div class="row navbar">
                    <div class="col-4">Airport</div>
                    <div class="col-4"></div>
                    <div class="col-4">
                        <div class="row">

                </div>
            </div>

        </div>
    )
}

export default Schedule;