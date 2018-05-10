import React from 'react';
import Zmage from 'react-zmage'

const rowStyle = {
	width: '400px',
}

const imgStyle = {
	width: '50px',
	height: '50px',
}

class CommentList extends React.Component {
    render() {
        return (
          <div className="container">
          	<div className="row" style={rowStyle}>
          		{this.props.comments.map((comment, i) => {
          			let imgCom;
			        if (comment.img !== "") {
			        	//console.log("show comment list:" + this.state.comments);
			    		imgCom = (
			    			<Zmage style={imgStyle} src={comment.img}/>
			    		)
			    	} else {
			    		imgCom = (
			    			 <img alt="No Pics"></img>
			    		)
					}
					if (comment.comment.length === 0) {
						comment.comment = "No comment";
					}

          			return (
                    	<div key={i} className="col-md-4" id="commentsDiv">
                    		<p>{comment.comment}</p>
                    		<p>
                    			{imgCom}
                    		</p>
                    		<p> by {comment.username}</p>
                    		<p> at {comment.date}</p>
                    	</div>
                    );
              	})}
          	</div>
          </div>
        )
    }
}

export default CommentList;