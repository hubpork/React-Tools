import * as React from "react"
import {
	ChakraProvider,
	Center,
	Box,
	SimpleGrid,
	Grid,
	Heading,
	Divider,
	theme
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Profile from "./components/Gallery"
import PackingList from "./components/PackageList"
import PriceComparer from "./components/PriceComparer"

export const App = () => (
	
	<ChakraProvider theme={theme}>
		<Center p={4}>
			<Box mx="auto" fontSize="xl" w='100%' maxW='8xl'>
				<Grid py={4}>
					<ColorModeSwitcher justifySelf="flex-end" />
					<SimpleGrid columns={[1, 2, 3]} spacing='2rem' py={3}>
						<Box bg='tomato' height='80px'></Box>
						<Box bg='tomato' height='80px'></Box>
						<Box bg='tomato' height='80px'></Box>
						<Box bg='tomato' height='80px'></Box>
						<Box bg='tomato' height='80px'></Box>
					</SimpleGrid>
				</Grid>
				<Center height='50px'>
					<Divider orientation='vertical' />
				</Center>
				<Grid py={4}>
					<Heading as='h2'>
						Amazing scientists
					</Heading>
					<Profile />
				</Grid>
				<Center height='50px'>
					<Divider orientation='vertical' />
				</Center>
				<Grid py={4}>
					<Heading as='h2'>
						Packagelist
					</Heading>
					<PackingList />
				</Grid>
				<Center height='50px'>
					<Divider orientation='vertical' />
				</Center>
				<Grid py={4}>
					<Heading as='h2'>
						PriceComparer
					</Heading>
					<PriceComparer />
				</Grid>
				<Center height='50px'>
					<Divider orientation='vertical' />
				</Center>
			</Box>
		</Center>
	</ChakraProvider>
)
