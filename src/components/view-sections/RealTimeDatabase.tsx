import { apiUrl } from "@utils/apiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment'

type Props = {}

function RealTimeDatabase({}: Props) {
    const [name, setName] = useState("");
  const [value, setValue] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<any>([]);

  const saveToDatabaseHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${apiUrl}/sensor/create-realtime`, {
        value: value,
        name: name,
      });
      setValue("");
      setName("");
      setLoading(false);
      setValues([...values, data.item])

      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllValues = async () => {
    const { data } = await axios.get(`${apiUrl}/sensor/all-realtime`);
    setValues(data.values);
  };

  useEffect(() => {
    getAllValues();
  }, []);

  return (
    <div className="col-span-1 h-full p-4">
    {/* heading */}
    <div className="grid grid-cols-3 items-center pb-8">
      <div className="col-span-1"></div>
      <p className="text-center text-slate-900 font-medium capitalize text-3xl">
        Real time database
      </p>
      <div
        className="col-span-1 cursor-pointer grid items-center content-center justify-center"
      >
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
        className="bg-emerald-700 text-white text-center px-4 py-2 rounded-lg hover:bg-emerald-800"
      >
        {loading ? "Loading..." : "Save"}
      </button>
    </div>
    {/* table */}
    <div className="grid grid-cols-3 py-2 divide-x divide-slate-200 ">
      <div className="col-span-1 border-y text-center border-slate-200 capitalize text-slate-900 font-medium">
        tank name
      </div>
      <div className="cols-span-1 border-y text-center border-slate-200 capitalize text-slate-900 font-medium">
        level (metres)
      </div>
      <div className="cols-span-1 border-y text-center border-slate-200 capitalize text-slate-900 font-medium">
        time
      </div>
    </div>
    {values?.map((item: any, index:number) => (
      <div
        key={index}
        className="grid grid-cols-3 divide-x divide-slate-200 "
      >
        <div className="col-span-1 text-center border-slate-200 capitalize text-slate-900 font-medium">
          {item.name}
        </div>
        <div className="cols-span-1 text-center border-slate-200 text-slate-900 font-medium">
          {item.value}m
        </div>
        <div className="cols-span-1 text-center border-slate-200 capitalize text-slate-900 font-medium">
          {moment(item.createdAt).fromNow()}
        </div>
        
      </div>
    ))}
  </div>
  )
}

export default RealTimeDatabase