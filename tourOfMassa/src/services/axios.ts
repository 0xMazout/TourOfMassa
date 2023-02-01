import axios from "axios";

interface IMetaData {
  dependencies: string[];
}

interface IRunRequest {
  source: string;
  metadata: IMetaData;
}

interface IRunResponse {
  data: string;
}

export function run(source: string): Promise<string> {
  return axios
    .post<IRunRequest, IRunResponse>("http://localhost:3000/run", {
      source,
      metadata: { dependencies: [] },
    })
    .then((r) => {
      return r.data.split("Deployment success with events: ")[1];
    });
}

export function getSource(name: string): Promise<string> {
  //Del when routing is ok
  name = "generate-event";
  return axios
    .get(`http://localhost:3000/pages/${name}/source.ts`)
    .then((r) => {
      return r.data;
    });
}
