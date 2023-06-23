import React from "react";
import "./Impressum.css";

class Impressum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div className='impressum'>
                <h1>Impressum</h1>
                <p>Angaben gemäß § 5 TMG</p>
                <p>Max Muster <br />
                    Musterweg<br />
                    12345 Musterstadt <br />
                </p>
                <p>
                    <strong>Vertreten durch:
                    </strong><br />
                    Max Muster<br />
                </p>
                <p>
                    <strong>
                        Kontakt:
                    </strong> <br />
                    Telefon: 01234-789456<br />
                    Fax: 1234-56789<br />
                    E-Mail: <a href='mailto:max@muster.de'>max@muster.de</a><br />
                </p>
                <p><strong>Umsatzsteuer-ID:
                </strong><br />
                    Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: Musterustid.<br /><br />
                    <strong>Wirtschafts-ID: </strong><br />
                    Musterwirtschaftsid<br />
                </p>
                <p>
                    <strong>Aufsichtsbehörde:</strong><br />
                    Musteraufsicht Musterstadt<br />
                </p><br />
                Impressum vom
                <a href="https://www.impressum-generator.de" > Impressum Generator</a >
                der
                < a href="https://www.kanzlei-hasselbach.de/standorte/frankfurt/" rel="nofollow" >
                    Kanzlei Hasselbach, Frankfurt</a >
            </div >
        );
    }
}


export default Impressum;