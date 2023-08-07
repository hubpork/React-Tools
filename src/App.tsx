import * as React from "react"
import {
	ChakraProvider,
	Center,
	Box,
	Flex,
	Grid,
	Heading,
	Divider,
	Text,
	Link,
	theme
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Network from "./components/Network"
import Profile from "./components/Gallery"
import PackingList from "./components/PackageList"
import PriceComparer from "./components/PriceComparer"
import WeatherForecast from "./components/WeatherForecast"
import AareGuru from "./components/AareGuru"
import ShowList from "./components/Mixcloud"

export const App = () => (
	
	<ChakraProvider theme={theme}>
		<Center p={4}>
			<Box mx="auto" fontSize="xl" w='100%' maxW='8xl'>
				<Grid py={4}>
					<ColorModeSwitcher justifySelf="flex-end" />
					<Heading as='h1'>
						Little React Tools
					</Heading>
					<Flex alignItems='center' gap={2}>
						Created by<Link href='https://www.maillard.dev/'>maillard.dev</Link>/<Network /></Flex>
				</Grid>
				<Grid py={4}>
					<Heading as='h2'>
						Weather Forecast
					</Heading>
					<Text>Goal: Data fetch of weather forecast. Get an API Key at <a href="https://openweathermap.org/api">openweathermap.org</a></Text>
					<WeatherForecast />
				</Grid>
				<Center height='50px'>
					<Divider />
				</Center>
				<Grid py={4}>
					<Heading as='h2'>
						Aare Guru
					</Heading>
					<Text>Goal: Data fetch of the river Aare.</Text>
					<AareGuru />
				</Grid>
				<Center height='50px'>
					<Divider />
				</Center>
				<Grid py={4}>
					<Heading as='h2'>
						Packing list
					</Heading>
					<Text>Goal: Packing list tool</Text>
					<PackingList />
				</Grid>
				<Center height='50px'>
					<Divider />
				</Center>
				<Grid py={4}>
					<Heading as='h2'>
						Price comparator
					</Heading>
					<Text>Goal: Price comparing</Text>
					<PriceComparer />
				</Grid>
				<Center height='50px'>
					<Divider />
				</Center>
				<Grid py={4}>
					<Heading as='h2'>
						Amazing scientists
					</Heading>
					<Text>Goal: Data fetch inside the component</Text>
					<Profile />
				</Grid>
				<Center height='50px'>
					<Divider />
				</Center>

				<Grid py={4}>
					<Heading as='h2'>
						Mixcloud List
					</Heading>
					<Text>Goal: Data fetch of my mixcloud channel.</Text>
					<ShowList />
				</Grid>
			</Box>
		</Center>
	</ChakraProvider>
)
