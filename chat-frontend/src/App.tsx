import {Container, CssBaseline, Typography} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Messages from "./features/Messages.tsx";
import FullMessages from "./features/FullMessages.tsx";
import NewMessage from "./features/NewMessage.tsx";


const App = () => {

  return (
      <>
        <CssBaseline />
        <ToastContainer/>
        <header>
          <AppToolbar/>
        </header>
        <main>
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<Messages/>}/>
              <Route path="/messages" element={<Messages/>}/>
              <Route path="/messages/:id" element={<FullMessages/>}/>
              <Route path="/messages/new" element={<NewMessage/>}/>
              <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
            </Routes>
          </Container>
        </main>
      </>
  )
};

export default App
