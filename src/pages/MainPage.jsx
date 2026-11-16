import { Fragment, useState } from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import Search from "../components/Search";
import { useSearchParams } from "react-router";

export default function MainPage() {
    const url = "https://rickandmortyapi.com/api/character";
    const [characters, setCharacters] = useState([]);
    const [filter, setFilter] = useState([]);
    const [params, setParams] = useSearchParams();

    function searchChar(query) {
        if (!query) {
            setParams(undefined);
            return;
        }
        setParams({q: query});
    }

    useEffect(() => {
        async function getData() {
            const raw = await fetch(url);
            const json = await raw.json();
            setCharacters(json.results);
            const q = params.get("q");
            if (q) {
                setFilter(json.results.filter((d) => {
                    return d.name.toLowerCase().includes(q.toLowerCase());
                }));
            } else {
                setFilter(json.results);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        const q = params.get("q");
        if (q) {
            setFilter(characters.filter((d) => {
                return d.name.toLowerCase().includes(q.toLowerCase());
            }));
        } else {
            setFilter(characters);
        }
    },[params]);

    return (
        <Fragment>
            <h1 className="px-6 pt-6 text-6xl text-slate-900 font-extrabold">
                Rick & Morty wiki
            </h1>
            <p className="p-6 text-xl max-w-200 text-slate-500">
                Search any rick and morty charachters from any episodes
            </p>
            <Search defaultValue={params.get("q")} funcSubmitEvent={searchChar} />
            <div className="grid w-full p-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 justify-center items-center content-center">
                {filter.map((data) => {
                    return (
                        <Card
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
