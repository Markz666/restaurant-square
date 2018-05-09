import React from 'react';
import Zmage from 'react-zmage'

const commentStyle = {
}

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
			        if (comment.img != ""){
			        	//console.log("show comment list:" + this.state.comments);
			    		imgCom = (
			    			<Zmage style={imgStyle} src={comment.img}/>
			    		)
			    	}else{
			    		imgCom = (
			    			 <p></p>
			    		)
			    	}

          			return (
                    	<div key={i} className="col-md-4" style={commentStyle}>
                    		<h5>{comment.comment}</h5>
                    		<h5>
                    			{imgCom}
                    		</h5>
                    		<h5> by {comment.username}</h5>
                    		<h5> at {comment.date}</h5>
                    	</div>
                    );
              	})}
          	</div>
          </div>
        )
    }
}

export default CommentList;