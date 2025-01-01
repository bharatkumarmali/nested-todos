"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

type Field = {
  id: string;
  type: string;
  value: string;
  children: Field[];
};

type Item = {
  id: string;
  type: string;
  value: string;
  children: Field[];
};

function NestedTodos() {
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = () => {
    const newItem: Item = {
      id: uuidv4(),
      type: "searchField",
      value: "",
      children: [],
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleAddField = (parentId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === parentId
          ? {
              ...item,
              children: [
                ...item.children,
                {
                  id: uuidv4(),
                  type: "textField",
                  value: "",
                  children: [],
                },
              ],
            }
          : {
              ...item,
              children: updateChildren(item.children, parentId),
            }
      )
    );
  };

  const updateChildren = (children: Field[], parentId: string): Field[] => {
    return children.map((child) =>
      child.id === parentId
        ? {
            ...child,
            children: [
              ...child.children,
              {
                id: uuidv4(),
                type: "newField",
                value: "",
                children: [],
              },
            ],
          }
        : {
            ...child,
            children: updateChildren(child.children, parentId),
          }
    );
  };

  const handleInputChange = (id: string, value: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, value }
          : { ...item, children: updateInputChildren(item.children, id, value) }
      )
    );
  };

  const updateInputChildren = (
    children: Field[],
    id: string,
    value: string
  ): Field[] => {
    return children.map((child) =>
      child.id === id
        ? { ...child, value }
        : {
            ...child,
            children: updateInputChildren(child.children, id, value),
          }
    );
  };

  return (
    <div className="flex flex-row gap-10">
      {/* Left Panel */}
      <div className="flex flex-col w-[500px] border-2 border-gray-400 rounded-sm p-4 max-h-[67vh] overflow-y-auto">
        <button
          className="uppercase h-fit w-fit px-6 py-2.5 bg-blue-500 text-white rounded-[6px] shadow"
          onClick={handleAddItem}
        >
          Add Item
        </button>
        {items.map((item) => (
          <div
            key={item.id}
            className="h-fit w-full border-2 border-gray-400 rounded-[6px] p-4 mt-5"
          >
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="p-1.5 px-3 rounded-[6px] outline-none border-2 border-gray-400 focus:border-blue-500"
                  value={item.value}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  placeholder="Search"
                />
                <button
                  className="px-6 text-sm py-2.5 ms-5 h-full bg-blue-500 text-white rounded-[6px] shadow"
                  onClick={() => handleAddField(item.id)}
                >
                  <FaPlus />
                </button>
              </div>
              {item.children.map((child) => (
                <RenderField
                  key={child.id}
                  field={child}
                  handleAddField={handleAddField}
                  handleInputChange={handleInputChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Panel */}
      <div className="flex-1 border-2 border-gray-400 rounded-sm p-4 max-h-[67vh] overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">Structure</h2>
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </div>
    </div>
  );
}

function RenderField({
  field,
  handleAddField,
  handleInputChange,
}: {
  field: Field;
  handleAddField: (id: string) => void;
  handleInputChange: (id: string, value: string) => void;
}) {
  return (
    <div className="relative ms-10 mt-5">
      <input
        type="text"
        className="p-1.5 px-3 rounded-[6px] outline-none border-2 border-gray-400 focus:border-blue-500"
        value={field.value}
        onChange={(e) => handleInputChange(field.id, e.target.value)}
        placeholder={field.type}
      />
      <button
        className="px-6 text-sm py-2.5 ms-5 h-full bg-blue-500 text-white rounded-[6px] shadow"
        onClick={() => handleAddField(field.id)}
      >
        <FaPlus />
      </button>
      {field.children.map((child) => (
        <RenderField
          key={child.id}
          field={child}
          handleAddField={handleAddField}
          handleInputChange={handleInputChange}
        />
      ))}
    </div>
  );
}

export default NestedTodos;
