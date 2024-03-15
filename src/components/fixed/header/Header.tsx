import Navegation from './Navegation'

interface HeaderProps {
    currentPage: number
}

const Header = ({ currentPage }: HeaderProps) => {

    return (
        <header className='d-flex justify-content-center'>
            <Navegation currentPage={currentPage} />
        </header>
    )

}

export default Header