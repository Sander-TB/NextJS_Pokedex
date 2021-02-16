import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link"

export default function Home({ pokemon }) {
	return (
		<Layout title="NextJS Pokédex">
			<h1 className="text-4xl mb-8 text-center">NextJS Pokédex</h1>
      <ul>
        {pokemon.map((oneMon, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <img className="w-20 h-20 mr-3" src={oneMon.image} alt={oneMon.name} />
                <span className="m2-3 font-bold">{index + 1}.</span>
                {oneMon.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
		</Layout>
	);
}

export async function getStaticProps(context) {
	try {
		const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
		const { results } = await res.json();
		const pokemon = results.map((result, index) => {
			const paddedIndex = ("00" + (index + 1)).slice(-3);
			const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
			return {
				...result,
				image,
			};
		});
		return {
			props: { pokemon },
		};
	} catch (err) {
		console.error(err);
	}
}
