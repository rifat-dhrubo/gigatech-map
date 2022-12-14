import { useQuery } from "@tanstack/react-query";
import React from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import { WorldMap } from "react-svg-worldmap";

import "./App.css";

import { Country, getSummaryData } from "./services/index";

type DataShape = {
  country: string;
  value: number;
};

function App() {
  const { data: apiData, isLoading } = useQuery({ ...getSummaryData() });
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null
  );

  const data = React.useMemo(() => {
    return apiData?.Countries?.map((country) => {
      const temp: DataShape = {
        country: country?.CountryCode,
        value: country.TotalDeaths,
      };
      return temp;
    });
  }, [apiData]);

  const handleSelect = (
    newValue: SingleValue<Country>,
    actionMeta: ActionMeta<Country>
  ) => {
    if (actionMeta.action === "select-option") {
      setSelectedCountry(newValue);
    }
    if (
      actionMeta.action === "clear" ||
      actionMeta.action === "deselect-option"
    ) {
      setSelectedCountry(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto mt-12">
        <header className="mb-12">
          <Select
            className="basic-single"
            classNamePrefix="select"
            isLoading={isLoading}
            isClearable={true}
            isSearchable={true}
            options={apiData?.Countries}
            getOptionLabel={(option) => `${option.Country}`}
            onChange={handleSelect}
          />
        </header>
        {data != null && !isLoading ? (
          <div>
            <div className="m-auto map-wrapper">
              <WorldMap
                color="red"
                title="Covid deaths by country"
                value-suffix="people"
                size="responsive"
                data={data}
              />
            </div>
            {selectedCountry != null ? (
              <dl className="text-lg text-gray-600">
                <dt className="flex justify-center gap-2 ">
                  <p>Country:</p>
                  <p>{selectedCountry.Country}</p>
                </dt>
                <dd className="flex justify-center gap-2 font-semibold text-red-600">
                  <p>Deaths:</p>
                  <p>{selectedCountry.TotalDeaths}</p>
                </dd>
              </dl>
            ) : null}
          </div>
        ) : (
          <div className="flex flex-col gap-5 text-center">
            <p className="text-2xl text-black">{apiData?.Message}</p>
            <p className="text-base text-gray-600">
              Data not avialable now. Please try again later
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
