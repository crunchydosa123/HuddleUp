import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Chatpage from './pages/Chatpage'
import Huddles from './pages/Huddles'
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css"; 
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const theme = {
  name: "custom-theme",
  tokens: {
    colors: {
      brand: {
        primary: { value: "#1E3A8A" }, // Dark blue
        secondary: { value: "#9333EA" }, // Purple
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: { value: "#1E3A8A" }, // Tailwind `bg-blue-900`
          color: { value: "#ffffff" }, // Text color
        },
      },
    },
  },
};

function App() {

  return (
    <ThemeProvider theme={theme}>
    <Authenticator>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/chat' element={<Chatpage />} />
        <Route path='/huddles' element={<Huddles />} />
      </Routes>
    </BrowserRouter>
    </Authenticator>
    </ThemeProvider>
  )
}

export default App
