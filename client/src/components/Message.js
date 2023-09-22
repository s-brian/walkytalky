import TextboxCSS from './Textbox.module.css'

function Message(props){

	const message = props.message;
	const username = props.username;
	const picture = props.picture;

	//displays message with name and google profile picture
	return(
		<div className={TextboxCSS.boldname}> 
		<img src={picture} width="40"/>
			{username}: 
			<div className={TextboxCSS.message}>
				{message}
			</div>
		</div>
	)	
}

export default Message;