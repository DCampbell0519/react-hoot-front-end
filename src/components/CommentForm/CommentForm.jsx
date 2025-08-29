import { useState } from "react";

const CommentForm = ({ handleAddComment }) => {
  const [formData, setFormData] = useState({ text: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // stop the form from refreshing the page
    handleAddComment(formData);
    setFormData({ text: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your Comment</label>
      <input
        type="text"
        required
        name="text"
        id="text-input"
        onChange={handleChange}
        value={formData.text}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
