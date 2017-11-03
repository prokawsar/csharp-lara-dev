import React, { Component } from "react";

let developers = [];
const shuffle = (a) => {
  const arr = a;
  for (let i = a.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }

  return arr;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      developers: []
    };

    this.searchDeveloper = this.searchDeveloper.bind(this);
  }

  componentDidMount() {
    fetch(
      'https://api.github.com/repos/prokawsar/dia-students/contents/personals.json'
   
    )
   
      .then(response => response.json())
      .then(jsonResponse => atob(jsonResponse.content))
      .then(contentResponse => JSON.parse(contentResponse))
      .then(developersResponse => {
        const shuffledDevelopers = developersResponse;
        developers = shuffledDevelopers;
        this.setState({
          isLoading: false,
          developers: shuffledDevelopers
        });
      });
  }

  searchDeveloper(event) {
    let updatedList = developers;
    updatedList = updatedList.filter(
      item =>
        // TODO: A better comparison condition
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1 ||
        item.company.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1 ||
        item.city.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1 ||
        item.github.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1 ||
        item.email.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1 ||
        item.skills.find(s => s.toLowerCase().includes(event.target.value.toLowerCase()))
    );
    this.setState({ developers: updatedList });
  }

  render() {
    return (
      <div>
        <a target="_blank" href="https://github.com/prokawsar" className="github-corner" aria-label="View source on Github">
          <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="currentColor" className="octo-arm"></path>
            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
              fill="currentColor" className="octo-body"></path>
          </svg>
        </a>
        <br />
        <div className="hd1"> DIA Alumni and Students </div>
        <div className="hd-small">Alumni and upcomming students of Unviersity of Greenwich from Bangladesh.</div>

        <div className="search-div">
          <input
            type="text"
            placeholder="Search"
            onChange={this.searchDeveloper}
            className="search"
          />
        </div>

        <div>
          {this.state.isLoading ?
            <div className="center">
              <img src="loader.gif" className="loader" alt="loader" />
            </div> :
            <div className="developer-list">
              {this.state.developers.map((developer, index) => (
               
                <div className="developer" key={index}>
                  <div className="dev">
                    
                    <div className="dev-desc">
                      <div className="dev--name">{developer.name}</div>
                      <div className="dev--email"><a href={`mailto:${developer.email}`} target="_top">{developer.email}</a></div>
                      <div className="dev--city">Phone: {developer.phone}</div>
                      <div className="dev--city">Admission Year: {developer.admit_year}</div>
                      <div className="dev--city">Batch: {developer.batch}</div>
                   
                      <div className="dev--skills"><span>{developer.role} at {developer.company_institute}</span></div>
                      <div className="dev--city">Working in: {developer.working_in}</div>
                      <div className="dev--city">{developer.city}</div>
                    </div>
                    <div className="dev-avatar">
                      <a href={`https://github.com/${developer.github}`} target="_blank">
                        <img
                          src={`https://avatars.githubusercontent.com/${developer.github}`}
                          className="profile-image"
                          alt="Github"
                        />
                        <div className="dev--skills"><span>Github</span></div>
                      </a>
                    </div>

                    <div className="dev-avatar">
                      <a href={`https://facebook.com/${developer.facebook}`} target="_blank">
                        <img
                          src={`https://avatars.io/facebook/${developer.facebook}/large`}
                          className="profile-image"
                          alt="Facebook Profile"
                        />
                        <div className="dev--skills"><span>Facebook</span></div>
                      </a>
                    </div>

                  </div>
                   
                </div>
                
              ))}
            </div>}
        </div>

        <div className="footer">
          Modified by <span className="heart">♥</span> ProKawsar
        </div>

      </div>
    );
  }
}

export default App;
