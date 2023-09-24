import submitSession from "@/pages/utility/submitSession";
import submitUser from "@/pages/utility/submitUser";
import { Session, User } from "next-auth"
import UserRepo from "../user/userRepo";
import SessionRepo from "../session/sessionRepo";

export const signInEventHandler = (user: User) =>{
	let userRepo = UserRepo();
	let sessionRepo = SessionRepo();
	userRepo.saveDetails(user);
	sessionRepo.saveDetails({
		email: user?.email || "N/A",
		name: user?.name || "N/A",
		time: (new Date()).toLocaleString(),
		task: "Login",
	});
}

export const signOutHandler = ({name, email}:any) =>{
	let sessionRepo = SessionRepo();
	sessionRepo.saveDetails({
		email: email || "N/A",
		name: name|| "N/A",
		time: (new Date()).toLocaleString(),
		task: "LogOut"
	});
}