import * as React from "react"

import useLocalStorage from "use-local-storage";
import { FaMoon, FaSun } from "react-icons/fa";

import Network from "./components/Network"
import MixcloudPlaylist from "./components/MixcloudPlaylist"
import WeatherForecast from "./components/WeatherForecast"
import AareGuru from "./components/AareGuru"
import PackingList from "./components/PackingList"
import PriceComparer from "./components/PriceComparer"
import ElectricityCostCalculator from "./components/ElectricityCostCalculator"

export const App = () => {
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  
	const switchTheme = () => {
	  const newTheme = theme === 'light' ? 'dark' : 'light';
	  setTheme(newTheme);
	}
  
  
	return (
		<main data-mode={theme} className="block">
			<div className="bg-white dark:bg-neutral-800 text-black dark:text-white grow">
				<div className="layout mx-auto lg:py-10 stack--small print:hidden">
					<button onClick={switchTheme} aria-label="Filter" className={`${theme === 'light' ? 'sun' : 'moon'}`}>
						{theme === 'light' ? <FaSun /> : <FaMoon />}
					</button>
					<div>
						<h1 className="block text-6xl font-bold">React Tools Playground</h1>
						<div className="mt-3 text-sm text-neutral-500 dark:text-white font-light">Created by <a href='https://www.maillard.dev/'>maillard.dev</a> / <Network /></div>
					</div>
				</div>

				<div className="layout mx-auto lg:py-10 stack--large">
					<MixcloudPlaylist />
					<WeatherForecast />
					<AareGuru />
					<PackingList />
					<PriceComparer />
					<ElectricityCostCalculator />

				</div>
			</div>
		</main>
	);
  };
