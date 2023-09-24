import axios from "axios";
import { User } from "next-auth";

const submitUser = (user:any) =>{
	axios.post('api/user/save',user);
}

export default submitUser;