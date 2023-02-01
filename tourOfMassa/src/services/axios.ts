import axios from 'axios';

const MATCH_TEXT = 'Deployment success with events: ';

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
    .post<IRunRequest, IRunResponse>('http://localhost:3000/run', {
      source,
      metadata: { dependencies: [] },
    })
    .then((r) => {
      const output = r.data;
      if (output.includes(MATCH_TEXT)) {
        return output.split(MATCH_TEXT)[1];
      }
      return output
    });
}

export function getDataFile(name: string, typeFile?: string): Promise<string> {
  //Del when routing is ok
  name = "generate-event";
  if (typeFile === "md") return axios.get(`http://localhost:3000/pages/${name}/content.md`).then((r) => { return r.data; });
  if (typeFile === "json") return axios.get(`http://localhost:3000/pages/${name}/metadata.json`).then((r) => { return r.data; });
  return axios
    .get(`http://localhost:3000/pages/${name}/source.ts`)
    .then((r) => {
      return r.data;
    });
}

