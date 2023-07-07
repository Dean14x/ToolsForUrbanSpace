import React from "react";
import "./footerSites.css";

class DILABoration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="impressum">
          <h1>Infos zum Projekt DILABoration</h1>
          <p>
            Im Projekt DILABoration erkunden wir die „Digital Impact Labs“ in
            unterschiedlichen Bremer Stadtteilen und entwickeln Tools und
            Konzepte für den Transfer.
          </p>
          <br />
          <p>
            Wie kann ein Digital Impact Lab entstehen? Wie ein Stadtteil mit
            digitalen Werkzeugen neu erlebt und analysiert werden? Welche
            Ressourcen braucht es? Wie kann ich ein lokales Netzwerk
            identifizieren und analysieren? Welchen Transfer braucht es und
            welche Tools?
          </p>
          <br />
          <p>
            Gemeinsam untersuchen die Universität zu Köln, das M2C – Institut
            für angewandte Medienforschung sowie das ifib – Institut für
            Informationsmanagement Bremen GmbH, welche Angebote, Arbeitsweisen
            und Methoden sich in Bezug auf Jugendliche und weitere
            Adressat*innen bewähren. Welche Bedingungen begünstigen die
            Förderung von Bildungsprozessen, welche erweisen sich als
            hinderlich, wo entfalten sich weitere Bedarfe, welche Potenziale
            gilt es zu nutzen? Dies sind leitende Fragestellungen, auf die
            verschiedene Projekt-Teams Antworten auf Ebene der Adressat*innen
            sowie der organisationalen Ebene suchen. Die gewonnenen Erkenntnisse
            sollen für weitere Standorte genutzt werden.
          </p>
          <br />
          <p>
            Das M2C Institut leistet einen aktiven Beitrag zur
            wissenschaftlichen Forschung und Entwicklung von Systemen und
            Strategien für die faire Entwicklung unserer gemeinsamen Zukunft. Im
            Projekt DILABoration werden die vom M2C betriebenen Digital Impact
            Labs untersucht, sodass das M2C insbesondere den Zugang für die
            Universität zu Köln und das ifib herstellt und gemeinsam mit den
            Akteuren daran arbeitet, Konzepte und Inhalte zu evaluieren sowie
            Tools zur Unterstützung von Transfer aus dem Projekt.
          </p>
          <br />
          <p>
            Weitere Informationen zu DILABoration befinden sich hier:
            <a href="https://dilaboration.de">https://dilaboration.de</a>
          </p>
          <br />
          <p>
            Die Leitung des Teilprojektes liegt bei Martin Koplin. Martin
            Koplin, Sebastian Schuster und Lisa Schleker bilden das M2C
            DILAB-Team.
          </p>
          <br />
          <p>Unterstützt wird das Toolbuilding von:</p>
          Ben Schumacher
          <br />
          Dean Koenig
          <br />
          Dinara Gabdulkhakova
          <br />
          Lennart Buchtzik
          <br />
          Mateusz Klatte
          <br />
          Mohammad Al Kazah
          <br />
          Shirin Erol
          <br />
          Vladimir Elistratov
          <br />
          Mihail Petrushevski
          <br />
          Aref Obaid
          <br />
          <h4>gefördert durch</h4>
          <div id="logos2">
            <a
              className="m2c2"
              href="https://m2c-bremen.de"
              // target="_blank"
            >
              <img alt="m2cLogo" src="./static/images/logo_m2c.jpg"></img>
            </a>
            <a
              className="bmbf2"
              href="https://www.bmbf.de/bmbf/de/home/home_node.html"
              // target="_blank"
            >
              <img
                alt="BMBFLogo"
                src="./static/images/347px-BMBF_Logo.svg_.png"
              ></img>
            </a>
            <a
              className="lab2"
              href="https://impact-lab.eu/"
              // target="_blank"
            >
              <img alt="DILlogo" src="./static/images/DIL_logo_6cm.jpg"></img>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default DILABoration;
