import './Accueil.css'
import Header from '../../components/Header';
import Temperature from '../../components/Temperature';


function Accueil() {
    return(
        <div>
            <Header />
            <div className='container-fluid' >
                <div className='container'>
                    <div className='row' >
                        <Temperature />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Accueil;