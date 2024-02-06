import { Grid } from "@mui/material";
import MyForm from "./components/MyForm";
import MyTable from "./components/MyTable";

const App = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={6}>
          <MyForm />
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <MyTable />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
