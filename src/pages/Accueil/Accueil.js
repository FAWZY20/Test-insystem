import './Accueil.css'
import Temperature from '../../components/Temperature';


function Accueil() {
    return (
        <div className='container-fluid' >
            <div className='container'>
                <div className='row' >
                    <Temperature />
                </div>
            </div>
        </div>
    );
}

export default Accueil;