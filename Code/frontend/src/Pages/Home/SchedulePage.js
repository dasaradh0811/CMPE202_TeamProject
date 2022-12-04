import React from "react";
import { useEffect, useState} from "react";
import './SchedulePage.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import backendurl from './backendUrl';

const SchedulePage = () => {
    const [role,setRole] = useState(0);
    const [username,setUsername] = useState('');
    const navigate = useNavigate();
    const [data,setData] = useState();
    const [hours,setHours] = useState(1);
    const [job,setJob] = useState('');
    const [airportSchedule,setAirportSchedule] = useState([]);

    // setUsername(sessionStorage.getItem("UserName"));
    // console.log((sessionStorage.getItem("Role")));
    // setRole(sessionStorage.getItem("Role"));
    // console.log("ROLE:::",role);

    useEffect(() => {
        var userObj = JSON.parse(sessionStorage.getItem("userdetails"));
        if(userObj!==null){
            console.log(userObj);
            console.log(Object.keys(userObj).length);
            console.log(userObj.email);

            if(userObj.type === 'airline'){
                setRole(1);
                // empRole=1;
            }
            else if(userObj.type === 'airport'){
                setRole(2);
                // empRole=1;
            }
            setUsername(userObj.firstname);
            setJob(userObj.type);
        }
        else{
            setRole(0);
        }   
        console.log("ROLE:",role);
        if(role === 1 || role === 2){
            getAirportSchedule();
        }
        else{
            getAirportScheduleByHour();
        }
    }, [role,setRole]);

    const getAirportScheduleByHour = () =>{
        console.log("CUSTOMEEEEE");
        Axios.get(`${backendurl}/airport-schedules/${hours}`,)
        .then((response) => {
            console.log("AAAA:",response.data);
            setAirportSchedule(response.data);
        })
        .catch(err => {
            console.log(err.response);
        });
    }

    const getAirportSchedule = () =>{
        console.log("EMPPPPPPPP");

        Axios.get(`${backendurl}/airport-schedules`,)
        .then((response) => {
            console.log("AAAAQQQQQQ:",response.data);
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

    const logoutFun = () =>{
        sessionStorage.clear();
        navigate('/');
    }

    const navigateToGateway=()=>{
        navigate('/Gateway');
    }
    const navigateupdateFlight = () =>{
        navigate('/UpdateFlight');
    }
    const navigateBaggageCarousel = () =>{
        navigate('/BaggageCarousel');
    }
    const selectHour= event =>{
        console.log("Hour VAL:::",event.target.value);
        setHours(event.target.value);
        getFlights();
    }
    const getFlights = () =>{
        console.log("getttt flightssss");
    }
    

    return (
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
                            {role === 1 || role === 2?<div class="col usernameclass">Hi {username} 👋 <i style={{fontSize:'24px'}} class='fas'>&#xf508;</i><br></br>{job} Employee</div>:<div></div>}
                            <div class="col usernameclass"><button class="btn btn-primary" onClick={()=>{logoutFun()}}>Logout</button></div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width:'90vw', margin:'auto',marginTop:'10vh'}}>
                <div style={{float: 'right'}}>

                    {role === 2?
                        <div>
                            <button type="submit" style ={{marginRight:'10px'}}className="btn btn-primary" onClick={navigateToGateway}>Gateway Maintenance 🚪</button>
                            <button class="btn btn-primary" style={{marginRight:'10px'}} onClick={postBaggage}>Baggage Carousel 🧳</button>
                        </div>
                     :
                    <div></div>
                    } 

                    {role === 1?
                    <button class="btn btn-primary" onClick={navigateupdateFlight}>Update Flight Schedule </button>:
                    <div></div>
                    }
            </div>

                {/* <div>
                    {airportSchedule && airportSchedule.length > 0 && airportSchedule.map((data)=>(
                        <div>
                            {data.terminal.name}
                        </div>
                    ))}
                </div> */}



            <label style={{textAlign: 'center', fontSize:'20px',margin:'10px'}}>Flight Schedule</label>

            {role !== 1 && role !== 2?
            <div class="row" style={{backgroundColor:'black', color:'white',textAlign:'right',margin:'0px',padding:'20px'}}>
                    <div class="col-4"></div>
                    <div class="col-1"></div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-7">Display Flight in</div>
                            <div class="col-3">
                                <select class="form-select" aria-label="Default select example" onChange={(e)=>{setHours(e.target.value)}}>
                                            <option selected value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                            </div>
                            <div class="col-2">
                                Hour
                                <button type="button" class="btn btn-primary bi-search" onClick={getAirportScheduleByHour} ><i class="bi bi-search"></i>search</button>
                                </div>
                        </div>
                    </div>
            </div>:
            <div></div>}

            <table class="table table-hover table-dark">
                
                    <thead class="thead-dark">
                        <tr>
                            <th>Status</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Gate Name</th>
                            <th>Baggage Corousel Name</th>
                            <th>Terminal Name</th>
                        </tr>
                    </thead>
                        {airportSchedule && airportSchedule.length > 0 && airportSchedule.map((data)=>(
                    <tbody>
                        <tr>
                            <th>{data.flightInstance.status}</th>
                            <th>{data.flightInstance.departureTime}</th>
                            <th>{data.flightInstance.arrivalTime}</th>
                            <th>{data.flightInstance.origin}</th>
                            <th>{data.flightInstance.destination}</th>
                            {data.gate ===null?<th>NA</th>:<th>{data.gate.name}</th>}
                            {/* <th>{data.gate ==}</th> */}
                            <th>{data.terminal.name}</th>
                            {data.baggageCarousel ===null?<th>NA</th>:<th>{data.baggageCarousel.name}</th>}
                            {/* <th>{data.baggageCarousel.name}</th> */}
                        </tr>
                    </tbody>

                        ))}
                </table>
            </div>
        </div>
    )
}

export default SchedulePage;