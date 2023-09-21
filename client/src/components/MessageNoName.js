import TextboxCSS from './Textbox.module.css'

function MessageNoName(props){

	const message = props.message;
	const username = props.username;
	const picture = props.picture;

	//displays message without the name and profile picture depicting that it's a chain message
	return(
		<div className={TextboxCSS.message}> 
			{message}
		</div>
	)	
}

export default MessageNoName;