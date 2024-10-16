import { useContext } from "react";
import { UserContext } from "../store/UserContext";

function Filter() {
  const UserCtx = useContext(UserContext);
  const {
    credentials,
    setCredentials,
    handleCredentialsChange,
    handleLogin,
    isLogged,
    setIsLogged,
    criterias,
    setCriterias,
  } = UserCtx;

  const updateFilter = (e) => {
    setCriterias((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <label for="year">Year</label>
      <select name="year" onChange={updateFilter}>
        <option value="">Select...</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
      </select>
      <label for="month">Month</label>
      <select name="month" onChange={updateFilter}>
        <option value="">Select...</option>
        <option value="01">January</option>
        <option value="02">February</option>
      </select>
      <label for="town">Town</label>
      <select name="town" onChange={updateFilter}>
        <option value="">Select...</option>
        <option value="BEDOK">Bedok</option>
        <option value="ANG MO KIO">Ang Mo Kio</option>
      </select>
      <label for="flat_model">Flat Model</label>
      <select name="flat_model" onChange={updateFilter}>
        \<option value="">Select...</option>
        <option value="Improved">Improved</option>
        <option value="New Generation">New Generation</option>
        <option value="DBSS">DBSS</option>
        <option value="Standard">Standard</option>
        <option value="Apartment">Apartment</option>
        <option value="Simplified">Simplified</option>
        <option value="Model A">Model A</option>
      </select>
    </>
  );
}
export default Filter;
