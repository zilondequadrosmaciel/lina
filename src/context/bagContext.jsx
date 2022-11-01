import { useState, createContext, useContext, useEffect } from "react";
import {
  getBagsRequests,
  createBagRequest,
  removeBagRequest,
  getBagRequest,
  updateBagRequest,
} from "../api/bags";

const bagContext = createContext();

export const useBags = () => {
  const context = useContext(bagContext);
  return context;
};

export const BagProvider = ({ children }) => {
  const [bags, setBags] = useState([]);

  const getBags = async () => {
    const res = await getBagsRequests();
    setBags(res.data);
  };

  const createBag = async (bag) => {
    try {
      const res = await createBagRequest(bag);
      setBags([...bags, res.data]);  
    } catch (error) {
      console.error(error)
    }
  };

  const removeBag = async (id) => {
    const res = await removeBagRequest(id);
    if (res.status === 204) {
      setBags(bags.filter((bag) => bag._id !== id));
    }
  };

  const getBag = async (id) => {
    const res = await getBagRequest(id);
    return res.data;
  };

  const updateBag = async (id, bag) => {
    const res = await updateBagRequest(id, bag);
    setBags(bags.map(bag => bag._id === id ? res.data : bag))
  }

  useEffect(() => {
    getBags();
  }, []);

  return (
    <bagContext.Provider
      value={{ bags, getBags, createBag, removeBag, getBag, updateBag }}
    >
      {children}
    </bagContext.Provider>
  );
};
