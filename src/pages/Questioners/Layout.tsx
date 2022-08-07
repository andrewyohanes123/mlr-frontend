import { FC, ReactElement } from "react";
import { Forms } from "tabler-icons-react";
import RouteContainer from "components/RouteContainer";
import QuestionersData from "./QuestionersData";

const Layout: FC = (): ReactElement => {
  document.title = "Data Kuesioner";
  return (
    <RouteContainer title="Data Kuesioner" icon={<Forms strokeWidth={1} />}>
      <QuestionersData />
    </RouteContainer>
  );
};

export default Layout;
