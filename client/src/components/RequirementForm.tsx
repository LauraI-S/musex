import { useState } from "react";
import { useRequestsContext } from "../hooks/useRequests";

const RequirementForm = () => {
  const { dispatch } = useRequestsContext();

  const [occasion, setOccasion] = useState("");
  const [location, setLocation] = useState("");
  const [genre, setGenre] = useState("");
  const [availability, setAvailability] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = { occasion, location, genre, availability };

    const response = await fetch("http://localhost:4000/api/requests", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setOccasion("");
      setLocation("");
      setGenre("");
      setAvailability("mostly");
      console.log("new request added", json);
      dispatch({ type: "CREATE_REQUEST", payload: json });
    }
  };

  return (
    <>
      {/* <form className="postrequirements" onSubmit={handleSubmit}>
        
        <h3>Add a new Request</h3>

        <label>Occasion:</label>
        <input
          type="text"
          onChange={(e) => setOccasion(e.target.value)}
          value={occasion}
        />
        <label>Location:</label>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
        />
        <label>Availability:</label>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Select Availability</option>
          <option value="mostly">Mostly</option>
          <option value="onlyNight">Only in the night</option>
          <option value="onlyWeekdays">Only on weekdays</option>
          <option value="contactMe">Contact me</option>
        </select>
        
        <button>Add Request</button>
        {error && <div className="error">{error}</div>}
      </form> */}
      <form className="postrequirements" onSubmit={handleSubmit}>
        <h3>Add a new Request</h3>

        <label htmlFor="occasion">Occasion:</label>
        <input
          id="occasion"
          type="text"
          onChange={(e) => setOccasion(e.target.value)}
          value={occasion}
        />

        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />

        <label htmlFor="genre">Genre:</label>
        <input
          id="genre"
          type="text"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
        />

        <label htmlFor="availability">Availability:</label>
        <select
          id="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Select Availability</option>
          <option value="mostly">Mostly</option>
          <option value="onlyNight">Only in the night</option>
          <option value="onlyWeekdays">Only on weekdays</option>
          <option value="contactMe">Contact me</option>
        </select>

        <button>Add Request</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};
export default RequirementForm;
