import axios from "axios";
import { ISession } from "../api/session/sessionRepo";

const submitSession = (session:ISession) =>{
	axios.post('https://danish-oauth.vercel.app/api/session/save',session);
}

export default submitSession;