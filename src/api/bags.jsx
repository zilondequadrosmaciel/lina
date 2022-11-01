import axios from "axios";

export const getWelcomeRequests = async () =>
  await axios.get("https://bag-server.onrender.com");

export const getBagsRequests = async () =>
  await axios.get("https://bag-server.onrender.com/bag");


export const createBagRequest = async (bag) => {
const form = new FormData();

for (let key in bag){
  form.append(key, bag[key])
}

  return await axios.post("https://bag-server.onrender.com/bag/", form, {
    headers: {
        "Content-Type": "multipart/form-data",
    } 
  });
}

export const removeBagRequest = async (id) =>
  await axios.delete("https://bag-server.onrender.com/bag/" + id);

export const getBagRequest = async (id) =>
  await axios.get("https://bag-server.onrender.com/bag/" + id);

export const updateBagRequest = async (id, updateFields) =>
  await axios.put(`https://bag-server.onrender.com/bag/${id}`, updateFields);
