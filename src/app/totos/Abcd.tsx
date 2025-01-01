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
    [x: string]: any;
    id: string;
    type: string;
    value: string;
    children: Field[];
};

function NestedTodos() {
    const [items, setItems] = useState<Item[]>([]);
    const [tempItems, setTempItems] = useState<Item[]>([]);

    const handleAddItem = () => {
        	
    };

    
    return (
        <div className="flex gap-10">
            <div className="flex flex-col justify-center items-center gap-10">
                <div className="flex flex-col w-[500px] border-2 border-gray-400 rounded-[6px] p-4 max-h-[67vh] overflow-y-auto">
                    <button
                        className="uppercase h-fit w-fit px-6 py-2.5 bg-blue-500 text-white rounded-[6px] font-semibold shadow"
                        onClick={() => handleAddItem()}
                    >
                        Add Item
                    </button>
                   
                </div>
                <button
                    className="uppercase bg-blue-500 text-white py-2 px-4 rounded-[6px] font-semibold shadow"
                    // onClick={handleSubmit}
                >
                    save</button>
            </div>
            <div className="w-[500px] border-2 border-gray-400 rounded-[6px] p-4 max-h-[67vh] overflow-y-auto">
                {
                    tempItems.length > 0
                        ? tempItems.map((item) => {
                            return (
                                <div key={item.id}>
                                    <div className="mt-3 border-2 shadow p-4 rounded-[6px]">
                                        <h1>
                                            <span className="font-semibold">Type : </span>
                                            <span>{item?.type}</span>
                                        </h1>
                                        <h1>
                                            <span className="font-semibold">Value : </span>
                                            <span>{item?.value}</span>
                                        </h1>
                                        {
                                            item.children.length > 0
                                                ? item.children.map((child) => {
                                                    return (
                                                        <div className="mt-3 ms-10 border-2 shadow p-4 rounded-[6px]" key={child?.id}>
                                                            <h1>
                                                                <span className="font-semibold">Type : </span>
                                                                <span>{child?.type}</span>
                                                            </h1>
                                                            <h1>
                                                                <span className="font-semibold">Value : </span>
                                                                <span>{child?.value}</span>
                                                            </h1>
                                                            {
                                                                child.children.length > 0
                                                                    ? child.children.map((child2) => {
                                                                        return (
                                                                            <div className="mt-3 ms-20 border-2 shadow p-4 rounded-[6px]" key={child2?.id}>
                                                                                <h1>
                                                                                    <span className="font-semibold">Type : </span>
                                                                                    <span>{child2?.type}</span>
                                                                                </h1>
                                                                                <h1>
                                                                                    <span className="font-semibold">Value : </span>
                                                                                    <span>{child2?.value}</span>
                                                                                </h1>
                                                                            </div>
                                                                        )
                                                                    })
                                                                    : ""
                                                            }
                                                        </div>
                                                    )
                                                })
                                                : ""
                                        }
                                    </div>

                                </div>
                            )
                        })
                        : (
                            <div>
                                No data found !
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default NestedTodos;
