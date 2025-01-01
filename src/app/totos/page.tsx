"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

type Field = {
    children: Field[];
    id: string;
    type: string;
    value: string;
};

type Item = {
    id: string;
    children: Field[];
};

function NestedTodos() {
    const [items, setItems] = useState<Item[]>([]);
    const [tempItems, setTempItems] = useState<Item[]>([]);

    console.log(items)

    // Handler to add a new item
    const addItem = () => {
        const newItem: Item = {
            id: uuidv4(),
            children: [
                {
                    id: uuidv4(),
                    type: "Field",
                    value: "",
                    children: [],
                },
            ],
        };
        setItems([...items, newItem]);
    };


    // Handler to add a new field to a specific item
    const addMenu = (itemId: string) => {
        const updatedItems = items.map((item) => {
            if (item.id === itemId) {
                const newField: Field = {
                    id: uuidv4(),
                    type: "Field",
                    value: "",
                    children: [],
                };
                item.children.push(newField);
            }
            return item;
        });
        setItems(updatedItems);
    };

    const handlePlusClick = (itemId: string, parentId: string | null = null, grandParentId: string | null = null) => {
        const updatedItems = items.map((item) => {
            if (item.id === itemId) {
                if (parentId === null) {
                    // Add to item
                    const newField: Field = {
                        id: uuidv4(),
                        type: "Field",
                        value: "",
                        children: [],
                    };
                    item.children.push(newField);
                } else {
                    // Add to a specific child
                    item.children = item.children.map((child) => {
                        if (child.id === parentId) {
                            if (grandParentId === null) {
                                const newField: Field = {
                                    id: uuidv4(),
                                    type: "Field",
                                    value: "",
                                    children: [],
                                };
                                child.children.push(newField);
                            } else {
                                // Add to a specific grandchild (child2)
                                child.children = child.children.map((child2) => {
                                    if (child2.id === grandParentId) {
                                        const newField: Field = {
                                            id: uuidv4(),
                                            type: "Field",
                                            value: "",
                                            children: [],
                                        };
                                        child2.children.push(newField);
                                    }
                                    return child2;
                                });
                            }
                        }
                        return child;
                    });
                }
            }
            return item;
        });
        setItems(updatedItems);
    };
    const handleChange = (
        itemId: string,
        fieldId: string,
        newValue: string,
        parentId: string | null = null,
        grandParentId: string | null = null
    ) => {
        const updatedItems = items.map((item) => {
            if (item.id === itemId) {
                return {
                    ...item,
                    children: item.children.map((child) => {
                        if (parentId === null && child.id === fieldId) {
                            // Update value at the top level
                            return {
                                ...child,
                                value: newValue,
                            };
                        }
                        if (parentId === child.id) {
                            return {
                                ...child,
                                children: child.children.map((child2) => {
                                    if (grandParentId === null && child2.id === fieldId) {
                                        // Update value at second level
                                        return {
                                            ...child2,
                                            value: newValue,
                                        };
                                    }
                                    if (grandParentId === child2.id) {
                                        return {
                                            ...child2,
                                            children: child2.children.map((child3) =>
                                                child3.id === fieldId
                                                    ? { ...child3, value: newValue }
                                                    : child3
                                            ),
                                        };
                                    }
                                    return child2;
                                }),
                            };
                        }
                        return child;
                    }),
                };
            }
            return item;
        });
        setItems(updatedItems);
    };
    const renderChildren = (children: any, level = 0) => {
        return children.map((child: any) => (
            <div
                key={child.id}
                className={`mt-3 ms-${level * 10} border-2 shadow p-4 rounded-[6px]`}
            >
                <h1>
                    <span className="font-semibold">Type : </span>
                    <span>{child.type}</span>
                </h1>
                <h1>
                    <span className="font-semibold">Value : </span>
                    <span>{child.value}</span>
                </h1>
                {child.children.length > 0 && renderChildren(child.children, level + 1)}
            </div>
        ));
    };
    return (
        <div className="flex gap-10">
            <div className="flex flex-col justify-center items-center gap-10">
                <div className="flex flex-col w-[500px] border-2 border-gray-400 rounded-[6px] p-4 max-h-[67vh] overflow-y-auto">
                    <button
                        className="uppercase h-fit w-fit px-6 py-2.5 bg-blue-500 text-white rounded-[6px] font-semibold shadow"
                        onClick={addItem} // Add item on click
                    >
                        Add Item
                    </button>

                    {
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="h-fit w-full border-2 border-gray-400 rounded-[6px] p-4 mt-5"
                            >
                                {
                                    item.children.map((child) => (
                                        <div className="relative mt-3" key={child.id}>
                                            <input
                                                type="text"
                                                value={child.value}
                                                className="p-1.5 px-3 rounded-[6px] outline-none border-2 border-gray-400 focus:border-blue-500"
                                                placeholder="Search"
                                                onChange={(e) => handleChange(item.id, child.id, e.target.value)} // Handle input change

                                            />
                                            <button
                                                className="px-6 text-sm py-2.5 ms-5 h-full bg-blue-500 text-white rounded-[6px] font-semibold shadow"
                                                onClick={() => handlePlusClick(item.id, child.id)} // Add field to specific child

                                            >
                                                <FaPlus />
                                            </button>
                                            {
                                                child.children.map((child2) => (
                                                    <div className="relative mt-3" key={child2.id} >
                                                        <input
                                                            type="text"
                                                            value={child2.value}
                                                            onChange={(e) => handleChange(item.id, child2.id, e.target.value, child.id)}
                                                            className="p-1.5 px-3 rounded-[6px] ms-5 outline-none border-2 border-gray-400 focus:border-blue-500"
                                                            placeholder="Search"
                                                        />
                                                        <button
                                                            className="px-6 text-sm py-2.5 ms-5  h-full bg-blue-500 text-white rounded-[6px] font-semibold shadow"
                                                            onClick={() => handlePlusClick(item.id, child.id, child2.id)}
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                        {
                                                            child2.children.map((child3) => (
                                                                <div className="relative mt-3" key={child3.id} >
                                                                    <input
                                                                        type="text"
                                                                        value={child3.value}
                                                                        className="p-1.5 px-3 rounded-[6px] ms-10 outline-none border-2 border-gray-400 focus:border-blue-500"
                                                                        placeholder="Search"
                                                                        onChange={(e) => handleChange(item.id, child3.id, e.target.value, child.id, child2.id)}
                                                                    />
                                                                    <button
                                                                        className="px-6 text-sm py-2.5 ms-5  h-full bg-blue-500 text-white rounded-[6px] font-semibold shadow"
                                                                    >
                                                                        <FaPlus />
                                                                    </button>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                                <h1
                                    className="uppercase cursor-pointer font-semibold text-blue-500 mt-5 select-none active:text-blue-600"
                                    onClick={() => addMenu(item.id)} // Add menu on click
                                >
                                    add menu
                                </h1>
                            </div>
                        ))
                    }

                </div>
                <button
                    className="uppercase bg-blue-500 text-white py-2 px-4 rounded-[6px] font-semibold shadow"
                    onClick={() => { setTempItems(items) }}
                >
                    save
                </button>
            </div>
            <div className="w-[500px] border-2 border-gray-400 rounded-[6px] p-4 max-h-[67vh] overflow-y-auto">
                {tempItems.length > 0 ? (
                    tempItems.map((item) => (
                        <div key={item.id}>
                            <div className="mt-3 border-2 shadow p-4 rounded-[6px]">
                                <h1>
                                    <span className="font-semibold">Type : </span>
                                    <span>Item</span>
                                </h1>
                                {renderChildren(item.children)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No data found!</div>
                )}
            </div>
        </div>
    );
}

export default NestedTodos;
