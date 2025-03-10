import React,{Component,useContext,useReducer,useEffect,useRef,useState} from "react"
import testimonialsStore from "../store/testimonialStore";
import * as actions from "../actions/actionTypes"
import * as testimonialActions from "../actions/testimonialActions"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


const Context = React.createContext();

let testimonialBody = {
    OwnerFullName: "ntwari egide",
    OwnerId: 1,
    testimonialType: "illiness",
    testimonialTitle: "23 Years On Bed",
    testimonialBody: "Jamaica Hospital Medical Center regularly receives letters of thanks from former patients or their family members for the high level of care we provide throughout our facility."
}




function ListOfTestimonials () {
    const testimonialState = () =>{
        return testimonialsStore.getState();
    }

    // console.log(typeof test)

    const myState = useSelector(testimonialState);
    // const myState = (testimonialsStore.getState())
    const dispatch = useDispatch()

    return(
        <Context.Provider value={dispatch}>
            <div className="jumbotron text-center">
                <h1>Testimonies</h1>
                <p>Type below to find the testimony, You can use the filter  below to filter the testimonies given</p>
                <form className="form-inline">
                    <div className="input-group">
                        <input type="text" className="form-control" size="50" placeholder="Testimony type" required />
                        <div className="input-group-btn">
                            <button type="button" className="btn btn-success">filter</button>
                        </div>
                    </div>
                </form>
            </div>

            <div>
                <div className="row">
                    <button type="button" className="btn btn-primary" style={{
                        marginLeft: '6vw'
                    }} onClick={ () =>
                            dispatch(testimonialActions.addTestimonial(testimonialBody))
                    }>Add Defined testimonial</button>
                    
                    <Link to="/addtestimony" className="btn btn-info" style={{
                        marginLeft: '5vw'
                    }}>Add testimony</Link>
                </div>
                <div className="container-fluid testimonies mt-6">
                    <h2>Testimonies</h2>
                    <h4>List of new testimonials</h4>
                    <br/>
                    <div className="row">
                    <ListingTestimonials testimonials={myState} />
                    </div>
                </div>
            </div>
        </Context.Provider>
    )
}

function ListingTestimonials({testimonials}) {

    return testimonials.map( testimonial =>
            <Testimonial key={testimonial.id} {...testimonial}/>
        )
}


function Testimonial({...testimonial}){
    // console.log(testimonial)
    const dispatch =  useContext(Context)
    return (
        <div className="col-sm-3">
            <span className="glyphicon glyphicon-off"></span>
            <h4>{testimonial.testimonialTitle}</h4>
            <p className="testimony-body">{testimonial.testimonialBody}</p>
            <p className="testimony-title">Type: {testimonial.testimonialType}</p>
            <p className="testimony-by text-info">By : {testimonial.OwnerFullName}</p>
            <p className="text-success font-weight-bold">{testimonial.views} views</p>
            <p><span className="text-success align-left">{testimonial.likes} likes </span> <span className="text-danger align-right">{testimonial.dislikes} dislikes</span></p>
            <button type="button" className="btn btn-outline-primary" onClick={()=> dispatch({type: actions.LIKE_TESTIMONIAL,payload: {id: testimonial.id,OwnerId: testimonial.OwnerId}})}>like</button>
            <button style={{marginLeft: '2vw'}} type="button" className="btn btn-outline-primary" onClick={()=> dispatch({type: actions.DISLIKE_TESTIMONIAL,payload: {id: testimonial.id,OwnerId: testimonial.OwnerId}})}>dislike</button>
            <br/><br/><br/>
            <Link className="btn btn-info" to={{pathname: "/edit-testimony",state: testimonial}} >Edit</Link>
            <button style={{marginLeft: '2vw'}} type="button" className="btn btn-danger" onClick={() => dispatch({type: actions.DELETE_TESTIMONIAL,payload: {id: testimonial.id}})}>Delete</button>
        </div>
    )
}



export default ListOfTestimonials