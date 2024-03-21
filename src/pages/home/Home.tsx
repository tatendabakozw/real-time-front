import ConventionalDatabase from "@components/view-sections/ConventionalDatabase";
import RealTimeDatabase from "@components/view-sections/RealTimeDatabase";
import GeneralLayout from "@layouts/GeneralLayout";
import { ReactElement } from "react";

type Props = {};

const Home = (props: Props): ReactElement => {
  return (
    <GeneralLayout>
      <div className="min-h-screen">
        <div className="grid grid-cols-2 h-full min-h-[90vh] divide-x divide-slate-300">
          <RealTimeDatabase />
          <ConventionalDatabase />
        </div>
      </div>
    </GeneralLayout>
  );
};

export default Home;
