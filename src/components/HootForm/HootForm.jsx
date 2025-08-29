import { useState } from "react";

const HootForm = ({ handleAddHoot }) => {
  // define our form state
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "News",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // stop the form from refreshing the page
    handleAddHoot(formData)
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="text-input">Text</label>
        <textarea
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
          required
        />
        <label htmlFor="category-input">Category</label>
        <select
          name="category"
          id="category-input"
          onChange={handleChange}
          value={formData.category}
          required
        >
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default HootForm;
