import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
  

const Cards = ({home, setInputDiv}) => {

  const data = [
    {
      title: "CPP programming",
      description: "Learn CPP programming",
      status: "In Complete",
    },
    {
      title: "React",
      description: "Learn React",
      status: "In Complete",
    },
    {
      title: "Python",
      description: "Learn Python",
      status: "Complete",
    },
    {
      title: "Java",
      description: "Learn Java",
      status: "Complete",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((item, index) => (
          <div className="flex flex-col justify-between bg-white p-4 m-4 rounded-md shadow-md border-2 border-gray-200" key={index}>
            <div key={index} className="">
              <h1 className="text-lg font-bold">{item.title}</h1>
              <p className="text-gray-500">{item.description}</p>
            </div>

            <div className="mt-4 w-full flex justify-between items-center">
              <button className={` ${item.status === "In Complete" ? "bg-red-500" : "bg-green-700" } text-white rounded-md shadow-md p-1 w-2/6`} >
                {item.status}
              </button>
              <div className="flex gap-2 p-3 text-2xl w-3/6 justify-end">
                <button>
                  <CiHeart />
                </button>
                <button>
                  <FaEdit />
                </button>
                <button>
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          </div>
        ))}

      {home ==="true" && (
        <button className="flex flex-col justify-center items-center bg-white p-4 m-4 rounded-md shadow-md border hover:shadow-lg hover:cursor-pointer hover:bg-blue-200 hover:scale-105"onClick={()=>setInputDiv("fixed")} >
        <button className="text-5xl">
          <IoMdAddCircle />
        </button>
        <h1>ADD TASK</h1>
      </button>
      )}
      
    </div>
  );
};

export default Cards;
