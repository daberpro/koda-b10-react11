import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function DetailPage() {

    const data = useSelector((state) => state.data);
    const navigate = useNavigate();

    useEffect(() => {
        if (!data.character && data.status.isSuccess) {
            navigate(-1);
       }
    },[data,navigate]);

  return (
      <div className="w-full h-screen flex justify-center items-center flex-col gap-4">
          <button onClick={() => {
              navigate(-1);
          }} className="w-100 text-xl cursor-pointer text-blue-400">Back to prev page</button>
          <div className="p-4 w-100 rounded-lg border border-black flex flex-col gap-4">
              <img src={data.character?.image} alt={data.character?.name} />
              <h1 className="text-2xl font-bold">{data.character?.name}</h1>
              <ul className="*:p-2 *:bg-white flex gap-4 flex-col">
                  <li>Status : {data.character?.status}</li>
                  <li>Species: {data.character?.species}</li>
                  <li>Type: {data.character?.type}</li>
                  <li>Gender: {data.character?.gender}</li>
                  <li>Origin: {data.character?.origin?.name}</li>
                  <li>Location: {data.character?.location?.gender}</li>
              </ul>
          </div>
    </div>
  );
}
