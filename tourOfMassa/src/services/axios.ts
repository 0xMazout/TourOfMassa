import axios from "axios";

interface IRunRequest {
	source: string;
}

interface IRunResponse {
	data: string;
}

export function run(source: string): Promise<string> {
	return axios.post<IRunRequest, IRunResponse>('http://localhost:3000/run', {
		source
	}).then((r) => {
		return r.data;
	});
}
