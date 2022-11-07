import { useParams } from "@remix-run/react";

const DynamicChild = () => {
  const { someId } = useParams();
  return <div>DynamicChild {someId}</div>;
};

export default DynamicChild;
