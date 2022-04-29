import { observer } from "mobx-react-lite";
import { PlanetInterface } from "../model/Planet";
import ResidentCard from "./ResidentCard";

/**
 * A component that displays the list of residents via resident cards.
 */

type ResidentListProps = {
  planet: PlanetInterface;
};

function ResidentsList({ planet }: ResidentListProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {planet.residentConnection.residents?.map((resident) => (
        <ResidentCard
          key={resident.name.concat(resident.id)}
          resident={resident}
        />
      ))}
    </div>
  );
}

export default observer(ResidentsList);
