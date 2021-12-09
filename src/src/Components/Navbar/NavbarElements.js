import styled from 'styled-components'

const Nav = styled.nav`
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`

const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 140px;
    z-index: 1;
    width: 100%;
    padding: 0px;
    max-width: 1100px;
`

const NavLogo = styled.img`
    width: 230px;
    height: 120px;
    justify-self: flex-start;
    cursor: pointer;
    display: flex;
    align-items: center;
`

export {
    Nav,
    NavbarContainer,
    NavLogo
}