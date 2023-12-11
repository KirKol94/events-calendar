import { Link } from "react-router-dom";
import { Container } from "../container";
import { PATH } from "@/vars/path";

export const Header = () => {
  return (
    <div className="bg-slate-800 text-white">
      <Container>
        <Link to={PATH.HOME_URL} className="uppercase py-4 inline-block">
          Event calendar
        </Link>
      </Container>
    </div>
  );
};
