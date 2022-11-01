import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBags } from "../context/bagContext";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const BagForm = () => {
  const { createBag, getBag, updateBag } = useBags();
  const navigate = useNavigate();
  const params = useParams();
  const [bag, setBag] = useState({
    description: "",
    detail: "",
    color: "",
    model: "",
    brand: "",
    price: "",
    image: null
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const bag = await getBag(params.id);
        setBag(bag);
      }
    })();
  }, [params.id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New Bag</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">Go Back</Link>
        </header>
      <Formik
        initialValues={bag}
        validationSchema={Yup.object({
          description: Yup.string().required("Required"),
          detail: Yup.string().required("Required"),
          color: Yup.string().required("Required"),
          model: Yup.string().required("Required"),
          brand: Yup.string().required("Required"),
          price: Yup.number().required("Required").max(999),
        })}
        onSubmit={async (values, actions) => {

          if(params.id) {
            await updateBag(params.id, values);
          }else{
            await createBag(values);
          }
          actions.setSubmitting(false);  
          navigate("/");
        }}
        enableReinitialize
      >
        {({ handleSubmit, setFieldValue, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>

            <label htmlFor="description" className="text-sm block font-bold text-gray-400">Description</label>
            <Field
              name="description"
              placeholder="write the description"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
            />
            <ErrorMessage
              component="p"
              className="text-red-400 text-sm"
              name="description"
            />
            <label htmlFor="detail" className="text-sm block font-bold text-gray-400">Detail</label>
            <Field
              name="detail"
              placeholder="write the detail"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
            />
            <ErrorMessage
              component="p"
              className="text-red-400 text-sm"
              name="detail"
            />
            <label htmlFor="color" className="text-sm block font-bold text-gray-400">Color</label>
            <Field
              name="color"
              placeholder="write the color"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
            />
            <ErrorMessage
              component="p"
              className="text-red-400 text-sm"
              name="color"
            />
            <label htmlFor="model" className="text-sm block font-bold text-gray-400">Model</label>
            <Field
              name="model"
              placeholder="write the model"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
            />
            <ErrorMessage
              component="p"
              className="text-red-400 text-sm"
              name="model"
            />
            <label htmlFor="brand" className="text-sm block font-bold text-gray-400">Brand</label>
            <Field
              name="brand"
              placeholder="write the brand"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
            />
            <ErrorMessage
              component="p"
              className="text-red-400 text-sm"
              name="brand"
            />
            <label htmlFor="price" className="text-sm block font-bold text-gray-400">Price</label>
            <Field
              name="price"
              placeholder="write the price"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
            />
            <ErrorMessage
              component="p"
              className="text-red-400 text-sm"
              name="price"
            />
             <label htmlFor="image" className="text-sm block font-bold text-gray-400">Image</label>
            <input type="file" name="image" className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" 
            onChange={(e) => setFieldValue('image', e.target.files[0])}/>

            <button type="submit"
             className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
             disabled={isSubmitting}>{isSubmitting ? (<AiOutlineLoading3Quarters className="animate-spin w-5 h-5" />) : "Save" }</button>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
};
