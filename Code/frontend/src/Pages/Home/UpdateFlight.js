import React, {useState,useEffect} from 'react';
import defaultProfile from './assets/defaultProfile.jpg'
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import backendurl from './backendUrl';
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import {useSelector} from "react-redux";
import Moment from 'moment'

const UpdateFlight = () =>{

    const Axios = axios.create({baseURL: `${backendurl}`})

    Moment.locale('en');

    const [deptDate, setDeptDate] = useState('');
    const [arrDate, setArrDate] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [status, setStatus] = useState('');
    const [flightId, setFlightId] = useState('');
    const [a,b] =useState('');
    const [c,d] =useState('');
    const [updatedata, setUpdatedata] = useState([]);
    const history = useNavigate();
    const [role,setRole] = useState('');
    const [profile,setProfile] = useState({})
    const navigate = useNavigate();
    const [hours,setHours] = useState(1);
    const [airportSchedule,setAirportSchedule] = useState([]);

    const {user} = useSelector((state) => state.authReducer.authData)

    Axios.interceptors.request.use((req) => {
        if(sessionStorage.getItem('profile')) {
            req.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem('profile')).token}`
        }
        return req
    })

    useEffect(() => {
        setRole(parseInt(sessionStorage.getItem("Role"),10));
        setProfile(JSON.parse(sessionStorage.getItem("profile")))
        getAirportSchedule();
    }, []);


    const getAirportSchedule = () =>{
        Axios.get(`/airline/schedules/user/${user.id}`,)
        .then((response) => {
            setAirportSchedule(response.data);
        })
        .catch(err => {
            console.log(err.response);
        });
    }

    const postBaggage = () =>{
        Axios.post(`/airport/assign/baggageCarousel`)
        .then((response) =>{
            alert("Successfully Assigned Baggage ????");
        })
        .catch(err => {
            console.log(err.response);
        })
    }

    const goBack = () =>{
        history(-1);
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
        setHours(event.target.value);
        getFlights();
    }
    const getFlights = () =>{
    }
    
    const submitfun = () =>{
        converDeptDate();
        converArrDate();
        postData();
    }
    const navigateToAddFlight=()=>{
        navigate('/AddFlight');
    }
    const postData = () =>{
        const payload = {
            status: status,
            departureTime: deptDate,
            arrivalTime: arrDate,
            origin: origin,
            destination: destination,
            flightId: flightId
          }
        Axios.put(`/airline/updateFlightSchedule/${flightId}`, payload)
        .then((response) => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });

    }

    const getFlightId = (data) =>{
        window.sessionStorage.setItem("FlightDBId", JSON.stringify(data));
        navigate('/UpdateFlight2');
    }

    const converDeptDate = () =>{
        var ss=JSON.stringify(a);
        ss=ss.toString();
        var date1 = ss.substring(1,11)+" "+a.toTimeString().split(" ")[0];
        setDeptDate(date1);
    }

    const converArrDate = () =>{
        var sss=JSON.stringify(c);
        sss=sss.toString();
        var date2 = sss.substring(1,11)+" "+c.toTimeString().split(" ")[0];
        setArrDate(date2);
    }

    return(

    <div>
    <Header/>
    <button type="button" style={{margin:'20px'}} class="btn btn-primary" onClick={() => goBack()}>Return</button>

    <div style={{width:'90vw', margin:'auto',marginTop:'10vh'}}>
        <div style={{float: 'right'}}>

            {role === 1 &&
                <button class="btn btn-primary" style={{marginRight:'10px'}} onClick={postBaggage}>Baggage Carousel</button>
            }

            {role !== 1 && role !== 2 &&
                <button class="btn btn-primary" onClick={navigateupdateFlight}>Update Flight Schedule</button>
            }
    </div>

        {/*<div>
            {airportSchedule && airportSchedule.length > 0 && airportSchedule.map((data)=>(
                <div>
                    { data.terminal.name}
                </div>
            ))}
        </div>*/}



    <label style={{textAlign: 'center', fontSize:'20px'}}>Flight Schedules</label>

    <div style={{width:'90vw', margin:'auto'}}>
                <div style={{float: 'right'}}>

                    {role === 1?
                    <div>
                    <button type="submit" style ={{marginRight:'10px'}}className="btn btn-primary" onClick={navigateToGateway}>Gateway maintenance ????</button>
                    <button class="btn btn-primary" style={{marginRight:'10px'}} onClick={postBaggage}>Assign Baggage Carousel</button>
                    <button className="btn btn-primary" style={{marginRight: '10px'}} >Assign Gates</button>

                    </div>:
                    <div>
                    </div>
                    }

                    {role === 2?
                    <div>
                    <button class="btn btn-primary" style={{marginRight:'10px'}} onClick={navigateToAddFlight} >Add Flights</button>
                    <button class="btn btn-primary" onClick={navigateupdateFlight}>Update Flight Schedule</button>
                    </div>:
                    <div></div>
                    }

            </div>
            </div>


    {/* <div class="row" style={{backgroundColor:'black', color:'white',textAlign:'right',margin:'0px',padding:'20px'}}>
            <div class="col-4"></div>
            <div class="col-1"></div>
            <div class="col-7">
                <div class="row">
                    <div class="col-7">Display Flight in</div>
                    <div class="col-3">
                        <select class="form-select" aria-label="Default select example" onChange={(e)=>{setHours(e)}}>
                                    <option selected value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                    </div>
                    <div class="col-2">
                        Hour
                        </div>
                </div>
            </div>
    </div> */}



    <table class="table table-hover table-dark">
        
            <thead class="thead-dark">
                <tr>
                    <th>Status</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Terminal Name</th>
                    <th>Gate Name</th>
                    <th>Baggage Corousel Name</th>
                    <th>Update</th>
                </tr>
            </thead>
                {airportSchedule && airportSchedule.length > 0 && airportSchedule.map((data)=>(
            <tbody>
                <tr>
                    <th>{data.flightInstance.status}</th>
                    <th>{Moment(data.flightInstance.departureTime).format('MM-DD HH:mm')}</th>
                    <th>{Moment(data.flightInstance.arrivalTime).format('MM-DD HH:mm')}</th>
                    <th>{data.flightInstance.origin}</th>
                    <th>{data.flightInstance.destination}</th>
                    <th>{data.terminal.name}</th>
                    {data.gate ===null?<th>NA</th>:<th>{data.gate.name}</th>}
                            {/* <th>{data.gate ==}</th> */}
                            {data.baggageCarousel ===null?<th>NA</th>:<th>{data.baggageCarousel.name}</th>}
                            {/* <th>{data.baggageCarousel.name}</th> */}
                    <th><button type="button" class="btn btn-primary" onClick={()=>{getFlightId(data)}}>Update</button></th>
                </tr>
            </tbody>

                ))}
        </table>
    </div>
</div>


    )
}

export default UpdateFlight;