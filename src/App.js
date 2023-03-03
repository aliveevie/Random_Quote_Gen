import { Component } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';


class App extends Component {
  constructor(props){
    super(props)
    
    const colors = ['#856088', '#551a8b', '#563c5c', '#003153', '#702963', '#000080']
    const newColor = colors[Math.floor(Math.random() * colors.length)]
  
    this.state = {
      count: 0,
      quotes: [],
      bgColor: newColor

    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    axios.get('https://api.quotable.io/quotes')
    .then(response => {
        const result = response.data.results.map(item => {
          return {
            content: item.content,
            author: item.author
            
          }
        })
      this.setState({
          quotes : result
      });
    })
    .catch(error => {
      console.log(error)
    })
   
  }
  handleClick(){
    const colors = ['#856088', '#551a8b', '#563c5c', '#003153', '#702963', '#000080']
    const newColor = colors[Math.floor(Math.random() * colors.length)]
    this.setState(state => ({
      count: (state.count + 1) % state.quotes.length,
      bgColor: newColor
    }))
}

  render(){
      const { quotes, count} = this.state
      const quote = quotes[count] && quotes[count].content
      const author = quotes[count] && quotes[count].author

    const styles = {
      backgroundColor: this.state.bgColor,
      minHeight: '100vh',
      margin: 0,
      display: 'grid',
      placeItems: 'center',
      color: this.state.bgColor
    }
    const icon = {
      color: this.state.bgColor
    }
    const buttons = {
      backgroundColor: this.state.bgColor,
      border: 'none'
    }
    return (
      
        
      <body style={styles} >
          <div className='container' id="quote-box">
              <div id="text">
                    
                      
            <span>
            <p>&#8220; {quote}</p>
            </span>
                    
              </div>
                    <div id="author" className='d-flex flex-row-reverse'>
                      <p>- {author}</p>
              </div>
                    
                    <div id="new-quote">
                    
                    <div id="tweet-quote"> 
                    <a className='p-2' href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`} target="_blank">
                    <i style={icon}className="fa-brands fa-square-twitter fa-2x"></i>
                    </a>
                    <a className='p-2' href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=example,quote&caption=Author&content=${encodeURIComponent(quote)}`} target="_blank">
                    <i style={icon} className="fab fa-square-tumblr fa-2x"></i>
                    </a>
                    </div>
                    <div className='ml-auto p-2'>
                    <button style={buttons}onClick={this.handleClick} className='btn btn-primary'>New Quote</button>
                    </div>
                    
                  </div>
                  
          </div>
      </body>
      
    
      
      
    )
  }
}



export default App;
