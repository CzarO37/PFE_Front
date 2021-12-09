import React from "react";
import Carrousel from "../Carrousel/Carrousel";
import Navbar from "../Navbar/Navbar";
import Presentation from "../Presentation/Presentation";
import Container from "@mui/material/Container"
const App = () => {
    return(
        <div>
            <Container maxWidth="xl">
                <Navbar/>
                <Carrousel/>
                <Presentation/>
            </Container>
        </div>
    )
}

export default App