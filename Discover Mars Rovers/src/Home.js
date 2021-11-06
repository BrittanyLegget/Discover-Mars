import React from 'react';


// Initial styling object for Homepage
var homePageStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundImage: `url('/marsEdited2.jpg')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPositon: 'bottom right 10px',
    backgroundColor: 'black'
  }
var titleStyle = {
    color: 'grey',
    textAlign: 'center',
    marginTop: '7.5%',
    fontSize: '6em'
}

var subText = {
    color: 'grey',
    textAlign: 'center',
    fontSize: '2em',
    marginTop: '2%',
    fontSize: '3em'
}

var annotation = {
    color: 'grey',
    textAlign: 'right',
    marginTop: '27.5%',
    marginRight: '1%',
    fontSize: '1.5em'
}
// Homepage design:
//      possible snippet of perserverance?
//      Background image may need to be scaled in photoshop to match closer to our mockup or whatever we decide

function Home() {
    return (
        <div className="homepage" style={homePageStyle}>
            <h1 style={titleStyle}>Discover Mars</h1>
            <h4 style={subText}>Through the eyes of a rover</h4>
            <p style={annotation}>NASA/JPL-Caltech</p>
        </div>
    )
}

export default Home