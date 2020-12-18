import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';



const Footer = ({data}) => {
    return (
        data.siteData ?
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    STUGAL
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Informatie de contact</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faCompass}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Str. Domnească, nr. 47.Galați 800008</div>
                                    <div>Romania</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Telefon</div>
                                    <div>(+40) 336 130 108</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Program de munca</div>
                                    <div>Mon-Fri/ 9am-5pm</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>rectorat@ugal.ro</div>
                                </div>
                            </div>
                            
                        </div>
                    </div> 
                    <div className="left">
                        <h2>Universitatea "Dunărea de Jos" din Galați - Resurse IT pentru studenți</h2>
                        <div>
                            <div>
                            Universitatea "Dunărea de Jos" din Galați oferă studenților săi numeroase facilități prin resursele informatice puse la dispoziție (Ghid de utilizare a resurselor informatice oferite studenților).
                            Există un interes constant pentru a oferi studenților metode moderne pentru un proces educațional performant.
                            Alegeți secțiunea de interes pentru dvs. din lista de opțiuni de mai jos.
                            </div>
                        </div>
                    </div>      
                </div>
            </div>
        </footer>
        :null
    );
};

export default Footer;