import { apiUrl } from "@utils/apiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

type Props = {};

function ConventionalDatabase({}: Props) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState([]);

  const saveToDatabaseHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${apiUrl}/sensor/create`, {
        value: value,
        name: name,
      });
      setValue("");
      setName("");
      setLoading(false);

      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllValues = async () => {
    const { data } = await axios.get(`${apiUrl}/sensor/all`);
    setValues(data.values);
  };

  const refrePage = () => {
    window.location.reload();
  };

  useEffect(() => {
    getAllValues();
  }, []);

  console.log(values?.values);

  const values1 = [
    { name: "akjaksd", value: "9999" },
    { name: "akjaksd", value: "9999" },
    { name: "akjaksd", value: "9999" },
    { name: "akjaksd", value: "9999" },
    { name: "akjaksd", value: "9999" },
    { name: "akjaksd", value: "9999" },
    { name: "akjaksd", value: "9999" },
  ];

  return (
    <div className="col-span-1 h-full p-4">
      {/* heading */}
      <div className="grid grid-cols-3 items-center pb-8">
        <div className="col-span-1"></div>
        <p className="text-center text-slate-900 font-medium capitalize text-3xl">
          conventional database
        </p>
        <div
          onClick={refrePage}
          className="col-span-1 cursor-pointer grid items-center content-center justify-center"
        >
          <ArrowPathIcon height={24} width={24} />
        </div>
      </div>
      {/* form */}
      <div className="grid grid-cols-3 gap-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-slate-200 p-2 rounded-lg col-span-1"
          placeholder="tank name"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border border-slate-200 p-2 rounded-lg col-span-1"
          placeholder="level value"
        />
        <button
          onClick={
            loading ? () => console.log("loading") : saveToDatabaseHandler
          }
          className="bg-cyan-700 text-white text-center px-4 py-2 rounded-lg hover:bg-cyan-800"
        >
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
      {/* table */}
      <div className="grid grid-cols-2 py-2 divide-x divide-slate-200 ">
        <div className="col-span-1 border-y text-center border-slate-200 capitalize text-slate-900 font-medium">
          tank name
        </div>
        <div className="cols-span-1 border-y text-center border-slate-200 capitalize text-slate-900 font-medium">
          level (Metres)
        </div>
      </div>
      {values?.map((item: any, index) => (
        <div
          key={index}
          className="grid grid-cols-2 divide-x divide-slate-200 "
        >
          <div className="col-span-1 text-center border-slate-200 capitalize text-slate-900 font-medium">
            {item.name}
          </div>
          <div className="cols-span-1 text-center border-slate-200 text-slate-900 font-medium">
            {item.value}m
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConventionalDatabase;
