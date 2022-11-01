import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useBags } from "../context/bagContext";

export const BagCard = ({ bag }) => {
	const { removeBag } = useBags();
	const navigate = useNavigate();

	const handleRemove = (id) => {
		toast(
			(t) => (
				<div>
					<p className="text-white">
						Do you want to remove? <strong>{id}</strong>
					</p>
					<div>
						<button
							className="bg-red-500 hover:bg-red-500 px-3 py-2 text-sm text-white rounded-sm mx-2"
							onClick={(e) => {
								removeBag(id);
								toast.dismiss(t.id);
							}}
						>
							Remove
						</button>
						<button
							className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
							onClick={() => toast.dismiss(t.id)}
						>
							Cancel
						</button>
					</div>
				</div>
			),
			{
				style: {
					background: "#202020",
				},
			}
		);
	};

	return (
		<div
			className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
			onClick={() => navigate(`/bag/${bag._id}`)}
		>
			<div className="px-4 py-7">
				<div className="flex justify-between items-center">
					<h3 className="text-md font-semibold">{bag.description}</h3>
					<button 
            className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
						onClick={(e) => {
              e.stopPropagation();
              handleRemove(bag._id)
            }}
					>
						Remove
					</button>
          </div>
          <p className="text-gray-400">{bag.detail}</p>
				<p>{bag.color}</p>
				<p>{bag.model}</p>
				<p>{bag.brand}</p>
				<p>{bag.price}</p>
				</div>
        <div>
        {bag.image && <img src={bag.image.url} alt={bag.description} className="w-full h-full object-cover p-1" />}

        </div>
		</div>
  );
          }