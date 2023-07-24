import React, { useState } from 'react';
import PriceComparerVar from '../PriceComparerVar';
import { Flex, Text, Box, List, ListItem, Button, Input } from "@chakra-ui/react";
import { FaStar, FaRegStar, FaPlus } from "react-icons/fa";

// Interface for the props of the Item component
interface ItemProps {
	name: string;
	pricePerMonth: number;
	isPremium: boolean;
	isCustom: boolean;
	setSelectedItem: (item: ItemProps | null) => void;
	selectedItem: ItemProps | null;
}

// Item component
function Item({ name, pricePerMonth, isPremium, isCustom, setSelectedItem, selectedItem }: ItemProps) {

	// Function to handle item click event
	const onItemClick = () => {
		setSelectedItem({ name, pricePerMonth, isPremium, isCustom, setSelectedItem, selectedItem });
	};

	let itemContent = name;
	const standardPrice = PriceComparerVar;
	const savingPercentage = ((standardPrice - pricePerMonth) / standardPrice) * 100;
	const isSelected = selectedItem && selectedItem.name === name;

	return (
		<ListItem onClick={onItemClick} cursor='pointer'>
			<Flex
				borderRadius='md'
				border='1px' 
				borderColor='gray.200'
				p={2}
				my={2}
				gap={2}
				maxW={{ base: '100%', lg: '75%' }}
				alignItems='center'
				fontSize={{ base: 'lg', lg: 'xl' }}
				color={isCustom ? "green.500" : "inherit"}
				>
					{isPremium ? <FaStar title="Premium" /> : <FaRegStar />}
					{itemContent}
					{isSelected && <span>&#x2714;</span>}
					{savingPercentage < 0 ? (
						<Box ml="auto">no saving</Box>
					) : (
						<Box ml="auto">save {savingPercentage.toFixed(2)}%</Box>
					)}
			</Flex>
		</ListItem>
	);
}

// PriceComparer component
export default function PriceComparer() {

	// items: an array of ItemProps representing the items in the list
	const [items, setItems] = useState<ItemProps[]>([
		{ name: "Product Maeve", pricePerMonth: 120, isPremium: true, isCustom: false, setSelectedItem: () => {}, selectedItem: null },
		{ name: "Product Odin", pricePerMonth: 150, isPremium: false, isCustom: false, setSelectedItem: () => {}, selectedItem: null },
		{ name: "Product Perseus", pricePerMonth: 250, isPremium: true, isCustom: false, setSelectedItem: () => {}, selectedItem: null },
		{ name: "Product Rhiannon", pricePerMonth: 350, isPremium: false, isCustom: false, setSelectedItem: () => {}, selectedItem: null }
	]);

	// isPremium: a boolean indicating whether the premium filter is enabled
	const [isPremium, setIsPremium] = useState(false);
	// customName: a string representing the name of the custom item being added
	const [customName, setCustomName] = useState("");
	// customPrice: a number representing the price of the custom item being added
	const [customPrice, setCustomPrice] = useState(0);
	// selectedItem: an ItemProps object representing the currently selected item
	const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);

	// Function to toggle premium status
	const onTogglePremium = () => {
		setIsPremium(!isPremium);
	};

	// Function to add a custom item
	const onAddCustomItem = () => {
		if (customName && customPrice > 0) {
			const newItem: ItemProps = {
			name: customName,
			pricePerMonth: customPrice,
			isPremium: isPremium,
			isCustom: true,
			setSelectedItem: () => {},
				selectedItem: null
			};
			setItems([...items, newItem]);
			setCustomName("");
			setCustomPrice(0);
		}
	};

	// Function to sort items by saving
	const sortItemsBySaving = (items: ItemProps[]) => {
		const standardPrice = PriceComparerVar;
		return items.sort((a, b) => {
			const savingA = standardPrice - a.pricePerMonth;
			const savingB = standardPrice - b.pricePerMonth;
			return savingB - savingA;
		});
	};

	const filteredItems = isPremium ? items.filter(item => item.isPremium) : items;
	const sortedItems = sortItemsBySaving(filteredItems);

	const bestSavingItem = sortedItems[0];
	const chosenProduct = bestSavingItem ? bestSavingItem.name : "";
	const bestSavingPercentage = bestSavingItem
	? ((PriceComparerVar - bestSavingItem.pricePerMonth) / PriceComparerVar) * 100
	: 0;

	return (
		<section>
			<Flex my={4} maxW={{ base: '100%', lg: '75%' }} gap={2} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
				<Input
					placeholder="Custom product name"
					value={customName}
					onChange={(e) => setCustomName(e.target.value)}
				/>
				<Input
					type="number"
					placeholder="Price Per Month"
					value={customPrice}
					onChange={(e) => setCustomPrice(parseFloat(e.target.value))}
				/>
				<Button onClick={onAddCustomItem} colorScheme="teal" variant="solid" flexShrink={0} gap={2}>
					<FaPlus /> Add Custom Item
				</Button>

				<Button ml="auto" flexShrink={0} onClick={onTogglePremium} title="Premium">
					{isPremium ? <FaStar /> : <FaRegStar />}
				</Button>
			</Flex>
			<Text my={4} fontSize={{ base: 'lg', lg: 'xl' }}>If you want a product other than the Best Value product we have selected, <br />click and select your favorite! (Average price $ 500) </Text>
			<List>
				{sortedItems.map((item, index) => (
					<Item
					key={index}
					name={item.name}
					pricePerMonth={item.pricePerMonth}
					isPremium={item.isPremium}
					isCustom={item.isCustom}
					setSelectedItem={setSelectedItem}
					selectedItem={selectedItem}
					/>
				))}
			</List>

			{selectedItem && (
				<Text fontSize={{ base: 'lg', lg: 'xl' }}>
					You chose {selectedItem.name} with a price of ${selectedItem.pricePerMonth} per month.
				</Text>
			)}
			<Text color="pink.500" fontSize={{ base: 'lg', lg: 'xl' }}>
				Best saving: {chosenProduct} - {bestSavingPercentage.toFixed(2)}% off
			</Text>
		</section>
	);
}
