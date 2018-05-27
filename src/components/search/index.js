import React, { Component } from 'react';
import axios from 'axios';

import SearchField from './SearchField';
import SearchResults from './SearchResults';

import API from '../../constants/api'

class Search extends Component {
  isLuke = this.props.user && this.props.user.name === 'Luke Skywalker';
  secs = 0;
  state = {
    term: '',
    planets: [],
    isSearchable: true,
    count: 0
  }

  // Used to create the cancel token for axios
  call;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.isLuke) this.setTimer();
  }

  setTimer() {
    setInterval(() => {
      if (this.secs == 60) {
        this.secs = 0;
        this.setState({ count: 0, isSearchable: true });
      } else {
        this.secs++;
      }
    }, 1000);
  }

  handleChange(e) {
    if (!this.state.isSearchable) return;

    const term = e.target.value;
    this.setState({ term }, () => {
      if (term === '') {
        this.cancelRequest();
        this.setState({ planets: [] });
        return;
      }

      this.search(term)
    });
  }

  async search(term) {
    if (this.state.count === 15) {
      this.setState({ isSearchable: false });
      return;
    }

    const { results } = await this.getResults(term);
    const count = this.isLuke ? 0 : this.state.count + 1;

    this.setState({ planets: results, count });
  }

  getResults(term) {
    this.cancelRequest();
    this.call = axios.CancelToken.source();

    return axios.get(`${API.PLANETS}?search=${term}`, {
      cancelToken: this.call.token
    }).then(({ data }) => data);
  }

  cancelRequest() {
    if (this.call) this.call.cancel('Woohoo, slow down there wookie!');    
  }

  getBadgeColor() {
    let color = 'success';

    if (this.state.count >= 5 && this.state.count < 10) {
      color = 'warning';
    } 

    if (this.state.count >= 10) {
      color = 'danger';
    }

    return color;
  }

  render() {
    const { term, planets, count, isSearchable } = this.state;
    const borderColor = planets.length ? 'success' : 'warning';
    const badgeColor = this.getBadgeColor();

    // Search Field
    const searchField = (
      <SearchField 
        value={term}
        disabled={isSearchable ? null : true}
        onChange={::this.handleChange} />
    );

    // Search Results
    const searchResults = planets.length ? (
      <SearchResults data={planets} />
    ) : null;

    // Search Count
    const searchCount = count ? (
      <span class={`badge badge-${badgeColor} position-absolute search-count`}>Search Count: {count}</span>
    ) : null;

    // Slow Down
    const slowDown = !isSearchable ? (
      <em class="alert alert-primary d-block">
        Slow down young padawan! Only Jedi master Luke can search for more than 15 planets in a minute. 
        You will be able to search in a few moments
      </em>
    ) : null;

    return (
      <div className="col col-lg-6">
        <div className={`jumbotron border-${borderColor}`}>
          {/* Search Count */}
          {searchCount}

          {/* Search Field */}
          {searchField}

          {/* Slow Down */}
          {slowDown}

          {/* Search Results */}
          {searchResults}
        </div>
      </div>
    )
  }
}

export default Search;