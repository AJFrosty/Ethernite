import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import { ethers } from "ethers"
import EtherniteAbi from './contractsData/ethernite.json'
import EtherniteAddress from './contractsData/ethernite-address.json'
import { Spinner, Navbar, Nav, Button, Container } from 'react-bootstrap'
import { publicProvider } from 'wagmi/providers/public'
import { createConfig, WagmiConfig, createStorage, configureChains} from 'wagmi'
import { goerli } from 'wagmi/chains'
import './App.css';
import Home from './Home.js'
import Profile from './Profile.js'

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({})

  const { publicClient } = configureChains([goerli], [publicProvider()])
 
  const config = createConfig({
    publicClient,
    storage: createStorage({ storage: window.localStorage }),
})

  const web3Handler = async () => {
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

    // Setup event listeners for metamask
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    })
    window.ethereum.on('accountsChanged', async () => {
      setLoading(true)
      web3Handler()
    })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Get signer
    const signer = provider.getSigner()
    loadContract(signer)
  }
  const loadContract = async (signer) => {

    // Get deployed copy of Ethernite contract
    const contract = new ethers.Contract(EtherniteAddress.address, EtherniteAbi.abi, signer)
    setContract(contract)
    setLoading(false)
  }

  return (
    <WagmiConfig config={config}>
    <BrowserRouter>
      <div className="App">
        <>
          <Navbar expand="lg" bg="secondary" style={{ background: 'linear-gradient(to bottom, #7E57C2, #311B92)' }} variant="dark">
            <Container>
              <Navbar.Brand href="">
                <img src="https://media.discordapp.net/attachments/807743928316067862/1145136874197885068/logo.png?width=662&height=662" width="40" height="40" className="" alt="" />
                &nbsp; Ethernite
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} style={{color: "silver"}} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} style={{color: "silver"}} to="/profile">Profile</Nav.Link>
                </Nav>
                <Nav>
                  {account ? (
                    <Nav.Link
                      href={`https://etherscan.io/address/${account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button nav-button btn-sm mx-4">
                      <Button variant="outline-light">
                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                      </Button>

                    </Nav.Link>
                    ) : (
                      <Button onClick={web3Handler} variant="outline-light">Connect</Button>
                    )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
        <div>
          {loading ? (
            <div>
            <section className="home">
              <div className="content">
                <h1 className="title">
                  Ethernite: <span> Igniting </span> Decentralised <span> Innovation</span>
                </h1>
                <a href="" className="btn">
                  get started
                </a>
              </div>
              <div className="image">
                <img src="./logo.png" alt="" data-speed="-3" className="move" />
              </div>
            </section>
          </div>
          ) : (
            <Routes>
                <Route path="/" element={<Home contract={contract} account={account} />
                } />
                <Route path="/profile" element={<Profile contract={contract} account={account} />
                } />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
    </WagmiConfig>
  );
}

export default App;