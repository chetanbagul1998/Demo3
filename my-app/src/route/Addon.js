import { useNavigate } from "react-router-dom/dist";

export default function Addon() {
  const navigate = useNavigate();
  const tokenValue = false;
  const navigateToPage = () => {
    if (tokenValue) {
     console.log("Redirecting to HomeComponent ");
     navigate("/Aboutus");
    } else {
      navigate("/Home");
    }
  };

  return (
    <>
      <h2>Add ON</h2>
      <p>
        This is Add On Component.
      </p>
      <button onClick={navigateToPage}>Back to home</button>
    </>
  );
}