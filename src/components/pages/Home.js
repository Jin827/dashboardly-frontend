import React, {Component} from 'react';
import api from '../../api';
import BoardCard from '../elements/BoardCard';
import AddButton from '../elements/AddButton';
import auth from '../../auth';
import './Home.css';
import CreateBoard from '../modals/CreateBoard.js'


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }

  componentDidMount() {
    this._fetchBoards();
  }

  //this is fetching all the boards on the homepage
  _fetchBoards = () => {
    api.getBoardsList()
    .then(res => {
      // console.log(res, 'response')
      // console.log(res.body[0].boards )
      this.setState({ boards: res.body})
    })
    .catch(console.error)
  }

//this sets the state for the the drop down new board form
  _createBoardForm = () =>{
    this.setState({
      createBoard: true
    })
  }

  render() {
    let { boards } = this.state
    if(!boards){
      return (
        <div>
          <h1>loading...</h1>
        </div>
      )
    }
    return (
      <div className="home">
        { boards.map(b =>  //iterating over each board so that the following is displayed
          <BoardCard
            key={b.id}
            id={b.id}
            title={b.title}
            description={b.description}
            updatedAt={b.updatedAt}
          />
        )}
        {auth.isLoggedIn() ? <AddButton addButtonClick={this._createBoardForm}  /> : null}
        {this.state.createBoard ? <CreateBoard id={boards}/> : null}
      </div>
    );
  }

}
