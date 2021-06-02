import './App.css';
import React, { Component } from 'react'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: 'pikachu',
      pokemon: '',
      error: ''
    }

  }

  componentDidMount() {
    this.getPokemon(this.state.query)
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getPokemon(e.target.value)
  }

  firstUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  getPokemon = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.query.toLowerCase()}`);
      const data = await res.json()
      this.setState({
        pokemon: data,
        err: null,
      })
      console.log(data);
    } catch (err) {
      this.setState({
        pokemon: null,
        err: err,
      })
    }
  }

  render() {
    let { query, pokemon, err } = this.state;



    return (
      <>
        <div className="main-div">
          <form onSubmit={this.handleSubmit}>
            <h3>Search Pokemon</h3>
            <input type="text" onChange={this.handleChange} value={this.setState.query} />
            <input type="submit" value="Saerch" />
          </form>

          {pokemon && !err ? (
            <div className="poke-pic">
              <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
              <h2 className="poke-name-title">{this.firstUpper(`${pokemon.name}`)}</h2>
              <ul>
                <li>Base Experience : {pokemon.base_experience}</li>
                <li >Weight : {pokemon.weight}</li>

                {pokemon.abilities.map((abil) => (
                  <li>Ability : {abil.ability.name}</li>
                ))}
              </ul>
              <ul>

              </ul>
            </div>
          ) : (
            <div className="error">
              <img className="img-error" src="https://img.icons8.com/color/452/error--v1.png" alt="" />
              <h2>Whoops! We Couldn't find that Pokemon!</h2>
            </div>
          )}
        </div>


      </>
    )
  }
}



