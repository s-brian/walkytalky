import {useRef, useEffect} from 'react'
export default function ScrollToBottom(){
	const elementRef = useRef();
	useEffect(() => elementRef.current.scrollIntoView());
	return <div ref={elementRef} />;
};

