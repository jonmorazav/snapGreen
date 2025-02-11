import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import API from "../utils/API.js"
import './AddEvent.css';

function AddEvent() {
    const [notLoggedIn, setLoggedIn] = useState(localStorage.getItem("bitmoji") == null && localStorage.getItem("name") == null);
    const [submitted, setSubmitted] = useState(false);
    const [eventName, setEventName] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [details, setDetails] = useState("");
    const [month, setMonth] = useState("Jan");
    const [day, setDay] = useState(1);
    const months = moment.monthsShort();
    let days = [...Array(32).keys()]
    days.shift();
    function handleEventNameChange(event) {
        setEventName(event.currentTarget.value);
    }
    function handleSubtitleChange(event) {
        setSubtitle(event.currentTarget.value);
    }
    function handleCategoryChange(event) {
        setCategory(event.currentTarget.value);
    }
    function handleImageUrlChange(event) {
        setImageUrl(event.currentTarget.value);
    }
    function handleDetailsChange(event) {
        setDetails(event.currentTarget.value);
    }
    function handleMonthChange(event) {
        setMonth(event.currentTarget.value);
    }
    function handleDayChange(event) {
        setDay(event.currentTarget.value);
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        const summary = details.length>57?details.substring(0,57)+"...":details
        API.createEvent({
            title: eventName,
            subtitle: subtitle,
            category: category,
            description: details,
            summary: summary,
            timestamp: new Date().getTime(),
            user: localStorage.getItem("name"),
            avatar: localStorage.getItem("bitmoji")||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf3q_cxvO5kob_M7-Byki4QXmUpCDn8QBY2229vc8qw_Xpra_r",
            cardImage: imageUrl || "https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg",
            eventDay: day,
            eventMonth: month,
        }).then(response => {
            setSubmitted(true)
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <React.Fragment>
            {notLoggedIn ? <Redirect to="/" /> : null}
            {submitted ? <Redirect to="/app" /> : null}
            <div className="container-contact100">
                <div className="wrap-contact100">
                    <form className="contact100-form validate-form" onSubmit={handleSubmit}>
                        <span className="contact100-form-title">Create New Event</span>

                        <div className="wrap-input100">
                            <input className="input100" type="text" name="name" value={eventName} onChange={handleEventNameChange} placeholder="Event Name" />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <input className="input100" type="text" name="subtitle" value={subtitle} onChange={handleSubtitleChange} placeholder="Subtitle" />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100">
                            <input className="input100" type="text" name="category" value={category} onChange={handleCategoryChange} placeholder="Category" />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <input className="input100" type="text" name="imgUrl" value={imageUrl} onChange={handleImageUrlChange} placeholder="Image URL" />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <select className="input100 drop-down" value={month} onChange={handleMonthChange}>
                                {months.map((obj, index) => (<option value={obj} key={index}>{obj}</option>))}
                            </select>
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <select className="input100 drop-down" value={day} onChange={handleDayChange}>
                                {days.map((obj, index) => (<option value={obj} key={index}>{obj}</option>))}
                            </select>
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <textarea className="input100" name="eventDetails" value={details} onChange={handleDetailsChange} placeholder="Event Details"></textarea>
                            <span className="focus-input100"></span>
                        </div>

                        <div className="container-contact100-form-btn">
                            <button className="contact100-form-btn" type="submit">Add Event</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddEvent;