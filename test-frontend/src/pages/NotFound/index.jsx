import { LinkItem } from "@/components/index.js";
import { ROUTES } from "@/constants/routes.js";
import { NotFoundImage1 } from "@/assets/icons";
import "./not-found.scss";

export const NotFound = () => {
  return (
    <div className="notFound">
      <NotFoundImage1 />
      <LinkItem className="returnLink" to={ROUTES.HOME}>
        Go back to website
      </LinkItem>
    </div>
  );
};
