import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useBags } from "../context/bagContext";
import { BagCard } from '../components/BagCard'

export const Home = () => {
  const { bags } = useBags();

  if (bags.length === 0)
    return (
      <div className="flex flex-col justify-center items-center">
        <VscEmptyWindow className="w-48 h-48 text-white" />
        <h1 className="text-white text-2xl">There are no bags</h1>;
      </div>
    );

  return (
    <div className="text-white">
      <header className="flex justify-between py-4">
        <h1 className="test-2xl text-gray-300 font-bold">Bags {bags.length}</h1>
        <Link to="/add" className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white">Create new Bag</Link>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {bags.map((bag) => (
        <BagCard bag={bag} key={bag._id}/>
     ))}
      </div>
    </div>
  );
};
