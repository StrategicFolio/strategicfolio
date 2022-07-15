import { useContainer as useRoutingControllersContainer } from "routing-controllers";
import { Container } from "typedi";

const load = () => {
  useRoutingControllersContainer(Container);
};

export default load;
