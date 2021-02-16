import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

export default function pokemon({ oneMon }) {
	return <Layout title={oneMon.name}>
        <h1 className="text-4-xl mb-2 text-center capitalize">{oneMon.name}</h1>
        <img className="mx-auto" src={oneMon.image} alt={oneMon.name}/>
        <p><span className="font-bold mr-2">Weight: </span>{oneMon.weight} cm</p>
        <p><span className="font-bold mr-2">Height: </span>{oneMon.height} kg</p>
        <h2 className="text-2xl mt-6 mb-2">Types</h2>
        {oneMon.types.map((type, index) => <p key={index}>{type.type.name}</p>)}
        <p className="mt-10 text-center">
            <Link href="/">
                <a className="text-2xl underline bg-gray-900 rounded-md py-2 px-3 text-white">Home</a>
            </Link>
        </p>
    </Layout>;
}

export async function getServerSideProps({ query }) {
	const id = query.id;
	try {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const oneMon = await res.json();
		const paddedIndex = ("00" + id).slice(-3);
		const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
		oneMon.image = image;
		return {
			props: { oneMon },
		};
	} catch (err) {
		console.error(err);
	}
}
