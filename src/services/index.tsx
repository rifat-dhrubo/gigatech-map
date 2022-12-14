import axios from "axios";

export interface ApiResponse {
  ID: string;
  Message: string;
  Global: Global;
  Countries: Country[];
  Date: string;
}

export interface Global {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
}

export interface Country {
  ID: string;
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
  Premium: any;
}

export const getSummaryData = () => {
  return {
    queryFn() {
      return axios
        .get<ApiResponse>("https://api.covid19api.com/summary")
        .then(({ data }) => data);
    },
    queryKey: ["getSummaryData"],
  };
};
