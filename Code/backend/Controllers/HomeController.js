import {Airline, AirportSchedule, BaggageCarousel, Flight, FlightInstance, Gate, Terminal} from '../Models/index.js'
import { Op } from 'sequelize'

export const getSchedulesByHour = async (req, res) => {
    try{
        //console.log(typeof req.params.hour)
        if(typeof req.params.hour == "string" && (req.params.hour.trim() === '' || isNaN(req.params.hour)))
            res.status(400).json({message: 'Invalid number'});

        var startDate = new Date();
        var endDate = new Date(new Date().getTime() + req.params.hour*60*60*1000);

        const response = await AirportSchedule.findAll({
            attributes:[],
            include: [
                {model: FlightInstance,
                    where: {
                        [Op.or]:
                            [{
                                "arrivalTime":{[Op.between] : [ startDate, endDate]}
                            },
                                {
                                    "departureTime":{[Op.between] : [ startDate, endDate]}
                                }]
                    },
                    attributes: ['id', 'status', 'departureTime', 'arrivalTime', 'origin', 'destination'],
                    include: [
                        {model: Flight,
                            attributes:['id', 'number'],
                            include: [
                                {model: Airline, attributes: ['id', 'name']}
                            ]
                        }
                    ]
                    },
                {model: Gate,
                    attributes:['id','name']
                },
                {model: Terminal,
                    attributes:['id','name']
                },
                {model: BaggageCarousel,
                    attributes:['id','name']
                }
            ]
        });
        res.status(200).json(response);    
    }
    catch(err){ 
        res.status(400).json({message:'Error while retrieving flight schedule.'});
    }
};

export const getSchedules = async (req, res) => {
    try{

        const response = await AirportSchedule.findAll({
            attributes:[],
            include: [
                {model: FlightInstance,
                    attributes: ['id', 'status', 'departureTime', 'arrivalTime', 'origin', 'destination'],
                    include: [
                        {model: Flight,
                            attributes:['id', 'number'],
                            include: [{model: Airline, attributes: ['id', 'name']}]
                        }
                    ]
                },
                {model: Gate,
                    attributes:['id','name']
                },
                {model: Terminal,
                    attributes:['id','name']
                },
                {model: BaggageCarousel,
                    attributes:['id','name']
                }
            ]
        });
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json({message:'Error while retrieving flight schedules'});
    }
};

export const getBaggageCarouselInfo = async(req, res) => {
    try{
        const getBaggageCarouselInfo = await AirportSchedule.findAll({
            include:[
                {
                    model: FlightInstance,
                    where: {status: 'arrived'},
                    include: [{model: Flight, include: [{model: Airline}]}]
                }
            ]
        });

        console.log("Baggage carousel info is: " + getBaggageCarouselInfo);

        res.status(200).json(getBaggageCarouselInfo);
    }
    catch(err){
        console.log(err);
        res.status(400).json({message: `Baggage carousel information cant be displayed`});
    }
};