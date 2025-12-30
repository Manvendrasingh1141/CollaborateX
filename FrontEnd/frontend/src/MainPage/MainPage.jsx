import Footer from '../Components/Footer';
import CardContainer from './CardContainer';
import Container from './Container';
import Features from './Features';
function MainPage() {
    return(
        <div className="w-full bg-[#D9B7EE] flex flex-col items-center relative z-10 overflow-hidden">
            <Container/>
            <Features/>
            <CardContainer/>
            <Footer/>
        </div>
    )
}

export default MainPage  