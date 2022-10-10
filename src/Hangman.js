import React, {Component} from 'react';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import img4 from './img4.jpg';
import img5 from './img5.jpg';
import img6 from './img6.jpg';
import img7 from './img7.jpg';
import start from './start.jpg';
import './Hangman.css';
import {randomWord} from './words';
import paw1 from './paw1.gif';
import meow from './meow.wav';

class Hangman extends Component {
    static defaultProps = {
        img: [img1, img2, img3, img4, img5, img6, img7],
        maxWrong: 6
    }
    constructor(props){
        super(props);
        this.state={
            nWrong: 0,
            guessed: new Set(),
            word: randomWord(),
            playing: false
        }
        this.handleImgClick = this.handleImgClick.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleAudio  = this.handleAudio.bind(this);
    }

    handleImgClick(){
        this.setState({
            playing: true,
        })
    }
    generateButtons(){
        return 'abcdefghijklmnopqrstuvwxyz'.split("").map(l =>{
            return <button onClick={this.handleGuess} 
            value={l} key={l}
            disabled={this.state.guessed.has(l)}>   {l}   </button>
        })
    }

    guessedWord(){
        return this.state.word.split("").map(l => {
            return this.state.guessed.has(l)  ?  l : '_' ;
        } )
    }

    handleGuess(e){
        //push value in guess.
        let l = e.target.value;    // stores the value of the button
        this.setState( curState => ({
            guessed: curState.guessed.add(l),
            nWrong: curState.nWrong + (curState.word.includes(l) ? 0 : 1 )
        }))

    }

    handleReset(){
        this.setState( curState => ({
            word: randomWord(),
            nWrong: 0,
            guessed: new Set()
        }))
    }

    handleAudio(){
        document.getElementById('audio').play();
    }

    render(){
        let gameOver = this.state.nWrong >= this.props.maxWrong;
        let gameState = this.generateButtons();
        let isWinner = this.guessedWord().join("") === this.state.word;
        if(gameOver) gameState = <p style={{fontSize:'30px',color:'black',
        marginTop:'-10px',marginLeft:'20px'}}>You Lose!</p>;
        if(isWinner) gameState = <p style={{fontSize:'30px',color:'black',
        marginTop:'-10px',marginLeft:'20px'}}>You Win!</p>;


        if(!this.state.playing){
            return(
                <div className="Start">
                    <img onClick={this.handleImgClick} src={start} />
                    <p style={{color: 'white', textAlign:'center',
                fontSize:'30px'}}>Warning! Cat inside doesn't like to be messed with</p>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>Hangman</h1>
                    <div className="Hangman">
                        <div className="Cont1">
                        <img src={this.props.img[this.state.nWrong]} />
                        <p className="Hangman-word">
                            {!gameOver ? this.guessedWord()
                                        : this.state.word}
                        </p>
                        </div>

                        <div className="Cont2">
                            <img  onClick={this.handleAudio} src={paw1} />
                            <audio id="audio" src={meow}></audio>

                        <p className="Hangman-bttns">
                            {gameState}
                        </p>

                        <button id="bttn2" onClick={this.handleReset}> Play Again!</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Hangman;