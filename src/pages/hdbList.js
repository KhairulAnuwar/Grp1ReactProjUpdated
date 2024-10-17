import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import Filter from "../components/Filter";
import govapi from "../api/govapi";
import { PropagateLoader } from "react-spinners";
import Layout from "../components/Layout/Layout";
import { Box } from "@mui/material";

function HdbList() {
  const [isLoading, setIsLoading] = useState(false);
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

  const [hdbList, setHdbList] = useState([]);


  const getHdbList = async () => {
    try {
      setIsLoading(true);
      const response = await govapi.get();
      setHdbList(response.data.result.records);
      console.log("Full list", hdbList);
      console.log(response);
    } catch (error) {
      console.error("🚨 error: ", error.message);
      alert(error.message);
    } finally {
      console.log("🎉 completed");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHdbList();
  }, []);

  const filterByTown = (item) => {
    if (criterias.town == "") {
      return true;
    }
    if (item.town == criterias.town) {
      return true;
    } else {
      return false;
    }
  };

  const filterByYear = (item) => {
    if (criterias.year == "") {
      return true;
    }
    if (item.month.substring(0, 4) == criterias.year) {
      return true;
    } else {
      return false;
    }
  };

  const filterByMonth = (item) => {
    if (criterias.month == "") {
      return true;
    }
    if (item.month.substring(5, 7) == criterias.month) {
      return true;
    } else {
      return false;
    }
  };
  const filterByFlatModel = (item) => {
    if (criterias.flat_model == "") {
      return true;
    }
    if (item.flat_model == criterias.flat_model) {
      return true;
    } else {
      return false;
    }
  };
  const filterByFlatType = (item) => {
    if (criterias.flat_type == "") {
      return true;
    }
    if (item.flat_type == criterias.flat_type) {
      return true;
    } else {
      return false;
    }
  };

  const filterByBudget = (item) => {
    if (criterias.budget == "") {
      return true;
    }
    if (Number(item.resale_price) <= Number(criterias.budget)) {
      return true;
    } else {
      return false;
    }
  };

  const filterAll = (item) => {
    if (
      filterByMonth(item) &&
      filterByYear(item) &&
      filterByTown(item) &&
      filterByFlatType(item) &&
      filterByBudget(item) &&
      filterByFlatModel(item)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (product) => {
    const isAlreadyFavorite = UserCtx.favorites.some((fav) => fav._id === product._id);

    if (isAlreadyFavorite) {
      UserCtx.setFavorites(UserCtx.favorites.filter((fav) => fav._id !== product._id));
    } else {
      UserCtx.setFavorites([...UserCtx.favorites, product]);
    }

    // Update product's "isFavorite" status in the product list
    setHdbList((prevProducts) =>
      prevProducts.map((p) =>
        p._id === product._id ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  return (
    <>
      <Layout>
        <Box
          sx={{
            my: 15,
            textAlign: "left",
            p: 2,
            "& h4": {
              fontWeight: "bold",
              my: 2,
              fontSize: "2rem",
            },
            "& p": {
              textAlign: "justify",
            },
            "@media (max-width:600px)": {
              mt: 0,
              "& h4 ": {
                fontSize: "1.5rem",
              },
            },
          }}
        >
          <h2>List of HDB from January 2017 to February 2017</h2>
          <p>Your current budget: {criterias.budget} SGD</p>
          <Filter hdbList={hdbList} />
          {/* <h2>{isLogged ? "True" : "False"}</h2> */}
          {isLoading ? (
            <div style={{ marginTop: 20, marginBottom: 20 }}>
              <PropagateLoader color="#36d7b7" loading={isLoading} />
            </div>
          ) : (
            ""
          )}
          {console.log("CRITERIAS", criterias)}
          <div className={styles.hdbresults}>
            <table className={styles.hdbresults.table}>
              <tr>
                <td>month</td>
                <td>town</td>
                <td>flat_type</td>
                <td>block</td>
                <td>street_name</td>
                <td>storey_range</td>
                <td>floor_area_sqm</td>
                <td>flat_model</td>
                <td>lease_commence_date</td>
                <td>remaining_lease</td>
                <td>resale_price</td>
                <td>_id</td>
                <td>Favorites</td>
              </tr>
              {hdbList.filter(filterAll).map((item) => {
                // {hdbList.map((item, id) => {
                return (
                  <>
                    <tr key={item._id}>
                      <td>{item.month}</td>
                      <td>{item.town}</td>
                      <td>{item.flat_type}</td>
                      <td>{item.block}</td>
                      <td>{item.street_name}</td>
                      <td>{item.storey_range}</td>
                      <td>{item.floor_area_sqm}</td>
                      <td>{item.flat_model}</td>
                      <td>{item.lease_commence_date}</td>
                      <td>{item.remaining_lease}</td>
                      <td>{item.resale_price}</td>
                      <td>{item._id}</td>
                      <td>
                <button onClick={()=>addToFavorites(item)}>{item.isFavorite? "★":"☆"}</button>
              </td>

                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </Box>
      </Layout>
    </>
  );
}

export default HdbList;

