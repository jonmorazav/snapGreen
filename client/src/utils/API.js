import axios from "axios";

export default {
    getAllEvents(){
        return axios.get("/api/post");
    }
};