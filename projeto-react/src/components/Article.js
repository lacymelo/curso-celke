import React from "react";

function Article(props){
    
    function formatDate(date) {
        return date.toLocaleDateString();
    }

    return(
        <div>
            <img src={props.date.author.avatarUrl} alt={props.date.author.name}/>
            <span>{props.date.author.name}</span><br/>
            <span>{props.date.text}</span>
            <span>{formatDate(props.date.date)}</span>
        </div>
    );
}

export default Article;