import { useContext } from "react";
import Layout from "../components/Layout/Layout";
import '../Assign2.3/App.css';
import { UserContext } from "../store/UserContext"; // Import UserContext
import FavoritesTable from "./FavoriteTable";

function Favorites() {
  const UserCtx = useContext(UserContext); // Access the UserContext
  const { favorites } = UserCtx; // Get favorites from the context

  return (
    <Layout>
     <FavoritesTable favorites={favorites}/>
    </Layout>
  );
}

export default Favorites;

