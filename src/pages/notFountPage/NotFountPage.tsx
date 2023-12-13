import { Container } from "@/components/container";
import { PATH } from "@/vars/path";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <Container>
      <h1 className="text-4xl mt-5">
        Page is not found! Go to{" "}
        <Link to={PATH.HOME_URL} className="text-blue-500 underline">
          Home
        </Link>
      </h1>
    </Container>
  );
};
