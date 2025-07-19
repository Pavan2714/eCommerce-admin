import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Sofa");
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [color, setColor] = useState("");
  const [assembly, setAssembly] = useState(false);
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("material", material);
      formData.append("dimensions", dimensions);
      formData.append("color", color);
      formData.append("assembly", assembly);
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setMaterial("");
        setDimensions("");
        setColor("");
        setAssembly(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num) => (
            <label htmlFor={`image${num}`} key={num}>
              <img
                className="w-20"
                src={
                  !eval(`image${num}`)
                    ? assets.upload_area
                    : URL.createObjectURL(eval(`image${num}`))
                }
                alt=""
              />
              <input
                onChange={(e) => eval(`setImage${num}`)(e.target.files[0])}
                type="file"
                id={`image${num}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Furniture Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Sofa">Sofa</option>
            <option value="Bed">Bed</option>
            <option value="Chair">Chair</option>
            <option value="Table">Table</option>
            <option value="Wardrobe">Wardrobe</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Material</p>
          <input
            onChange={(e) => setMaterial(e.target.value)}
            value={material}
            className="w-full px-3 py-2"
            type="text"
            placeholder="e.g. Sheesham Wood, Metal"
          />
        </div>
        <div>
          <p className="mb-2">Color</p>
          <input
            onChange={(e) => setColor(e.target.value)}
            value={color}
            className="w-full px-3 py-2"
            type="text"
            placeholder="e.g. Walnut, White"
          />
        </div>
        <div>
          <p className="mb-2">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25000"
          />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Dimensions</p>
        <input
          onChange={(e) => setDimensions(e.target.value)}
          value={dimensions}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="e.g. 80x35x30 inches"
        />
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setAssembly((prev) => !prev)}
          checked={assembly}
          type="checkbox"
          id="assembly"
        />
        <label className="cursor-pointer" htmlFor="assembly">
          Assembly Required
        </label>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
