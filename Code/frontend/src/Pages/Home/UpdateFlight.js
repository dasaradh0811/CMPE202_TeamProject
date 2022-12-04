import React, {useState,useEffect} from 'react';
import defaultProfile from './assets/defaultProfile.jpg'
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import TimePicker from "react-time-picker";
// import TimePicker from 'react-timepicker';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';
// import TimePicker from 'react-time-picker/dist/entry.nostyle';
import DateTimePicker from 'react-datetime-picker';
import Axios from 'axios';
import backendurl from './backendUrl';
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";

// import TimePicker from 'react-timepicker';
// import 'react-timepicker/dist/react-timepicker.css';


// import TimePicker from "react-time-picker/dist/entry.nostyle";




const UpdateFlight = () =>{

    const [deptDate, setDeptDate] = useState('');
    const [arrDate, setArrDate] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [status, setStatus] = useState('');
    const [flightId, setFlightId] = useState('');
    const [a,b] =useState('');
    const [c,d] =useState('');
    const [updatedata, setUpdatedata] = useState([]);



    const [role,setRole] = useState('');
    const [username,setUsername] = useState('');
    const [profile,setProfile] = useState({})
    const navigate = useNavigate();
    const [data,setData] = useState();
    const [hours,setHours] = useState(1);
    const [airportSchedule,setAirportSchedule] = useState([]);




    useEffect(() => {
        setRole(sessionStorage.getItem("Role"));
        setUsername(JSON.parse(sessionStorage.getItem("profile"))?.user.firstname);
        setProfile(JSON.parse(sessionStorage.getItem("profile")))
        getAirportSchedule();
    }, []);


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
        Axios.post(`${backendurl}/airport/assign/baggageCarousel`)
        .then((response) =>{
            console.log("Success:",response);
            alert("Successfully Assigned Baggage 👍");
        })
        .catch(err => {
            console.log(err.response);
        })
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
    


    const submitfun = () =>{

        console.log("clickedd submitfun");
        console.log(origin,status,destination,deptDate,arrDate,flightId);
        converDeptDate();
        converArrDate();
        console.log("deptDate::",deptDate);
        console.log("arrDate::",arrDate);
        postData();
    }


    // status: req.body.status,
    // departureTime: req.body.departureTime,
    // arrivalTime: req.body.arrivalTime,
    // origin: req.body.origin,
    // destination: req.body.destination,
    // flightId: req.body.flightId


    const postData = () =>{
        const payload = {
            status: status,
            departureTime: deptDate,
            arrivalTime: arrDate,
            origin: origin,
            destination: destination,
            flightId: flightId
          }

          console.log("payload❌", payload);

        Axios.put(`${backendurl}/airline/updateFlightSchedule/${flightId}`, payload)
        .then((response) => {
            console.log("YYYYYYYYY");
            console.log(response);
        })
        .catch(err => {
            console.log("XXXXXXX");
            console.log(err);
        });

    }

    const getFlightId = (data) =>{
        console.log(data);
        window.sessionStorage.setItem("FlightDBId", JSON.stringify(data));
        console.log("ZZZZ:",sessionStorage.getItem("FlightDBId"));
        navigate('/UpdateFlight2');
    }

    const converDeptDate = () =>{
        console.log("FUN 1:",a);
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
    //     <div>
    //     <div className="Container">
    //             <div className="loginclass">
    //                 <div className="Auth-form-container">
    //                         <form className="Auth-form" onSubmit={submitfun}>
    //                             <div className="Auth-form-content">
    //                             <h3 className="Auth-form-title">Update Flight Schedule</h3>
    //                             <div style={{marginTop:'25px'}}>
    //                             <label>Status</label>
    //                             <select className="form-select selectWidth" aria-label="Default select example" onChange={(e)=>setStatus(e.target.value)}>
    //                                 <option selected>Select Status</option>
    //                                 <option value="active">active</option>
    //                                 <option value="inactive">inactive</option>
    //                                 <option value="arriving">arriving</option>
    //                                 <option value="arrived">arrived</option>
    //                                 <option value="departed">departed</option>
    //                                 <option value="delayed">delayed</option>
    //                                 <option value="cancelled">cancelled</option>
    //                             </select>
    //                             </div>
    //                             <div className="form-group mt-3">
    //                                 <label>Origin</label>
    //                                 <input type="text" className="form-control mt-1" placeholder="Enter Origin place" onChange={(e)=>setOrigin(e.target.value)}
    //                                 />
    //                             </div>

    //                             <div className="form-group mt-3">
    //                                 <label>Destination</label>
    //                                 <input type="text" className="form-control mt-1" placeholder="Enter Destination place" onChange={(e)=>setDestination(e.target.value)}
    //                                 />
    //                             </div>

    //                             <div className="form-group mt-3">
    //                             <label>Select Dept Date</label>
    //                                 <DateTimePicker 
    //                                 dateFormat="yyyy/MM/dd HH:mm:ss"
    //                                 onChange={date => b(date)}
    //                                 value={a} 
    //                                 minDate={new Date()}                                
    //                                 />
    //                             </div>

    //                             <div className="form-group mt-3">
    //                             <label>Select Arrival Date</label>
    //                                 <DateTimePicker 
    //                                 dateFormat="yyyy/MM/dd HH:mm:ss"
    //                                 onChange={date => d(date)}
    //                                 value={c} 
    //                                 minDate={new Date()}                                
    //                                 />
    //                             </div>

    //                             <div className="form-group mt-3">
    //                                 <label>Flight Id</label>
    //                                 <input
    //                                 type="text"
    //                                 className="form-control mt-1"
    //                                 placeholder="Enter Flight Id"
    //                                 onChange={(e)=>setFlightId(e.target.value)}
    //                                 />
    //                             </div>
    //                             <div className="d-grid gap-2 mt-3">
    //                                 <button type="submit" className="btn btn-primary" onClick={()=>{submitfun()}}>
    //                                 Submit
    //                                 </button>
    //                             </div>
    //                             </div>
    //                         </form>
    //                         </div>
    //             </div>

    //     </div>
    // </div>

    <div>
    <Header/>
    <div style={{width:'90vw', margin:'auto',marginTop:'10vh'}}>
        <div style={{float: 'right'}}>

            {role ==='1' &&
                <button class="btn btn-primary" style={{marginRight:'10px'}} onClick={postBaggage}>Baggage Carousel</button>
            }

            {role === '' &&
                <button class="btn btn-primary" onClick={navigateupdateFlight}>Update Flight Schedule</button>
            }
    </div>

        <div>
            {airportSchedule && airportSchedule.length > 0 && airportSchedule.map((data)=>(
                <div>
                    { "Terminal Name: " . data.terminal.name}
                </div>
            ))}
        </div>



    <label style={{textAlign: 'center', fontSize:'20px',margin:'10px'}}>Flight Schedule</label>

    <div class="row" style={{backgroundColor:'black', color:'white',textAlign:'right',margin:'0px',padding:'20px'}}>
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
    </div>



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
                    <th>Update</th>
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
                    {data.gate ===null?<th>notass</th>:<th>{data.gate.name}</th>}
                            {/* <th>{data.gate ==}</th> */}
                            <th>{data.terminal.name}</th>
                            {data.baggageCarousel ===null?<th>notass</th>:<th>{data.baggageCarousel.name}</th>}
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