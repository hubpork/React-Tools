import React, { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons'
import {
    Text,
    Flex,
    List,
    ListItem,
    Input,
    Button,
    IconButton
} from "@chakra-ui/react"

// Interface for specifying the props of the Item component
interface ItemProps {
	name: any;
	isPacked: boolean;
	onRemove: () => void;
	onTogglePacked: () => void; // Callback function to toggle packed status
}

// Function component for rendering an individual item in the packing list
function Item({ name, isPacked, onRemove, onTogglePacked }: ItemProps) {
	let itemContent = name;
	if (isPacked) {
		// If the item is packed, modify the item content to include a green checkmark
		itemContent = (
			<Text color="green.500">
			{name + " ✔"}
			</Text>
		);
	}
	return (
		<ListItem>
			<Flex 
				borderRadius='md'
				border='1px' 
				borderColor='gray.200'
				py={1}
				px={2}
				alignItems='center'
				my={2}
				gap={2}
				flexWrap='wrap'
				fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }} 
				maxW={{
					base: '100%',
					lg: '75%', // 80em+
				}}
			>
				<IconButton title="remove" bg="transparent" color="red" _hover={{ background: "white", color: "black"}}  flexShrink={0} size='sm' aria-label='Search database' icon={<CloseIcon />} onClick={onRemove} />
				{itemContent}
				<Button ml="auto" flexShrink={0} onClick={onTogglePacked} width={{ base: '100%', md: 'auto' }}>{isPacked ? "Unpack" : "💼 Pack "}</Button>
			</Flex>
		</ListItem>
	);
}

export default function PackingList() {
	const [newItemName, setNewItemName] = useState("");

	// State variable for the list of items
	const [items, setItems] = useState([
		{ name: "Space suit", isPacked: true },
		{ name: "Helmet with a golden leaf", isPacked: true },
		{ name: "Photo of Tam", isPacked: false }
	]);
	const [filter, setFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	// Event handler for adding a new item to the list
	const handleAddItem = () => {
		if (newItemName.trim() !== "") {
			setItems([...items, { name: newItemName, isPacked: false }]);
			setNewItemName("");
		}
	};

	// Event handler for removing an item from the list
	const handleRemoveItem = (index: number) => {
		const updatedItems = [...items];
		updatedItems.splice(index, 1);
		setItems(updatedItems);
	};

	// Event handler for toggling the packed status of an item
	const handleTogglePacked = (index: number) => {
		const updatedItems = [...items];
		updatedItems[index].isPacked = !updatedItems[index].isPacked;
		setItems(updatedItems);
	};

	// Event handler for changing the filter value
	const handleFilterChange = (value: string) => {
		setFilter(value);
	};

	// Event handler for changing the search query
	const handleSearchQueryChange = (value: string) => {
		setSearchQuery(value);
	};

	// Filter the items based on the selected filter value
	const filteredItems = items.filter((item) => {
		if (filter === "packed") {
			return item.isPacked;
		} else if (filter === "unpacked") {
			return !item.isPacked;
		} else {
			return true;
		}
	});

	const searchedItems = filteredItems.filter((item) =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<section>
			<Flex gap={4} mt={4} maxW={{ base: '100%', lg: '75%' }} flexWrap='wrap'>
				<Input
					type="text"
					value={newItemName}
					onChange={(e) => setNewItemName(e.target.value)}
					placeholder="Add an item"
				/>
				<Button colorScheme="teal" variant="solid" flexShrink={0} onClick={handleAddItem}>
					Add Item
				</Button>
			</Flex>
			<Flex gap={4} mt={4} maxW={{ base: '100%', lg: '75%' }} flexWrap='wrap'>
				<Input
					type="text"
					value={searchQuery}
					onChange={(e) => handleSearchQueryChange(e.target.value)}
					placeholder="Search items"
				/>
				<Button
					colorScheme={filter === "all" ? "teal" : "gray"}
					variant={filter === "all" ? "solid" : "outline"}
					onClick={() => handleFilterChange("all")}
				>
					All
				</Button>
				<Button
					colorScheme={filter === "packed" ? "teal" : "gray"}
					variant={filter === "packed" ? "solid" : "outline"}
					onClick={() => handleFilterChange("packed")}
				>
					Packed
				</Button>
				<Button
					colorScheme={filter === "unpacked" ? "teal" : "gray"}
					variant={filter === "unpacked" ? "solid" : "outline"}
					onClick={() => handleFilterChange("unpacked")}
				>
					Unpacked
				</Button>
			</Flex>
			<List>
				{searchedItems.map((item, index) => (
					<Item
					key={index}
					name={item.name}
					isPacked={item.isPacked}
					onRemove={() => handleRemoveItem(index)}
					onTogglePacked={() => handleTogglePacked(index)}
					/>
				))}
			</List>
		</section>
	);
}