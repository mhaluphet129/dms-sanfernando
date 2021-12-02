import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  axios
    .get("http://localhost:5000/express_backend")
    .then((doc) => setData(doc.data.express))
    .catch((err) => console.log("Error in fetching: ", err));
  return (
    <>
      <p>{data}</p>
    </>
  );
}

export default App;
