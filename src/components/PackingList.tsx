import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa";
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
			<p color="text-teal-600">
			    {name + " ✔"}
			</p>
		);
	}
	return (
		<li className="flex items-center justify-between gap-2 py-4 border border-t-0 border-x-0">
            <button title="remove" aria-label='Search database' onClick={onRemove}><FaTimes color="red" /></button>
                {itemContent}
            <button className="ml-auto" onClick={onTogglePacked}>{isPacked ? "Unpack" : "💼 Pack "}</button>
		</li>
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
		<section className="grid mt-0 stack stack--small print:hidden">
            <div className="grid">
                <h2 className="mb-2 text-4xl font-bold">Packing list</h2>
                <p>Goal: Packing list tool</p>
            </div>
			<div className="flex gap-4">
				<input
                    className="block w-full p-3 text-black bg-white border border-gray-300 appearance-none rounded placeholder:text-gray-400 focus:border-slate-500 focus:outline-none focus:ring-slate-500"
					type="text"
					value={newItemName}
					onChange={(e) => setNewItemName(e.target.value)}
					placeholder="Add an item"
				/>
				<button className="shrink hover:brightness-110 font-bold py-3 px-6 rounded bg-teal-700 shadow-lg text-white whitespace-nowrap" onClick={handleAddItem}>
					Add Item
				</button>
			</div>
			<div className="flex flex-wrap md:flex-nowrap gap-4">
				<input
                    className="block w-full p-3 text-black bg-white border border-gray-300 appearance-none rounded placeholder:text-gray-400 focus:border-slate-500 focus:outline-none focus:ring-slate-500"
					type="text"
					value={searchQuery}
					onChange={(e) => handleSearchQueryChange(e.target.value)}
					placeholder="Search items"
				/>
				<button
                    className={`grow md:shrink hover:brightness-110 font-bold py-3 px-6 rounded shadow-lg text-white whitespace-nowrap ${filter === "all" ? "bg-teal-700" : "bg-gray-400"}`}
					onClick={() => handleFilterChange("all")}
				>
					All
				</button>
				<button
                    className={`grow md:shrink hover:brightness-110 font-bold py-3 px-6 rounded shadow-lg text-white whitespace-nowrap ${filter === "packed" ? "bg-teal-700" : "bg-gray-400"}`}
					onClick={() => handleFilterChange("packed")}
				>
					Packed
				</button>
				<button
                    className={`grow md:shrink hover:brightness-110 font-bold py-3 px-6 rounded shadow-lg text-white whitespace-nowrap ${filter === "unpacked" ? "bg-teal-700" : "bg-gray-400"}`}
					onClick={() => handleFilterChange("unpacked")}
				>
					Unpacked
				</button>
			</div>
			<ul>
				{searchedItems.map((item, index) => (
                    <Item 
                        key={index}
                        name={item.name}
                        isPacked={item.isPacked}
                        onRemove={() => handleRemoveItem(index)}
                        onTogglePacked={() => handleTogglePacked(index)}
                        />
				))}
			</ul>
		</section>
	);
}