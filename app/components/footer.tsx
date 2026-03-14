import { FiGithub, FiLinkedin} from "react-icons/fi"
import { FaDiscord } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer(){
    return(
        <>
            <footer className="absoltue bottom-0 left-0 w-full bg-[#454B6B]/70 backdrop-blur-md py-8 z-50 ">
                <div className="flex justify-center gap-6 text-3xl">
                    <a className="hover:scale-110 text-[#A6E3F1] drop-shadow-[0_2px_4px_#6DAFC2] transition" href="mailto:mieayamperfect@gmail.com" target="_blank">
                        <HiOutlineMail className="text-3xl"></HiOutlineMail>
                    </a>
                    <a className="hover:scale-110 text-[#A6E3F1] drop-shadow-[0_2px_4px_#6DAFC2] transition" href="https://discord.com/users/613005513168519178" target="_blank">
                        <FaDiscord className="text-3xl"></FaDiscord>
                    </a>
                    <a className="hover:scale-110 text-[#A6E3F1] drop-shadow-[0_2px_4px_#6DAFC2] transition" href="https://linkedin.com/in/dhycko" target="_blank">
                        <FiLinkedin className="text-3xl"></FiLinkedin>
                    </a>
                    <a className="hover:scale-110 text-[#A6E3F1] drop-shadow-[0_2px_4px_#6DAFC2] transition" href="https://github.com/Chikootlin" target="_blank">
                        <FiGithub className="text-3xl"></FiGithub>
                    </a>
                </div>
            </footer>
        </>
    )
}