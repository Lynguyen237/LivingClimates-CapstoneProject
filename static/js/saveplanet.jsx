function SavePlanet() {
  return (
    <React.Fragment>
      <div className="container" id="saveplanet">
        <h1>Save Our Planet</h1>
        <p> 
            The climate data in this project (covering 1960-1990 period) may not be highly accurate in today's context given the climate change in the past decades.
        </p>
        <p> Check out these initiatives and causes below to protect our beautiful homes on Earth.</p>

        {/* <div className="container">
        <ReactBootstrap.Card style={{ width: '18rem' }}>
        <ReactBootstrap.Card.Img variant="top" src="holder.js/100px180" />
        <ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Title>Planet Hero</ReactBootstrap.Card.Title>
            <ReactBootstrap.Card.Text>
              Planet Heroes is the first eco <b>crowdfunding platform</b> specializing in raising funds 
              for clean-up actions taken by users.
            </ReactBootstrap.Card.Text>
            <ReactBootstrap.Button variant="success" href="https://planetheroes.pl/articles/how-it-works" target="_blank">Go somewhere</ReactBootstrap.Button>
        </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
        </div> */}

        <ReactBootstrap.CardDeck>
            <ReactBootstrap.Card>
                {/* <ReactBootstrap.Card.Img variant="top" src="static/img/ocean.jpg" /> */}
                <ReactBootstrap.Card.Body>
                <ReactBootstrap.Card.Title>Planet Hereos</ReactBootstrap.Card.Title>
                <ReactBootstrap.Card.Text>
                    Planet Heroes is the first eco <b>crowdfunding platform</b> specializing in raising funds 
                    for clean-up actions taken by users.
                </ReactBootstrap.Card.Text>
                <ReactBootstrap.Button variant="success" href="https://planetheroes.pl/articles/how-it-works" target="_blank">Visit Site</ReactBootstrap.Button>
                </ReactBootstrap.Card.Body>
                <ReactBootstrap.Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
                </ReactBootstrap.Card.Footer>
            </ReactBootstrap.Card>
        
            <ReactBootstrap.Card>
              {/* <ReactBootstrap.Card.Img variant="top" src="holder.js/100px160" /> */}
              <ReactBootstrap.Card.Body>
              <ReactBootstrap.Card.Title>Giving Green</ReactBootstrap.Card.Title>
              <ReactBootstrap.Card.Text>
                Giving Green is an evidence-based guide to help donors and volunteers fight climate change.
              </ReactBootstrap.Card.Text>
              <ReactBootstrap.Button variant="success" href="https://www.givinggreen.earth/" target="_blank">Visit Site</ReactBootstrap.Button>
              </ReactBootstrap.Card.Body>
              <ReactBootstrap.Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
              </ReactBootstrap.Card.Footer>
            </ReactBootstrap.Card>
            
            {/* <ReactBootstrap.Card>
                <ReactBootstrap.Card.Img variant="top" src="holder.js/100px160" />
                <ReactBootstrap.Card.Body>
                <ReactBootstrap.Card.Title>Card title</ReactBootstrap.Card.Title>
                <ReactBootstrap.Card.Text>
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This card has even longer content than the first to
                    show that equal height action.
                </ReactBootstrap.Card.Text>
                </ReactBootstrap.Card.Body>
                <ReactBootstrap.Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
                </ReactBootstrap.Card.Footer>
            </ReactBootstrap.Card> */}
        </ReactBootstrap.CardDeck>

      </div>
    </React.Fragment>
  )
}