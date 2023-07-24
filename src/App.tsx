import * as React from "react"
import {
	ChakraProvider,
	Center,
	Box,
	SimpleGrid,
	Grid,
	Heading,
	Divider,
	Text,
	theme
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Profile from "./components/Gallery"
import PackingList from "./components/PackageList"
import PriceComparer from "./components/PriceComparer"
import WeatherForecast from "./components/WeatherForecast"

export const App = () => (
	
	<ChakraProvider theme={theme}>
		<Center p={4}>
			<Box mx="auto" fontSize="xl" w='100%' maxW='8xl'>
				<Grid py={4}>
					<ColorModeSwitcher justifySelf="flex-end" />
					<Heading as='h2'>
						Weather Forecast
					</Heading>
					<Text>Get an API Key at <a href="https://openweathermap.org/api">openweathermap.org</a></Text>
					<WeatherForecast />
				</Grid>
				<Center height='50px'>
					<Divider />
				</Center>
				<Grid py={4}>
					<Heading as='h2'>
						Packagelist
					</Heading>
					<PackingList />
				</Grid>
				<Center height='50px'>
					<Divider />
				</Center>
				<Grid py={4}>
					<Heading as='h2'>
						Price Comparer
					</Heading>
					<PriceComparer />
				</Grid>
				<Center height='50px'>
					<Divider />
				</Center>
				<Grid py={4}>
					<Heading as='h2'>
						Amazing scientists
					</Heading>
					<Profile />
				</Grid>
				<Center height='50px'>
					<Divider />
				</Center>
				<Grid py={4}>
					<SimpleGrid columns={[1, 2, 3]} spacing='2rem' py={3}>
						<Box bg='tomato' height='80px'></Box>
						<Box bg='tomato' height='80px'></Box>
						<Box bg='tomato' height='80px'></Box>
						<Box bg='tomato' height='80px'></Box>
						<Box bg='tomato' height='80px'></Box>
					</SimpleGrid>
				</Grid>

			</Box>
		</Center>
	</ChakraProvider>
)
