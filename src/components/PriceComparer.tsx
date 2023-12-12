import React, { useState } from 'react';
import PriceComparerVar from '../PriceComparerVar';
import { FaStar, FaRegStar } from "react-icons/fa";

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
		<li onClick={onItemClick} className="cursor-pointer">
			<div className={`flex items-center justify-between gap-2 py-4 border border-t-0 border-x-0 ${isCustom ? "green.500" : "inherit"}`}>
					{isPremium ? <FaStar title="Premium" /> : <FaRegStar />}
					{itemContent}
					{isSelected && <span>&#x2714;</span>}
					{savingPercentage < 0 ? (
						<p className="ml-auto">no saving</p>
					) : (
						<p className="ml-auto">save {savingPercentage.toFixed(2)}%</p>
					)}
			</div>
		</li>
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
		<section className="grid mt-0 stack stack--small print:hidden">
            <div className="grid">
                <h2 className="mb-2 text-4xl font-bold">Price comparator</h2>
                <p>Goal: Price comparing</p>
            </div>
			<div className="flex gap-4">
				<input
                    className="block w-full p-3 text-black bg-white border border-gray-300 appearance-none rounded placeholder:text-gray-400 focus:border-slate-500 focus:outline-none focus:ring-slate-500"
					placeholder="Custom product name"
					value={customName}
					onChange={(e) => setCustomName(e.target.value)}
				/>
				<input
                    className="appearance-none block w-full p-3 text-black bg-white border border-gray-300 appearance-none rounded placeholder:text-gray-400 focus:border-slate-500 focus:outline-none focus:ring-slate-500"
					type="number"
                    min="1" max="1000"
					placeholder="Price Per Month"
					value={customPrice}
					onChange={(e) => setCustomPrice(parseFloat(e.target.value))}
				/>
				<button className="shrink hover:brightness-110 font-bold py-3 px-6 rounded bg-teal-700 shadow-lg text-white whitespace-nowrap" onClick={onAddCustomItem}>
					Add Custom Item
				</button>

				<button className="shrink hover:brightness-110 font-bold py-3 px-6 rounded bg-teal-700 shadow-lg text-white whitespace-nowrap" onClick={onTogglePremium} title="Premium">
					{isPremium ? <FaStar /> : <FaRegStar />}
				</button>
			</div>
			<p className="text-xl text-teal-700 dark:text-teal-500">If you want a product other than the "Best Value" product we have selected, click and select your favorite! (Average price $ 500)</p>
			<ul>
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
			</ul>
            <div>
                <p className="text-xl text-teal-700 dark:text-teal-500 font-bold">
                    Best saving: {chosenProduct} - {bestSavingPercentage.toFixed(2)}% off
                </p>
                {selectedItem && (
                    <p className="text-xl text-orange-500 font-bold mt-0">
                        You chose {selectedItem.name} with a price of ${selectedItem.pricePerMonth} per month.
                    </p>
                )}
            </div>
		</section>
	);
}
