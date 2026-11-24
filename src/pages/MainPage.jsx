import { Fragment } from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import Search from "../components/Search";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { rickMortyActions } from "../redux/slice/rickmorty.slice";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function MainPage() {
    const reduxState = useSelector((state) => state.data);
    const reduxDispatch = useDispatch();
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();

    function searchChar(name) {
        if (!name) {
            setParams(undefined);
            return;
        }
        setParams({ name });
    }

    useEffect(() => {
        const name = params.get("name");
        const status = params.get("status");
        const query = {};
        if (name || status) {
            if (name) query["name"] = name;
            if (status) query["status"] = status;
            reduxDispatch(rickMortyActions.filterCharachters(query));
            return;
        }
        reduxDispatch(rickMortyActions.getAllCharacters());
    }, [params, reduxDispatch]);

    function setStatusParams(status) {
        const query = {};
        const name = params.get("name");
        if (status) query["status"] = status;
        if (name) query["name"] = name;
        setParams(query);
    }

    return (
        <Fragment>
            <h1 className="px-6 pt-6 text-6xl text-slate-900 font-extrabold">
                Rick & Morty wiki
            </h1>
            <p className="p-6 text-xl max-w-200 text-slate-500">
                Search any rick and morty charachters from any episodes
            </p>
            <Search
                defaultValue={params.get("name")}
                funcSubmitEvent={searchChar}
            />
            <div className="w-full p-4 flex gap-4">
                <button
                    className={
                        "w-full border border-black rounded-lg px-4 py-2 cursor-pointer " +
                        (params.get("status") == "alive"
                            ? "bg-black text-white"
                            : "")
                    }
                    onClick={() => setStatusParams("alive")}
                >
                    Alive
                </button>
                <button
                    className={
                        "w-full border border-black rounded-lg px-4 py-2 cursor-pointer " +
                        (params.get("status") == "dead"
                            ? "bg-black text-white"
                            : "")
                    }
                    onClick={() => setStatusParams("dead")}
                >
                    Dead
                </button>
                <button
                    className={
                        "w-full border border-black rounded-lg px-4 py-2 cursor-pointer " +
                        (params.get("status") == "unknown"
                            ? "bg-black text-white"
                            : "")
                    }
                    onClick={() => setStatusParams("unknown")}
                >
                    Unknown
                </button>
                <button
                    className="w-full border border-red-600 bg-red-100 text-red-600 rounded-lg px-4 py-2 cursor-pointer "
                    onClick={() => setStatusParams(null)}
                >
                    Reset
                </button>
            </div>
            <div className="grid w-full p-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 justify-center items-center content-center">
                {reduxState.status.isLoading && (
                    <div>
                        <span>Loading...</span>
                    </div>
                )}
                {reduxState.status.errorMessage && (
                    <div>
                        <span>{reduxState.status.errorMessage}</span>
                    </div>
                )}
                {reduxState.status.isSuccess &&
                    reduxState.characters?.map((data) => {
                        return (
                            <Card
                                onClick={() => {
                                    navigate("/detail");
                                    reduxDispatch(
                                        rickMortyActions.getCharacterDetail(
                                            data.id,
                                        ),
                                    );
                                }}
                                imageUrl={data.image}
                                name={data.name}
                                key={`char-${data.id}`}
                            />
                        );
                    })}
            </div>
        </Fragment>
    );
}
